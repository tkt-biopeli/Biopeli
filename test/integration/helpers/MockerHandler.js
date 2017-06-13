import Mocker from './Mocker'
import SingleMocker from './SingleMocker'

export default class MockerHandler{
  consturctor(){
    this.mockers = new Map()
  }

  createOneValueMocker(tag, value){
    return createMocker(tag, value, SingleMocker)
  }

  createSeveralValueMocker(tag, values){
    return createMocker(tag, values, Mocker)
  }

  createMocker(tag, values, createFunction){
    var gets = []
    var mocker = createFunction(values, gets)

    var save = {mocker: mocker, gets: gets}
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

}
