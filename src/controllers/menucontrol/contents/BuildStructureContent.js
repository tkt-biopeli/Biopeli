import Content from './Content'

export default class BuildStructureController extends Content {
  constructor ({ player, structureFactory, purchaseManager }) {
    super()
    this.structureFactory = structureFactory
    this.purchaseManager = purchaseManager

    this.emptyFunction = () => {}
  }

  createSections () {
    this.sectionName('info')
    var stype = this.owner.stateValue('structureType')
    var tile = this.owner.stateValue('selectedTile')
    this.text('Tyyppi: ' + stype.nameWithLanguage)
    if (!stype.refinery) {
      if (stype.continuousProduction) {
        this.text('Tuotanto jatkuvaa')
      } else {
        var text = 'Sadonkorjuu: '
        for (let harvest of stype.harvestingWeeks) {
          text += harvest
        }
        this.text(text)
      }

      this.text('Tuotto: ' + stype.turnipYield)
    }
    this.text('Hinta: ' + stype.cost, 'large')

    this.section('build')
    if (this.purchaseManager.hasCash(stype.cost)) {
      this.owner.resetDecoratedButton(
        'Rakenna', null,
        this.structureFactory.buildBuilding,
        this.structureFactory, tile, stype
      )
    } else {
      this.button(
        'Rahat eivät riitä',
        this.emptyFunction, null, 'unusableButton'
      )
    }
  }
}
