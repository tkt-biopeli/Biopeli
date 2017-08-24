const assert = require('assert')
const sinon = require('sinon')
import InputField from '../../../../src/view/menu/menuitems/InputField'

describe('Input field tests', ()=>{
  var infield, game, viewGroup, parameters
  var addInfieldStub, addToGroupSpy, removeFromGroupSpy, destroySpy
  var mockInfield

  beforeEach(()=>{
    addToGroupSpy = sinon.spy()
    removeFromGroupSpy = sinon.spy()
    destroySpy = sinon.spy()

    parameters = {huuhaa: 'huuhaa'}
    mockInfield = {x: 23, y: 31, destroy: destroySpy}

    addInfieldStub = sinon.stub()
    addInfieldStub.withArgs(23, 31, parameters).returns(mockInfield)

    game = {add: {inputField: addInfieldStub}}

    viewGroup = {
      add: addToGroupSpy,
      removeChild: removeFromGroupSpy
    }

    infield = new InputField({
      game: game,
      viewGroup: viewGroup,
      x: 23,
      y: 31,
      parameters: parameters
    })
  })

  it('Constructor test', ()=>{
      assert.equal(infield.type, 'inputField')
      assert(addToGroupSpy.calledWith(mockInfield))
  })

  it('Update functioning as expected', ()=>{
      assert.equal(mockInfield.x, 23)
      assert.equal(mockInfield.y, 31)
      infield.update(37, 43)
      assert.equal(mockInfield.x, 37)
      assert.equal(mockInfield.y, 43)
  })

  it('Destroy functioning as expected', ()=>{
      assert.equal(removeFromGroupSpy.callCount, 0)
      assert.equal(destroySpy.callCount, 0)
      infield.destroy()
      assert(removeFromGroupSpy.calledWith(mockInfield))
      assert.equal(destroySpy.callCount, 1)
  })
})
