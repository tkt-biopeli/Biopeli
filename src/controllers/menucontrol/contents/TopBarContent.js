import Content from './Content'
/**
 * Controller for game's topbar
 */
export default class TopBarContent extends Content {
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
    this.sectionName('time')
    this.icon('time')
    this.text(this.timer.currentTimeEvent.toString(), 'small')

    this.section('points')
    this.icon('score')
    this.text('' + this.format(this.player.points))

    this.section('money')
    this.icon('cash')
    this.text('' + this.format(this.player.cash))

    this.section('demand')
    this.icon('turnip')
    this.animatedBar(
      100, 40, false,
      this.city.turnipDemand.percentageSupplied()
    )
  }
}
