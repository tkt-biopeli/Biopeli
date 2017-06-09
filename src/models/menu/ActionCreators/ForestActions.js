import StructureFactory from '../../map/StructureFactory'
import ButtonAction from '../ButtonAction'
export default function ForestActions (tile, structureTypes) {
  var sbuilder = new StructureFactory({tile: tile, structureTypes: structureTypes})

  var createGranary = new ButtonAction({
    name: 'Build a granary',
    functionToCall: sbuilder.buildGranary,
    context: sbuilder
  })

  return [createGranary]
}
