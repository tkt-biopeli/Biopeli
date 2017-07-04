import IconComponent from './components/IconComponent'
import TextComponent from './components/TextComponent'
import AnimatedBarComponent from './components/AnimatedBarComponent'

export default class TopBarController {
  constructor ({ menuView, player, city }) {
    this.menuView = menuView
    this.player = player
    this.city = city
  }

  redraw (timeEvent) {
    this.menuView.draw(this.createSections(timeEvent))
  }

  createSections (timeEvent) {
    return [
      [
        new IconComponent({
          asset: 'time',
          assetWidth: 64,
          assetHeight: 64
        }),
        new TextComponent(timeEvent.toString(), 20)
      ],
      [
        new IconComponent({
          asset: 'score',
          assetWidth: 64,
          assetHeight: 64
        }),
        new TextComponent('' + this.player.points, 30)
      ],
      [
        new IconComponent({
          asset: 'cash',
          assetHeight: 64,
          assetWidth: 64
        }),
        new TextComponent('' + this.player.cash, 30)
      ],
      [
        new IconComponent({
          asset: 'turnip',
          assetWidth: 64,
          assetHeight: 64
        }),
        new AnimatedBarComponent({
          width: 100,
          height: 40,
          horizontal: true,
          percent: this.city.fulfilledAndEarnings.percentage / 100
        })
      ]
    ]
  }
}
