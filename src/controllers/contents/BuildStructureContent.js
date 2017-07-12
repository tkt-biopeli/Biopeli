import MenuContent from './MenuContent'

export default class BuildStructureController extends MenuContent {
  constructor ({player, structureFactory}) {
    super()
    this.structureFactory = structureFactory
    this.player = player
  }

  createSections () {
    var stype = this.owner.stateValue('structureType')
    var tile = this.owner.stateValue('selectedTile')

    this.text('Type: '+stype.name)
    if(stype.continuousProduction){
      this.text('Continuous production')
    }else{
      var text = 'Harvests: '
      for(let harvest of stype.harvestingWeeks){
        text += harvest
      }
      this.text(text)
    }
    this.text('Yield: '+stype.turnipYield)
    this.text('Price: '+stype.cost, 'large')

    this.section()
    if (this.player.enoughCashFor(stype.cost)){
      this.owner.resetDecoratedButton('Build', null, this.structureFactory.buildBuilding, this.structureFactory, tile, stype)
    }else{
      this.button('Not enough money', () => {}, null, 'unusableButton')
    }
  }
}