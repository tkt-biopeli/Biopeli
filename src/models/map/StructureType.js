
/**
 * Description goes here
 *
 * @param {GameState} gameState - Current game
 *
 * @return {{farm: StructureType, granary: StructureType}} Structure types
 */
export default function (gameState) {
  /**
   * @class
   *
   * @param {object} param - Parameter object
   *
   * @param {string} param.name - Name of the type
   * @param {string} param.asset - Name of the sprite used
   * @param {function} param.constProduction
   * @param {function} param.seasonProduction
   */
  function StructureType ({name, asset, createSeasonFn, createConstFn}) {
    this.name = name
    this.asset = asset

    this.createSeasonFn = createSeasonFn ? 
        createSeasonFn : (event) => {return ()=>{}}
    this.createConstFn = createConstFn ? 
        createConstFn : () => {return ()=>{}}

    this.createProductionFn = () => {
      var seasonFn = createSeasonFn()
      var constFn = createConstFn()
      return (timeEvent) => {
        var produced = 0
        produced += seasonFn(timeEvent)
        produced += constFn()
        return produced
      }
    }
  }

  var farm = new StructureType({
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

  var berryFarm = new StructureType({
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

  var dairyFarm = new StructureType({
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

  return {
    farm: farm,
    berryFarm: berryFarm,
    dairyFarm: dairyFarm
  }
}
