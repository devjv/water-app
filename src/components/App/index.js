import React from 'react'
import { connect } from 'react-redux'

import MapView from '../Map'

import style from './app.scss'

const getView = page => {
  switch (page) {
    case 'HOME':
      return <MapView />
    default:
      return <MapView />
  }
}

const App = ({ page }) =>
  <div className={style.app}>
    <div className={style.contentPage}>
      {getView(page)}
    </div>
  </div>

const mapStateToProps = state => ({
  page: state.location.type
})

export default connect(mapStateToProps)(App)
