import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import _ from 'lodash'

import MapView from '../Map'
import Overlay from '../Overlay'
import IssueDetails from '../issue-details'
import { CurrentLocationIssueForm } from '../issue-form'

import style from './app.scss'

const getDrawerContent = (page, payload) => {
  switch (page) {
    case 'CREATE_ISSUE':
      return <CurrentLocationIssueForm />
    case 'VIEW_ISSUE':
      return <IssueDetails />
    default:
      return null
  }
}

const isDrawerPage = page => _.includes(['CREATE_ISSUE', 'VIEW_ISSUE'], page)

const DrawerWithContent = ({ page, close }) => (
  <Drawer anchor='bottom' open={isDrawerPage(page)} type='persistent'>
    {getDrawerContent(page)}
  </Drawer>
)

const mapStateToProps = state => ({
  page: state.location.type
})

const BottomDrawer = connect(mapStateToProps, mapDispatchToProps)(
  DrawerWithContent
)

const App = () => (
  <div className={style.app}>
    <div className={style.contentPage}>
      <MapView />
      <Overlay />
      <BottomDrawer />
    </div>
  </div>
)

export default App
