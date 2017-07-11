import Controller from './Controller'

export default class MulticontentController extends Controller {
  constructor ({game, style, menuView, contents, startIndex}) {
    super(game, style, menuView)

    this.contents = contents
    for(let content of this.contents){
      content.setOwner(this)
    }

    this.index = (startIndex != null ? startIndex : 0)
    this.getStack = []
  }

  createSections (timeEvent) {
    this.contents[this.index].createSections(timeEvent)

    if(this.getStack.length > 0){
      this.section()
      this.button('Takaisin', this.previousContent, this)
    }
  }

  current () {
    return this.contents[this.index]
  }

  previousContent () {
    this.index = this.getStack.pop()
    this.redraw()
  }

  changeContent (index) {
    this.getStack.push(this.index)
    this.index = index
    this.redraw()
  }

  changeButton (name, index) {
    this.button(name, (index => () => this.changeContent(index))(index), this)
  }
}