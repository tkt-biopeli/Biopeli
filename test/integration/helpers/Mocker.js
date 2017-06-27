
/**
 * Description goes here
 * 
 * @param { ??? } gives 
 * @param { ??? } gets 
 * 
 * @return { ??? }
 */
export default function Mocker(gives, gets) {
  var give = gives
  var get = gets
  var i = 0

  var realMocker = function () {
    get.push(arguments)

    if (i < give.length) return give[i]
    return null
  }

  return realMocker
}
