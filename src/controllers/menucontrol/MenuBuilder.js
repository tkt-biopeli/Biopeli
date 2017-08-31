import MenuView from '../../view/menu/MenuView'
import StackingLayout from '../../view/menu/layouts/StackingLayout'
import Style from '../../view/menu/Style'
import Controller from './Controller'

/**
 * Generic menu with title, description and buttons
 */
export default class MenuBuilder {
  constructor (game, backgroundAsset, startHeight, config, linePadding) {
    if(linePadding == null) linePadding = 16
    game.stage.backgroundColor = 0x6B8E23

    var menu = new MenuView({
      game: game,
      layout: new StackingLayout({
        menuRect: {
          x: game.camera.width / 4,
          y: 0,
          width: game.camera.width / 2,
          height: game.camera.height
        },
        linePadding: linePadding,
        sectionPadding: startHeight,
        vertical: true
      }),
      background: backgroundAsset,
      backgroundInTheMiddle: true
    })

    this.c = new Controller(game, new Style({
      smallFont: 16,
      mediumFont: 32,
      largeFont: 64,
      buttonHeight: config.sideMenuSettings.buttonHeight,
      buttonWidth: config.sideMenuSettings.buttonWidth
    }), menu)

    this.c.initialize()
  }

  /**
   * Menu title
   * @param {string} text - Title text
   */
  createTitle (text) {
    this.c.text(text, 'large')
  }

  /**
   * Creates final score
   * @param {string} text - score text
   */
  createScore (fields) {
    for (var i = 0; i < fields.length; i++) {
      this.c.text(fields[i], 'medium')
    }
  }

  /**
   * Menu description
   * @param {string} text - Description that is displayed in the menu
   */
  createDescription (text) {
    let rows = text.split('\n')
    for (var i = 0; i < rows.length; i++) {
      this.c.text(rows[i], 'small')
    }
  }

  /**
   * Adds a new button to the menu
   * @param {string} text - Button text
   * @param {function} call - Function that is called when pressed
   */
  createButton (text, call, asset) {
    this.c.button(text, call, this, asset)
  }

  createInputField (parameters) {
    this.c.inputField(parameters)
  }

  finishMenu () {
    this.c.finish()
  }
}
