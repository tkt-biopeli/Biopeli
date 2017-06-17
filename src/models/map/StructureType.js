
/**
 * Description goes here
 * @returns {farm: StructureType, granary: StructureType}
 */
export default function () {

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
