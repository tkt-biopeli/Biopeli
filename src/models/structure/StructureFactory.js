import Structure from './Structure'
import ProducerFactory from './ProducerFactory'
import StructureNameGenerator from '../namegeneration/StructureNameGenerator'
import StructureNameParts from '../namegeneration/StructureNameParts'
import utils from '../../utils'
import StaticTypes from '../StaticTypes'

/**
 * Creates a structure for the player
 */
export default class StructureFactory {
  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  constructor ({ gameTimer, eventController, player, map, tileFinder }) {
    this.gameTimer = gameTimer
    this.player = player
    this.map = map
    this.eventController = eventController
    this.namer = new StructureNameGenerator({
      frontAdjectives: StructureNameParts[0],
      names: StructureNameParts[1],
      endAdjectives: StructureNameParts[2],
      hyperboles: StructureNameParts[3],
      random: utils.randomNoBounds,
      randomWithBounds: utils.randomWithBounds
    })
    this.producerFactory = new ProducerFactory({
      tileFinder: tileFinder,
      eventController: eventController
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
      ownerName: this.namer.createOwnerName(),
      structureName: this.namer.createBuildingName(structureType.name),
      size: 0,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTimeEvent.year,
      producer: this.producerFactory.createProducer(structureType, tile),
      cost: structureType.cost
    })
    this.player.addStructure(tile.structure)
    this.buyLand(tile)
    this.createInitialPollution(structureType.pollution, tile)

    this.calculateSize(tile.structure)

    this.eventController.event('buildStructure', tile)
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
   * Creates initial pollution to the map when building a building
   * @param {*} pollution
   * @param {*} map
   */
  createInitialPollution (pollution, tile) {
    let tiles = this.map.getTilesInRadius(3, tile)
    for (var [distance, tilesArray] of tiles) {
      tilesArray.forEach(function (tmpTile) {
        let amount = pollution - distance > 0 ? pollution - distance : 0
        tmpTile.flowers -= amount
        if (tmpTile.flowers < 1) { tmpTile.flowers = 1 }
      }, this)
    }
  }

  buyLand (tile) {
    let tiles = this.map.getTilesInRadius(tile.structure.radiusForTileOwnership, tile)
    for (var [distance, tilesArray] of tiles) {
      tilesArray.forEach(function (tmpTile) {
        if (tile.structure.structureType.refinery) {
          this.buyLandForRefinery(tile, distance, tmpTile)
        } else {
          this.buyLandForProducer(tile, tmpTile)
        }
      }, this)
    }
  }

  buyLandForRefinery (tile, distance, tmpTile) {
    if (distance === 0 || tmpTile.structure === null) {
      if (tmpTile.tileType.name === 'field') {
        tmpTile.owner.size--
      }
      this.setAssetForRefinery(tile, tmpTile)
      if (tmpTile.owner !== null) {
        tmpTile.owner.ownedTiles.pop(tmpTile)
      }
      tmpTile.owner = tile.structure
      tile.structure.ownedTiles.push(tmpTile)
    }
  }

  buyLandForProducer (tile, tmpTile) {
    if (tmpTile.owner === null) {
      this.setAssetForProducer(tile, tmpTile)
      tmpTile.owner = tile.structure
      tile.structure.ownedTiles.push(tmpTile)
    }
  }

  setAssetForRefinery (tile, tmpTile) {
    if (tmpTile.tileType.name !== 'water') {
      tmpTile.tileType = StaticTypes.tileTypes.industrial
    }
  }

  setAssetForProducer (tile, tmpTile) {
    if (tmpTile.tileType.name === 'grass') {
      tmpTile.tileType = StaticTypes.tileTypes.field
    }
  }

  calculateSize (structure) {
    if (structure.structureType.refinery) {
      this.calculateSizeForRefinery(structure)
    } else {
      this.calculateSizeForProducer(structure)
    }
  }

  calculateSizeForProducer (structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      if (tmpTile.tileType.name === 'field') { structure.size++ }
    }, this)
  }

  calculateSizeForRefinery (structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      // structure.structureType.producerHolders.length
    }, this)
  }
}
