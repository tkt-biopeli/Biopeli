/**
 * A temporary solution...
 */
export default class SpecialStructure {
  constructor ({ zone, multiplier, radius, tile }) {
    this.zone = zone
    this.multiplier = multiplier
    this.radius = radius
//    this.distancefunction = createLine(1, 1, radius, 1 / multiplier)
    this.ownedFarmLand = []
    this.tile = tile
  }

  initialize (structure) {}

  produce (timeEvent) {
    return 0
  }
}
