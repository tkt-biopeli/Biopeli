export default class Icon {
  constructor ({ game, group, x, y, asset }) {
    this.type = 'icon'
    this.icon = group.create(x, y, asset)
    this.x = x
    this.y = y
  }

  update (x, y) {
    this.icon.x = x
    this.icon.y = y
  }

  destroy () {
    this.icon.destroy()
  }
}
