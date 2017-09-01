import Content from './Content'

export default class BuildStructureContent extends Content {
  constructor ({ structureFactory, purchaseManager, texts, structureTypes, tileTypes }) {
    super() /* istanbul ignore next */
    this.structureFactory = structureFactory
    this.purchaseManager = purchaseManager
    this.texts = texts.buildStructureTexts
    this.structureTypes = structureTypes
    this.tileTypes = tileTypes

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
    } else {
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
        harvests += '\n' + harvest.substr(0, harvest.indexOf('.')) + '. ' + this.texts.month + ', ' + this.texts.week + ' ' + harvest.charAt(harvest.indexOf('.')+1)
      }
      this.text(harvests)
    }

    let ownershipText = this.texts.takesOwnership + ': '
    for (let i = 0; i < stype.takesOwnershipOf.length; i++) {
      ownershipText += this.tileTypes[stype.takesOwnershipOf[i]].nameWithLanguage
      if (i !== stype.takesOwnershipOf.length - 1) ownershipText += ', '
    }

    this.text(ownershipText)
    this.text(this.texts.revenue + ': ' + stype.turnipYield)
    this.text(this.texts.fertility + ': ' + stype.fertilityMin + '->' + stype.fertilityMax)
    this.text(this.texts.moisture + ': ' + stype.moistureMin + '->' + stype.moistureMax)
    
    let tile = this.owner.stateValue('selectedTile')
    this.text(this.texts.tileFertility + ': ' + this.format(tile.getFertility()))
    this.text(this.texts.tileMoisture + ': ' + this.format(tile.getMoisture()))
  }

  refineryInfo (stype) {
    this.text(this.texts.multiplier + ': ' + stype.multiplier)
    this.text(this.texts.refineryReach + ': ' + stype.reach)
    
    let buysFrom = this.texts.buysFrom + ': '
    if (stype.buysFrom === 'all') {
      buysFrom += this.texts.refineryBuysFromAll
    } else {
      for (let i = 0; i < stype.buysFrom.length; i++) {
        buysFrom += this.structureTypes[stype.buysFrom[i]].nameWithLanguage
        if (i !== stype.buysFrom.length - 1) buysFrom += ', '
      }
    }

    this.text(buysFrom)

    let takesOwnership = ''
    if (stype.takesOwnership) {
      takesOwnership += this.texts.refineryTakes
    } else {
      takesOwnership += this.texts.refineryNotTakes
    }

    this.text(takesOwnership)
  }

  specialInfo (stype) {
    this.text(this.texts.environmentEffect + ':')

    this.text(this.texts.eReach + ': ' + stype.reach)
    let effect = stype.changeValues
    this.text(this.texts.eFlowers + ': ' + effect.flowers)
    this.text(this.texts.eFertility + ': ' + effect.fertility)
    this.text(this.texts.eMoisture + ': ' + effect.moisture)
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
