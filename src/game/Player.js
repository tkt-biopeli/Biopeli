/**
 * Keeps track of the player's points
 */
export default class {
  /**
   * Initially the player has 0 points
   */
  constructor () {
    this.points = 0
    this.cash = 0
    this.structures = new Set()
  }

  /**
   * Adds points given as a parameter to players existing points
   *
   * @param {number} - The amount of points to be added
   */
  addPoints (points) {
    this.points += points
  }

  addStructure (structure) {
    this.structures.add(structure)
  }

  removeStructure (structure) {
    this.structures.delete(structure)
  }
}
