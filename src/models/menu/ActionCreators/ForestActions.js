import StructureBuilder from '../models/map/StructureBuilder'
export default function ForestActions (tile) {
  var sbuilder = new StructureBuilder({tile: tile})

  var createGranary = new ButtonAction({
    name: 'Build a granary',
    function: sbuilder.buildGranary
  })

  return [createGranary]
}
