import Structure from '../models/map/Structure'
import MenuView from './menu/MenuView'
export default class MapListener {
  constructor ({game, map, menuOptionCreator, menuView}) {
    this.map = map
    this.game = game
    this.menuOptionCreator = menuOptionCreator
    this.menuView = menuView
  }

  update (events) {
    var event = events.pointer
    if (event !== undefined && event.x <= (this.game.camera.width - 256)) {
      var x = event.x + this.game.camera.x
      var y = event.y + this.game.camera.y

      var tile = this.map.getTileWithPixelCoordinates(x, y)

      if (typeof tile !== 'undefined') {
        this.menuView.setButtonActions( this.menuOptionCreator.getActions(tile) )
      }
    }
  }
}