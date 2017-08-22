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
  var types = []
  for (let structureTypeKey of Object.keys(structureTypes)) {
    let structureType = structureTypes[structureTypeKey]
    if (isValid(structureType)) {
      types.push(structureType)
    }
  }
  return types
}

export { structuresAffected, strucTypesAffected }
