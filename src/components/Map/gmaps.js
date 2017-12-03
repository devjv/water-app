import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import style from './map.scss'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 1.2921, lng: 36.8219 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 1.2921, lng: 36.8219 }} />}
  </GoogleMap>
))

class MapView extends React.Component {
  constructor () {
    super()
    this.state = {
      asd: 'dasd'
    }
  }
  render () {
    return (
      <div className={style.mapContainer}>
        <MyMapComponent
          isMarkerShown
          googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    )
  }
}

export default MapView
