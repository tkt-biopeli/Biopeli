import TimeCondition from './conditions/TimeCondition'

export default class ConditionFactory {
  constructor ({gameState}) {
    this.gameState = gameState
  }

  createTimeCondition (json) {
    return new TimeCondition({
      timer: this.gameState.gameTimer,
      notBefore: json.notBefore,
      notAfter: json.notAfter
    })
  }
}
