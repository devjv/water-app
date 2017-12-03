export default function humanizeLocation (location) {
  if (!location) {
    return
  }

  const { latitude, longitude } = location

  return `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`
}
