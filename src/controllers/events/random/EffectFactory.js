import TileValueEffect from './effects/TileValueEffect'

export default class EffectFactory {
  constructor ({gameState}) {
    this.gameState = gameState
  }

  createTileValueEffect (json) {
    return new TileValueEffect({
      fertilityChange: json.fertilityChange,
      moistureChange: json.moistureChange,
      flowerChange: json.flowerChange
    })
  }
}
