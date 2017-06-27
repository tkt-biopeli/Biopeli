import GameAdvancer from './helpers/GameAdvancer'

describe('Integration test: Pressing cursor buttons move the camera', () => {

  var game
  var gameState
  var gameAdvancer
  var gameStateChecker

  before(() => {
    gameAdvancer = new GameAdvancer()
    game = gameAdvancer.game
    gameState = gameAdvancer.gameState
    gameStateChecker = gameAdvancer.gamestateChecker
  })

  it('Moving camera changes camera coordinates correctly', () => {
    gameAdvancer.pressCursors(false, false, false, true)

    gameStateChecker.checkCameraLocation(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(false, false, true, false)

    gameStateChecker.checkCameraLocation(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(false, true, false, true)

    gameStateChecker.checkCameraLocation(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(false, true, false, true)

    gameStateChecker.checkCameraLocation(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(true, false, false, true)

    gameStateChecker.checkCameraLocation(gameAdvancer.estimatedCameraLocation())
  })

  it('There is always right tile under camera', () => {
    gameAdvancer.resetCamera()

    gameAdvancer.pressCursors(false, false, false, true)

    gameStateChecker.checkTileUnderCamera(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(false, false, false, true)

    gameStateChecker.checkTileUnderCamera(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(false, true, false, true)

    gameStateChecker.checkTileUnderCamera(gameAdvancer.estimatedCameraLocation())

    gameAdvancer.pressCursors(true, false, true, false)

    gameStateChecker.checkTileUnderCamera(gameAdvancer.estimatedCameraLocation())
  })
})
