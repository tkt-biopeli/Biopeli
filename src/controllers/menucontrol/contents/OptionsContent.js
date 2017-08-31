import Content from './Content'

export default class OptionsContent extends Content {
  constructor ({ game, texts, telegramStorage }) {
    super() /* istanbul ignore next */
    this.game = game
    this.texts = texts.optionsContentTexts
    this.name = 'options'
    this.telegramStorage = telegramStorage
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

  hintsOn () {
    this.telegramStorage.hints = true
    this.owner.redraw()
  }

  hintsOff () {
    this.telegramStorage.hints = false
    this.owner.redraw()
  }

  pause () {
    this.game.inputHandler.setPause()
  }

  fullscreen () {
    if (this.game.state.scale.isFullScreen) {
      this.game.state.scale.stopFullScreen()
    } else {
      this.game.state.scale.startFullScreen(true)
    }
    this.owner.redraw()
  }

  createSections () {    
    this.sectionName('options')
    this.text(this.texts.soundVolume + ': ' + Math.round(this.game.music.volume * 100) + '%')
    if (this.game.music.mute) {
      this.button(this.texts.soundOn, this.musicOn, this)
    } else {
      this.button(this.texts.soundOff, this.musicOff, this, 'unusableButton')
    }
    if (!this.telegramStorage.hints) {
      this.button(this.texts.hintsOn, this.hintsOn, this)
    } else {
      this.button(this.texts.hintsOff, this.hintsOff, this, 'unusableButton')
    }    
    this.button(this.texts.increaseVolume, this.incVolume, this)
    this.button(this.texts.decreaseVolume, this.decVolume, this)
    this.button(this.texts.endGame, this.game.gameEvents.finishGame, this.game.gameEvents)
    this.button(this.texts.pause, this.pause, this)
    if (!this.game.state.scale.isFullScreen) {
      this.button(this.texts.fullscreenOn, this.fullscreen, this)
    } else {
      this.button(this.texts.fullscreenOff, this.fullscreen, this, 'unusableButton')
    }
  }
}
