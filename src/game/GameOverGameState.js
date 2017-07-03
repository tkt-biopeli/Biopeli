/**
 * Description goes here
 */
export default class GameState {
  /**
   * @param {Phaser.Game} param.state - Current state
   */
  constructor ({ state }) {
    this.state = state
  }

  /**
   * Description goes here
   */
  update () {
    this.state.add.sprite(0, 0, 'gameover')
  }

}
