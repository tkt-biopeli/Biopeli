import MenuContent from './MenuContent'
/**
 * Controller for game's topbar
 */
export default class TopBarContent extends MenuContent {
  constructor ({ player, city, timer }) {
    super()
    this.player = player
    this.city = city
    this.timer = timer
  }

  /**
   * Creates the blueprint of the topBar
   */
  createSections () {
    this.icon('time')
    this.text(this.timer.currentTimeEvent.toString(), 'small')

    this.section()
    this.icon('score')
    this.text('' + this.player.points)

    this.section()
    this.icon('cash')
    this.text('' + this.player.cash)

    this.section()
    this.icon('turnip')
    this.animatedBar(100, 40, true, this.city.turnipDemand.percentageSupplied())
  }
}
