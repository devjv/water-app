import React from 'react'
import { connect } from 'react-redux'

import MapView from '../Map'
import Overlay from '../Overlay'

import style from './app.scss'

const getOverlay = page => {
  switch (page) {
    case 'HOME':
      return <Overlay />
    default:
      return <span>default</span>
  }
}

const App = ({ page }) =>
  <div className={style.app}>
    <div className={style.contentPage}>
      <MapView />
      {getOverlay(page)}
    </div>
  </div>

const mapStateToProps = state => ({
  page: state.location.type
})

export default connect(mapStateToProps)(App)
