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
   * @return {number} - Current points
   */
  addPoints (points) {
    this.points += points
  }

  /**
   * Returns the player's current points
   *
   * @param {Number} points - why is this a thing
   * @return {Number} - Current points
   */
  getPoints (points) {
    return this.points
  }

  getCash() {
    return this.cash
  }

  addStructure (structure) {
    this.structures.add(structure)
  }

  removeStructure (structure) {
    this.structures.delete(structure)
  }
}
