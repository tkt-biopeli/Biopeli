export default function () {
  function TileType ({name, asset}) {
    this.name = name
    this.asset = asset
  }

  var forest = new TileType({name: 'forest', asset: 'forest'})
  var forest2 = new TileType({name: 'forest2', asset: 'forest2'})
  var water = new TileType({name: 'water', asset: 'water'})
  var water2 = new TileType({name: 'water2', asset: 'water2'})
  var grass = new TileType({name: 'grass', asset: 'grass'})
  var farm = new TileType({name: 'farm', asset: 'farm'})

  return {
    water: water,
    forest: forest,
    water2: water2,
    forest2: forest2,
    grass: grass,
    farm: farm
  }
}
