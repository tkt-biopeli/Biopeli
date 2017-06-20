import MockerHandler from './MockerHandler'
import config from '../../../src/config'
const assert = require('assert')

/**
 * Mocks phaser
 */
export default class GameStub{

  /**
   * Mocks phaser
   * 
   * @param {object} param
   * 
   * @param {number} width
   * @param {number} height
   */
  constructor({width, height}){
    this.mockers = new MockerHandler()

    var remoteMockingFunction = mockers => () => ({
      renderXY: mockers.createOneValueMocker('renderXY', true),
      clear: mockers.createOneValueMocker('render.clear', true)
    })

    var remoteCamerafunction = cameraOwner => ({x,y}) => cameraOwner.setCamera(x, y)

    var remoteButtonMarker = function(mockers){
      var returnFunction = function(){
        mockers.markCalls('make.button')
        mockers.markCalls('add.text')
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
   * Set camera location
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setCamera(x, y){
    this.camera.x = x
    this.camera.y = y
  }

  /**
   * Move camera with given amounts
   * 
   * @param {number} x 
   * @param {number} y 
   */
  moveCamera(x, y){
    this.camera.x += x
    this.camera.y += y
  }

  /**
   * Get location of camera
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
   * Set pointer to wanted point on screen
   * 
   * @param {number} x 
   * @param {number} y 
   */
  setPointer(x, y){
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
  setCursors(up, down, left, right){
    this.cursors.up.isDown = up
    this.cursors.down.isDown = down
    this.cursors.left.isDown = left
    this.cursors.right.isDown = right
  }

  /**
   * Gives the size and coordinates of the n:th button in creation order of what exist
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

  getCurrentTexts(){
    var texts = this.mockers.getUnmarkedCalls('add.text')
    var textInformation = []
    for(let text of texts){
      textInformation.push({
        text: text[2],
        x: text[4],
        y: text[5]
      })
    }

    return textInformation
  }
}
