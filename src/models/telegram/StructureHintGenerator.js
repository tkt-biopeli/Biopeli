/**
 * Listens to structures built by the player, and
 * in case the structure was first of its kind,
 * sends a telegram message forward containing a hint
 * retrieved from JSON.
 * 
 * @export
 * @class StructureHintGenerator
 */
export default class StructureHintGenerator {
  constructor ({telegramStorage, structureHints, randomWithBounds}) {
    this.telegramStorage = telegramStorage
    this.structureHints = structureHints == null ? [] : structureHints
    this.randomWithBounds = randomWithBounds
    this.builtSctructureTypes = new Set()    
  }

  /**
   * Activated each time a structure is built
   * 
   * @param {any} tile 
   * @memberof StructureHintGenerator
   */
  structureBuilt (tile) {
    let hint = this.getHint(tile.structure.structureType)
    if (!hint) return    
    this.sendTelegram(hint)
  }

  /**
   * In case the structure was first of its kind,
   * retrieve a hint from JSON   
   * 
   * @param {any} structureType 
   * @returns 
   * @memberof StructureHintGenerator
   */
  getHint (structureType) {    
    if (this.builtSctructureTypes.has(structureType) ||
      !this.structureHints[structureType.name]) return null      
    let hints = this.structureHints[structureType.name].hints    
    let randomHint = hints[this.randomWithBounds(0, hints.length)]        
    this.builtSctructureTypes.add(structureType)    
    return randomHint
  }

  sendTelegram (hint) {
    this.telegramStorage.addStructureHint(hint)
  }
}
