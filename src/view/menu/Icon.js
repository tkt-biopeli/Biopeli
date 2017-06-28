export default class Icon {
  constructor({game, group, x, y, asset}){
    this.icon = group.create(x, y, asset)
    this.x = x
    this.y = y
  }
}