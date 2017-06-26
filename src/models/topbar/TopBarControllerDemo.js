export default class TopBarControllerDemo {
  constructor({ player, topBar, topBarView }) {
    this.player = player
    this.topBar = topBar
    this.topBarView = topBarView
  }

  onTimer (timerEvent) {
    this.player.addPoints(10)
    this.topBar.setValueOf('score', this.player.getPoints())
    let r = Math.floor(Math.random() * 100)
    this.topBar.setValueOf('time', timerEvent.toString())
    this.topBar.setValueOf('turnip', r)
    this.topBarView.update()
  }

}
