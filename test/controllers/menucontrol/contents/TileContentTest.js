const assert = require('assert')
const sinon = require('sinon')
import TileContent from '../../../../src/controllers/menucontrol/contents/TileContent'

describe('Tile content tests', ()=>{
  var content, owner, tile, structure
  var createButtonsSpy, tileInfoSpy, structureInfoSpy, structureRuiningSpy
  var hasCashStub, healthPctStub
  var buttonSpy

  beforeEach(()=>{
    buttonSpy = sinon.spy()
    hasCashStub = sinon.stub()
    healthPctStub = sinon.stub()

    structure = {
      health: {
        toString: () => {return 'foo'},
        percent: healthPctStub
      },
      healthManager: {
        fix: () => {},
        fixPrice: () => {return 9999}
      }
    }

    tile = {
      structure: null
    }

    content = new TileContent({
      demandFunction: 2,
      purchaseManager: {hasCash: hasCashStub},
      topBarController: {redraw: () => {}}
    })
    content.button = buttonSpy
  })

  var addOwner = (stateValueOK) => {
    owner = {
      hasStateValue: (pla) => {
        return stateValueOK
      },
      stateValue: (pla) => {
        return tile
      },
      redraw: () => {},
      section: () => {},
      text: () => {},
      animatedBar: () => {}
    }
    content.owner = owner
  }

  var mockMethods = () => {
    createButtonsSpy = sinon.spy()
    tileInfoSpy = sinon.spy()
    structureInfoSpy = sinon.spy()
    structureRuiningSpy = sinon.spy()
    content.createBuildingButtons = createButtonsSpy
    content.tileInformation = tileInfoSpy
    content.structureInformation = structureInfoSpy
    content.structureRuining = structureRuiningSpy
  }

  it('Section creation works properly', () => {
    addOwner(false)
    assert.equal(content.createSections(), null)
    addOwner(true)
    // tile.structure is null
    mockMethods()
    content.createSections()
    assert(tileInfoSpy.calledWith(tile))
    assert(createButtonsSpy.calledWith(tile))
    // tile.structure is not null
    tile.structure = structure
    mockMethods()
    content.createSections()
    assert(structureInfoSpy.calledWith(structure))
    assert(structureRuiningSpy.calledWith(structure))
  })

  it('Structure ruining works properly', () => {
    addOwner(true)
    // the first 'if' is true
    healthPctStub.returns(0.9)
    hasCashStub.returns(true)

    content.structureRuining(structure)
    assert.equal(buttonSpy.lastCall.args[0], 'Korjaa')
    // the first 'if' is false; the second 'if' is true
    hasCashStub.returns(false)

    content.structureRuining(structure)
    assert.equal(buttonSpy.lastCall.args[0], 'Rahat eivät riitä')
    // both 'ifs' are false
    healthPctStub.returns(1.0001)
    hasCashStub.returns(true)

    content.structureRuining(structure)
    assert.equal(buttonSpy.lastCall.args[0], 'Täydellisessä kunnossa')
  })
})