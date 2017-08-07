import config from '../../config'

export default class JSONLoader {
  constructor ({ game }) {
    this.game = game
  }

  loadJSONObjects () {
    this.game.load.json(config.configurationsName, config.configurationsFile)
    this.game.load.json(config.assetsName, config.assetsFile)
    this.game.load.json(config.tiletypesName, config.tiletypesFile)
    this.game.load.json(config.structuretypesName, config.structuretypesFile)
    this.game.load.json(config.textsName, config.textsFile)
  }

  initJSONObjects () {
    this.configurations = this.getJSON(config.configurationsName)
    this.assets = this.getJSON(config.assetsName)
    this.tileTypes = this.getJSON(config.tiletypesName)
    this.structureTypes = this.getJSON(config.structuretypesName)
    this.texts = this.getJSON(config.textsName)
    this.parseJSONObjects()
  }

  parseJSONObjects () {
    this.tileTypes = this.parseListToObject(this.tileTypes.tile_types)
    this.structureTypes = this.parseListToObject(this.structureTypes.structure_types)
  }

  parseListToObject (list) {
    var trueObject = {}

    for (let obj of list) {
      trueObject[obj.name] = obj
    }

    return trueObject
  }

  getJSON (name) {
    return this.game.cache.getJSON(name)
  }

  loadAssets () {
    var assetList = this.assets.assets
    for (let asset of assetList) {
      if(asset.type == 'spritesheet') this.game.load.spritesheet(asset.name, asset.file, asset.width, asset.height, asset.frames)
      this.game.load[asset.type](asset.name, asset.file)
    }
  }

  gameData () {
    return {
      config: this.configurations,
      tileTypes: this.tileTypes,
      structureTypes: this.structureTypes,
      texts: this.texts
    }
  }
}