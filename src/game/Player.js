/**
 * Keeps track of the player's points, money and structures
 */
export default class {
  /**
   * Initially the player has 0 points and structures.
   * @param {number} startMoney - initial amount of money, controlled by state Play
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

  /**
   * The amount of points to be added to the player are calculated
   * @param {number} fulFilledPct - how much of city's demand has the player fulfilled
   */
  countPoints (fulfilledPct) {
    if (fulfilledPct >= 100) {
      this.addPoints(100)
    } else {
      this.addPoints(fulfilledPct)
    }
  }

  /**
   * Checks if the player has enough money for an action (eg. building a structure)
   * @param {number} cost - cost of the action
   */
  enoughCashFor (cost) {
    return this.cash >= cost
  }
}
