/**
 * Keeps track of the player's points
 */
export default class {
  /**
   * Initially the player has 0 points
   */
  constructor ({startMoney}) {
    this.points = 0
    this.cash = startMoney
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

  /**
   * Adds a structure for the player
   *
   * @param {Structure} structure - The structure to be added
   */
  addStructure (structure) {
    this.structures.add(structure)
  }

  /**
   * Adds a structure for the player
   *
   * @param {Structure} structure - The structure to be removed
   */
  removeStructure (structure) {
    this.structures.delete(structure)
  }
  /**
   * Players points are increased
   */
  countPoints (fulfilledPct) {
    if (fulfilledPct >= 100) {
      this.addPoints(100)
    } else {
      this.addPoints(fulfilledPct)
    }
  }

  enoughCashFor (cost) {
    return this.cash >= cost
  }
}
