export default function () {
  function TileType (name, asset) {
    this.name = name
    this.asset = asset
  }

  var forest = new TileType('forest', 'forest')
  var water = new TileType('water', 'water')

  return {
    water: water,
    forest: forest
  }
}
