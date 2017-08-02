import Content from './Content'

export default class BottomContent extends Content {
  constructor ({ mapView }) {
    super()

    this.mapView = mapView
  }

  createSections () {
    this.sectionName('mapRadio')
    this.owner.radio('map', true, 'emptyButton', 'unusableButton', 0,
      { name: 'n', function: () => { }, context: null },
      { name: 'w', function: () => { }, context: null },
      { name: 'f', function: () => { }, context: null },
      { name: 'p', function: () => { }, context: null }
    )
  }
}
