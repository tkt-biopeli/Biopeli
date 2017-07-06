import IconComponent from './components/IconComponent'
import TextComponent from './components/TextComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'
import Controller from './Controller'

export default class TopBarController extends Controller{
  constructor ({ game, menuView, player, city }) {
    super(game, 20)
    this.menuView = menuView
    this.player = player
    this.city = city
  }

  createSections (timeEvent) {
    this.icon('time')
    this.text(timeEvent.toString())

    this.section()
    this.icon('score')
    this.text('' + this.player.points)

    this.section()
    this.icon('turnip')
    this.animatedBar(100, 40, true, this.city.fulfilledAndEarnings.percentage)
  }
}
