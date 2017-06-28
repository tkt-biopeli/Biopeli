
class StructureType {
  constructor ({name, asset, allowedTiles, createSeasonFn, createConstFn}) {
    this.name = name
    this.asset = asset

    this.allowedTiles = allowedTiles

    this.createSeasonFn = createSeasonFn ? 
        createSeasonFn : (event) => {return ()=>{}}
    this.createConstFn = createConstFn ? 
        createConstFn : () => {return ()=>{}}

    this.createProductionFn = () => {
      var seasonFn = this.createSeasonFn()
      var constFn = this.createConstFn()
      return (timeEvent) => {
        var produced = 0
        produced += seasonFn(timeEvent)
        produced += constFn()
        return produced
      }
    }
  }
}

export default StructureTypes = {
  getAll: () => {
    return Object.keys(this)
  }
}

StructureTypes.farm = new StructureType({
  name: 'farm',
  asset: 'farm',

  createSeasonFn: () => {
    return (timeEvent) => {
      return timeEvent.month == 8 ? 100 : 0
    }
  },

  createConstFn: () => {
    return () => {
      return 2
    }
  }
})

StructureTypes.berryFarm = new StructureType({
  name: 'berry farm',
  asset: 'berry_farm',

  createSeasonFn: () => {
    return (timeEvent) => {
      return timeEvent.month == 8 ? 100 : 0
    }
  },

 createConstFn: () => {
    return () => {
      return 2
    }
  }
})

StructureTypes.dairyFarm = new StructureType({
  name: 'dairy farm',
  asset: 'dairy_farm',

  createSeasonFn: () => {
    return (timeEvent) => {
      return timeEvent.month == 8 ? 100 : 0
    }
  },

  createConstFn: () => {
    return () => {
      return 2
    }
  }
})
