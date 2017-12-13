import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { humanizeLocation, getReportsCenter } from '../../lib/location'
import { setMapCenter, setMapZoom } from '../../store/actions'
import style from './index.scss'

const Header = props => {
  const { onClick, title } = props

  return (
    <Paper elevation={1} square>
      <Button color='primary' onClick={onClick} className={style.button}>
        {title}
      </Button>
    </Paper>
  )
}

const mapStateToProps = state => {
  const { reports, map: { center } } = state
  const reportsArray = Object.values(reports)

  return {
    title: `${humanizeLocation(center)}, ${reportsArray.length} nearby issues`,
    reports: reportsArray
  }
}

const mapDispatchToProps = dispatch => ({
  centerMapOnReports: reports => {
    dispatch(setMapCenter(getReportsCenter(reports)))
    dispatch(setMapZoom(12))
  }
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { reports } = stateProps
  const { centerMapOnReports } = dispatchProps

  return {
    onClick: () => {
      centerMapOnReports(reports)
    },
    ...stateProps,
    ...ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header)
