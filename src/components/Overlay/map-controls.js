import React from 'react'
import Icon from 'material-ui/Icon'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import style from './overlay.scss'
import { connect } from 'react-redux'
import { setMapMode, setMapZoom } from '../../store/actions'

const MapControls = ({
  setMapMode,
  setMapCenter,
  setMapZoom,
  userLocation,
  onToggleMapMode,
  mapMode
}) => (
  <Paper className={style.mapControls} elevation={1}>
    <div>
      <IconButton className={style.button} onClick={onToggleMapMode}>
        <Icon>{mapMode === 'street' ? 'satellite' : 'map'}</Icon>
      </IconButton>
      <IconButton
        className={style.button}
        onClick={() => {
          setMapCenter(userLocation)
          setMapZoom(14)
        }}
      >
        <Icon>my_location</Icon>
      </IconButton>
    </div>
  </Paper>
)

const mapStateToProps = state => ({
  mapMode: state.map.mode
})

const mergeProps = (stateProps, { dispatch }, ownProps) => ({
  ...stateProps,
  ...ownProps,
  onToggleMapMode: () => {
    const mapMode = stateProps.mapMode === 'street' ? 'sat' : 'street'
    dispatch(setMapMode(mapMode))
  }
})

export default connect(mapStateToProps, null, mergeProps)(MapControls)
