function structuresAffected (array, isValid) {
  var affected = []
  for (let structure of array) {
    if (isValid(structure)) {
      affected.push(structure)
    }
  }
  return affected
}

function strucTypesAffected (structureTypes, isValid) {
  var affected = []
  for (let structureTypeKey of Object.keys(structureTypes)) {
    let structureType = structureTypes[structureTypeKey]
    if (isValid(structureType)) {
      affected.push(structureType)
    }
  }
  return affected
}

function tilesAffected (map, isValid) {
  let affected = []

  for (let i = 0; i < map.gridSizeX; i++) {
    for (let j = 0; j < map.gridSizeY; j++) {
      let tile = map.getTileWithGridCoordinates(i, j)
      if (isValid(tile)) {
        affected.push(tile)
      }
    }
  }
  return affected
}

export { structuresAffected, strucTypesAffected, tilesAffected }
