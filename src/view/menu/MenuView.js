import LabeledButton from './LabeledButton'
import Text from './Text'
import ResetDecorator from './ResetDecorator'

/**
 * Description goes here
 */
export default class MenuView {

  /**
   * Description goes here
   * 
   * @param {object} param
   * 
   * @param {Phaser.Game} param.game
   * @param {number} param.leftBorderCoordinate
   * @param {number} param.leftPadding
   * @param {number} param.sectionPadding
   * @param {number} param.linePadding
   * @param {number} param.buttonWidth
   * @param {number} param.buttonHeight
   */
  constructor ({ game, leftBorderCoordinate, leftPadding, sectionPadding, linePadding, buttonWidth, buttonHeight }) {
    this.game = game

    this.leftBorderCoordinate = leftBorderCoordinate
    this.leftPadding = leftPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight
    this.sectionPadding = sectionPadding
    this.linePadding = linePadding

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.buttonActions = []
  }

  /**
   * Description goes here
   * 
   * @param {Menu} menu 
   */
  setMenu (menu) {
    this.menu = menu
  }

  /**
   * Description goes here
   */
  redraw () {
    this.menuViewGroup.removeAll(true, true)

    this.drawHeight = this.sectionPadding
    this.createBackground()

    if(this.menu == null || this.menu.selectedTile == null){
      return
    }
    this.iterateMenuFunctions()
  }

  /**
   * Description goes here
   */
  iterateMenuFunctions () {
    var menuFunctions = [
      this.createTileInformation,
      this.createStructureInformation,
      this.createButtons]

    for(var i = 0 ; i < menuFunctions.length ; i++){
      if(menuFunctions[i].call(this)) this.addSectionPadding()
    }
  }

  /**
   * Description goes here
   */
  createBackground () {
    this.menuViewGroup.create(this.leftBorderCoordinate, 0, 'menuBg')
  }

  /**
   * Description goes here
   * 
   * @return {boolean}
   */
  createTileInformation () {
    var tile = this.menu.selectedTile

    this.createText('Ground type: '+tile.tileType.name, 16)
    this.addLinePadding()
    this.createText('X: '+tile.x+", Y: "+tile.y, 16)

    return true
  }

  /**
   * Description goes here
   * 
   * @return {boolean}
   */
  createStructureInformation () {
    var structure = this.menu.selectedTile.structure

    if (structure == null) {
      return false
    }

    this.createText('Structure: '+structure.structureType.name, 16)

    return true
  }

  /**
   * Description goes here
   * 
   * @return {boolean}
   */
  createButtons () {
    for (var i = 0, len = this.buttonActions.length; i < len; i++) {
      this.createButton(this.buttonActions[i])
      this.addLinePadding()
    }

    return true
  }

  /**
   * Description goes here
   * 
   * @param {ButtonAction} buttonAction 
   */
  createButton (buttonAction) {
    var resetDecorator = new ResetDecorator({action: buttonAction, menu: this.menu})

    var button = new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonAction.name,
      x: this.leftBorderCoordinate + this.leftPadding,
      y: this.drawHeight,
      callback: resetDecorator.act,
      context: resetDecorator,
      buttonWidth: this.buttonWidth,
      buttonHeight: this.buttonHeight
    })

    this.addPadding(this.buttonHeight)
  }

  /**
   * Description goes here
   * 
   * @param {*} text 
   * @param {*} fontSize 
   * 
   * @return { ??? }
   */
  createText (text, fontSize) {
    var tex = new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: text,
      fontSize: fontSize,
      x: this.leftBorderCoordinate + this.leftPadding,
      y: this.drawHeight
    })
    this.addPadding(fontSize)

    return tex
  }

  /**
   * Description goes here
   * 
   * @param { ??? } buttonActions 
   */
  setButtonActions (buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }

  /**
   * Description goes here
   * 
   * @param {Number} amount 
   */
  addPadding (amount) {
    this.drawHeight += amount
  }

  /**
   * Description goes here
   */
  addLinePadding () {
    this.addPadding(this.linePadding)
  }

  /**
   * Description goes here
   */
  addSectionPadding () {
    this.addPadding(this.sectionPadding)
  }
}
