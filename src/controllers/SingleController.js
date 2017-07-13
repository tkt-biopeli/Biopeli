import Controller from './Controller'

export default class SingleController extends Controller {
  constructor ({ game, style, menuView, content }) {
    super(game, style, menuView)

    this.content = content
    this.content.setOwner(this)
  }

  createSections () {
    this.content.createSections()
  }
}
