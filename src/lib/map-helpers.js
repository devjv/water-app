export function refreshMap () {
  setTimeout(() => {
    window.dispatchEvent(new window.Event('resize'))
  })
}
