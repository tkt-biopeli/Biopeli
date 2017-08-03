import Content from './Content'

export default class OptionsContent extends Content {
  constructor ({ game }) {
    super()
    this.game = game
    this.name = 'options'
  }

  musicOn () {
    this.game.music.mute = false
    this.owner.redraw()
  }

  musicOff () {
    this.game.music.mute = true
    this.owner.redraw()
  }

  incVolume () {
    if (this.game.music.volume < 1) { this.game.music.volume += 0.1 }
    if (this.game.music.volume > 1) { this.game.music.volume = 1 }
    this.owner.redraw()
  }

  decVolume () {
    if (this.game.music.volume > 0) { this.game.music.volume -= 0.1 }
    if (this.game.music.volume < 0) { this.game.music.volume = 0 }
    this.owner.redraw()
  }

  togglePause () {
    if (this.game.state.paused) {
      this.game.state.paused = false
    } else {
      this.game.state.paused = true
    }
  }

  createSections () {
    this.sectionName('options')
    this.button('Pysäytä / Jatka', this.togglePause, this)
    this.text('Äänen voimakkuus: ' + Math.round(this.game.music.volume * 100) + '%')
    if (this.game.music.mute) {
      this.button('Äänet päälle', this.musicOn, this)
    } else {
      this.button('Äänet pois', this.musicOff, this)
    }
    this.button('Volyymi +', this.incVolume, this)
    this.button('Volyymi -', this.decVolume, this)
    this.button('Lopeta peli', this.game.gameEvents.finishGame, this.game.gameEvents)
  }
}
