import ButtonComponent from '../components/ButtonComponent'
import ResetDecorator from '../helpers/ResetDecorator'
import MenuContent from './MenuContent'
import config from '../../config'

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
  constructor ({ player, structureFactory, city, gameEvents }) {
    super()
    this.structureFactory = structureFactory
    this.player = player
    this.city = city
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

    this.owner.changeButton('test', 1)

    if (!this.owner.hasStateValue('selectedTile')) {
      return
    }

    var tile = this.owner.stateValue('selectedTile')

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
    var buttonComponents = this.tileActions(tile)
    for (let button of buttonComponents) {
      this.add(button)
    }
  }

  tileActions (tile) {
    var buttonActions = this.getActions(tile)
    this.decorateButtonComponents(buttonActions)
    return buttonActions
  }

  getActions (tile) {
    if (tile == null) {
      return []
    }

    if (tile.structure == null) {
      return this.buttonActionsForTile(tile)
    }

    return []
  }

  buttonActionsForTile (tile) {
    var allowedStructures = tile.tileType.allowedStructures

    return allowedStructures.map(
      structureType => new ButtonComponent({
        name: structureType.name + ' : ' + structureType.cost + '€',
        functionToCall: () => { this.structureFactory.buildBuilding(tile, structureType) },
        context: this.structureFactory,
        height: config.menuButtonHeight,
        width: config.menuButtonWidth,
        fontSize: config.menuFontSize,
        asset: 'emptyButton'
      }))
  }

  /**
   * Creates reset decorator for buttons
   */
  decorateButtonComponents (buttonComponents) {
    for (let i = 0; i < buttonComponents.length; i++) {
      var buttonComponent = buttonComponents[i]
      if(buttonComponent.type != 'button'){
        continue
      }
      var resetDecorator = new ResetDecorator({
        action: buttonComponent,
        controller: this.owner
      })
      buttonComponents[i] = new ButtonComponent({
        name: buttonComponent.name,
        functionToCall: resetDecorator.act,
        context: resetDecorator,
        width: buttonComponent.width,
        height: buttonComponent.height,
        fontSize: buttonComponent.fontSize,
        asset: buttonComponent.asset
      })
    }
  }
}
