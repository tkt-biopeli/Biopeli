export default class MenuView {
  constructor( { game, menu, menuViewWidth }) {
    this.game = game
    this.menu = menu
    this.leftBorder = game.camera.width - menuViewWidth

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
    
  }

  redraw() {
    this.menuViewGroup.removeAll(true, true)
    this.menuViewGroup.create(this.leftBorder, 0, 'menuBg')
    
    // make a grid system
    /*
     for (var i = 0, len = this.menuOptions.length; i < len; i++) {*/
    var button = this.game.make.button(this.leftBorder + 35, 75, 'button', actionOnClick, this, 2, 1, 0)
    this.menuViewGroup.add(button)
     /*}
    */
  }
}

function actionOnClick () {
  // not functioning
  console.log('button pressed')
}
