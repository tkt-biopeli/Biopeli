const between = (min, max, value) => {
  if (min != null) {
    if (value < min) return false
  }

  if (max != null) {
    if (value > max) return false
  }

  return true
}

export { between }
