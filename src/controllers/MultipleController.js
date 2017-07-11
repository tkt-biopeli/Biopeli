import Controller from './Controller'

export default class MultipleController extends Controller {
  constructor ({game, menuView, subcontrollers, startIndex}) {
    super(game, null, menuView)
    this.subcontrollers = subcontrollers
    this.index = (startIndex != null ? startIndex : 0)
    this.getStack = []
    this.style = this.current().style
  }

  createSections (timeEvent) {
    this.addSections(this.subcontrollers[this.index].buildSections(timeEvent))

    if(this.getStack.length > 0){
      this.section()
      this.button('Takaisin', this.previousController, this)
    }
  }

  current () {
    return this.subcontrollers[this.index]
  }

  previousController () {
    this.index = this.getStack.pop()
    this.style = this.current().style
  }

  changeController (index) {
    this.getStack.push(this.index)
    this.index = index
    this.style = this.current().style
  }

  changeButton (name, index) {
    this.button(name, index => this.changeController(index), this)
  }
}