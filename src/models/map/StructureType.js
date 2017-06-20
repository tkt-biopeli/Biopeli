
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
   * @param {function} param.createUpdateFn 
   *  - Function that is called when the ingame time proceeds, not mandatory
   */
  function StructureType ({name, asset, createUpdateFn}) {
    this.name = name
    this.asset = asset
    if(createUpdateFn != undefined)
      this.createUpdateFn = createUpdateFn
    else
      this.createUpdateFn = function(){return function(){}}
  }

  var farm = new StructureType({
    name: 'farm', 
    asset: 'farm',
    createUpdateFn: function(){
      return function(){}       
    }
  })

  var berryFarm = new StructureType({
    name: 'berry farm', 
    asset: 'berry_farm',
    createUpdateFn: function(){
      return function(){}
    }
  })

  var dairyFarm = new StructureType({
    name: 'dairy farm', 
    asset: 'dairy_farm',
    createUpdateFn: function(){
      return function(){}
    }
  })


  return {
      farm: farm,
      berryFarm: berryFarm,
      dairyFarm: dairyFarm
  }
}
