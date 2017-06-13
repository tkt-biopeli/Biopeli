export default function Mocker(gives, gets) {
  var give = gives
  var get = gets
  var i = 0

  return function(){
    get.push(arguments)

    if(i < give.length) return give[i]
    return null
  }
}
