const mockUserLocation = { lon: 36.7290792, lat: -1.3584125 }

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

export const setPanning = isPanning => ({
  type: 'SET_PANNING',
  payload: { isPanning }
})

export const setMapCenter = center => ({
  type: 'SET_MAP_CENTER',
  payload: { center }
})

export const setMapZoom = zoom => ({
  type: 'SET_MAP_ZOOM',
  payload: { zoom }
})

export const locateUser = pending => ({
  type: 'LOCATE_USER',
  payload: { pending }
})

// This is not used at the moment:
export function locateUserThunk () {
  return (dispatch, getState) => {
    const { userLocation } = getState().map
    dispatch(setPanning(false))
    if (userLocation) {
      dispatch(setMapCenter(userLocation))
    } else {
      dispatch(locateUser(true))
      setTimeout(() => {
        dispatch(locateUser(false))
        dispatch(setMapCenter(mockUserLocation))
      }, 1000)
    }
  }
}

export const clearForm = {
  type: 'CLEAR_FORM'
}

export const formAction = (key, value) => ({
  type: 'SET_FORM_VALUE',
  payload: { key, value }
})
