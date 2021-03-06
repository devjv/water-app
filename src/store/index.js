import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import queryString from 'query-string'

import { reports, map, form } from './reducers'

const history = createHistory()

const routesMap = {
  HOME: { path: '/' },
  CREATE_ISSUE: { path: '/issue' },
  VIEW_ISSUE: { path: '/issue/:issueId' }
}

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer
} = connectRoutes(history, routesMap, {
  querySerializer: queryString
})

const rootReducer = combineReducers({
  location: routeReducer,
  reports,
  map,
  form
})

const middlewares = applyMiddleware(routeMiddleware, thunk)

const enhancers = compose(
  routeEnhancer,
  middlewares,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
)

const store = createStore(rootReducer, enhancers)

export default store
