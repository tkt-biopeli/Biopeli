export default class IconComponent {
  constructor ({ text, fontSize, asset, assetHeight, assetWidth }) {
    this.type = 'labeledImage'
    this.text = text
    this.fontSize = fontSize
    this.asset = asset
    this.height = assetHeight
    this.width = assetWidth
  }
}
