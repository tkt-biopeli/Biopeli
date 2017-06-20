import AnimatedBar from './AnimatedBar'
import config from '../../config'

export default class TopBarView {
  constructor ({ game, topBar, topBarHeight, topBarWidth }) {
    this.game = game
    this.topBar = topBar
    this.topBarHeight = topBarHeight
    this.topBarWidth = topBarWidth
    this.items = new Map()
    this.initializeItems()
    this.calculateItemLocations()
    this.draw()
  }

  initializeItems () {
    let itemsConfig = config.topBarItems
    let model = this.topBar

    for (var i = 0; i < itemsConfig.length; i++) {
      let name = itemsConfig[i].name
      let item = {
        icon: { asset: name, x: 0, y: 0 },
        value: { source: function () { return model['getValueOf'](name) }, x: 0, y: 0 },
        type: itemsConfig[i].type,
        graphic: undefined
      }

      this.items.set(name, item)
    }
  }

  // WORK IN PROGRESS
  calculateItemLocations () {
    let count = 0
    let columnWidth = Math.floor(this.topBarWidth / this.items.size)
    let columnPaddingHori = Math.floor(columnWidth * 0.05)
    let iconWidth = 64
    let valuePaddingVert = 16
    let valuePaddingHori = 8

    for (let [key, item] of this.items) {
      item.icon.x = (count + 1) * columnPaddingHori + count * columnWidth
      item.icon.y = 0
      item.value.x = item.icon.x + iconWidth + valuePaddingHori
      item.value.y = valuePaddingVert
      count++
    }
  }

  draw () {
    this.createBackground()
    for (let [key, item] of this.items) {
      this.createIconGraphic(item)
      this.createItemValueGraphics(item)
    }
  }

  createItemValueGraphics (item) {
    if (item.type === 'text') {
      this.createTextGraphic(item)
    }
    if (item.type === 'bar') {
      this.createBarGraphic(item)
    }
  }

  createIconGraphic (item) {
    let icon = this.game.add.sprite(item.icon.x, item.icon.y, item.icon.asset)
    icon.fixedToCamera = true
  }

  createTextGraphic (item) {
    let text = this.game.add.text(item.value.x, item.value.y, item.value.source())
    text.fixedToCamera = true
    item.graphic = text
  }

  // WORK IN PROGRESS
  createBarGraphic (item) {
    let bar = new AnimatedBar({
      game: this.game,
      x: item.value.x,
      y: item.value.y,
      width: 128,
      height: 32
    })
    item.graphic = bar
  }

  createBackground () {
    let bg = this.game.make.graphics()
    bg.beginFill(0x000000, 0.25)
    bg.drawRoundedRect(0, 0, this.topBarWidth, this.topBarHeight, 1)
    bg.endFill()
    bg.fixedToCamera = true
    this.game.add.existing(bg)
  }

  update () {
    for (let [key, item] of this.items) {
      if (item.type === 'text') {
        item.graphic.setText(item.value.source())
      }
      if (item.type === 'bar') {
        item.graphic.setPercentage(item.value.source())
      }
    }
  }
}
