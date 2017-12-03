import React from 'react'
import { connect } from 'react-redux'
import Button from 'material-ui/Button'
import classNames from 'classnames'

import { humanizeLocation, getReportsCenter } from '../../lib/location'
import { setMapMode, setMapCenter } from '../../store/actions'

import style from './overlay.scss'

const MapControls = ({ setMapMode }) =>
  <div className={style.mapControls}>
    <Button raised className={style.button} onClick={() => setMapMode('sat')}>Satellite</Button>
    <Button raised className={style.button} onClick={() => setMapMode('street')}>Street</Button>
  </div>

const Bar = ({ className, children }) =>
  <div className={classNames(style.bar, className)}>
    {children}
  </div>

const Overlay = ({ setMapMode, reports, mapCenter, setMapCenter }) => {
  const coordText = humanizeLocation(mapCenter)
  const reportsArray = Object.values(reports)
  const title = coordText + ', ' + reportsArray.length + ' nearby issues'
  const reportsCenter = getReportsCenter(reportsArray)
  return (
    <div className={style.overlay}>
      <Bar className={style.header}>
        <Button onClick={() => setMapCenter(reportsCenter)}>{title}</Button>
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
  setMapCenter: center => dispatch(setMapCenter(center))
})

export default connect(mapStateToProps, mapDispatchToProps)(Overlay)
