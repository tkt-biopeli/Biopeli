import LabeledButton from './LabeledButton'
import Text from './Text'
import ResetDecorator from './ResetDecorator'

export default class MenuView {
  constructor ({ game, leftBorderCoordinate, leftPadding, sectionPadding, linePadding, buttonWidth, buttonHeight }) {
    this.game = game
    // move to a config file?
    this.leftBorderCoordinate = leftBorderCoordinate
    this.leftPadding = leftPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight
    this.sectionPadding = sectionPadding
    this.linePadding = linePadding

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.buttonActions = []
    this.selectedTile = null

    this.redraw()
  }

  setMenu (menu) {
    this.menu = menu
  }

  redraw () {
    this.menuViewGroup.removeAll(true, true)

    this.drawHeight = this.sectionPadding
    this.createBackground()

    if(this.menu == undefined ||this.menu.selectedTile == null){
      return
    }

    var menuFunctions = [this.createTileInformation, this.createButtons]

    console.log(menuFunctions.length)

    for(var i = 0 ; i < menuFunctions.length ; i++){
      menuFunctions[i].call(this)
      this.addSectionPadding()
    }
  }

  addPadding (amount) {
    this.drawHeight += amount
  }

  addLinePadding () {
    this.addPadding(this.linePadding)
  }

  addSectionPadding () {
    this.addPadding(this.sectionPadding)
  }

  createBackground () {
    this.menuViewGroup.create(this.leftBorderCoordinate, 0, 'menuBg')
  }

  createTileInformation () {
    var tile = this.menu.selectedTile

    this.createText('Ground type: '+tile.tileType.name, 16)
    this.addPadding(16)
    this.addLinePadding()
    this.createText('X: '+tile.x+", Y: "+tile.y, 16)
    this.addPadding(16)
  }

  createButtons () {
    for (var i = 0, len = this.buttonActions.length; i < len; i++) {
      this.createButton(this.buttonActions[i])
      this.drawHeight += this.buttonHeight
      this.addLinePadding()
    }
  }

  createButton (buttonAction) {
    var resetDecorator = new ResetDecorator({action: buttonAction, menu: this.menu})

    return new LabeledButton({
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
  }

  createText (text, fontSize) {
    return new Text({
      game: this.game,
      viewGroup: this.menuViewGroup,
      text: text,
      fontSize: fontSize,
      x: this.leftBorderCoordinate + this.leftPadding,
      y: this.drawHeight
    })
  }

  setButtonActions (buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }
}
