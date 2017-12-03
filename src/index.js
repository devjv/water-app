import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import indigo from 'material-ui/colors/indigo'
import blue from 'material-ui/colors/blue'

import './assets/favicon.png'

import App from './components/App'
import store from './store'

import './style/main.scss'

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: blue
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)
