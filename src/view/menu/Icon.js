export default class Icon {
  constructor({game, x, y, asset}){
    this.icon = game.add.sprite(x, y, asset)
    this.icon.fixedToCamera = true
  }
}