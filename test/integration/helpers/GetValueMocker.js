
/**
 * Description goes here
 * 
 * @param { ??? } gives 
 * @param { ??? } gets 
 * 
 * @return { ??? }
 */
export default function GetValueMocker(gets) {
  var get = gets
  var args = arguments.slice(1)

  var realMocker = function(){
    get.push(arguments)

    var o = {}
    for(let i = 0 ; i < args.length ; i++){
      o[args[i]] = arguments[i]
    }
    return o
  }

  return realMocker
}