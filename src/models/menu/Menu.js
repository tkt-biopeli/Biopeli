import MenuOptionCreator from './MenuOptionCreator'
export default class Menu {
  constructor ({menuOptionCreator}) {
    this.menuOptionCreator = menuOptionCreator

    this.label = 'Klikkaa kartan ruutua'
    this.targetTile = undefined
    this.menuOptions = []
  }

  setLabel (label) {
    this.label = label
  }

  setTargetTile (target) {
    this.targetTile = target

  }
}
