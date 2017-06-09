import LabeledButton from './LabeledButton'
import ResetDecorator from './ResetDecorator'

export default class MenuView {
  constructor ({ game, menuViewWidth, buttonHeight }) {
    this.game = game
    this.leftBorder = game.camera.width - menuViewWidth
    this.buttonHeight = buttonHeight
    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    this.buttonActions = []
    this.redraw()
  }

  redraw() {
    this.menuViewGroup.removeAll(true, true)
    this.menuViewGroup.create(this.leftBorder, 0, 'menuBg')
    // make a grid system
    for (var i = 0, len = this.buttonActions.length; i < len; i++) {
      this.createButton(i, this.buttonActions[i])
    }
  }

  createButton(i, buttonAction){
    var resetDecorator = new ResetDecorator({action: buttonAction, menuView: this})

    return new LabeledButton({
      game: this.game,
      viewGroup: this.menuViewGroup,
      label: buttonAction.name,
      x: this.leftBorder + 35,
      y: this.buttonHeight * (i + 1),
      callback: resetDecorator.act,
      context: resetDecorator
    })
  }

  setButtonActions(buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }

  reset(){
    this.setButtonActions([])
  }
}
