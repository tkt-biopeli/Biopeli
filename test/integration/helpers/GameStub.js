import MockerHandler from './MockerHandler'
import config from '../../../src/config'
const assert = require('assert')

/**
 * Mocks phaser
 */
export default class GameStub {

  /**
   * Mocks phaser
   * 
   * @param {object} param
   * 
   * @param {number} width
   * @param {number} height
   */
  constructor({ width, height }) {
    this.mockers = new MockerHandler()

    var remoteMockingFunction = mockers => () => ({
      renderXY: mockers.createOneValueMocker('renderXY', true),
      clear: mockers.createOneValueMocker('render.clear', true)
    })

    var remoteCamerafunction = cameraOwner => ({ x, y, width }) => {
      if (width == null) {
        cameraOwner.setCamera(x, y)
      }
    }

    var remoteButtonMarker = function (mockers) {
      var returnFunction = function () {
      }

      return returnFunction
    }

    var renderCreatorFunction = remoteMockingFunction(this.mockers)
    var cameraFunction = remoteCamerafunction(this)
    var buttonMarkerFunction = remoteButtonMarker(this.mockers)

    this.add = {
      helperFunction: remoteMockingFunction,

      tween: function () { return { to: cameraFunction } },

      text: (x, y, text) => ({
        anchor: { set: () => { } },
        x: x,
        y: y,
        text: text,
        destroy: () => { }
      }),

      renderTexture: renderCreatorFunction,

      group: this.mockers.createOneValueMocker('add.group', {
        add: function () { },
        removeAll: buttonMarkerFunction,
        removeChild: () => { },
        create: () => ({})
      }),

      sprite: this.mockers.createOneValueMocker('add.sprite', {
        reset: function () { }
      }),

      audio: this.mockers.createOneValueMocker('add.audio', {
        play: () => { },
        loopFull: () => { },
        stop: () => { }
      }),

      existing: this.mockers.createOneValueMocker('add.existing', {
      }),

      bitmapData: this.mockers.createOneValueMocker('add.bitmapData', {
        ctx: {
          fillStyle: "",
          beginPath: function () { },
          rect: function () { },
          fill: function () { }
        }
      })
    }

    this.make = {
      button: (x, y, asset, callback, context) => {
        return {
          type: 'button',
          x: x,
          y: y,
          asset: asset,
          callback: callback,
          context: context,
          destroy: () => { }
        }
      },

      graphics: this.mockers.createOneValueMocker('make.graphics', {
        beginFill: function () { },
        drawRoundedRect: function () { },
        drawRect: function () { },
        endFill: function () { }
      }),

      sprite: this.mockers.createOneValueMocker('make.sprite', {
        addChild: function () {
          return {
            removeChildren: function () { },
            destroy: function () {}
          }
        },
        addChildAt: function () {return {destroy: function() {}} },
        destroy: function () { },
        scale: { setTo: function () { } },
        anchor: { set: () => { } },
        removeChildren: function () { }

      })

    }

    this.world = {
      setBounds: function () { }
    }

    this.input = {
      activePointer: {
        position: {
          x: 0,
          y: 0
        }
      },

      onDown: { add: function () { } }
    }

    this.cursors = {
      up: {
        isDown: false,
        onDown: { add: function () { } }
      },
      down: {
        isDown: false,
        onDown: { add: function () { } }
      },
      left: {
        isDown: false,
        onDown: { add: function () { } }
      },
      right: {
        isDown: false,
        onDown: { add: function () { } }
      }
    }

    this.flowersKey = {
      isDown: false,
      onDown: { add: function () { } }
    }

    this.camera = {
      x: 0,
      y: 0,
      width: width
    }

    this.game = {
      width: width,
      height: height
    }

    this.world = {
      bringToTop: () => { },
      moveDown: () => { },
      setBounds: () => { }
    }

    this.state = {
      start: this.mockers.createOneValueMocker('end', 1)
    }

    this.cache = {
      getImage: () => ({ width: 1, height: 1 })
    }
  }

  /**
   * Set camera location
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera (x, y) {
    this.camera.x = x
    this.camera.y = y
  }

  /**
   * Move camera with given amounts
   * 
   * @param {number} x 
   * @param {number} y 
   */
  moveCamera (x, y) {
    this.camera.x += x
    this.camera.y += y
  }

  /**
   * Get location of camera
   * 
   * @return {x: number, y: number} - Camera coordinates
   */
  getCamera () {
    return {
      x: this.camera.x,
      y: this.camera.y
    }
  }

  /**
   * Set pointer to wanted point on screen
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setPointer (x, y) {
    this.input.activePointer.position.x = x
    this.input.activePointer.position.y = y
  }

  /**
   * Set cursor input
   * 
   * @param {boolean} up 
   * @param {boolean} down 
   * @param {boolean} left 
   * @param {boolean} right 
   */
  setCursors (up, down, left, right) {
    this.cursors.up.isDown = up
    this.cursors.down.isDown = down
    this.cursors.left.isDown = left
    this.cursors.right.isDown = right
  }
}
