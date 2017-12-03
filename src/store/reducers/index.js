const initialReports = {
  '0': {
    id: '0',
    location: { lon: 36.7290792, lat: -1.3584125 },
    status: 0,
    description: 'Pretty bad leak',
    priority: 1,
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: false
  },
  '1': {
    id: '1',
    location: { lon: 36.8, lat: -1.2921 },
    status: 1,
    description: 'Leaky faucet',
    priority: 0,
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: true
  },
  '2': {
    id: '2',
    location: { lon: 36.69, lat: -1.28 },
    status: 1,
    description: 'Water is out',
    priority: 2,
    updatedAt: '2017-12-03T18:26:44.948',
    canDelete: false
  }
}

export const reports = (state = initialReports, action) => {
  switch (action.type) {
    case 'SET_REPORT':
      return {
        ...state,
        [action.payload.report.id]: action.payload.report
      }
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
  zoom: 12,
  locationPending: false
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
    default:
      return state
  }
}
