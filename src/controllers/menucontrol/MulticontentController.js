import Controller from './Controller'

/**
 * Controller that has multiple different content creators it can switch between
 */
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

  /**
   * Draws the section with the currently chosen content creator. If user has
   * moved to the current content from some other content, "Back"-button is
   * created
   */
  createSections () {
    if (this.index !== 3 && this.index !== 4) {
      this.section('option')
      this.button('Valikko', this.getOptions, this)
    }

    if (this.index === 0 || this.index === 3) {
      this.section('layer')
      this.button('Näkymät', this.getLayers, this)
    }

    this.contents[this.index].createSections()

    if (this.index > 1) {
      this.section('back')
      this.button('Takaisin', this.previousContent, this)
    }
  }

  getLayers () {
    this.changeContent(4)
  }

  getOptions () {
    this.changeContent(3)
  }

  /**
   * The content creator currently active
   */
  current () {
    return this.contents[this.index]
  }

  /**
   * Rechooses the previous content creator
   */
  previousContent () {
    this.index = this.getStack.pop()
    this.redraw()
  }

  /**
   * Chooses a new content creator and saves the change
   */
  changeContent (index) {
    this.getStack.push(this.index)
    this.index = index
    this.redraw()
  }

  setContent (index) {
    this.index = index
    this.redraw()
  }

  /**
   * Creates a button that changes the current content creator to the given
   *
   * @param {*} name text in the button
   * @param {*} index the index of the content
   * @param {*} extraFunction function that is called before the change
   * @param {*} context context of the extra function
   */
  changeButton (name, index, extraFunction, context) {
    this.button(name,
      ((index, extraFunction, context) => () => {
        if (extraFunction != null) {
          extraFunction.call(context)
        }
        this.changeContent(index)
      })(index, extraFunction, context), this)
  }

  /**
   * Resets the content change stack and also resets the whole controller
   */
  reset () {
    this.index = this.startIndex
    this.getStack = []

    super.reset()
  }
}
