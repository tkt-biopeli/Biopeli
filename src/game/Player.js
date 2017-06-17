/**
 * Keeps track of the player's points
 */ 
export default class {

  /**
   * Initially the player has 0 points
   */ 
  constructor () {
    this.points = 0
  }

  /**
   * Adds points given as a parameter to players existing points
   * @return {Number} - Current points
   */ 
  addPoints (points) {
    this.points += points
  }

  /**
   * Returns the player's current points
   * @param {Number} points - haloo?
   * @return {Number} - Current points
   */ 
  getPoints (points) {
    return this.points
  }
}
