import Content from './Content'
/**
 * Controller of side menu of the game
 */
export default class SideMenuContent extends Content {
  /**
   * Description goes here
   *
   * @param {object} param - Parameter object
   * @param {MenuView} param.menuView
   */
  constructor ({ demandFunction, purchaseManager, topBarController, structureTypes, texts }) {
    super()
    this.demandFunction = demandFunction
    this.purchaseManager = purchaseManager
    this.topBarController = topBarController
    this.structureTypes = structureTypes
    this.texts = texts.tileContentTexts

    this.emptyFunction = () => { }
  }

  /**
   * Create blueprint of the menu's contents
   */
  createSections () {
    if (!this.owner.hasStateValue('selectedTile')) {
      return null
    }

    var tile = this.owner.stateValue('selectedTile')
    this.tileInformation(tile)

    if (tile.structure !== null) {
      var structure = tile.structure
      this.structureInformation(structure)
      this.structureRuining(structure)
    } else {
      this.createBuildingButtons(tile)
    }
  }

  tileInformation (tile) {
    this.sectionName('tile')
    this.text(this.texts.tileInformationTexts.groundType + ': ' + tile.tileType.nameWithLanguage)
    this.text('X: ' + tile.x + ', Y: ' + tile.y)
    this.text(this.texts.tileInformationTexts.flowers + ': ' + tile.flowers)
    this.text(this.texts.tileInformationTexts.moisture + ': ' + this.format(tile.moisture) + '%')
    this.text(this.texts.tileInformationTexts.fertility + ': ' + this.format(tile.fertility) + '%')
    if (tile.owner != null) {
      this.text(this.texts.tileInformationTexts.owner + ': ' + tile.owner.ownerName)
    }
  }

  structureInformation (structure) {
    this.section('structure')
    this.text('"' + structure.ownerName + '"')
    this.text('"' + structure.structureName + '"')
    this.text(
      this.texts.structureInformationTexts.structure + ': ' +
      structure.structureType.nameWithLanguage)
    this.text(
      this.texts.structureInformationTexts.foundingYear + ': ' +
      structure.foundingYear)
    if (structure.structureType.type === 'refinery') {
      structure.size = structure.producer.producer.producerHolders.length
    }
    this.text(this.texts.structureInformationTexts.size + ': ' + structure.size)

    var turnipProduction = structure.turnipProduction()
    this.text(
      this.texts.structureInformationTexts.turnipsPerWeek +
      ': ' + this.format(turnipProduction, 2))
    this.text(
      this.texts.structureInformationTexts.moneyPerWeek + ': ' +
      this.format(this.demandFunction.pay(turnipProduction), 2)
    )
  }

  structureRuining (structure) {
    this.section('ruin')
    this.text(
      this.texts.structureRuiningTexts.structureHealth + ': ' +
      structure.health.toString())
    this.animatedBar(200, 50, false, structure.health.percent())
    this.text(
      this.texts.structureRuiningTexts.repairCost + ': ' +
      structure.healthManager.fixPrice())

    if (structure.health.percent() < 1 &&
        this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      var fix = (structure => () => {
        structure.healthManager.fix()
        this.owner.redraw()
        this.topBarController.redraw()
      })(structure)
      this.button(this.texts.structureRuiningTexts.repair, fix, this, 'emptyButton')
    } else if (structure.health.percent() < 1 &&
        !this.purchaseManager.hasCash(structure.healthManager.fixPrice())) {
      this.button(
        this.texts.structureRuiningTexts.insufficientFunds,
        this.emptyFunction, null, 'unusableButton'
      )
    } else {
      this.button(
        this.texts.structureRuiningTexts.inPerfectCondition,
        this.emptyFunction, null, 'unusableButton'
      )
    }
  }

  createBuildingButtons (tile) {
    this.section('actions')

    var allowedStructures = tile.tileType.allowedStructures

    for (let structureTypeName of allowedStructures) {
      var structureType = this.structureTypes[structureTypeName]
      this.owner.changeButton(
        structureType.nameWithLanguage, 2,
        this.owner.wrapFunction(
          this.owner.addState, this.owner,
          'structureType', structureType
        ),
        this
      )
    }
  }
}
