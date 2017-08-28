import Structure from './Structure'
import StructureHealth from './health/StructureHealth'
import HealthManager from './health/HealthManager'
import ProducerFactory from './ProducerFactory'
import StructureNameGenerator from '../namegeneration/StructureNameGenerator'
import utils from '../../utils'
/**
 * Creates a structure for the player
 */
export default class StructureFactory {
  /**
   * @param {GameTimer} gameTimer
   * @param {Player} player
   */
  constructor ({ purchaseManager, gameTimer, eventController, 
      player, map, tileFinder, ruinSettings, maxFlowers, 
      tileTypes, structureTypes, structureNames }) {
    this.gameTimer = gameTimer
    this.player = player
    this.map = map
    this.eventController = eventController
    this.purchaseManager = purchaseManager
    this.tileFinder = tileFinder
    this.tileTypes = tileTypes
    this.structureTypes = structureTypes

    this.namer = new StructureNameGenerator({
      frontAdjectives: structureNames.ownerAdjectives,
      names: structureNames.ownerNames,
      endAdjectives: structureNames.structureAdjectives,
      hyperboles: structureNames.exaggerations,
      random: utils.randomNoBounds,
      randomWithBounds: utils.randomWithBounds
    })
    this.producerFactory = new ProducerFactory({
      tileFinder: tileFinder,
      eventController: eventController,
      maxFlowers: maxFlowers
    })

    this.minRuin = ruinSettings.minRuin
    this.maxRuin = ruinSettings.maxRuin
    this.priceMultiplier = ruinSettings.fixMultiplier
  }

  buildBuildingNamed (tile, structureTypeName) {
    var structureType = this.structureTypes[structureTypeName]
    if (structureType == null) return
    return this.buildBuilding(structureType)
  }

  /**
   * Builds a structure on the tile given as a parameter
   * @param {ModelTile} tile
   * @param {StructureType} structureType
   */
  buildBuilding (tile, structureType) {
    if (!this.purchaseManager.purchase(structureType.cost)) return

    var healths = this.createHealth(structureType)
    var producer = this.producerFactory.createProducer(structureType, tile)

    tile.structure = new Structure({
      tile: tile,
      health: healths.health,
      healthManager: healths.manager,
      ownerName: this.namer.createOwnerName(),
      structureName: this.namer.createBuildingName(structureType),
      size: 0,
      structureType: structureType,
      foundingYear: this.gameTimer.currentTimeEvent.year,
      producer: producer,
      bordercolCode: utils.randomWithBounds(0, 100)
    })

    this.player.addStructure(tile.structure)
    producer.initialize(tile.structure)

    this.createInitialPollution(structureType.pollution, tile)
    this.buyLand(tile.structure)
    this.eventController.event('structureBuilt', tile)
  }

  createHealth (structureType) {
    var health = new StructureHealth({ maxHealth: structureType.health })
    var manager = new HealthManager({
      health: health,
      minRuinTime: this.minRuin,
      maxRuinTime: this.maxRuin,
      purchaseManager: this.purchaseManager,
      buildingCost: structureType.cost,
      priceMultiplier: this.priceMultiplier,
      currentTime: this.gameTimer.currentTimeEvent
    })

    return {health: health, manager: manager}
  }

  /**
   * Creates initial pollution to the map when building a building
   * @param {*} pollution
   * @param {*} map
   */
  createInitialPollution (pollution, tile) {
    let constantPollution = pollution.constant
    let radius = pollution.distance
    let amount = pollution.amount

    let tiles = this.map.getTilesInRadius(radius, tile)
    for (var [distance, tilesArray] of tiles) {
      tilesArray.forEach((tmpTile) => {
        let pollute = constantPollution ? amount : amount - distance
        if (pollute < 0) pollute = 0
        tmpTile.flowers -= pollute
      })
    }
  }

  buyLand (structure) {
    let tiles = this.tileFinder.getTilesForLandOwnership(structure.tile, 
      structure.structureType.radiusForTileOwnership, 
      structure.structureType.moveCosts)
    for (let capsule of tiles) {
      if (this.landCanChangeOwnership(capsule.tile, structure)) {
        this.changeOwnership(structure, capsule.tile)
      }
    }
  }

  changeOwnership (structure, tmpTile) {
    this.removeTileFromPreviousOwner(tmpTile)
    tmpTile.owner = structure
    if (structure.structureType.takesOwnershipOf.includes(tmpTile.tileType.name)) {
      structure.ownedTiles.push(tmpTile)
    }
    this.setNewTileType(tmpTile, structure)
  }

  /**
   * Setup rules for when a change in landownership can happen
   * @param {*} tmpTile 
   * @param {*} newStructure 
   */
  landCanChangeOwnership (tmpTile, newStructure) {
    let newType = newStructure.structureType.type
    if (newType === 'refinery') {
      if (tmpTile.structure === newStructure) return true
      if (tmpTile.structure === null && newStructure.structureType.takesOwnershipOf.includes(
        tmpTile.tileType.name)) return true
    }
    if (newType === 'producer_structure') {
      if (tmpTile.structure === newStructure) return true
      if (tmpTile.structure !== null) return false
      if (tmpTile.owner === null && newStructure.structureType.takesOwnershipOf.includes(
        tmpTile.tileType.name)) return true
    }
    return false
  }

  removeTileFromPreviousOwner (tmpTile) {
    let previousOwner = tmpTile.owner
    if (previousOwner === null) return

    if (previousOwner.farmland === tmpTile.tileType.name) {
      this.decreaseOwnedFarmland(tmpTile)
    }
    let index = tmpTile.owner.ownedTiles.indexOf(tmpTile)
    if (index > -1) {
      tmpTile.owner.ownedTiles.splice(index, 1)
    }
  }

  decreaseOwnedFarmland (tmpTile) {
    let index = tmpTile.owner.producer.producer.ownedFarmLand.indexOf(tmpTile)
    if (index > -1) {
      tmpTile.owner.producer.producer.ownedFarmLand.splice(index, 1)
      tmpTile.owner.size--
    }
  }

  setNewTileType (tmpTile, structure) {
    tmpTile.tileType = this.tileTypes[structure.structureType.farmland]
  }
}
