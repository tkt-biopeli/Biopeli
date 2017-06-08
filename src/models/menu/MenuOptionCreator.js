export default class MenuOptionCreator {

  constructor(){
    this.tileOptions = new Map()
    this.tileOptions.set("forest", [
      new ButtonAction("Rakenna")
    ])


  }

  getOptions (tile) {
    if(tile.structure == null){
      return this.tileOptions(tile.tileType)
    }

    var options = this.structureOptions(tile.structure)
    options.concat(this.extraOptions(tile))

    return options
  }

  tileOptions (tileType) {
    return tileTypeOptions.get(tileType.name)
  }

  structureOptions (structure) {
    return []
  }

  extraOptions (tile) {
    return []
  }
}
