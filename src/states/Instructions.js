import AbstractMenu from './AbstractMenu'

/**
 * Game instructions
 */
export default class extends AbstractMenu {
  create () {
    this.initializeMenu('start', this.camera.height / 4)
    this.createTitle('Ohjeet')
    this.createDescription('Trycka på knappen')
    this.createButton('knapp', () => { this.state.start('Start') })
    this.finishMenu()
  }
}
