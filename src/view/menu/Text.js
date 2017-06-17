
/**
 * Description goes here
 */
export default class Text {

  /**
   * Description goes here
   * @param {*} param0 
   */
  constructor({game, viewGroup, text, fontSize, x, y}){
    var style = {font: fontSize+"px Arial", fill: "#ffff00", align: "center"}
    var text = game.add.text(x, y, text, style, viewGroup)
  }
}
