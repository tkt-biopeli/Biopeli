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
    this.text('Type: ' + stype.name)
    if (!stype.refinery) {
      if (stype.continuousProduction) {
        this.text('Continuous production')
      } else {
        var text = 'Harvests: '
        for (let harvest of stype.harvestingWeeks) {
          text += harvest
        }
        this.text(text)
      }

      this.text('Yield: ' + stype.turnipYield)
    }
    this.text('Price: ' + stype.cost, 'large')

    this.section('build')
    if (this.purchaseManager.hasCash(stype.cost)) {
      this.owner.resetDecoratedButton('Build', null, this.structureFactory.buildBuilding, this.structureFactory, tile, stype)
    } else {
      this.button('Not enough money', this.emptyFunction, null, 'unusableButton')
    }
  }
}
