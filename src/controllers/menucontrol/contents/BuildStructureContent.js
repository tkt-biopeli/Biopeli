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
    this.addCategorySpecificInfo(stype)
    this.text(this.texts.cost + ': ' + stype.cost, 'large')
  }

  addCategorySpecificInfo (stype) {
    switch (stype.type) {
      case 'producer_structure':
        if (stype.continuousProduction) {
          this.text(this.texts.continuousProduction)
        } else {
          var text = this.texts.harvest + ': '
          for (let harvest of stype.harvestingWeeks) {
            text += harvest
          }
          this.text(text)
        }

        this.text(this.texts.revenue + ': ' + stype.turnipYield)
        break
      case 'refinery':
        //
        break
      default:
        return null
    }
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
