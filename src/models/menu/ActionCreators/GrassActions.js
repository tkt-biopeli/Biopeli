import StructureFactory from '../../map/StructureFactory'
import ButtonAction from '../ButtonAction'

/**
 * Description goes here
 * 
 * @param {ModelTile} tile 
 * @param {StructureType} structureTypes 
 * 
 * @return {ButtonAction[]}
 */
export default function GrassActions (tile, structureTypes) {
  var sBuilder = new StructureFactory({tile: tile, structureTypes: structureTypes})

  var createDairyFarm = new ButtonAction({
    name : "Build a dairy farm",
    functionToCall: sBuilder.buildDairyFarm,
    context: sBuilder
  })

  var createBerryFarm = new ButtonAction({
    name : "Build a berry farm",
    functionToCall: sBuilder.buildBerryFarm,
    context: sBuilder
  })

  var createFarm = new ButtonAction({
    name : "Build a farm",
    functionToCall: sBuilder.buildFarm,
    context: sBuilder
  })

  return [createDairyFarm, createBerryFarm, createFarm]
}
