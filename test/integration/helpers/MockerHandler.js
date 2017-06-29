import Mocker from './Mocker'
import SingleMocker from './SingleMocker'
import GetValueMocker from './GetValueMocker'
const assert = require("assert")

/**
 * Description goes here
 */
export default class MockerHandler {

  /**
   * Description goes here
   */
  constructor() {
    this.mockers = new Map()
  }

  /**
   * Description goes here
   * 
   * @param { ???} tag 
   * @param { ??? } value 
   * 
   * @return { ??? }
   */
  createOneValueMocker(tag, value) {
    var gets = []
    var mocker = SingleMocker(value, gets)

    return this.createMocker(tag, mocker, gets)
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * @param { ??? } values 
   * 
   * @return { ??? }
   */
  createSeveralValueMocker(tag, values) {
    var gets = []
    var mocker = Mocker(values, gets)

    return this.createMocker(tag, mocker, gets)
  }

  createGetValueMocker(tag) {
    var gets = []
    var mocker = GetValueMocker(gets, Array.prototype.slice.call(arguments, 1))

    return this.createMocker(tag, mocker, gets)
  }

  /**
   * description goes here
   * 
   * @param { ??? } tag 
   * @param { ??? } mocker 
   * @param { ??? } gets 
   * 
   * @return { ??? }
   */
  createMocker(tag, mocker, gets) {
    var save = { mocker: mocker, gets: gets, mark: 0 }
    this.mockers.set(tag, save)

    return mocker
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return { ??? }
   */
  getMocker(tag) {
    var mocker = this.mockers.get(tag)

    if (mocker == null) throw 'Mocker not found'

    return mocker
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * @param {number} index
   * 
   * @return {*} 
   */
  getCall(tag, index) {
    var mocker = this.getMocker(tag)

    return mocker.gets[index]
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return { ??? }
   */
  getCalls(tag) {
    var mocker = this.getMocker(tag)

    return mocker.gets
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return { ??? }
   */
  getUnmarkedCalls(tag) {
    var mocker = this.getMocker(tag)

    return mocker.gets.slice(mocker.mark)
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return { ??? }
   */
  callCount(tag) {
    var mocker = this.getMocker(tag)

    return mocker.gets.length
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return {Boolean}
   */
  hasBeenCalledWith(tag) {
    var time = this.firstCallTime(arguments)

    return time != -1
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   * 
   * @return {Number}
   */
  firstCallTime(tag) {
    var mocker = this.getMocker(tag)

    var gets = mocker.gets
    var args = arguments.slice(1)
    for (var i = 0; i < gets; i++) {
      if (gets[i] == args) return i
    }

    return -1
  }

  /**
   * Description goes here
   * 
   * @param { ??? } tag 
   */
  markCalls(tag) {
    var mocker = this.getMocker(tag)

    mocker.mark = mocker.gets.length
  }

}
