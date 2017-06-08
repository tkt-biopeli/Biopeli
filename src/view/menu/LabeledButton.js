export default function () {
  function addLabeledButton( { viewGroup, label, x, y, callback }) {
    var button = this.game.make.button(
            x, y, 'button', callback, this, 2, 1, 0)
    viewGroup.add(button)
  }
}

//
//export default class LabeledButton {
//  constructor( { viewGroup, label, x, y, callback }) {
//    var button = this.game.make.button(
//            x, y, 'button', callback, this, 2, 1, 0)
//    viewGroup.add(button)
//  }
//}

