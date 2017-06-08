import LabeledButton from './LabeledButton'

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
      new LabeledButton({
        game: this.game,
        viewGroup: this.menuViewGroup,
        label: this.buttonActions[i].name,
        x: this.leftBorder + 35,
        y: this.buttonHeight * (i + 1),
        callback: this.buttonActions[i].function()
      })
    }
//    new LabeledButton({
//        game: this.game,
//        viewGroup: this.menuViewGroup,
//        label: "plapla",
//        x: this.leftBorder + 35,
//        y: this.buttonHeight * (i + 1),
//        callback: null
//      })
  }

  setButtonActions(buttonActions) {
    this.buttonActions = buttonActions
    this.redraw()
  }
}