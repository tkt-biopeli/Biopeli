export default class TextComponent {
  constructor (text, fontSize) {
    this.type = 'text'
    this.text = text
    this.fontSize = fontSize
    this.width = fontSize * text.length
    this.height = fontSize
  }
}
