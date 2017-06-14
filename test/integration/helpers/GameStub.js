import MockerHandler from './MockerHandler'
const assert = require('assert')

export default class GameStub{
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

    var renderCreatorFunction = remoteMockingFunction(this.mockers)

    this.add = {
      helperFunction: remoteMockingFunction,

      tween: function(){return {to: function({x, y}){
        setCamera(x, y)
      }}},

      text: this.mockers.createOneValueMocker('add.text', {anchor: {set: function(){}}}),

      renderTexture: renderCreatorFunction,

      group: this.mockers.createOneValueMocker('add.group', {
        add: function(){},
        removeAll: function(){},
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

  setCamera(x, y){
    this.camera.x = x,
    this.camera.y = y
  }

  setPointer(x, y){
    this.input.activePointer.position.x = x
    this.input.activePointer.position.y = y
  }

  setCursors(up, down, left, right){
    this.cursors.up.isDown = up
    this.cursors.down.isDown = down
    this.cursors.left.isDown = left
    this.cursors.rght.isDown = right
  }
}
