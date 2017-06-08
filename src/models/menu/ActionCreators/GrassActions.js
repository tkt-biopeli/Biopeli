import StructureBuilder from '../../map/StructureBuilder'
export default function GrassActions (tile) {
  var sbuilder = new StructureBuilder({tile: tile})

  var createGranary = new ButtonAction({
    name = "Build a granary",
    function: sbuilder.buildGranary
  })

  var createFarm = new ButtonAction({
    name = "Build a farm",
    function: sbuilder.buildFarm
  })

  return [createGranary, createFarm]
}
