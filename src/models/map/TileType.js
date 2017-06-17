
/**
 * Description goes here
 * @returns {water:TileType,forest:TileType,grass:TileType}
 */
export default function () {
  
  function TileType ({name, asset}) {
    this.name = name
    this.asset = asset
  }

  var forest = new TileType({name: 'forest', asset: 'forest'})
  var water = new TileType({name: 'water', asset: 'water'})
  var grass = new TileType({name: 'grass', asset: 'grass'})

  return {
    water: water,
    forest: forest,
    grass: grass
  }
}
