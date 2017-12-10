export function refreshMap () {
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'))
  })
}
