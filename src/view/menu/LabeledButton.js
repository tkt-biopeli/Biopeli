export default class LabeledButton {
  constructor( { game, viewGroup, label, x, y, callback, context }) {
    var button = game.make.button(x, y, 'button', callback, context, 2, 1, 0)
    var buttonWidth = 193
    var buttonHeight = 71
    viewGroup.add(button)
    var style = {
      font: "16px Arial",
      fill: "#ffff00",
      align: "center"}
    var text = game.add.text(
            Math.floor(x + buttonWidth / 2),
            Math.floor(y + buttonHeight / 2), label, style, viewGroup)
    text.anchor.set(0.5, 0.5)
  }
}
