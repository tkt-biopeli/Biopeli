export default class StructureHintGenerator {
  constructor ({telegramStorage, structureHints, randomWithBounds}) {
    this.telegramStorage = telegramStorage
    this.structureHints = structureHints == null ? [] : structureHints
    this.randomWithBounds = randomWithBounds
    this.builtSctructureTypes = new Set()    
  }

  getHint (structureType) {    
    if (this.builtSctructureTypes.has(structureType) ||
      !this.structureHints[structureType.name]) return null      
    let hints = this.structureHints[structureType.name].hints    
    let randomHint = hints[this.randomWithBounds(0, hints.length)]        
    this.builtSctructureTypes.add(structureType)    
    return randomHint
  }

  structureBuilt (tile) {
    let hint = this.getHint(tile.structure.structureType)
    if (!hint) return    
    this.sendTelegram(hint)
  }

  sendTelegram (hint) {
    this.telegramStorage.addStructureHint(hint)
  }
}
