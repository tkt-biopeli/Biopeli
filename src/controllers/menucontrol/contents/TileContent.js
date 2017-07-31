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
  constructor({ demandFunction, purchaseManager, topBarController }) {
    super()
    this.demandFunction = demandFunction
    this.purchaseManager = purchaseManager
    this.topBarController = topBarController

    this.emptyFunction = () => { }
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    if (!this.owner.hasStateValue('selectedTile')) {
      return null
    }

    var tile = this.owner.stateValue('selectedTile')
    this.tileInformation(tile)

    if (tile.structure !== null) {
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
    this.text('Moisture: ' + this.format(tile.moisture) + '%')
    this.text('Fertility: ' + this.format(tile.fertility) + '%')
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
    if (structure.producer.refinery !== null) {
      structure.size = structure.producer.producer.producerHolders.length
    }
    this.text('Size: ' + structure.size)
    var turnipProduction = structure.turnipProduction()
    this.text('Production per time: ' + this.format(turnipProduction, 2))
    this.text('Money per time: ' + this.format(this.demandFunction.pay(turnipProduction), 2))
  }

  structureRuining (structure) {
    this.section('ruin')
    this.text('Structure health: ' + structure.health.toString())
    this.animatedBar(200, 50, false, structure.health.percent())
    this.text('Fix cost: ' + structure.healthManager.fixPrice())
    if (structure.health.percent() < 1 && this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      var fix = (structure => () => {
        structure.healthManager.fix()
        this.owner.redraw()
        this.topBarController.redraw()
      })(structure)
      this.button('Repair', fix, this, 'emptyButton')
    } else if (structure.health.percent() < 1 && !this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      this.button('Not enough money', this.emptyFunction, null, 'unusableButton')
    } else {
      this.button('Perfect condition', this.emptyFunction, null, 'unusableButton')
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
