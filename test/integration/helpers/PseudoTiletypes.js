const tileTypes = {
  forest: {
    name: 'forest',
    nameWithLanguage: 'metsä',
    asset: 'forest',
    flowers: 10,
    allowedStructures: []
  },
  grass: {
    name: 'grass',
    nameWithLanguage: 'ruohikko',
    asset: 'grass',
    flowers: 10,
    allowedStructures: ["wheat_farm", "dairy_farm", "berry_farm", "mill"]
  },
  water: {
    name: 'water',
    nameWithLanguage: 'vesi',
    asset: 'water',
    flowers: 10,
    allowedStructures: []
  },
  field: {
    name: 'field',
    nameWithLanguage: 'pelto',
    asset: 'field',
    flowers: 10,
    allowedStructures: ["mill"]
  },
  industrial: {
    name: 'industrial',
    nameWithLanguage: 'teollisuusalue',
    asset: 'industrial',
    flowers: 10,
    allowedStructures: ["mill"]
  }
}

export default tileTypes