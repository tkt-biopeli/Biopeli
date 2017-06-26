import LabeledButton from './LabeledButton'
import Text from './Text'
import ResetDecorator from './ResetDecorator'
import TextComponent from './TextComponent'

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
  constructor ({ game, menuBorderCoordinate, vertical, leftPadding, sectionPadding, linePadding, buttonWidth, buttonHeight, fontSize, backgroundAsset }) {
    this.game = game

    this.vertical = vertical
    this.menuBorderCoordinate = menuBorderCoordinate
    this.leftPadding = leftPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight
    this.sectionPadding = sectionPadding
    this.linePadding = linePadding
    this.fontSize = fontSize
    this.backgroundAsset = backgroundAsset

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

    this.drawPosition = this.sectionPadding
    this.createBackground()

    if (this.menu == null || this.menu.selectedTile == null) {
      return
    }

    var menuFunctions = [
      this.createTileInformation,
      this.createStructureInformation,
      this.createButtons]

    this.iterateMenuFunctions(menuFunctions)
  }

  /**
   * Creates all menu's sections and adds section padding between them
   */
  iterateMenuFunctions (menuFunctions) {

    for (var i = 0; i < menuFunctions.length; i++) {
      if (menuFunctions[i].call(this)) this.addSectionPadding()
    }
  }

  /**
   * Creates background image of menu
   */
  createBackground () {
    var x = this.menuBorderCoordinate
    var y = 0
    if(!this.vertical){
      y = this.menuBorderCoordinate
      x = 0
    }

    this.menuViewGroup.create(x, y, this.backgroundAsset)
  }

  /**
   * Creates the information of tile to the menu
   *
   * @return {boolean} WasAdded
   */
  createTileInformation () {
    var tile = this.menu.selectedTile

    var components = [
      new TextComponent('Ground type: ' + tile.tileType.name),
      new TextComponent('X: ' + tile.x + ', Y: ' + tile.y)
    ]

    this.createSection(components)

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

    var components = [
      new TextComponent('Structure: ' + structure.structureType.name),
      new TextComponent('Founding year: ' + structure.foundingYear),
      new TextComponent('Size: ' + structure.size),
      new TextComponent('Production input: ' + structure.productionInput),
      new TextComponent('Production per time: ' + structure.calculateProductionEfficiency())
    ]

    this.createSection(components)

    return true
  }

  createSection (components) {
    for (let i = 0 ; i < components.length ; i++) {
      var component = components[i]
      if (component.type = 'text') {
        this.createText(component.text)
      }

      if (i != components.length - 1) {
        this.addLinePadding()
      }
    }
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
    var coords = this.getNextElementCoordinates()

    var resetDecorator = new ResetDecorator({action: buttonAction, menu: this.menu})

    var button = new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonAction.name,
      x: coords.x,
      y: coords.y,
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
    var coords = this.getNextElementCoordinates()

    var tex = new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: text,
      fontSize: this.fontSize,
      x: coords.x,
      y: coords.y
    })
    this.addPadding(this.fontSize)

    this.activeTexts.push(tex)

    return tex
  }

  getNextElementCoordinates(){
    if(this.vertical){
      return {
        x: this.menuBorderCoordinate + this.leftPadding,
        y: this.drawPosition
      }
    }else{
      return {
        x: this.drawPosition,
        y: this.menuBorderCoordinate - this.leftPadding
      }
    }
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
    this.drawPosition += amount
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
