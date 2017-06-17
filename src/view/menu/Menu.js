
/**
 * Description goes here
 */
export default class Menu {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor ({menuView}) {
    this.menuView = menuView
    menuView.setMenu(this)

    this.selectedTile = null
  }

  /**
   * Description goes here
   * @param {*} tile 
   * @param {*} buttonActions 
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
