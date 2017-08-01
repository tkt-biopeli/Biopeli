import Content from './Content'

export default class OptionsContent extends Content {
  constructor ({music, gameEvents}) {
    super()
    this.music = music
    this.gameEvents = gameEvents
  }

  musicOn() {
    this.music.mute = false
  }
 
  musicOff() {
    this.music.mute = true
  }

  incVolume() {
    if (this.music.volume < 1 ) { this.music.volume += 0.1 } 
    if (this.music.volume > 1) { this.music.volume = 1 }
  }

  decVolume() {
    if (this.music.volume > 0) { this.music.volume -= 0.1 }
    if (this.music.volume < 0) { this.music.volume = 0 }
  }

  createSections () {
    this.sectionName('options')
    if (this.music.mute) {
      this.button('Äänet päälle', this.musicOn, this)
    } else {
      this.button('Äänet pois', this.musicOff, this)  
    }
    this.text('Äänen voimakkuus: ' + Math.round(this.music.volume*100) + '%')
    this.button('Volyymi +', this.incVolume, this) 
    this.button('Volyymi -', this.decVolume, this)
    this.button('Lopeta', this.gameEvents.finishGame, this.gameEvents,)
  }
}
