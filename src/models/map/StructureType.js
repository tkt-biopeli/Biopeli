export default function () {
    function StructureType ({name, asset}) {
        this.name = name
        this.asset = asset
    }

    var farm = new StructureType({name: 'farm', asset: 'farm'})

    return {
        farm: farm
    }
}
