export default [
  {
    name: "Rutto",
    description: "Kaupungissa jyllää hirvittävä kulkutauti, ihmisiä kuolee!",
    condition: {
      name: "PopulationLimiter",
      notBefore: 700,
      notAfter: 999999
    },
    effects: [
      {
        name: "PopulationChange",
        changePercentage: 0.8
      }
    ]
  },
  {
    name: "Pakolaiskriisi",
    description: "Maailmassa on pakolaiskriisi, kaupungin koko kasvaa",
    effects: [
      {
        name: "PopulationChange",
        changePercentage: 1.2
      }
    ]
  }
]
