import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import Icon from 'material-ui/Icon'
import IconButton from 'material-ui/IconButton'
import classNames from 'classnames'

import { humanizeLocation, getReportsCenter } from '../../lib/location'
import { setMapMode, setMapCenter, setMapZoom } from '../../store/actions'

import style from './overlay.scss'

const MapControls = ({ setMapMode }) =>
  <div className={style.mapControls}>
    <IconButton className={style.button} onClick={() => setMapMode('sat')}>
      <Icon>satellite</Icon>
    </IconButton>
    <IconButton className={style.button} onClick={() => setMapMode('street')}>
      <Icon>map</Icon>
    </IconButton>
  </div>

const Bar = ({ className, children }) =>
  <div className={classNames(style.bar, className)}>
    {children}
  </div>

const Overlay = ({ setMapMode, reports, mapCenter, setMapCenter, setMapZoom }) => {
  const coordText = humanizeLocation(mapCenter)
  const reportsArray = Object.values(reports)
  const title = coordText + ', ' + reportsArray.length + ' nearby issues'
  const reportsCenter = getReportsCenter(reportsArray)
  return (
    <div className={style.overlay}>
      <Bar className={style.header}>
        <Button onClick={() => {
          setMapCenter(reportsCenter)
          setMapZoom(12)
        }}>{title}</Button>
      </Bar>
      <Bar className={style.footer}>
        <MapControls setMapMode={setMapMode} />
      </Bar>
    </div>
  )
}

const mapStateToProps = state => ({
  reports: state.reports,
  mapCenter: state.map.center
})

const mapDispatchToProps = dispatch => ({
  setMapMode: mode => dispatch(setMapMode(mode)),
  setMapCenter: center => dispatch(setMapCenter(center)),
  setMapZoom: zoom => dispatch(setMapZoom(zoom))
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)
