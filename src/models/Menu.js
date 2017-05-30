export default class Menu {
  constructor({ game, menuViewWidth }) {
    this.menuViewGroup = game.add.group()
    this.title = 'Choose a tile first'
    this.menuActions = []
    this.game = game
    this.menuViewWidth = menuViewWidth

    createBackground(
      game, this.menuViewGroup, game.world.width - menuViewWidth, 0, menuViewWidth, game.world.height, 0x993333)
    this.menuViewGroup.fixedToCamera = true
  }

  update () {
    //
  }
}

function createBackground (game, viewGroup, leftX, leftY, width, height, color) {
  var background = game.make.graphics()

  background.beginFill(color, 1)
  background.drawRect(leftX, leftY, width, height)
  background.endFill()

  viewGroup.add(background)
}
