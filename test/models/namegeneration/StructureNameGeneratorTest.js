const assert = require("assert")
const sinon = require("sinon")
import StructureNameGenerator from '../../../src/models/namegeneration/StructureNameGenerator'

describe('Tests for structure name generation', () => {
  var namegen, randomStub, parts, structureType

  beforeEach(() => {
    randomStub = sinon.stub()

    structureType = 'wheat farm'

    parts = [
      ['f00'],
      ['b4r'],
      ['bar'],
      ['foo']
    ]

    namegen = new StructureNameGenerator({
      frontAdjectives: parts[0],
      names: parts[1],
      endAdjectives: parts[2],
      hyperboles: parts[3]
    })

    namegen.mathRandom = randomStub
    randomStub.onCall(0).returns(0)
    randomStub.onCall(1).returns(0)
  })

  it('findType works', () => {
    assert.equal(namegen.findType('wheat farm'), 'viljatila')
    assert.equal(namegen.findType('dairy farm'), 'navetta')
    assert.equal(namegen.findType('berry farm'), 'marjatila')
    assert.equal(namegen.findType('foo farm'), '')
  })

  it('createBuildingName produces name with hyperbole', () => {
    randomStub.onCall(2).returns(0.24)
    assert.equal(namegen.createBuildingName(structureType), 'foo-bar viljatila')
  })

  it('createBuildingName produces name without hyperbole', () => {
    randomStub.onCall(2).returns(0.25)
    assert.equal(namegen.createBuildingName(structureType), 'bar viljatila')
  })

  it('createOwnerName produces name correctly', () => {
    assert.equal(namegen.createOwnerName(), 'f00 b4r')
  })
})
