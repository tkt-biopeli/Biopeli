import {between} from '../../../../models/logic/Between'
import FilterGetterComponent from '../filters/components/FilterGetterComponent'

export default class StructureAmountCondition {
  constructor ({gameState, json}) {
    var filterGetter = new FilterGetterComponent({gameState: gameState})
    this.filter = filterGetter.getFilter(json.structureFilter)
    this.min = json.min
    this.max = json.max
  }

  canHappen () {
    return between(this.min, this.max, this.filter.affected().length)
  }
}
