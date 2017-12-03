const initialReports = {
  '0': {
    id: '0',
    location: [-1.3584125, 36.7290792],
    status: 0,
    description: 'Pretty bad leak',
    priority: 1
  },
  '1': {
    id: '1',
    location: [-1.2921, 36.8],
    status: 1,
    description: 'Leaky faucet',
    priority: 0
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
