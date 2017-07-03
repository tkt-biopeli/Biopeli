/**
 * Description goes here
 */
export default class GameOverGameState {
  /**
   * @param {Phaser.Game} param.state - Current state
   */
  constructor ({ state }) {
    this.state = state
    this.state.add.sprite(100, 200, 'gameover')
  }

  /**
   * Description goes here
   */
  update () {
   
  }

}
