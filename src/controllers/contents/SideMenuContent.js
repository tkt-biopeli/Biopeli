import MenuContent from './MenuContent'
/**
 * Controller of side menu of the game
 */
export default class SideMenuContent extends MenuContent {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ city, gameEvents }) {
    super()
    this.city = city
    this.gameEvents = gameEvents
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    this.text('City: ' + this.city.name)
    this.text('Population: ' + this.city.population)
    this.text('Yearly demand: ' + this.city.turnipDemand.yearDemand)
    this.text('Demand supplied: ' + this.format(this.city.turnipDemand.collectedSupply))
    this.text('Current turnip price: ' + this.city.turnipDemand.currentPrice())
    this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents)

    if (!this.owner.hasStateValue('selectedTile')) {
      return
    }

    var tile = this.owner.stateValue('selectedTile')

    this.section()
    this.text('Ground type: ' + tile.tileType.name)
    this.text('X: ' + tile.x + ', Y: ' + tile.y)
    this.text('Flowers: ' + tile.tileType.flowers)

    if (tile.structure != null) {
      var structure = tile.structure

      this.section()
      this.text('"' + structure.owner + '"')
      this.text('"' + structure.name + '"')
      this.text('Structure: ' + structure.structureType.name)
      this.text('Founding year: ' + structure.foundingYear)
      this.text('Size: ' + structure.size)
      this.text('Production input: ' + structure.productionInput)
      this.text('Production per time: ' + structure.calculateProductionEfficiency())
    }

    this.tileActions(tile)
  }

  tileActions (tile) {
    if (tile == null) {
      return
    }

    if (tile.structure == null) {
      this.section()
      this.buttonActionsForTile(tile)
    }
  }

  buttonActionsForTile (tile) {
    var allowedStructures = tile.tileType.allowedStructures

    for (let structureType of allowedStructures) {
      this.owner.changeButton(
        structureType.name,
        1,
        this.owner.wrapFunction(this.owner.addState, this.owner, 'structureType', structureType),
        this
      )
    }
  }
}
