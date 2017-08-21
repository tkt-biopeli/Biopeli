const assert = require('assert')
const sinon = require('sinon')
import LabeledImage from '../../../../src/view/menu/menuitems/LabeledImage'

describe('Labeled image tests', ()=>{
  var labeledImage, game, viewGroup
  var addTextStub, createImageStub
  var removeFromGroupSpy, setAnchorSpy
  var mockText, mockImage

  beforeEach(()=>{
    addTextStub = sinon.stub()
    createImageStub = sinon.stub()

    removeFromGroupSpy = sinon.spy()
    setAnchorSpy = sinon.spy()

    mockText = {
      anchor: {
        set: setAnchorSpy
      },
      wordWrap: false,
      wordWrapWidth: 0,
      text: 'foo',
      x: 13,
      y: 23
    }
    mockImage = {x: 0, y: 0}

    game = {add: {text: addTextStub}}

    viewGroup = {
      create: createImageStub,
      removeChild: removeFromGroupSpy
    }

    addTextStub.returns(mockText)
    createImageStub.withArgs(44, 33, 2).returns(mockImage)
    labeledImage = new LabeledImage({
      game: game,
      viewGroup: viewGroup,
      label: 112,
      fontSize: 55,
      asset: 2,
      x: 44,
      y: 33,
      width: 172,
      height: 320
    })
  })

  it('Constructor test', ()=>{
      assert.equal(labeledImage.type, 'labeledImage')
      assert(setAnchorSpy.calledWith(0.5, 0.5))
      assert.equal(mockText.wordWrap, true)
      assert.equal(mockText.wordWrapWidth, 172)
  })

  it('Update functioning as expected', ()=>{
      labeledImage.update('huuhaaLabel', 99, 37, 43)
      assert.equal(mockImage.x, 37)
      assert.equal(mockImage.y, 43)
      assert.equal(labeledImage.style.font, '99px Arial')
      assert.equal(mockText.text, 'huuhaaLabel')
      assert.equal(mockText.x, 123)
      assert.equal(mockText.y, 203)
  })

  it('Destroy functioning as expected', ()=>{
      var destroyTextSpy = sinon.spy()
      var destroyImageSpy = sinon.spy()
      labeledImage.text.destroy = destroyTextSpy
      labeledImage.image.destroy = destroyImageSpy

      assert.equal(removeFromGroupSpy.callCount, 0)
      assert.equal(destroyTextSpy.callCount, 0)
      assert.equal(destroyImageSpy.callCount, 0)
      labeledImage.destroy()
      assert(removeFromGroupSpy.calledWith(mockImage))
      assert.equal(destroyTextSpy.callCount, 1)
      assert.equal(destroyImageSpy.callCount, 1)
  })
})
