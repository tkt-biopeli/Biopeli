import AbstractMenu from './AbstractMenu'

/**
 * Game instructions
 */
export default class extends AbstractMenu {
  create () {
    super.create()
    this.createTitle('Ohjeet')
    this.createDescription('Trycka på knappen')
    this.createButton('knapp', () => { this.state.start('Start') })
  }
}
