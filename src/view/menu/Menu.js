
/**
 * Description goes here
 */
export default class Menu {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ menuView }) {
    this.menuView = menuView
    menuView.setMenu(this)

    this.selectedTile = null
  }

  /**
   * Description goes here
   *
   * @param {ModelTile} tile
   * @param { ??? } buttonActions
   */
  chooseTile (tile, buttonActions) {
    this.selectedTile = tile
    this.menuView.setButtonActions(buttonActions)
  }

  /**
   * Description goes here
   */
  reset () {
    this.selectedTile = null
    this.menuView.setButtonActions([])
  }
}
