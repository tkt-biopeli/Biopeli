import StructureFactory from '../../map/StructureFactory'
import ButtonComponent from '../../../view/menu/components/ButtonComponent'

/**
 * Description goes here
 *
 * @param {ModelTile} tile
 * @param {StructureType} structureTypes
 * @param {GameTimer] gameTimer
 * @return {ButtonComponent[]}
 */
export default function ForestActions (tile, structureTypes, gameTimer, player) {
  var sbuilder = new StructureFactory({
    tile: tile,
    structureTypes: structureTypes,
    gameTimer: gameTimer,
    player: player
  })

  var createDairyFarm = new ButtonComponent({
    name: 'Build a dairy farm',
    functionToCall: sbuilder.buildDairyFarm,
    context: sbuilder
  })

  return [createDairyFarm]
}
