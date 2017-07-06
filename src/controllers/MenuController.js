import ButtonComponent from './components/ButtonComponent'
import ResetDecorator from './helpers/ResetDecorator'
import Controller from './Controller'

/**
 * Controller of side menu of the game
 */
export default class MenuController extends Controller {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ game, style, menuView, city, gameEvents }) {
    super(game, style)
    this.menuView = menuView
    this.city = city
    this.selectedTile = null
    this.buttonComponents = []
    this.gameEvents = gameEvents
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    this.text('City: ' + this.city.name)
    this.text('Population: ' + this.city.population)
    this.text('Weekly demand: ' + this.city.weeklyTurnipDemand)
    this.text('Yearly demand: ' + this.city.yearlyTurnipDemand)
    this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents)

    if (this.selectedTile == null) {
      return
    }

    var tile = this.selectedTile

    this.section()
    this.text('Ground type: ' + tile.tileType.name)
    this.text('X: ' + tile.x + ', Y: ' + tile.y)

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

    this.section()

    for (let button of this.buttonComponents) {
      this.add(button)
    }
  }

  /**
   * Sets the chose tile of the menu
   * @param {*} tile
   * @param {*} buttonComponents
   */
  chooseTile (tile, buttonComponents) {
    this.selectedTile = tile
    this.buttonComponents = buttonComponents

    this.decorateButtonComponents()
    this.redraw()
  }

  /**
   * Creates reset decorator for buttons
   */
  decorateButtonComponents () {
    for (let i = 0; i < this.buttonComponents.length; i++) {
      var buttonComponent = this.buttonComponents[i]
      var resetDecorator = new ResetDecorator({
        action: buttonComponent,
        menu: this
      })
      this.buttonComponents[i] = new ButtonComponent({
        name: buttonComponent.name,
        functionToCall: resetDecorator.act,
        context: resetDecorator,
        width: buttonComponent.width,
        height: buttonComponent.height,
        fontSize: buttonComponent.fontSize
      })
    }
  }

  /**
   * Unchooses the chosen tile
   */
  reset () {
    this.chooseTile(null, [])
  }
}
