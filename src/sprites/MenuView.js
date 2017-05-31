export default class MenuView {
  constructor( { game, menu, menuViewWidth }) {
    this.game = game
    this.menu = menu
    this.menuViewWidth = menuViewWidth
    this.leftBorder = game.camera.width - menuViewWidth

    this.menuViewGroup = game.add.group()
    this.menuViewGroup.fixedToCamera = true
  }

  redraw() {
    this.menuViewGroup.removeAll(true, true)
    
    createBackground(
      this.game, this.menuViewGroup, this.leftBorder, 0, this.menuViewWidth, game.world.height, 0x993333)
    
    /*
     for (var i = 0, len = this.menuOptions.length; i < len; i++) {
     this.menuViewGroup.add( );
     }
    */
  }
}

function createBackground (game, viewGroup, leftX, leftY, width, height, color) {
  var background = game.make.graphics()

  background.beginFill(color, 1)
  background.drawRect(leftX, leftY, width, height)
  background.endFill()

  viewGroup.add(background)
}
