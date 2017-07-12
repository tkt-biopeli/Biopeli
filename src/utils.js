/**
 * Utility functions
 */
export default {
  centerGameObjects: (objects) => {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5)
    })
  },
  random: () => {
    return Math.random()
  }
}
