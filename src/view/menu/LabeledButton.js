import config from '../../config'

export default class LabeledButton {
  constructor( { game, viewGroup, label, x, y, callback, context, buttonWidth, buttonHeight }) {
    var style = {font: config.font, fill: config.textColor, align: config.textAlignment}
    
    var button = game.make.button(x, y, 'emptyButton', callback, context)
    viewGroup.add(button)
    // this method call creates a 'text' object and adds it to viewGroup
    var text = game.add.text(
            Math.floor(x + buttonWidth / 2),
            Math.floor(y + buttonHeight / 2), label, style, viewGroup)
    text.anchor.set(config.menuTextStartingPoint, config.menuTextStartingPoint)
  }
}
