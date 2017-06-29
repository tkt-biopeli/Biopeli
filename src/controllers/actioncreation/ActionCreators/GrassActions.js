import StructureFactory from '../../../models/map/StructureFactory'
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
  var sBuilder = new StructureFactory({
    tile: tile,
    structureTypes: structureTypes,
    gameTimer: gameTimer,
    player: player
  })

  var createDairyFarm = new ButtonComponent({
    name: 'Build a dairy farm',
    functionToCall: sBuilder.buildDairyFarm,
    context: sBuilder,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  var createBerryFarm = new ButtonComponent({
    name: 'Build a berry farm',
    functionToCall: sBuilder.buildBerryFarm,
    context: sBuilder,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  var createFarm = new ButtonComponent({
    name: 'Build a farm',
    functionToCall: sBuilder.buildFarm,
    context: sBuilder,
    width: config.menuButtonWidth,
    height: config.menuButtonHeight,
    fontSize: config.menuFontSize
  })

  return [createDairyFarm, createBerryFarm, createFarm]
}
