import MockerHandler from './MockerHandler'
const assert = require('assert')

/**
 * Description goes here
 */
export default class GameStub{

  /**
   * Description goes here
   * 
   * @param {object} param
   * 
   * @param {number} width
   * @param {number} height
   */
  constructor({width, height}){
    this.mockers = new MockerHandler()

    var remoteMockingFunction = function(mockers){
      var realFunction = function(){
        return {
          renderXY: mockers.createOneValueMocker('renderXY', true),
          clear: mockers.createOneValueMocker('render.clear', true)
        }
      }

      return realFunction
    }

    var remoteCamerafunction = function(cameraOwner){
      var returnFunction = function({x, y}){
        cameraOwner.setCamera(x, y)
      }

      return returnFunction
    }

    var remoteButtonMarker = function(mockers){
      var returnFunction = function(){
        mockers.markCalls('make.button')
      }

      return returnFunction
    }

    var renderCreatorFunction = remoteMockingFunction(this.mockers)
    var cameraFunction = remoteCamerafunction(this)
    var buttonMarkerFunction = remoteButtonMarker(this.mockers)

    this.add = {
      helperFunction: remoteMockingFunction,

      tween: function(){return {to: cameraFunction}},

      text: this.mockers.createOneValueMocker('add.text', {anchor: {set: function(){}}}),

      renderTexture: renderCreatorFunction,

      group: this.mockers.createOneValueMocker('add.group', {
        add: function(){},
        removeAll: buttonMarkerFunction,
        create: function(){}
      }),

      sprite: this.mockers.createOneValueMocker('add.sprite', {
        reset: function(){}
      })
    }

    this.make = {
      button: this.mockers.createOneValueMocker('make.button', true),

      graphics: this.mockers.createOneValueMocker('make.graphics', {
        beginFill: function(){},
        drawRoundedRect: function(){},
        endFill: function(){}
      }),

      sprite: this.mockers.createOneValueMocker('make.sprite', {addChild: function(){}})

    }

    this.world = {
      setBounds: function(){}
    }

    this.input = {
      activePointer: {position: {
        x: 0,
        y: 0
      }},

      onDown: {add: function(){}}
    }

    this.cursors = {
      up: {
        isDown: false,
        onDown: {add: function(){}}
      },
      down: {
        isDown: false,
        onDown: {add: function(){}}
      },
      left: {
        isDown: false,
        onDown: {add: function(){}}
      },
      right: {
        isDown: false,
        onDown: {add: function(){}}
      }
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
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera(x, y){
    this.camera.x = x
    this.camera.y = y
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   */
  moveCamera(x, y){
    this.camera.x += x
    this.camera.y += y
  }

  /**
   * Description goes here
   * 
   * @return {x: number, y: number} - Camera coordinates
   */
  getCamera(){
    return {
      x: this.camera.x,
      y: this.camera.y
    }
  }

  /**
   * Description goes here
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setPointer(x, y){
    this.input.activePointer.position.x = x
    this.input.activePointer.position.y = y
  }

  /**
   * Description goes here
   * 
   * @param {boolean} up 
   * @param {boolean} down 
   * @param {boolean} left 
   * @param {boolean} right 
   */
  setCursors(up, down, left, right){
    this.cursors.up.isDown = up
    this.cursors.down.isDown = down
    this.cursors.left.isDown = left
    this.cursors.right.isDown = right
  }

  /**
   * Description goes here
   * 
   * @param {number} n 
   * 
   * @return {{x: ???, y: ???, width: ???, height: ???}}
   */
  getNthActiveButton(n){
    var buttonCalls = this.mockers.getUnmarkedCalls('make.button')

    var call = buttonCalls[n]

    return {
      x: call[3],
      y: call[4],
      width: call[7],
      height: call[8]
    }
  }
}
