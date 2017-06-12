export default class Menu {
  constructor ({menuView}) {
    this.menuView = menuView
    menuView.setMenu(this)

    this.selectedTile = null
  }

  chooseTile (tile, buttonActions) {
    this.selectedTile = tile
    this.menuView.setButtonActions(buttonActions)
  }

  reset () {
    this.selectedTile = null
    this.menuView.setButtonActions([])
  }
}
