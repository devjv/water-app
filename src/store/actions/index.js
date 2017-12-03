export const setReport = report => ({
  type: 'SET_REPORT',
  payload: { report }
})

export const setReports = reports => ({
  type: 'SET_REPORTS',
  payload: { reports }
})

export const setMapMode = mode => ({
  type: 'SET_MAP_MODE',
  payload: { mode }
})

export const setMapCenter = center => ({
  type: 'SET_MAP_CENTER',
  payload: { center }
})
