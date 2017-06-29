import TextComponent from './components/TextComponent'
import ButtonComponent from './components/ButtonComponent'
import ResetDecorator from './ResetDecorator'
import config from '../config'
/**
 * Description goes here
 */
export default class MenuController {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({menuView}) {
    this.menuView = menuView

    this.selectedTile = null
    this.buttonComponents = []
  }

  redraw(){
    this.menuView.draw(this.createSections())
  }

  createSections () {
    if(this.selectedTile == null){
      return []
    }

    var tile = this.selectedTile

    var sections = []
    sections.push([
      new TextComponent('Ground type: ' + tile.tileType.name, config.menuFontSize),
      new TextComponent('X: ' + tile.x + ', Y: ' + tile.y, config.menuFontSize)
    ])

    if(tile.structure != null){
      var structure = tile.structure
      sections.push([
        new TextComponent('Structure: ' + structure.structureType.name, config.menuFontSize),
        new TextComponent('Founding year: ' + structure.foundingYear, config.menuFontSize),
        new TextComponent('Size: ' + structure.size, config.menuFontSize),
        new TextComponent('Production input: ' + structure.productionInput, config.menuFontSize),
        new TextComponent('Production per time: ' + structure.calculateProductionEfficiency(), config.menuFontSize)
      ])
    }

    sections.push(this.buttonComponents)

    return sections
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

  decorateButtonComponents(){
    for(let i = 0 ; i < this.buttonComponents.length ; i++){
      var buttonComponent = this.buttonComponents[i]
      var resetDecorator = new ResetDecorator({action: buttonComponent, menu: this})
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
