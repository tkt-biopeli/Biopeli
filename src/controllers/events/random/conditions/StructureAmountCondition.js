import {between} from '../../../../models/logic/Between'
import FilterGetterComponent from '../filters/components/FilterGetterComponent'

export default class StructureAmountCondition {
  constructor ({gameState, json}) {
<<<<<<< HEAD
    var rec = new RecursiveHelper(gameState)
    this.filter = rec.getFilter(json.filter)
=======
    var filterGetter = new FilterGetterComponent({gameState: gameState})
    this.filter = filterGetter.getFilter(json.structureFilter)
>>>>>>> 44bb173eed8deed10450381c540b558f93e8a1a4
    this.min = json.min
    this.max = json.max
  }

  canHappen () {
    return between(this.min, this.max, this.filter.affected().length)
  }
}
