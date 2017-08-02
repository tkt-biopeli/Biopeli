import Content from './Content'

export default class LayersContent extends Content {
  constructor ({ game }) {
    super()
    this.game = game
  }

  toggleFlowers () {
    if (this.game.mapView.showFlowers) {
      this.game.mapView.showFlowers = false
    } else {
      this.game.mapView.showFlowers = true
    }
  }

  toggleMoisture () {
    if (this.game.mapView.showMoisture) {
      this.game.mapView.showMoisture = false
    } else {
      this.game.mapView.showMoisture = true
      this.game.mapView.showFertility = false
    }
  }

  toggleFertility () {
    if (this.game.mapView.showFertility) {
      this.game.mapView.showFertility = false
    } else {
      this.game.mapView.showFertility = true
      this.game.mapView.showMoisture = false
    }
  }

  createSections () {
    this.sectionName('layers')
    var teksti = ''

    if (!this.game.mapView.showFlowers) {
      teksti = 'Näytä kukat'
    } else {
      teksti = 'Piilota kukat'
    }
    
    this.button(teksti, this.toggleFlowers, this)

    if (!this.game.mapView.showMoisture) {
      teksti = 'Näytä kosteus'
    } else {
      teksti = 'Piilota kosteus'
    }
    
    this.button(teksti, this.toggleMoisture, this)

    if (!this.game.mapView.showFertility) {
      teksti = 'Näytä ravinteikkuus'
    } else {
      teksti = 'Piilota ravinteikkuus'
    }
    
    this.button(teksti, this.toggleFertility, this)    
  }
}
