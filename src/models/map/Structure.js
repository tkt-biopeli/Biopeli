export default class Structure{
  constructor ({tile, structureType}) {
    this.tile = tile
    this.structureType = structureType
  }

  asset(){
    return this.structureType.asset
  }
}
