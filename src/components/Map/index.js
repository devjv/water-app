import React from 'react'
import Leaflet from 'leaflet'
import { connect } from 'react-redux'
import { Map, Marker, Popup, TileLayer, LayerGroup } from 'react-leaflet'
import moment from 'moment'
import { refreshMap } from '../../lib/map-helpers'
import {
  REPORTED,
  SCHEDULED,
  IN_PROGRESS,
  LOW,
  MEDIUM,
  HIGH
} from '../../lib/issue'
import set from 'lodash/set'

// import { getReportsCenter } from '../../lib/location'
import { setMapCenter, setMapZoom, setPanning } from '../../store/actions'
import style from './map.scss'

const satelliteTileUrl =
  'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const streetTileUrl =
  'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const StatusIcon = Leaflet.Icon.extend({
  options: {
    iconSize: [36, 36],
    iconAnchor: [20, 18],
    popupAnchor: [0, -20]
  }
})

const statusNames = {
  [REPORTED]: 'reported',
  [SCHEDULED]: 'scheduled',
  [IN_PROGRESS]: 'in_progress'
}

function generateIcons () {
  const icons = {}
  const statuses = [REPORTED, SCHEDULED, IN_PROGRESS]
  const priorities = [LOW, MEDIUM, HIGH]

  statuses.forEach(status => {
    priorities.forEach(priority => {
      set(
        icons,
        [status, priority],
        new StatusIcon({
          iconUrl: `/src/assets/${statusNames[String(status)]}_${priority}.png`
        })
      )
    })
  })

  return icons
}

const prioIcons = generateIcons()

var userIcon = Leaflet.icon({
  iconUrl: '/src/assets/user.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
})

var formatTime = function (timestamp) {
  return moment(timestamp).fromNow()
}

const DumbPopup = ({ report, openIssue, closeIssue }) => (
  <Popup
    className={style.popup}
    closeButton={false}
    onOpen={openIssue}
    onClose={closeIssue}
  >
    <div>
      <p>{report.description}</p>
      <p>Updated {formatTime(report.updatedAt)}</p>
    </div>
  </Popup>
)

const mapReportDispatch = (dispatch, props) => {
  const { report } = props

  return {
    openIssue: () => {
      dispatch({
        type: 'VIEW_ISSUE',
        payload: { issueId: props.report.id }
      })
      dispatch(setMapCenter(report.location))
      refreshMap()
    },
    closeIssue: () => {
      dispatch({
        type: 'HOME'
      })
      refreshMap()
    }
  }
}

const ReportPopup = connect(null, mapReportDispatch)(DumbPopup)

const ReportsLayer = ({ reports }) => (
  <LayerGroup>
    {Object.values(reports).map(report => (
      <Marker
        key={report.id}
        position={report.location}
        icon={prioIcons[report.status][report.priority]}
      >
        <ReportPopup report={report} />
      </Marker>
    ))}
  </LayerGroup>
)

const UserLayer = ({ userLocation }) => (
  <LayerGroup>
    <Marker key='user' position={userLocation} icon={userIcon} />
  </LayerGroup>
)

const PinLayer = ({ pinLocation }) => (
  <LayerGroup>
    <Marker position={pinLocation} />
  </LayerGroup>
)
class MapView extends React.Component {
  // Use this if the initial map should be centered according to the reports instead of the user locations
  // componentDidMount () {
  //   if (this.props.reports) {
  //     const arr = Object.values(this.props.reports)
  //     const center = getReportsCenter(arr)
  //     this.props.setMapCenter(center)
  //   }
  // }
  componentDidMount () {
    if (this.refs.map) {
      this.refs.map.leafletElement.on('dragstart', () => {
        this.props.setMapPanning(true)
      })
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

  handleViewport = ({ center, zoom }) => {
    if (this.props.isPanning) {
      const location = {
        lat: center[0],
        lon: center[1]
      }
      this.props.setMapCenter(location)
      this.props.setMapZoom(zoom)
    }
  }

  render () {
    const {
      onClick,
      mapZoom,
      mapCenter,
      reports,
      userLocation,
      view
    } = this.props
    const creatingIssue = this.props.view === 'CREATE_ISSUE'

    return (
      <Map
        onClick={onClick}
        className={style.map}
        center={mapCenter}
        attributionControl={false}
        zoomControl={false}
        onViewportChange={creatingIssue && this.handleViewport}
        onViewportChanged={!creatingIssue && this.handleViewport}
        useFlyTo
        ref='map'
        zoom={mapZoom || 13}
      >
        <TileLayer url={this.getTileUrl()} />
        <ReportsLayer reports={reports} />
        <UserLayer userLocation={userLocation} />
        {view === 'CREATE_ISSUE' && <PinLayer pinLocation={mapCenter} />}
      </Map>
    )
  }
}

const mapStateToProps = state => ({
  reports: state.reports,
  mapMode: state.map.mode,
  mapCenter: state.map.center,
  mapZoom: state.map.zoom,
  userLocation: state.map.userLocation,
  isPanning: state.map.isPanning,
  view: state.location.type
})

const mapDispatchToProps = dispatch => ({
  setMapCenter: center => dispatch(setMapCenter(center)),
  setMapZoom: zoom => dispatch(setMapZoom(zoom)),
  setMapPanning: b => dispatch(setPanning(b)),
  onClick: () => {
    dispatch({ type: 'HOME' })
    window.dispatchEvent(new Event('resize'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MapView)
