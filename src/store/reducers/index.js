import uuidv4 from 'uuid/v4'
import omit from 'lodash/omit'

const initialReports = {
  '0': {
    id: '0',
    location: { lon: 36.7390792, lat: -1.3564125 },
    status: 0,
    description: 'Pretty bad leak',
    priority: 'medium',
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: false
  },
  '1': {
    id: '1',
    location: { lon: 36.79, lat: -1.2921 },
    status: 1,
    description: 'Leaky faucet',
    priority: 'low',
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: true
  },
  '2': {
    id: '2',
    location: { lon: 36.69, lat: -1.28 },
    status: 1,
    description: 'Water is out',
    priority: 'high',
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: false
  }
}

export const reports = (state = initialReports, action) => {
  switch (action.type) {
    case 'ADD_REPORT':
      const id = uuidv4()
      const report = {
        ...action.payload.report,
        id,
        status: 0,
        canDelete: true
      }

      return {
        ...state,
        [id]: report
      }
    case 'REMOVE_REPORT':
      return omit(state, action.payload)
    case 'SET_REPORTS':
      return action.payload.reports
    default:
      return state
  }
}

const mockUserLocation = { lon: 36.7290792, lat: -1.3584125 }

const initialMap = {
  mode: 'street',
  center: mockUserLocation,
  zoom: 14,
  userLocation: mockUserLocation,
  locationPending: false,
  isPanning: false
}

export const map = (state = initialMap, action) => {
  switch (action.type) {
    case 'SET_MAP_MODE':
      return {
        ...state,
        mode: action.payload.mode
      }
    case 'SET_MAP_CENTER':
      return {
        ...state,
        center: action.payload.center
      }
    case 'SET_MAP_ZOOM':
      return {
        ...state,
        zoom: action.payload.zoom
      }
    case 'LOCATE_USER':
      return {
        ...state,
        locationPending: action.payload.pending
      }
    case 'SET_PANNING':
      return {
        ...state,
        isPanning: action.payload.isPanning
      }
    default:
      return state
  }
}

const initialForm = {
  priority: 'low',
  description: '',
  photos: []
}

export const form = (state = initialForm, action) => {
  switch (action.type) {
    case 'SET_FORM_VALUE':
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    case 'CLEAR_FORM':
      return initialForm
    default:
      return state
  }
}
