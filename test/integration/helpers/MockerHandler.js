import Mocker from './Mocker'
import SingleMocker from './SingleMocker'
const assert = require("assert")

export default class MockerHandler{
  constructor(){
    this.mockers = new Map()
  }

  createOneValueMocker(tag, value){
    var gets = []
    var mocker = SingleMocker(value, gets)

    return this.createMocker(tag, mocker, gets)
  }

  createSeveralValueMocker(tag, values){
    var gets = []
    var mocker = Mocker(values, gets)

    return this.createMocker(tag, mocker, gets)
  }

  createMocker(tag, mocker, gets){
    var save = {mocker: mocker, gets: gets, mark: 0}
    this.mockers.set(tag, save)

    return mocker
  }

  getMocker(tag){
    var mocker = this.mockers.get(tag)

    if(mocker == null) throw 'Mocker not found'

    return mocker
  }

  getCall(tag, index){
    var mocker = this.getMocker(tag)

    return mocker.gets[index]
  }

  getCalls(tag){
    var mocker = this.getMocker(tag)

    return mocker.gets
  }

  getUnmarkedCalls(tag){
    var mocker = this.getMocker(tag)

    return mocker.gets.slice(mocker.mark)
  }

  callCount(tag){
    var mocker = this.getMocker(tag)

    return mocker.gets.length
  }

  hasBeenCalledWith(tag){
    var time = this.firstCallTime(arguments)

    return time != -1
  }

  firstCallTime(tag){
    var mocker = this.getMocker(tag)

    var gets = mocker.gets
    var args = arguments.slice(1)
    for(var i = 0 ; i < gets ; i++){
      if(gets[i] == args) return i
    }

    return -1
  }

  markCalls(tag){
    var mocker = this.getMocker(tag)

    mocker.mark = mocker.gets.length
  }

}
