import MenuContent from './MenuContent'
/**
 * Controller for game's topbar
 */
export default class TopBarContent extends MenuContent {
  constructor ({ player, city }) {
    super()
    this.player = player
    this.city = city
  }

  /**
   * Creates the blueprint of the topBar
   * @param {*} timeEvent
   */
  createSections (timeEvent) {
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
