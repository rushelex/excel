// Pure functions
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
}
