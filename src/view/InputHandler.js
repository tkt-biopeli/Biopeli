
/**
 * Description goes here
 */
export default class InputHandler {
  /**
   * Description goes here
   *
   * @param {Phaser.Game} param.game - Current game
   * @param {MapListener} param.mapListener - Current map listener
   * @param {CameraMover} param.cameraMover - Current camera mover
   */
  constructor ({ game, mapListener, cameraMover, mapView }) {
    this.game = game
    this.mapListener = mapListener
    this.cameraMover = cameraMover
    this.mapView = mapView

    this.initialize()
  }

  /**
   * add callbacks to controls -> Phaser takes care of update in game loop
   */
  initialize () {
    this.game.input.onDown.add(this.onPointerDown, this)
    var cursors = this.game.cursors
    cursors.up.onDown.add(this.onCursorDown, this)
    cursors.down.onDown.add(this.onCursorDown, this)
    cursors.left.onDown.add(this.onCursorDown, this)
    cursors.right.onDown.add(this.onCursorDown, this)
    // let daisiesKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    let flowersKey = this.game.flowersKey
    flowersKey.onDown.add(this.flowersOnOff, this)
    this.kineticScrolling()
  }

  /**
   * Description goes here
   */
  onPointerDown () {
    var ptr = this.game.input.activePointer
    var pointerEvent = {
      x: ptr.position.x,
      y: ptr.position.y
    }

    this.mapListener.update(pointerEvent)
  }

  /**
   * Description goes here
   */
  onCursorDown () {
    var cursors = this.game.cursors
    var cursorEvent = {
      up: cursors.up.isDown,
      down: cursors.down.isDown,
      left: cursors.left.isDown,
      right: cursors.right.isDown
    }

    this.cameraMover.update({ cursor: cursorEvent })
  }

  flowersOnOff () {
    this.mapView.showFlowers === true
      ? this.mapView.showFlowers = false
      : this.mapView.showFlowers = true
  }

  kineticScrolling () {
    // Configuration
    this.game.game.kineticScrolling.configure({
      kineticMovement: true,
      timeConstantScroll: 325, // really mimic iOS
      horizontalScroll: true,
      verticalScroll: true,
      horizontalWheel: false,
      verticalWheel: false,
      deltaWheel: 40
    })

    // Override function so that pointer on menu area does not register as movement
    let context = this.mapListener
    this.game.game.kineticScrolling.beginMove = function () {
      this.startX = this.game.input.x
      this.startY = this.game.input.y
      if (context.pointerInMapArea({ x: this.startX, y: this.startY })) {
        this.pressedDown = true
      }
      this.timestamp = Date.now()
      this.velocityY = this.amplitudeY = this.velocityX = this.amplitudeX = 0
    }, context;

    // Start scrolling = adds callbacks to game
    this.game.game.kineticScrolling.start()
  }
}
