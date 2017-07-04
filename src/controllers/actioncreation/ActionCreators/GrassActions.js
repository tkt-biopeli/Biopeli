import StructureFactory from '../../../models/map/structure/StructureFactory'
import ButtonComponent from '../../components/ButtonComponent'
import config from '../../../config'

/**
 * Description goes here
 *
 * @param {ModelTile} tile
 * @param {StructureType} structureTypes
 *
 * @return {ButtonComponent[]}
 */
export default function GrassActions (tile, structureTypes, gameTimer, player) {
  var sFactory = new StructureFactory({
    tile: tile,
    structureTypes: structureTypes,
    gameTimer: gameTimer,
    player: player
  })

  var createDairyFarm = new ButtonComponent({
    name: 'Build a dairy farm',
    functionToCall: sFactory.build.dairyFarm,
    context: sFactory,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  var createBerryFarm = new ButtonComponent({
    name: 'Build a berry farm',
    functionToCall: sFactory.build.berryFarm,
    context: sFactory,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  var createFarm = new ButtonComponent({
    name: 'Build a farm',
    functionToCall: sFactory.build.farm,
    context: sFactory,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  return [createDairyFarm, createBerryFarm, createFarm]
}
