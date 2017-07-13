import Controller from './Controller'

export default class MulticontentController extends Controller {
  constructor ({ game, style, menuView, contents, startIndex }) {
    super(game, style, menuView)

    this.contents = contents
    for (let content of this.contents) {
      content.setOwner(this)
    }

    this.startIndex = (startIndex != null ? startIndex : 0)
    this.index = this.startIndex

    this.getStack = []
  }

  createSections () {
    this.contents[this.index].createSections()

    if (this.getStack.length > 0) {
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

  changeButton (name, index, extraFunction, context) {
    this.button(name,
      ((index, extraFunction, context) => () => {
        if (extraFunction != null) {
          extraFunction.call(context)
        }
        this.changeContent(index)
      })(index, extraFunction, context), this)
  }

  reset () {
    this.index = this.startIndex
    this.getStack = []

    super.reset()
  }
}
