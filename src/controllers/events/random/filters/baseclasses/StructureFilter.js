export default class StructureFilter {
  constructor (gameState) {
    this.player = gameState.player
  }

  affected () {
    var structures = this.player.structures.values
    var affectedStructures = structures.filter(struct => this.isValid(struct))
    return affectedStructures
  }
}
