import StructureTypes from './StructureType'


export default TileTypes = {
  getAll: () => {
    return Object.keys(this)
  }
}

class TileType {
  constructor ({name, asset, allowedStructures}) {
    this.name = name
    this.asset = asset
    this.allowedStructures = allowedStructures
  }
}

TileTypes.forest = new TileType({
  name: 'forest',
  asset: 'forest',

  allowedStructures: [
    StructureTypes.dairyFarm
  ]
})

TileTypes.water = new TileType({ 
  name: 'water', 
  asset: 'water',

  allowedStructures: [

  ]
})

TileTypes.grass = new TileType({ 
  name: 'grass', 
  asset: 'grass',

  allowedStructures: [
    StructureTypes.farm,
    StructureTypes.berryFarm,
    StructureTypes.dairyFarm
  ]
})
