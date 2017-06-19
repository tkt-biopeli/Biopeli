
/**
 * Description goes here
 * 
 * @return {{farm: StructureType, granary: StructureType}} Structure types
 */
export default function () {
    
    /**
     * @class 
     * 
     * @param {object} param 
     * @param {string} param.name
     * @param {string} param.asset
     */
    function StructureType ({name, asset}) {
        this.name = name
        this.asset = asset
    }

    var farm = new StructureType({name: 'farm', asset: 'farm'})
    var granary = new StructureType({name: 'granary', asset: 'granary'})

    return {
        farm: farm,
        granary: granary
    }
}
