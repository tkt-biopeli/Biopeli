export default class ButtonActionCreator {
  constructor({name, functionName}){
    this.name = name
    this.functionName = functionName
  }

  createAction(object, values){
    return new ButtonAction({
      name: name,
      functionToCall: object[functionName],
      valuesToCallWith = values})
  }
}
