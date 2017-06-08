// +label
// +menuOptions[]
// +targetTile
// update
// getComponent
// getAllComponents
// addComponent
// sendMessage
// broadcastMessage

import * as menuOptionManager from './MenuOptionManager'

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
