import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer, ZoomControl, LayerGroup } from 'react-leaflet'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import { getCenter } from 'geolib'

import { humanizeLocation, numberifyLocation } from '../../lib/location'
import style from './map.scss'

const satelliteTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const streetTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const MapControls = ({ setMapMode }) =>
  <div className={style.mapControls}>
    <Button raised className={style.button} onClick={() => setMapMode('sat')}>Satellite</Button>
    <Button raised className={style.button} onClick={() => setMapMode('street')}>Street</Button>
  </div>

const Bar = ({ className, children }) =>
  <div className={classNames(style.bar, className)}>
    {children}
  </div>

const Overlay = ({ setMapMode, reports, center }) => {
  const coordText = humanizeLocation(center)
  const title = coordText + ' ' + Object.values(reports).length + ' nearby issues'
  return (
    <div className={style.overlay}>
      <Bar className={style.header}>
        <span>{title}</span>
      </Bar>
      <Bar className={style.footer}>
        <MapControls setMapMode={setMapMode} />
      </Bar>
    </div>
  )
}

const ReportInfoPopup = ({ report }) =>
  <Popup>
    <span>
      {report.description}
    </span>
  </Popup>

const ReportsLayer = ({ reports }) =>
  <LayerGroup>
    {Object.values(reports).map(report =>
      <Marker key={report.id} position={report.location}>
        <ReportInfoPopup report={report} />
      </Marker>
    )}
  </LayerGroup>

class MapView extends React.Component {
  constructor () {
    super()
    this.state = {
      tileUrl: satelliteTileUrl
    }
  }
  setMapMode = mode => {
    if (mode === 'street') {
      this.setState({ tileUrl: streetTileUrl })
    } else if (mode === 'sat') {
      this.setState({ tileUrl: satelliteTileUrl })
    }
  }
  render () {
    const centers = (Object.values(this.props.reports) || []).map(r => r.location)
    const center = getCenter(centers)
    const mapCenter = numberifyLocation(center)
    console.log(mapCenter)
    return (
      <div className={style.mapContainer}>
        <Map
          className={style.map}
          center={mapCenter}
          zoom={13}
          attributionControl={false}
          zoomControl={false}
        >
          <ZoomControl position='bottomright' />
          <TileLayer
            url={this.state.tileUrl}
          />
          <ReportsLayer reports={this.props.reports} />
        </Map>
        <Overlay setMapMode={this.setMapMode} reports={this.props.reports} center={mapCenter} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reports: state.reports
})

export default connect(mapStateToProps)(MapView)
