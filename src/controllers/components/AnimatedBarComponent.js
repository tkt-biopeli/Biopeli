export default class AnimatedBarComponent {
  constructor ({ width, height, vertical, percent }) {
    this.type = 'bar'
    this.vertical = vertical
    this.height = height
    this.width = width
    this.percent = percent
  }
}
