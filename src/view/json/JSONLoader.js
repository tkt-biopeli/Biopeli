import settings from '../../../assets/json/json-settings.json'

export default class JSONLoader {
  constructor ({ game }) {
    this.game = game
    this.initFileNames()
  }

  initFileNames () {
    this.files = []
    this.files.push('config')
    this.files.push('asset')
    this.files.push('tileType')
    this.files.push('structureType')
    this.files.push('text')
    this.files.push('name')
    this.files.push('gameEvent')
  }

  loadJSONObjects () {
    for (let file of this.files) {
      this.game.load.json(settings[file + 'sName'], settings[file + 'sFile'])
    }
  }

  initJSONObjects () {
    for (let file of this.files) {
      this[file + 's'] = this.getJSON(settings[file + 'sName'])
    }

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
    var gameData = {}

    for (let file of this.files) {
      if (file === 'config') {
        gameData.config = this.configs
        continue
      }
      gameData[file + 's'] = this[file + 's']
    }

    return gameData
  }
}
