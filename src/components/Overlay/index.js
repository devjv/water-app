import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import MapControls from './map-controls'
import { refreshMap } from '../../lib/map-helpers'
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
}) => (
  <div className={style.overlay}>
    <div className={style.footer}>
      <MapControls />
      <ConnectedFab userLocation={userLocation} />
    </div>
  </div>
)

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
