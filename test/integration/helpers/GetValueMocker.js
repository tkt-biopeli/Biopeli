
/**
 * Description goes here
 * 
 * @param { ??? } gives 
 * @param { ??? } gets 
 * 
 * @return { ??? }
 */
export default function GetValueMocker(gets, values) {
  var get = gets

  var realMocker = function () {
    get.push(arguments)

    var o = {}
    for (let i = 0; i < values.length; i++) {
      o[values[i]] = arguments[i]
    }
    return o
  }

  return realMocker
}