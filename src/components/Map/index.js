import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer, LayerGroup } from 'react-leaflet'
import _ from 'lodash'

import { getReportsCenter } from '../../lib/location'
import { setMapCenter, setMapZoom } from '../../store/actions'
import style from './map.scss'

const satelliteTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const streetTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const ReportInfoPopup = ({ report }) =>
  <Popup className={style.popup} closeButton={false}>
    <span>{report.description}</span>
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
  componentDidMount () {
    if (this.props.reports) {
      const arr = Object.values(this.props.reports)
      const center = getReportsCenter(arr)
      this.props.setMapCenter(center)
    }
  }
  getTileUrl = () => {
    const mode = this.props.mapMode
    if (mode === 'street') {
      return streetTileUrl
    } else if (mode === 'sat') {
      return satelliteTileUrl
    }
  }
  onViewportChanged = ({ center, zoom }) => {
    const location = {
      lat: center[0],
      lon: center[1]
    }
    this.props.setMapCenter(location)
    this.props.setMapZoom(zoom)
  }
  render () {
    return (
      <div className={style.mapContainer}>
        <Map
          className={style.map}
          center={this.props.mapCenter}
          attributionControl={false}
          zoomControl={false}
          onViewportChanged={this.onViewportChanged}
          useFlyTo
          zoom={this.props.mapZoom || 13}
        >
          <TileLayer
            url={this.getTileUrl()}
          />
          <ReportsLayer reports={this.props.reports} />
        </Map>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  reports: state.reports,
  mapMode: state.map.mode,
  mapCenter: state.map.center,
  mapZoom: state.map.zoom
})

const mapDispatchToProps = dispatch => ({
  setMapCenter: center => dispatch(setMapCenter(center)),
  setMapZoom: zoom => dispatch(setMapZoom(zoom))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
