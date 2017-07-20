const Heap = require('collections/heap')

export default class TileFinder {
  constructor ({ map, multipliers }) {
    this.map = map
    this.width = map.gridSizeX
    this.height = map.gridSizeY

    this.multipliers = multipliers
  }

  /**
   * Finds tiles in distance radius of given tile. Gives them back as set of
   * capsules, which hold the tile and the distance to the tile
   *
   * @param {*} tile from which
   * @param {*} radius in distance
   */
  findTilesInDistanceOf (tile, radius) {
    var heap = new Heap([],
      (a, b) => a.distance === b.distance,
      (a, b) => b.distance - a.distance)
    var found = new Set()
    var used = new Set()
    used.add(tile)

    heap.push(this.encapsule(tile, 0))

    while (heap.length > 0) {
      var capsule = heap.pop()

      if (capsule.distance === radius) continue

      var tiles = this.tilesNextTo(capsule.tile)
      for (let tile of tiles) {
        if (used.has(tile)) continue

        let distanceTo = capsule.distance + this.multipliers[tile.tileType.name]
        if (distanceTo <= radius) {
          var encapsuled = this.encapsule(tile, distanceTo)
          heap.push(encapsuled)
          found.add(encapsuled)
          used.add(tile)
        }
      }
    }

    return found
  }

  encapsule (tile, distance) {
    return { tile: tile, distance: distance }
  }

  /**
   * Gives tiles next to the given tile
   * @param {*} tile
   */
  tilesNextTo (tile) {
    var x = tile.x
    var y = tile.y
    var tiles = []
    for (let i = -1; i < 2; i += 2) {
      this.addTileToList(x + i, y, tiles)
    }
    for (let i = -1; i < 2; i += 2) {
      this.addTileToList(x, y + i, tiles)
    }

    return tiles
  }

  addTileToList (x, y, list) {
    if (this.isInMap(x, y)) list.push(this.map.getTileWithGridCoordinates(x, y))
  }

  /**
   * Returns true if tile is in map
   * @param {*} x
   * @param {*} y
   */
  isInMap (x, y) {
    return x < this.width && x >= 0 && y >= 0 && y < this.height
  }
}
