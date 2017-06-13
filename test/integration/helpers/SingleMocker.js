export default function SingleMocker(gives, gets){
  var give = gives
  var get = gets

  return new function(){
    get.push(arguments)

    return give
  }
}
