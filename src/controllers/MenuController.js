import ButtonComponent from './components/ButtonComponent'
import ResetDecorator from './helpers/ResetDecorator'
import Controller from './Controller'
import config from '../config'

/**
 * Description goes here
 */
export default class MenuController extends Controller {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ game, menuView, city, gameEvents }) {
    super(game, config.menuFontSize)
    this.menuView = menuView
    this.city = city
    this.selectedTile = null
    this.buttonComponents = []
    this.gameEvents = gameEvents
  }

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
   * Description goes here
   *
   * @param {ModelTile} tile
   * @param { ??? } buttonActions
   */
  chooseTile (tile, buttonComponents) {
    this.selectedTile = tile
    this.buttonComponents = buttonComponents

    this.decorateButtonComponents()
    this.redraw()
  }

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
   * Description goes here
   */
  reset () {
    this.chooseTile(null, [])
  }
}
