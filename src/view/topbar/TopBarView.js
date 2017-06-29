import AnimatedBar from '../menu/menuitems/AnimatedBar'
import TopBarItem from './TopBarItem'
import config from '../../config'

/**
 * TopBarView draws an info bar on top of the game screen
 *
 * @export
 * @class TopBarView
 */
export default class TopBarView {
  /**
   * Creates an instance of TopBarView.
   * @param {object} param
   * @param {Phaser.Game} param.game
   * @param {TopBar} param.topBar - model class
   * @param {number} param.topBarWidth - width on screen
   * @memberof TopBarView
   */
  constructor ({ game, topBar, topBarWidth }) {
    this.game = game
    this.topBar = topBar
    this.topBarWidth = topBarWidth
    this.topBarHeight = config.topBarSettings.height
    this.items = new Map()
    this.initializeItems()
    this.draw()
  }

  initializeItems () {
    let itemsConfig = config.topBarItems
    let settings = config.topBarSettings
    let totalPadding = (itemsConfig.length + 1) * settings.paddingWidth
    let totalAvailableWidth = this.topBarWidth - totalPadding
    let usedWidth = settings.paddingWidth // start with one padding

    for (var i = 0; i < itemsConfig.length; i++) {
      let itemCfg = itemsConfig[i]
      let item = new TopBarItem({
        itemCfg: itemCfg,
        settings: settings,
        leftPadding: usedWidth,
        totalWidth: totalAvailableWidth,
        callback: () => { return this.topBar['getValueOf'](itemCfg.name) }
      })

      this.items.set(itemCfg.name, item)
      usedWidth += item.width + settings.paddingWidth
    }
  }

  draw () {
    this.createBackground()
    for (let item of this.items.values()) {
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

  createBarGraphic (item) {
    let bar = new AnimatedBar({
      game: this.game,
      horizontal: true,
      x: item.value.x,
      y: item.value.y,
      width: item.value.width,
      height: this.topBarHeight - config.topBarSettings.verticalPadding * 2
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

  /**
   * Sets item values on screen based on values in TopBar class
   *
   * @memberof TopBarView
   */
  update () {
    for (let item of this.items.values()) {
      if (item.type === 'text') {
        item.graphic.text = item.value.source()
      }
      if (item.type === 'bar') {
        item.graphic.setPercentage(item.value.source())
      }
    }
  }
}
