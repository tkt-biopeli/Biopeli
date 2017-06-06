// The class Player keeps track of players points
export default class {
  // initially player has 0 points
  constructor () {
    this.points = 0
  }
  // adds points given as a parameter to players existing points
  addPoints (points) {
    this.points += points
  }
  // returns players current points
  getPoints (points) {
    return this.points
  }
}
