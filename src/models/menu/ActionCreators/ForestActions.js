export default function ForestActions (tile) {
  var sbuilder = new StructureBuilder()

  var createGranary = new ButtonAction({
    name: 'Build a granary',
    function: sbuilder.buildGranary,
    valuesToCallWith: [tile]
  })

  return [createGranary]
}
