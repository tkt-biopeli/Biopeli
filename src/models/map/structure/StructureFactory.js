import Structure from './Structure'
import ProducerFactory from './producers/ProducerFactory'
import StructureNameGenerator from '../../namegeneration/StructureNameGenerator'
import StructureNameParts from '../../namegeneration/StructureNameParts'
import utils from '../../../utils'
import StaticTypes from '../../StaticTypes'

/**
 * Creates a structure for the player
 */
export default class StructureFactory {
  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  constructor ({ gameTimer, player, map, tileFinder }) {
    this.gameTimer = gameTimer
    this.player = player
    this.map = map
    this.tileFinder = tileFinder
    this.namer = new StructureNameGenerator({
      frontAdjectives: StructureNameParts[0],
      names: StructureNameParts[1],
      endAdjectives: StructureNameParts[2],
      hyperboles: StructureNameParts[3],
      random: utils.randomNoBounds,
      randomWithBounds: utils.randomWithBounds
    })
  }

  /**
   * Builds a structure on the tile given as a parameter
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */
  buildBuilding (tile, structureType) {
    if (!this.checkMoney(structureType)) return
    tile.structure = new Structure({
      tile: tile,
      owner: this.namer.createOwnerName(),
      name: this.namer.createBuildingName(structureType.name),
      size: 0,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTimeEvent.year,
      producer: this.createProducer(structureType, tile),
      cost: structureType.cost
    })
    this.player.addStructure(tile.structure)
    this.buyLandInRadiusForTileOwnership(tile)
    this.createInitialPollution(structureType.pollution, tile)
    this.calculateSizeAndChangeAssets(tile.structure)
  }

  /**
   * Checks if the player has enough money for a given type of structure
   * decreases players cash if true
   * @param {StructureType} structureType
   */
  checkMoney (structureType) {
    if (!this.player.enoughCashFor(structureType.cost)) {
      return false
    }
    this.player.cash -= structureType.cost
    return true
  }

  /**
   * @param {StructureType} structureType
   * @param {?} tile
   */
  createProducer (structureType, tile) {
    return ProducerFactory.createProducer(this.tileFinder, structureType, tile)
  }

  /**
   * Creates initial pollution to the map when building a building
   * @param {*} pollution
   * @param {*} map
   */
  createInitialPollution (pollution, tile) {
    let tiles = this.map.getTilesInRadius(3, tile)
    for (var [distance, tilesArray] of tiles) {
      tilesArray.forEach(function (tmpTile) {
        tmpTile.flowers -= (pollution - distance)
        if (tmpTile.flowers < 1) { tmpTile.flowers = 1 }
      }, this)
    }
  }

  buyLandInRadiusForTileOwnership (tile) {
    let tiles = this.map.getTilesInRadius(tile.structure.radiusForTileOwnership, tile)
    for (var [, tilesArray] of tiles) {
      tilesArray.forEach(function (tmpTile) {
        if (tmpTile.owner === null) {
          tmpTile.owner = tile.structure.owner
          tile.structure.ownedTiles.push(tmpTile)
        }
      }, this)
    }
  }

  calculateSizeAndChangeAssets (structure) {
    if (structure.structureType.refinery) {
      this.calculateSizeAndChangeAssetsForRefinery(structure)
    } else {
      this.calculateSizeAndChangeAssetsForProducer(structure)
    }
  }

  calculateSizeAndChangeAssetsForProducer (structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      if (tmpTile.tileType.name === 'grass') {
        tmpTile.tileType = StaticTypes.tileTypes.field
        structure.size++
      }
    }, this)
  }

  calculateSizeAndChangeAssetsForRefinery(structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      if (tmpTile.tileType.name === 'grass' || tmpTile.tileType.name === 'forest') {
        tmpTile.tileType = StaticTypes.tileTypes.industrial
        // how shall we calculate the size for this??
      }
    }, this)
  }
}
