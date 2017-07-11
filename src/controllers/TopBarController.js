import Controller from './Controller'

/**
 * Controller for game's topbar
 */
export default class TopBarController extends Controller {
  constructor ({ game, style, menuView, player, city }) {
    super(game, style, menuView)

    this.player = player
    this.city = city
  }

  /**
   * Creates the blueprint of the topBar
   * @param {*} timeEvent
   */
  createSections (timeEvent) {
    this.section()
    this.icon('time')
    this.text(timeEvent.toString(), 'small')

    this.section()
    this.icon('score')
    this.text('' + this.player.points)

    this.section()
    this.icon('cash')
    this.text('' + this.player.cash)

    this.section()
    this.icon('turnip')
    this.animatedBar(100, 40, true, this.city.fulfilledAndEarnings.percentage)
  }
}
