export default class Effect {
  happen (allAffected) {
    for (let affected of allAffected) {
      this.happenForOne(affected)
    }
  }
}
