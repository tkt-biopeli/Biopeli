export default class LabeledImage {
  constructor ({ game, viewGroup, label, fontSize, asset, 
      x, y, width, height}) {
    this.type = 'labeledImage'

    this.style = {
      font: fontSize + 'px Arial',
      fill: '#000000',
      align: 'center' 
    }
    this.group = viewGroup

    this.image = this.group.create(x, y, asset)

    this.text = game.add.text(
      Math.floor(x + width / 2),
      Math.floor(y + height / 2), label, this.style, viewGroup)
    this.text.anchor.set(0.5, 0.5)
    this.text.wordWrap = true
    this.text.wordWrapWidth = width

    this.x = x
    this.y = y
    this.asset = asset
    this.width = width
    this.height = height
  }

  update (label, fontSize, x, y) {
    this.image.x = x
    this.image.y = y

    this.style.font = fontSize + 'px Arial'
    this.text.text = label
    this.text.x = Math.floor(x + this.width / 2)
    this.text.y = Math.floor(y + this.height / 2)
  }

  destroy () {
    this.group.removeChild(this.image)
    this.text.destroy()
    this.image.destroy()
  }
}
