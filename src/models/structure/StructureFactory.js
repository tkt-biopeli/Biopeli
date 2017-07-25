import Structure from './Structure'
import StructureHealth from './health/StructureHealth'
import HealthManager from './health/HealthManager'

import ProducerFactory from './ProducerFactory'
import StructureNameGenerator from '../namegeneration/StructureNameGenerator'
import StructureNameParts from '../namegeneration/StructureNameParts'
import utils from '../../utils'
import config from '../../config'
import StaticTypes from '../StaticTypes'

/**
 * Creates a structure for the player
 */
export default class StructureFactory {
  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  constructor ({ purchaseManager, gameTimer, eventController, player, map, tileFinder }) {
    this.gameTimer = gameTimer
    this.player = player
    this.map = map
    this.eventController = eventController
    this.purchaseManager = purchaseManager

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
    if (!this.purchaseManager.purchase(structureType.cost)) return

    var health = new StructureHealth({ maxHealth: structureType.health })
    var manager = new HealthManager({
      health: health,
      minRuinTime: config.minRuin,
      maxRuinTime: config.maxRuin,
      purchaseManager: this.purchaseManager,
      buildingCost: structureType.cost,
      priceMultiplier: config.fixMultiplier
    })
    manager.calculateNextRuin(this.gameTimer.currentTimeEvent)

    tile.structure = new Structure({
      tile: tile,
      health: health,
      healthManager: manager,
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
        this.calculateFarmLand(tmpTile.owner)
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
    this.calculateFarmLand(structure)
  }

  calculateSizeForRefinery (structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      // structure.producer.producer.producerHolders.length
    }, this)
  }

  calculateFarmLand (structure) {
    structure.ownedTiles.forEach(function (tmpTile) {
      structure.producer.producer.ownedFarmLand.push(tmpTile)
    }, this)
  }
}
