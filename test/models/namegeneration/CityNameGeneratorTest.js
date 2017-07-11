const assert = require("assert")
const sinon = require("sinon")
import CityNameGenerator from '../../../src/models/namegeneration/CityNameGenerator'

describe('Tests for city name generation', () => {
  var namegen, getEndSpy, getStartSpy, randomIdStub
  var oneFull

  beforeEach(() => {
    randomIdStub = sinon.stub()

    oneFull = [
      {name: 'Helsinki', point: 6},
      {name: 'Turku', point: 3, full: 5}
    ]
    namegen = new CityNameGenerator({cityNames: oneFull})
  })

  it('getStart works', () => {
    assert.equal(namegen.getStart(0), 'Helsin')
    assert.equal(namegen.getStart(1), 'Turku')
  })

  it('getEnd works', () => {
    assert.equal(namegen.getEnd(0, 1), 'Helsinki')
    assert.equal(namegen.getEnd(1, 0), 'ku')
  })

  it('Name is generated correctly', () => {
    namegen.getRandomId = randomIdStub
    randomIdStub.onCall(0).returns(0)
    randomIdStub.onCall(1).returns(1)
    var name = namegen.generateName()
    assert.equal(name, 'Helsinku')
  })

  it('Changes first and second if same', () => {
    namegen.getRandomId = randomIdStub
    randomIdStub.onCall(0).returns(0)
    randomIdStub.onCall(1).returns(0)
    var name = namegen.generateName()
    assert.equal(name, 'Helsinku')
  })

  it('Changes first and second if same and last', () => {
    namegen.getRandomId = randomIdStub
    randomIdStub.onCall(0).returns(1)
    randomIdStub.onCall(1).returns(1)
    var name = namegen.generateName()
    assert.equal(name, 'TurkuHelsinki')
  })
  

})
