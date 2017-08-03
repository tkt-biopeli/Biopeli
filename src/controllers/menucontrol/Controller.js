import TextComponent from './components/TextComponent'
import ButtonComponent from './components/ButtonComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'
import IconComponent from './components/IconComponent'
import MenuComponent from './components/MenuComponent'
import Section from './components/MenuSection'
import ResetDecorator from './helpers/ResetDecorator'
import StateSetDecorator from './helpers/StateSetDecorator'

/**
 * The base class for controllers. Takes care of creating components, giving
 * them to menuView, and holding the inner state of the controller
 */
export default class Controller {
  constructor (game, style, menuView) {
    this.game = game
    this.style = style
    this.menuView = menuView
    this.state = new Map()
  }

  /**
   * Creates the components and gives them to menuView
   */
  redraw () {
    this.menuView.draw(this.buildSections())
  }

  /**
   * Initializes the class for contentcreators and calls the creation 
   * function of non-abstract classes
   */
  buildSections () {
    this.initialize()
    this.createSections()
    return this.sections
  }

  /**
   * Sets up sections
   */
  initialize () {
    this.sections = []
    this.section()
  }

  /**
   * When using controller alone, draws the sections created
   */
  finish () {
    this.menuView.draw(this.sections)
  }

  /**
   * Adds new section to section list
   */
  section (name) {
    this.currentSection = new Section(name)
    this.sections.push(this.currentSection)
  }

  /**
   * Creates submenu to the menu. Returns controller that creates components to submenu
   *
   * @param {*} layoutType
   * @param {*} perpindicular
   * @param {*} linePadding
   * @param {*} sectionPadding
   */
  submenu (layoutType, perpindicular, linePadding, sectionPadding) {
    var sections = []
    var menuVertical = this.menuView.layout.vertical
    var menu = new MenuComponent({
      layoutType: layoutType,
      sectionPadding: sectionPadding,
      linePadding: linePadding,
      vertical: menuVertical !== perpindicular,
      sections: sections
    })

    this.currentSection.components.push(menu)
    var controller = new Controller(this.game, this.style)
    controller.sections = sections
    controller.section()

    return controller
  }

  /**
   * Creates a new radio button set
   */
  radio (name, perpindicular, activeAsset, inactiveAsset, initActive, ...buttonInfos) {
    var selectedButton = this.getActiveRadioButton(name, initActive)
    var submenuController = this.submenu('static', perpindicular, 0)

    for (let i = 0; i < buttonInfos.length; i++) {
      var info = buttonInfos[i]
      var action = { function: info.function, context: info.context }
      var radioDecorator = new StateSetDecorator({
        action: action,
        controller: this,
        name: name + 'Radio',
        value: i
      })

      let asset = inactiveAsset
      if (selectedButton === i) { asset = activeAsset }

      submenuController.button(i.name, radioDecorator.act, radioDecorator, asset)
    }
  }

  getActiveRadioButton (name, initActive) {
    if (this.hasStateValue(name)) {
      return this.stateValue(name)
    }
    this.state.set(name, initActive)
    return initActive
  }

  /**
   * Creates new icon component
   * @param {*} asset
   */
  icon (asset) {
    this.currentSection.components.push(
      new IconComponent({
        asset: asset,
        assetWidth: this.game.cache.getImage(asset).width,
        assetHeight: this.game.cache.getImage(asset).height
      })
    )
  }

  /**
   * Creates new text component
   */
  text (text, size) {
    var fontSize = this.style.mediumFont
    if (size != null) {
      fontSize = this.style[size + 'Font']
    }

    this.currentSection.components.push(new TextComponent(text, fontSize))
  }

  /**
   * Creates new animated bar
   *
   * @param {*} width
   * @param {*} height
   * @param {*} horizontal does the bar's size grow horizontal or vertical
   * @param {*} percent the amount of the bar that is filled
   */
  animatedBar (width, height, vertical, percent) {
    this.currentSection.components.push(new AnimatedBarComponent({
      width: width,
      height: height,
      vertical: vertical,
      percent: percent
    }))
  }

  /**
   * Creates new button
   *
   * @param {*} name the text in the button
   * @param {*} functionToCall
   * @param {*} context
   * @param {*} asset
   */
  button (name, functionToCall, context, asset) {
    if (asset == null) {
      asset = 'emptyButton'
    }

    this.currentSection.components.push(
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

  /**
   * Adds pre-created component to the section
   *
   * @param {*} component
   */
  add (component) {
    this.currentSection.components.push(component)
  }

  /**
   * Adds a pre-created section to the sections.
   * The section is new the current one
   * @param {*} section
   */
  addSection (section) {
    this.sections.push(section)
    this.currentSection = section
  }

  /**
   * Adds several sections to the current section list.
   * Last of them will be the current one
   *
   * @param {*} sections
   */
  addSections (sections) {
    this.sections = this.sections.concat(sections)
    this.currentSection = this.sections[this.sections.length - 1]
  }

  /**
   * Automatically creates a button with 
   * reset decorator on with given parameters
   *
   * @param {*} name text in button
   * @param {*} asset
   * @param {*} functionToCall the function to call before resetting the menu
   * @param {*} context context for the function
   * @param {*} callValues values the function is called with
   */
  resetDecoratedButton (name, asset, functionToCall, context, ...callValues) {
    var wrapped = this.wrapFunctionValueArray(
      functionToCall, context, callValues
    )
    var rd = new ResetDecorator({
      action: {
        function: wrapped,
        context: this
      },
      controller: this
    })
    this.button(name, rd.act, rd, asset)
  }

  /**
   * Creates a button that calls function with call values
   *
   * @param {*} name
   * @param {*} asset
   * @param {*} functionToCall
   * @param {*} context
   * @param {*} callValues the values the function is called with
   */
  wrappedButton (name, asset, functionToCall, context, ...callValues) {
    this.button(
      name, 
      this.wrapFunctionValueArray(
        functionToCall, context, callValues
      ), 
      context, 
      asset
    )
  }

  /**
   * Creates a button that gives given value to the controller state
   *
   * @param {*} name
   * @param {*} asset
   * @param {*} stateName
   * @param {*} value
   */
  addStateButton (name, asset, stateName, value) {
    this.wrappedButton(name, asset, this.addState, this, stateName, value)
  }

  /**
   * Wraps the function call in a function
   *
   * @param {*} func
   * @param {*} context
   * @param {*} values
   */
  wrapFunction (func, context, ...values) {
    return this.wrapFunctionValueArray(func, context, values)
  }

  /**
   * Wraps the function call in a function. Takes call values in array
   *
   * @param {*} func
   * @param {*} context
   * @param {*} values
   */
  wrapFunctionValueArray (func, context, values) {
    var fn = (func, context, values) => () => func.apply(context, values)
    return fn(func, context, values)
  }

  /**
   * Adds given value to the state,
   * or updates the value to the given if it already exist
   *
   * @param {*} name
   * @param {*} value
   */
  addState (name, value) {
    this.state.set(name, value)
    this.redraw()
  }

  /**
   * Gives the value of a state variable
   *
   * @param {*} name
   */
  stateValue (name) {
    return this.state.get(name)
  }

  /**
   * Does the state have given value
   *
   * @param {*} name
   */
  hasStateValue (name) {
    return this.state.get(name) != null
  }

  /**
   * Resets the controller by emptying its state and redrawing it
   */
  reset () {
    this.state.clear()
    this.redraw()
  }
}
