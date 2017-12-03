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
