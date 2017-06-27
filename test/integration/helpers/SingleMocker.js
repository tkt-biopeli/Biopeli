
/**
 * Description goes here
 * 
 * @param { ??? } gives 
 * @param { ??? } gets 
 * 
 * @return { ??? }
 */
export default function SingleMocker(gives, gets) {
  var give = gives
  var get = gets

  var realMocker = function () {
    get.push(arguments)

    return give
  }

  return realMocker
}
