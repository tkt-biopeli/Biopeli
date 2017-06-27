import StructureFactory from '../../map/StructureFactory'
import ButtonComponent from '../../../view/menu/ButtonComponent'

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
    context: sBuilder
  })

  var createBerryFarm = new ButtonComponent({
    name: 'Build a berry farm',
    functionToCall: sBuilder.buildBerryFarm,
    context: sBuilder
  })

  var createFarm = new ButtonComponent({
    name: 'Build a farm',
    functionToCall: sBuilder.buildFarm,
    context: sBuilder
  })

  return [createDairyFarm, createBerryFarm, createFarm]
}
