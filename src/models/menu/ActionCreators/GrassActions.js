export default function GrassActions (tile) {
  var sbuilder = new StructureBuilder()

  var createGranary = new ButtonAction({
    name = "Build a granary",
    function: sbuilder.buildGranary
    valuesToCallWith: tile
  })

  var createFarm = new ButtonAction({
    name = "Build a farm",
    function: sbuilder.buildFarm
    valuesToCallWith: tile
  })

  return [createGranary, createFarm]
}
