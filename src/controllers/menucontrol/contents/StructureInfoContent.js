import Content from './Content'

export default class StructureInfoContent extends Content {
  constructor ({demandFunction, texts}) {
    super() /* istanbul ignore next */

    this.demandFunction = demandFunction
    this.texts = texts.structureInfoContent
  }

  createSections () {
    this.text(this.texts.structureInfo)

    let structure = this.owner.stateValue('selectedTile').structure
    switch (structure.structureType.type) {
      case 'producer_structure':
        this.primaryProducerInfo(structure)
        break
      case 'refinery':
        this.refineryInfo(structure)
        break
      case 'special':
        this.specialInfo(structure)
        break
      default:
        this.errorInfo(structure)
    }
  }

  primaryProducerInfo (structure) {
    let stype = structure.structureType

    let soldTo = this.texts.soldTo + ': '
    if (structure.producer.refinery == null) {
      soldTo += this.texts.city
    } else {
      soldTo += structure.producer.refinery.structure.structureName
    }
    this.text(soldTo)
    
    if (structure.structureType.continuousProduction) {
      this.continuousProducerInfo(structure)
    } else {
      this.seasonalProducerInfo(structure)
    }

    this.text(this.texts.theoreticalProduction + ': ' + 
    (stype.turnipYield * structure.size()))
    this.text(this.texts.fertilityMultiplier + ': ' + 
      this.format(structure.producer.producer.averageMultiplier('fertility'), 2))
    this.text(this.texts.moistureMultiplier + ': ' + 
      this.format(structure.producer.producer.averageMultiplier('moisture'), 2))
    this.text(this.texts.flowersMultiplier + ': ' + 
      this.format(structure.producer.producer.averageMultiplier('flowers'), 2))
    this.text(this.texts.ruiningMultiplier + ': ' + 
      this.format(structure.health.percent(), 2))
  }

  continuousProducerInfo (structure) {
    var turnipProduction = structure.producer.producedAmount(true)
    this.text(
      this.texts.turnipsPerWeek +
      ': ' + this.format(turnipProduction, 2))
    this.text(
      this.texts.estimatedProfit + ': ' +
      this.format(this.demandFunction.pay(turnipProduction), 2)
    )
  }

  seasonalProducerInfo (structure) {
    this.text(this.texts.turnipsPerWeek + ': ' + structure.structureType.turnipYield)
    this.text(this.texts.accumulatedProduction + ': ' + 
      structure.producer.producer.producer.produced)
    this.text(this.texts.estimatedProfit + ': ' +
      this.format(this.demandFunction.pay(structure.producer.producer.producer.produced), 2))
    
    var stype = structure.structureType
    var harvests = this.texts.harvest + ': '
    for (let harvest of stype.harvestingWeeks) {
      harvests += harvest
    }
    this.text(harvests)
  }

  refineryInfo (structure) {
    this.text(this.texts.refinerySize + ': ' + structure.size())
    this.text(this.texts.refineryMultiplier + ': ' + structure.structureType.multiplier)
    this.text(this.texts.turnipsPerWeek + ': ' + structure.producer.producedAmount(true))
    this.text(this.texts.ruiningMultiplier + ': ' + this.format(structure.health.percent(), 2))
    this.text(this.texts.estimatedProfit + ': ' +
      this.demandFunction.pay(structure.producer.producedAmount(true)))
  }

  specialInfo (structure) {

  }

  errorInfo (structure) {

  }
}
