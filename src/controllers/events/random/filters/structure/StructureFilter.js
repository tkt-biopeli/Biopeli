export default class StructureFilter {
  constructor (gameState) {
    this.player = gameState.player
  }

  affected () {
    var affected = []
    for (let structure of this.player.structures.values()) {
      if (this.isValid(structure)) affected.push(structure)
    }

    return affected
  }
}
