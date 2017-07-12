import TextComponent from './components/TextComponent'
import ButtonComponent from './components/ButtonComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'
import IconComponent from './components/IconComponent'

export default class Controller {
  constructor (game, style, menuView) {
    this.game = game
    this.style = style
    this.menuView = menuView

    this.state = new Map()
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
    this.menuView.draw(this.sections)
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
      percent: percent / 100
    }))
  }

  button (name, functionToCall, context, asset) {
    if (asset == null) {
      asset = 'emptyButton'
    }

    this.currentSection.push(
      new ButtonComponent({
        name: name,
        functionToCall: functionToCall,
        context: context,
        height: this.style.buttonHeight,
        width: this.style.buttonWidth,
        fontSize: this.style.mediumFont,
        asset: asset
      })
    )
  }

  wrappedButton(name, asset, functionToCall, context, ...callValues){
    this.button(name, this.wrapFunctionValueArray(functionToCall, context, callValues), context, asset)
  }

  addStateButton(name, asset, stateName, value) {
    this.wrappedButton(name, asset, this.addState, this, stateName, value)
  }

  add (component) {
    this.currentSection.push(component)
  }

  addSection (section) {
    this.sections.push(section)
    this.currentSection = section
  }

  addSections (sections) {
    this.sections = this.sections.concat(sections)
    this.currentSection = this.sections[this.sections.length - 1]
  }

  wrapFunction (func, context, ...values) {
    return this.wrapFunctionValueArray(func, context, values)
  }

  wrapFunctionValueArray (func, context, values) {
    return ((func, context, values) => () => func.apply(context, values))(func, context, values)
  }

  addState (name, value) {
    this.state.set(name, value)
    this.atStateChange()
  }

  stateValue (name) {
    return this.state.get(name)
  }

  hasStateValue (name) {
    return this.state.get(name) != null
  }

  atStateChange () {
    this.redraw()
  }

  reset () {
    this.state.clear()
    this.redraw()
  }
}
