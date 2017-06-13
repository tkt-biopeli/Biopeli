import MockerHandler from './MockerHandler'

export default class GameStub{
  constructor({width, height}){
    this.mockers = new MockerHandler()

    this.add = {
      tween: function(){return {to: function({x, y}){
        setCamera(x, y)
      }}},
      text: this.mockers.createOneValueMocker('add.text', {anchor: {set: function(){}}}),
      renderTexture: function(){
        return {
          renderXY: this.mockers.createOneValueMocker('render', true)
        }
      }
    }

    this.make = {
      button: this.mockers.createOneValueMocker('make.button', true),
      graphics: this.mockers.createOneValueMocker('make.graphics')
    }

    this.world = {

    }

    this.input = {
      activePointer: {position: {
        x: 0,
        y: 0
      }}
    }

    this.cursors = {
      up: {isDown: false},
      down: {isDown: false},
      left: {isDown: false},
      right: {isDown: false}
    }

    this.camera = {
      x: 0,
      y: 0
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
