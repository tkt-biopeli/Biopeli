import Phaser from 'phaser'
import config from '../config'

import MenuView from '../view/menu/MenuView'
import StackingLayout from '../view/menu/layouts/StackingLayout'
import TextComponent from '../controllers/components/TextComponent'
import ButtonComponent from '../controllers/components/ButtonComponent'

/**
 * Generic menu with title, description and buttons
 */
export default class extends Phaser.State {
  initializeMenu(backgroundAsset, startHeight){
    this.game.stage.backgroundColor = 0x6B8E23

    this.menu = new MenuView({
      game: this,
      layout: new StackingLayout({
        menuRect: {
          x: this.camera.width / 4,
          y: 0,
          width: this.camera.width / 2,
          height: this.camera.height
        },
        linePadding: 16,
        sectionPadding: startHeight,
        vertical: true
      }),
      background: backgroundAsset,
      backgroundInTheMiddle: true
    })

    this.components = []
  }

  /**
   * Menu title
   * @param {string} text - Title text
   */
  createTitle (text) {
    this.components.push(new TextComponent(text, 64))
  }

/**
 * Creates final score
 * @param {string} text - score text
 */
  createScore (text) {
    this.components.push(new TextComponent(text, 32))
  }

  /**
   * Menu description
   * @param {string} text - Description that is displayed in the menu
   */
  createDescription (text) {
    this.components.push(new TextComponent(text, 16))
  }

  /**
   * Adds a new button to the menu
   * @param {string} text - Button text
   * @param {function} call - Function that is called when pressed
   */
  createButton (text, call) {
    this.components.push(new ButtonComponent({
      name: text,
      functionToCall: call,
      context: this,
      width: config.menuButtonWidth,
      height: config.menuButtonHeight,
      fontSize: 32
    }))
  }

  finishMenu () {
    this.menu.draw([this.components])
  }
}
