import Content from './Content'

export default class BuildStructureController extends Content {
  constructor ({ player, structureFactory, purchaseManager, texts }) {
    super()
    this.structureFactory = structureFactory
    this.purchaseManager = purchaseManager
    this.texts = texts.buildStructureTexts

    this.emptyFunction = () => {}
  }

  createSections () {
    this.sectionName('info')
    var stype = this.owner.stateValue('structureType')
    var tile = this.owner.stateValue('selectedTile')
    this.text(this.texts.structureType + ': ' + stype.nameWithLanguage)
    if (stype.type !== 'refinery') {
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
    }
    this.text(this.texts.cost + ': ' + stype.cost, 'large')

    this.section('build')
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
