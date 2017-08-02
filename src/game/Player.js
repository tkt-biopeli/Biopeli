/**
 * Keeps track of the player's points, money and structures
 */
export default class {
  /**
   * Initially the player has 0 points and structures.
   * @param {number} startMoney - initial money, controlled by state Play
   */
  constructor ({ startMoney }) {
    this.points = 0
    this.cash = startMoney
    this.structures = new Set()
  }

  /**
   * Adds points given as a parameter to players existing points
   * @param {number} - The amount of points to be added
   */
  addPoints (points) {
    this.points += points
  }

  /**
   * Adds a structure for the player
   * @param {Structure} structure - The structure to be added
   */
  addStructure (structure) {
    this.structures.add(structure)
  }

  /**
   * Removes a structure from player's structures
   * @param {Structure} structure - The structure to be removed
   */
  removeStructure (structure) {
    this.structures.delete(structure)
  }
}
