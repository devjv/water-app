import React from 'react'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer, ZoomControl, LayerGroup } from 'react-leaflet'
import _ from 'lodash'

import { getReportsCenter } from '../../lib/location'
import { setMapCenter } from '../../store/actions'
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
  onViewportChanged = ({ center }) => {
    console.log('center', center)
    const location = {
      lat: center[0],
      lon: center[1]
    }
    this.props.setMapCenter(location)
  }
  render () {
    return (
      <div className={style.mapContainer}>
        <Map
          className={style.map}
          center={this.props.mapCenter}
          zoom={13}
          attributionControl={false}
          zoomControl={false}
          onViewportChanged={this.onViewportChanged}
          useFlyTo
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
  mapCenter: state.map.center
})

const mapDispatchToProps = dispatch => ({
  setMapCenter: center => dispatch(setMapCenter(center))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
