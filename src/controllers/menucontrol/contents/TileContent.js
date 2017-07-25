import Content from './Content'
/**
 * Controller of side menu of the game
 */
export default class SideMenuContent extends Content {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ city, purchaseManager, gameEvents }) {
    super()
    this.city = city
    this.purchaseManager = purchaseManager
    this.gameEvents = gameEvents
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    if (!this.owner.hasStateValue('selectedTile')) {
      return
    }

    var tile = this.owner.stateValue('selectedTile')
    this.tileInformation(tile)

    if (tile.structure != null) {
      var structure = tile.structure
      this.structureInformation(structure)
      this.structureRuining(structure)
    } else {
      this.createBuildingButtons(tile)
    }
  }

  tileInformation (tile) {
    this.sectionName('tile')
    this.text('Ground type: ' + tile.tileType.name)
    this.text('X: ' + tile.x + ', Y: ' + tile.y)
    this.text('Flowers: ' + tile.flowers)
    if (tile.owner != null) {
      this.text('Land owner: ' + tile.owner.ownerName)
    }
  }

  structureInformation (structure) {
    this.section('structure')
    this.text('"' + structure.ownerName + '"')
    this.text('"' + structure.structureName + '"')
    this.text('Structure: ' + structure.structureType.name)
    this.text('Founding year: ' + structure.foundingYear)
    this.text('Size: ' + structure.size)
    this.text('Production input: ' + structure.productionInput)
    this.text('Production per time: ' + structure.calculateProductionEfficiency())
  }

  structureRuining (structure) {
    this.section('ruin')
    this.text('Structure health: ' + structure.health.toString())
    this.animatedBar(200, 50, false, structure.health.percent())
    this.text('Fix cost: ' + structure.healthManager.fixPrice())
    if (structure.health.percent() < 1 && this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      this.button('Repair', structure.healthManager.fix, structure.healthManager, 'emptyButton')
    } else if (structure.health.percent() < 1 && !this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      this.button('Not enough money', () => { }, null, 'unusableButton')
    } else {
      this.button('Perfect condition', () => { }, null, 'unusableButton')
    }
  }

  createBuildingButtons (tile) {
    this.section('actions')

    var allowedStructures = tile.tileType.allowedStructures

    for (let structureType of allowedStructures) {
      this.owner.changeButton(
        structureType.name,
        2,
        this.owner.wrapFunction(this.owner.addState, this.owner, 'structureType', structureType),
        this
      )
    }
  }
}
