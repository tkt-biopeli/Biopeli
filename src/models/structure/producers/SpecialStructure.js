/**
 * A temporary solution...
 */
export default class SpecialStructure {
  constructor ({ zone, tile, changeValues }) {
    this.zone = zone
    this.tile = tile
    this.changeValues = changeValues
    this.influence()
  }

  influence () {
    for (let capsule of this.zone) {
      let tile = capsule.tile

      tile.fertility += this.changeValues.fertility
      tile.moisture += this.changeValues.moisture
      tile.flowers += this.changeValues.flowers
    }
  }

  initialize (structure) { }

  produce (timeEvent) { }
  producedAmount () { return 0 }
}
