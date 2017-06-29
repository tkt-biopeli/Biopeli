export default class TopBarControllerDemo {
  constructor ({ topBar, topBarView }) {
    this.topBar = topBar
    this.topBarView = topBarView
  }

  update( {time, score, cash, fulfilledPct }) {
    this.topBar.setValueOf('score', score)
    this.topBar.setValueOf('time', time)
    this.topBar.setValueOf('turnip', fulfilledPct)
    this.topBar.setValueOf('cash', cash)
    this.topBarView.update()
  }
}
