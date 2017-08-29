const assert = require('assert')
const sinon = require('sinon')

import Palette from '../../../src/view/map/Palette'

describe('Palette tests', () => {
  var palette

  beforeEach(() => {
    palette = new Palette()
  })

  it('getDampnessColour method is functioning as expected', () => {
    palette.dampnessRainbow.colourAt = sinon.stub().withArgs(11).returns(631)
    assert.equal(palette.getDampnessColour(11), '0x631')
  })

  it('getFertilityColour method is functioning as expected', () => {
    palette.fertilityRainbow.colourAt = sinon.stub().withArgs(13).returns(743)
    assert.equal(palette.getFertilityColour(13), '0x743')
  })

  it('getBorderColour method is functioning as expected', () => {
    palette.randomRainbow.colourAt = sinon.stub().withArgs(23).returns(929)
    assert.equal(palette.getBorderColour(23), '0x929')
  })
})

