const structureTypes = {
  farm: { name: 'farm', asset: 'farm', allowedTiles: [] },
  dairy_farm: { name: 'dairy farm', asset: 'dairy_farm', allowedTiles: [] },
  berry_farm: { name: 'berry farm', asset: 'berry_farm', allowedTiles: [] }
}

const tileTypes = {
  forest: { name: 'forest', asset: 'forest', allowedStructures: [] },
  grass: { name: 'grass', asset: 'grass', allowedStructures: [] },
  water: { name: 'water', asset: 'water', allowedStructures: [] }
}

const StaticTypes = (structureTypes, tileTypes) => {
  structureTypes.farm.allowedTiles = [tileTypes.forest]
  structureTypes.dairy_farm.allowedTiles = [tileTypes.forest, tileTypes.grass]
  structureTypes.berry_farm.allowedTiles = [tileTypes.forest, tileTypes.grass]
  tileTypes.forest.allowedStructures = [structureTypes.farm]
  tileTypes.grass.allowedStructures = [structureTypes.farm, structureTypes.dairy_farm, structureTypes.berry_farm]
  tileTypes.water.allowedStructures = []
  return ({ structureTypes: structureTypes, tileTypes: tileTypes })
}

export default StaticTypes