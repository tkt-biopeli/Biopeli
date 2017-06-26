
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
  function StructureType ({name, asset, constProduction, seasonProduction}) {
    this.name = name
    this.asset = asset

    this.constProduction = constProduction ? constProduction : function () {}
    this.seasonProduction = seasonProduction ? seasonProduction : function () {}

    this.createUpdateFn = function () {
      return function () {
        constProduction()
        seasonProduction()
      }
    }
  }

  var farm = new StructureType({
    name: 'farm',
    asset: 'farm',

    constantProductionUpdate: function () {
      gameState.player.addCash(1)
    },

    seasonalProductionUpdate: function () {
      gameState.player.addCash(10)
    }
  })

  var berryFarm = new StructureType({
    name: 'berry farm',
    asset: 'berry_farm',

    constantProductionUpdate: function () {
      gameState.player.addCash(1)
    },

    seasonalProductionUpdate: function () {
      gameState.player.addCash(10)
    }
  })

  var dairyFarm = new StructureType({
    name: 'dairy farm',
    asset: 'dairy_farm',

    constantProductionUpdate: function () {
      gameState.player.addCash(1)
    },

    seasonalProductionUpdate: function () {
      gameState.player.addCash(10)
    }
  })

  return {
    farm: farm,
    berryFarm: berryFarm,
    dairyFarm: dairyFarm
  }
}
