export default class Icon {
  constructor({game, group, x, y, asset}){
    this.icon = game.add.sprite(x, y, asset, null, group)
    this.icon.fixedToCamera = true
    this.x = x
    this.y = y
  }
}