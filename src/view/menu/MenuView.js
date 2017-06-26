import LabeledButton from './LabeledButton'
import Text from './Text'
import ResetDecorator from './ResetDecorator'

/**
 * Controls drawing of game's menu
 */
export default class MenuView {

  /**
   * Description goes here
   * 
   * @param {Phaser.Game} param.game
   * @param {number} param.leftBorderCoordinate the x-coordinate of menu's left border
   * @param {number} param.leftPadding amount of space before line starts
   * @param {number} param.sectionPadding amount of empty space after section
   * @param {number} param.linePadding amount of empty space after line
   * @param {number} param.buttonWidth width of buttons
   * @param {number} param.buttonHeight height of buttons
   */
  constructor ({ game, leftBorderCoordinate, leftPadding, sectionPadding, linePadding, buttonWidth, buttonHeight, fontSize }) {
    this.game = game

    this.leftBorderCoordinate = leftBorderCoordinate
    this.leftPadding = leftPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight
    this.sectionPadding = sectionPadding
    this.linePadding = linePadding
    this.fontSize = fontSize

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.buttonActions = []
    this.activeButtons = []
    this.activeTexts = []
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
    this.activeButtons = []
    this.activeTexts = []

    this.drawHeight = this.sectionPadding
    this.createBackground()

    if(this.menu == null || this.menu.selectedTile == null){
      return
    }
    
    this.iterateMenuFunctions()

    
  }

  /**
   * Creates all menu's sections and adds section padding between them
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
   * Creates background image of menu
   */
  createBackground () {
    this.menuViewGroup.create(this.leftBorderCoordinate, 0, 'menuBg')
  }

  /**
   * Creates the information of tile to the menu
   * 
   * @return {boolean} WasAdded
   */
  createTileInformation () {
    var tile = this.menu.selectedTile

    this.createText('Ground type: '+tile.tileType.name)
    this.addLinePadding()
    this.createText('X: '+tile.x+", Y: "+tile.y)

    return true
  }

  /**
   * Creates the information of the structure in tile, if the tile has one
   * 
   * @return {boolean}
   */
  createStructureInformation () {
    var structure = this.menu.selectedTile.structure

    if (structure == null) {
      return false
    }

    this.createText('Structure: '+structure.structureType.name)
    this.addLinePadding()
    this.createText('Founding year: '+structure.foundingYear)
    this.addLinePadding()
    this.createText('Size: '+structure.size)
    this.addLinePadding()
    this.createText('Production input: '+structure.productionInput)
    this.addLinePadding()
    this.createText('Production per time: '+structure.calculateProductionEfficiency())

    return true
  }

  /**
   * Creates the buttons for actions of the tile
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
   * Creates a button with given button action
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

    this.activeButtons.push(button)

    this.addPadding(this.buttonHeight)
  }

  /**
   * Creates a visible text with given text and font size
   * 
   * @param {*} text 
   * @param {*} fontSize 
   * 
   * @return { ??? }
   */
  createText (text) {
    var tex = new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: text,
      fontSize: this.fontSize,
      x: this.leftBorderCoordinate + this.leftPadding,
      y: this.drawHeight
    })
    this.addPadding(this.fontSize)

    this.activeTexts.push(tex)

    return tex
  }

  /**
   * Sets the button actions to given and refreshes the menuView
   * 
   * @param { [ButtonAction] } buttonActions 
   */
  setButtonActions (buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }

  /**
   * Adds given amount of padding
   * 
   * @param {Number} amount 
   */
  addPadding (amount) {
    this.drawHeight += amount
  }

  /**
   * Adds predefined padding after line
   */
  addLinePadding () {
    this.addPadding(this.linePadding)
  }

  /**
   * Adds predefined padding after section
   */
  addSectionPadding () {
    this.addPadding(this.sectionPadding)
  }
}
