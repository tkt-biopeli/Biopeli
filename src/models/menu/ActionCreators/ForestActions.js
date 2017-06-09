import StructureFactory from '../../map/StructureFactory'
import ButtonAction from '../ButtonAction'
export default function ForestActions (tile) {
  var sbuilder = new StructureFactory({tile: tile})

  var createGranary = new ButtonAction({
    name: 'Build a granary',
    function: sbuilder.buildGranary
  })

  return [createGranary]
}
