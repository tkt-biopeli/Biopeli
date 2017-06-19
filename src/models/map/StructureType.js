
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
     * @param {function} param.updateFn 
     *  - Function that is called when the ingame time proceeds, not mandatory
     */
    function StructureType ({name, asset, updateFn}) {
        this.name = name
        this.asset = asset
        this.updateFn = updateFn
    }

    var farm = new StructureType({
        name: 'farm', 
        asset: 'farm',
        createUpdateFn: function(){
            return function(){
                gameState.player.addPoints(1) // placeholder
            }
        }
    })
    var granary = new StructureType({
        name: 'granary', 
        asset: 'granary',
        createUpdateFn: function(){
            return function(){
                gameState.player.addPoints(1) // placeholder
            }
        }
    })

    return {
        farm: farm,
        granary: granary
    }
}
