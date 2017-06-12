import LabeledButton from './LabeledButton'
import ResetDecorator from './ResetDecorator'

export default class MenuView {
  constructor ({ game, leftBorderCoordinate, leftPadding, buttonWidth, buttonHeight }) {
    this.game = game
    // move to a config file?
    this.leftBorderCoordinate = leftBorderCoordinate
    this.leftPadding = leftPadding
    this.buttonWidth = buttonWidth
    this.buttonHeight = buttonHeight

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.buttonActions = []
    this.selectedTile = null

    this.redraw()
  }

  setMenu(menu){
    this.menu = menu
  }

  redraw() {
    this.menuViewGroup.removeAll(true, true)
    // add the background
    this.menuViewGroup.create(this.leftBorderCoordinate, 0, 'menuBg')
    // add buttons (TODO: make a grid system?)
    for (var i = 0, len = this.buttonActions.length; i < len; i++) {
      this.createButton(i, this.buttonActions[i])
    }
  }

  createButton(i, buttonAction){
    var resetDecorator = new ResetDecorator({action: buttonAction, menu: this.menu})

    return new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonAction.name,
      x: this.leftBorderCoordinate + this.leftPadding,
      y: this.buttonHeight * (i + 1),
      callback: resetDecorator.act,
      context: resetDecorator,
      buttonWidth: this.buttonWidth,
      buttonHeight: this.buttonHeight
    })
  }

  setButtonActions (buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }
}
