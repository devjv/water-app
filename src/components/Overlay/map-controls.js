import React from 'react'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import style from './overlay.scss'
import { connect } from 'react-redux'
import { setMapMode, setMapZoom, setMapCenter } from '../../store/actions'

const MapControls = ({ mapMode, onToggleMapMode, onCenterUserPosition }) => (
  <Paper className={style.mapControls} elevation={1}>
    <div>
      <IconButton className={style.button} onClick={onToggleMapMode}>
        <Icon>{mapMode === 'street' ? 'satellite' : 'map'}</Icon>
      </IconButton>
      <IconButton className={style.button} onClick={onCenterUserPosition}>
        <Icon>my_location</Icon>
      </IconButton>
    </div>
  </Paper>
)

const mapStateToProps = state => ({
  mapMode: state.map.mode,
  userLocation: state.map.userLocation
})

const mergeProps = ({ mapMode, userLocation }, { dispatch }, ownProps) => ({
  ...ownProps,
  mapMode,
  onCenterUserPosition: () => {
    dispatch(setMapCenter(userLocation))
    dispatch(setMapZoom(14))
  },
  onToggleMapMode: () => {
    const nextMapMode = mapMode === 'street' ? 'sat' : 'street'
    dispatch(setMapMode(nextMapMode))
  }
})

export default connect(mapStateToProps, null, mergeProps)(MapControls)
