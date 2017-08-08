import settings from '../../../assets/json/json-settings.json'

export default class JSONLoader {
  constructor ({ game }) {
    this.game = game
  }

  loadJSONObjects () {
    this.game.load.json(settings.configurationsName, settings.configurationsFile)
    this.game.load.json(settings.assetsName, settings.assetsFile)
    this.game.load.json(settings.tiletypesName, settings.tiletypesFile)
    this.game.load.json(settings.structuretypesName, settings.structuretypesFile)
    this.game.load.json(settings.textsName, settings.textsFile)
    this.game.load.json(settings.namesName, settings.namesFile)
  }

  initJSONObjects () {
    this.configurations = this.getJSON(settings.configurationsName)
    this.assets = this.getJSON(settings.assetsName)
    this.tileTypes = this.getJSON(settings.tiletypesName)
    this.structureTypes = this.getJSON(settings.structuretypesName)
    this.texts = this.getJSON(settings.textsName)
    this.names = this.getJSON(settings.namesName)
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
      if (asset.type === 'spritesheet') {
        this.game.load.spritesheet(asset.name, asset.file, asset.width, asset.height, asset.frames)
        continue
      }
      this.game.load[asset.type](asset.name, asset.file)
    }
  }

  gameData () {
    return {
      config: this.configurations,
      tileTypes: this.tileTypes,
      structureTypes: this.structureTypes,
      texts: this.texts,
      names: this.names
    }
  }
}
