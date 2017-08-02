import StaticLayout from '../layouts/StaticLayout'

export default class RadioButtons {
  constructor ({game, sizeRect, activeAsset, inactiveAsset, active, buttonInfos, vertical}) {
    this.game = game
    this.activeAsset = activeAsset
    this.inactiveAsset = inactiveAsset
    
    this.staticLayout = new StaticLayout({
      menuRect: sizeRect,
      linePadding: 0,
      vertical: vertical
    })

//    this.draw(x, y, active, buttonInfos)
  }

//  draw (x, y, active, buttonInfos) {
//    
//  }
}
