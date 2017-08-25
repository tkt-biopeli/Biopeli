import Content from './Content'

export default class BuildStructureContent extends Content {
  constructor ({ player, structureFactory, purchaseManager, texts }) {
    super()
    this.structureFactory = structureFactory
    this.purchaseManager = purchaseManager
    this.texts = texts.buildStructureTexts

    this.emptyFunction = () => {}
  }

  createSections () {
    var stype = this.owner.stateValue('structureType')
    var tile = this.owner.stateValue('selectedTile')
    this.sectionName('info')
    this.createPreBuildInfoContent(stype)

    this.section('build')
    this.createBuildContent(stype, tile)
  }

  createPreBuildInfoContent (stype) {
    this.text(this.texts.structureType + ': ' + stype.nameWithLanguage)
    this.text(this.texts.health + ': ' + stype.health)
    this.text(this.texts.owningRadius + ': ' + stype.radiusForTileOwnership)
    
    this.addPollutionInfo(stype)
    this.addCategorySpecificInfo(stype)
    
    this.text(this.texts.cost + ': ' + stype.cost, 'large')
  }
  
  addPollutionInfo (stype) {
    var pollution = stype.pollution

    let pollutionInfo = ''
    if (pollution.constant) {
      pollutionInfo += this.texts.constantPollution
    }else {
      pollutionInfo += this.texts.pilePollution
    }

    this.text(pollutionInfo)
    this.text(this.texts.pollutionRadius + ': ' + pollution.distance)
    this.text(this.texts.pollutionAmount + ': ' + pollution.amount)
  }

  addCategorySpecificInfo (stype) {
    switch (stype.type) {
      case 'producer_structure':
        this.primaryProducerInfo(stype)
        break
      case 'refinery':
        this.refineryInfo(stype)
        break
      case 'special':
        this.specialInfo(stype)
        break
      default:
        this.errorInfo(stype)
    }
  }

  primaryProducerInfo (stype) {
    if (stype.continuousProduction) {
      this.text(this.texts.continuousProduction)
    } else {
      var harvests = this.texts.harvest + ': '
      for (let harvest of stype.harvestingWeeks) {
        harvests += harvest
      }
      this.text(harvests)
    }

    let ownershipText = this.texts.takesOwnership + ': '
    for (let i = 0 ; i < stype.takesOwnershipOf.length ; i++) {
      ownershipText += stype.takesOwnershipOf[i]
      if(i != stype.takesOwnershipOf.length -1) ownershipText += ', '
    }

    this.text(ownershipText)
    this.text(this.texts.revenue + ': ' + stype.turnipYield)
    this.text(this.texts.fertility + ': ' + stype.fertilityMin + '->' + stype.fertilityMax)
    this.text(this.texts.moisture + ': ' + stype.moistureMin + '->' + stype.moistureMax)
  }

  refineryInfo (stype) {

  }

  specialInfo (stype) {

  }

  errorInfo (stype) {
    this.text(this.texts.errorType)
  }

  createBuildContent (stype, tile) {
    if (this.purchaseManager.hasCash(stype.cost)) {
      this.owner.resetDecoratedButton(
        this.texts.build, null,
        this.structureFactory.buildBuilding,
        this.structureFactory, tile, stype
      )
    } else {
      this.button(
        this.texts.insufficientFunds,
        this.emptyFunction, null, 'unusableButton'
      )
    }
  }
}
