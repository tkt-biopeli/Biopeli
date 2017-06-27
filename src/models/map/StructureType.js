
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

    var constProdFn = createConstFn ? 
        createConstFn : function () {return function () {}}
    var seasonProdFn = createSeasonFn ? 
        createSeasonFn : function () {return function () {}}

    this.createConstantProductionFn = function () { return constProdFn() }
    this.createSeasonalProductionFn = function () { return seasonProdFn() }
  }

  var farm = new StructureType({
    name: 'farm',
    asset: 'farm',

    createSeasonFn: function () {
      return function () {
        return 100
      } 
    },

    createConstFn: function (stat) {
      return function () {
        return 1
      } 
    }
  })

  var berryFarm = new StructureType({
    name: 'berry farm',
    asset: 'berry_farm',

    createSeasonFn: function () {
      return function () {gameState.player.addCash(1)} 
    },

    createConstFn: function () {
      return function () {gameState.player.addCash(10)} 
    }
  })

  var dairyFarm = new StructureType({
    name: 'dairy farm',
    asset: 'dairy_farm',

    createSeasonFn: function () {
      return function () {gameState.player.addCash(1)} 
    },

    createConstFn: function () {
      return function () {gameState.player.addCash(10)} 
    }
  })

  return {
    farm: farm,
    berryFarm: berryFarm,
    dairyFarm: dairyFarm
  }
}
