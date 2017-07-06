import TextComponent from './components/TextComponent'
import ButtonComponent from './components/ButtonComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'
import IconComponent from './components/IconComponent'
import config from '../config'

export default class Controller {

  constructor(game, fontSize){
    this.game = game
    this.fontSize = fontSize
  }

  redraw (timeEvent) {
    this.menuView.draw(this.buildSections(timeEvent))
  }

  buildSections (timeEvent) {
    this.sections = []
    this.section()

    this.createSections(timeEvent)

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

  text (text) {
    this.currentSection.push(new TextComponent(text, this.fontSize))
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
        height: config.menuButtonHeight,
        width: config.menuButtonWidth,
        fontSize: config.menuFontSize
      })
    )
  }

  add (component) {
    this.currentSection.push(component)
  }
}