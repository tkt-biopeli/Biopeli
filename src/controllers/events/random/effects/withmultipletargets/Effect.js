export default class Effect {
  realizeEvent (allAffected) {
    allAffected.forEach(affected => this.realizeEventForOneElement(affected))
  }
}
