import TextComponent from './components/TextComponent'
import ButtonComponent from './components/ButtonComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'
import IconComponent from './components/IconComponent'

export default class Controller {
  constructor (game, style) {
    this.game = game
    this.style = style
  }

  redraw (timeEvent) {
    this.menuView.draw(this.buildSections(timeEvent))
  }

  buildSections (timeEvent) {
    this.initialize()

    this.createSections(timeEvent)

    return this.sections
  }

  initialize () {
    this.sections = []
    this.section()
  }

  finish () {
    return this.sections
  }

  section () {
    this.currentSection = []
    this.sections.push(this.currentSection)
  }

  icon (asset) {
    this.currentSection.push(
      new IconComponent({
        asset: asset,
        assetWidth: this.game.cache.getImage(asset).width,
        assetHeight: this.game.cache.getImage(asset).height
      })
    )
  }

  text (text, size) {
    var fontSize = this.style.mediumFont
    if (size != null) {
      fontSize = this.style[size + 'Font']
    }

    this.currentSection.push(new TextComponent(text, fontSize))
  }

  animatedBar (width, height, horizontal, percent) {
    this.currentSection.push(new AnimatedBarComponent({
      width: 100,
      height: 40,
      horizontal: true,
      percent: this.city.fulfilledAndEarnings.percentage / 100
    }))
  }

  button (name, functionToCall, context) {
    this.currentSection.push(
      new ButtonComponent({
        name: name,
        functionToCall: functionToCall,
        context: context,
        height: this.style.buttonHeight,
        width: this.style.buttonWidth,
        fontSize: this.style.mediumFont
      })
    )
  }

  add (component) {
    this.currentSection.push(component)
  }
}
