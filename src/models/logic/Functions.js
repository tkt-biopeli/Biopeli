const LinearFunction = (multiplier, constantAddition) =>
  x => x * multiplier + constantAddition

const ConstantFunction = constant => () => constant

const Circle = (xo, yo, radius, mult) => x =>
  x >= -radius + xo && x <= radius + xo
    ? yo + mult * Math.sqrt(radius * radius - (x - xo) * (x - xo))
    : 0

/**
 * Creates linear function that goes through given points
 *
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 */
const createLine = function (x1, y1, x2, y2) {
  if (x1 === x2) {
    return null
  }

  if (y1 === y2) {
    return ConstantFunction(y1)
  }

  if (x2 > x1) {
    let help = x2
    x2 = x1
    x1 = help
    help = y2
    y2 = y1
    y1 = help
  }

  var slope = (y2 - y1) / (x2 - x1)
  var constant = y1 - x1 * slope
  return LinearFunction(slope, constant)
}

/**
 * Creates linear function with given slope and constant addition
 *
 * @param {*} slope
 * @param {*} constant
 */
const initializeLine = function (slope, constant) {
  if (slope === 0) {
    return ConstantFunction(constant)
  }

  return LinearFunction(slope, constant)
}

const createCircle = function (x, y, radius, upper) {
  var mult = -1
  if (upper) mult = 1

  return Circle(x, y, radius, mult)
}

export { createLine, initializeLine, createCircle }
