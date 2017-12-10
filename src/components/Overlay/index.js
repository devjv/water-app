import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import MapControls from './map-controls'
import { refreshMap } from '../../lib/map-helpers'

import { humanizeLocation, getReportsCenter } from '../../lib/location'
import { setMapMode, setMapCenter, setMapZoom } from '../../store/actions'

import style from './overlay.scss'

const ReportFab = ({ openForm }) => (
  <Button raised color='accent' className={style.fab} onClick={openForm}>
    Report a new issue
  </Button>
)

const ConnectedFab = connect(null, (dispatch, ownProps) => ({
  openForm: () => {
    dispatch({ type: 'CREATE_ISSUE' })
    dispatch(setMapCenter(ownProps.userLocation))
    refreshMap()
  }
}))(ReportFab)

const Overlay = ({
  setMapMode,
  reports,
  mapCenter,
  setMapCenter,
  setMapZoom,
  userLocation
}) => {
  const coordText = humanizeLocation(mapCenter)
  const reportsArray = Object.values(reports)
  const title = coordText + ', ' + reportsArray.length + ' nearby issues'
  const reportsCenter = getReportsCenter(reportsArray)
  return (
    <div className={style.overlay}>
      <div className={style.footer}>
        <MapControls
          setMapMode={setMapMode}
          setMapCenter={setMapCenter}
          setMapZoom={setMapZoom}
          userLocation={userLocation}
        />
        <ConnectedFab userLocation={userLocation} />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  reports: state.reports,
  mapCenter: state.map.center,
  userLocation: state.map.userLocation
})

const mapDispatchToProps = dispatch => ({
  setMapMode: mode => dispatch(setMapMode(mode)),
  setMapCenter: center => dispatch(setMapCenter(center)),
  setMapZoom: zoom => dispatch(setMapZoom(zoom))
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)
