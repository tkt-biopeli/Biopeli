import TextComponent from './TextComponent'
import ButtonComponent from './ButtonComponent'
import ResetDecorator from './ResetDecorator'
/**
 * Description goes here
 */
export default class Menu {
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
      new TextComponent('Ground type: ' + tile.tileType.name),
      new TextComponent('X: ' + tile.x + ', Y: ' + tile.y)
    ])

    if(tile.structure != null){
      var structure = tile.structure
      sections.push([
        new TextComponent('Structure: ' + structure.structureType.name),
        new TextComponent('Founding year: ' + structure.foundingYear),
        new TextComponent('Size: ' + structure.size),
        new TextComponent('Production input: ' + structure.productionInput),
        new TextComponent('Production per time: ' + structure.calculateProductionEfficiency())
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
        context: resetDecorator
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
