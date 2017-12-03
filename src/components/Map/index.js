import React from 'react'
import Leaflet from 'leaflet'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer, LayerGroup } from 'react-leaflet'

import { getReportsCenter } from '../../lib/location'
import { setMapCenter, setMapZoom } from '../../store/actions'
import style from './map.scss'

const satelliteTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const streetTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const MiniIcon = Leaflet.Icon.extend({
  options: {
    iconSize: [40, 36],
    iconAnchor: [20, 18],
    popupAnchor: [0, -20]
  }
})

const prioIcon0 = new MiniIcon({iconUrl: 'src/assets/prio0.png'})
const prioIcon1 = new MiniIcon({iconUrl: 'src/assets/prio1.png'})
const prioIcon2 = new MiniIcon({iconUrl: 'src/assets/prio2.png'})

var getPriorityIcon = function (status) {
  switch (status) {
    case 0:
      return prioIcon0
    case 1:
      return prioIcon1
    case 2:
      return prioIcon2
    default:
      throw new Error('invalid report status')
  }
}

const DumbPopup = ({ report, openIssue }) =>
  <Popup className={style.popup} closeButton={false}>
    <button onClick={openIssue}>
      {report.description}
    </button>
  </Popup>

const mapReportDispatch = (dispatch, props) => ({
  openIssue: () => dispatch(
    {
      type: 'VIEW_ISSUE',
      payload: { issueId: props.report.id }
    }
  )
})

const ReportPopup = connect(null, mapReportDispatch)(DumbPopup)

const ReportsLayer = ({ reports }) =>
  <LayerGroup>
    {Object.values(reports).map(report =>
      <Marker key={report.id} position={report.location} icon={getPriorityIcon(report.priority)}>
        <ReportPopup report={report} />
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
