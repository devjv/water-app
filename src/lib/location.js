import { getCenter } from 'geolib'

export function numberifyLocation (location) {
  return { lat: Number(location.lat || location.latitude), lon: Number(location.lon || location.longitude) }
}

export function humanizeLocation (location) {
  if (!location) {
    return location
  }

  const { lat, lon } = location

  return `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`
}

export function getReportsCenter (reports) {
  const centers = reports.map(r => r.location)
  const center = getCenter(centers)
  return numberifyLocation(center)
}
