import React from 'react'
import { Map, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import Button from 'material-ui/Button'
import classNames from 'classnames'

import style from './map.scss'

const satelliteTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const streetTileUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVyZWxldCIsImEiOiJjajg1cGNvdW0wbHB5MzJvOWNmMHo2bzJjIn0.740ls-yXSk4o849wDH7Wcg'

const MapControls = ({ setMapMode }) =>
  <div className={style.mapControls}>
    <Button raised className={style.button} onClick={() => setMapMode('sat')}>Satellite</Button>
    <Button raised className={style.button} onClick={() => setMapMode('street')}>Street</Button>
  </div>

const Bar = ({ className, children }) =>
  <div className={classNames(style.bar, className)}>
    {children}
  </div>

const Overlay = ({ setMapMode }) =>
  <div className={style.overlay}>
    <Bar className={style.header}>
      Header
    </Bar>
    <Bar className={style.footer}>
      <MapControls setMapMode={setMapMode} />
    </Bar>
  </div>

class MapView extends React.Component {
  constructor () {
    super()
    this.state = {
      tileUrl: satelliteTileUrl
    }
  }
  setMapMode = mode => {
    if (mode === 'street') {
      this.setState({ tileUrl: streetTileUrl })
    } else if (mode === 'sat') {
      this.setState({ tileUrl: satelliteTileUrl })
    }
  }
  render () {
    const position = [-1.3584125, 36.7290792]
    return (
      <div className={style.mapContainer}>
        <Map
          className={style.map}
          center={position}
          zoom={13}
          attributionControl={false}
          zoomControl={false}
        >
          <ZoomControl position='bottomright' />
          <TileLayer
            url={this.state.tileUrl}
          />
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup.<br />Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
        <Overlay setMapMode={this.setMapMode} />
      </div>
    )
  }
}

export default MapView
