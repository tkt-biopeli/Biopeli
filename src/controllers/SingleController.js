import Controller from './Controller'

/**
 * Simple controller that has only one content
 */
export default class SingleController extends Controller {
  constructor ({ game, style, menuView, content }) {
    super(game, style, menuView)

    this.content = content
    this.content.setOwner(this)
  }

  /**
   * Makes the content create the content of a menu
   */
  createSections () {
    this.content.createSections()
  }
}
