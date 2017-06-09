import StructureFactory from '../../map/StructureFactory'
import ButtonAction from '../ButtonAction'
export default function GrassActions (tile, structureTypes) {
  var sBuilder = new StructureFactory({tile: tile, structureTypes: structureTypes})

  var createGranary = new ButtonAction({
    name : "Build a granary",
    function: sBuilder.buildGranary
  })

  var createFarm = new ButtonAction({
    name : "Build a farm",
    function: sBuilder.buildFarm
  })

  return [createGranary, createFarm]
}
