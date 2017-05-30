export default function () {
  function TileType (name, asset) {
    this.name = name
    this.asset = asset
  }

  var forest = new TileType('forest', 'forest')
  var forest2 = new TileType('forest2', 'forest2')
  var water = new TileType('water', 'water')
  var water2 = new TileType('water2', 'water2')
  var grass = new TileType('grass', 'grass')
  var farm = new TileType('farm', 'farm')

  return {
    water: water,
    forest: forest,
    water2: water2,
    forest2: forest2,
    grass: grass,
    farm: farm
  }
}
