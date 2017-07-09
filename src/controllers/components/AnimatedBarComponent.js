export default class AnimatedBarComponent {
  constructor ({ width, height, horizontal, percent }) {
    this.type = 'bar'
    this.horizontal = horizontal
    this.height = height
    this.width = width
    this.percent = percent
  }
}
