const assert = require('assert')
const sinon = require('sinon')
import MapView from '../../../src/view/map/MapView'

describe('MapView tests', () =>{
  var game, map, menu, mockRenderTexture, mockRenderSprite, mockHighlight
  var mapView
  var spriteStub = sinon.stub()
  var renderTextureStub = sinon.stub()
  var makeGraphicsStub = sinon.stub()
  var textureClearSpy = sinon.spy()
  var textureRenderXYSpy = sinon.spy()
  var spriteResetSpy = sinon.spy()
  var beginFillSpy = sinon.spy()
  var drawRoundedRectSpy = sinon.spy()
  var endFillSpy = sinon.spy()

  beforeEach(() =>{
    game = {
      add: {
        renderTexture: renderTextureStub,
        sprite: spriteStub
      },
      make: {
        graphics: makeGraphicsStub
      }
    }
    
    map = {
      tileWidth: 74,
      tileHeight: 34,
      getTileWithGridCoordinates: sinon.spy()
    }
    
    menu = {
      selectedTile: sinon.spy()
    }
    
    mockRenderTexture = {
      clear: textureClearSpy,
      renderXY: textureRenderXYSpy
    }
    
    mockRenderSprite = {
      fixedToCamera: false,
      reset: spriteResetSpy
    }
    
    mockHighlight = {
      beginFill: beginFillSpy,
      drawRoundedRect: drawRoundedRectSpy,
      endFill: endFillSpy
    }
    
    renderTextureStub.returns(mockRenderTexture)
    spriteStub.returns(mockRenderSprite)
    makeGraphicsStub.returns(mockHighlight)
    mapView = new MapView({ game: game, map: map, menu: menu, viewWidthPx: 277, viewHeightPx: 653 })
  })

  it('MapView costructor works', () =>{
    assert.equal(mapView.viewWidthPx, 277)
    assert.equal(mapView.viewHeightPx, 653)
    assert.equal(mapView.tileWidth, 74)
    assert.equal(mapView.tileHeight, 34)
    assert.equal(mapView.viewTexture, mockRenderTexture)
    assert.equal(mapView.renderS, mockRenderSprite)
    assert.equal(mapView.renderS.fixedToCamera, true)
  })
  
  it('Draw function clears the view', () =>{
    mapView.draw(5, 87)
    assert(spriteResetSpy.calledWith(5, 87))
    assert.equal(textureClearSpy.callCount, 1)
  })

  it('Adding to ViewTexture is successful', () =>{
    mapView.addToViewTexture("sprite", 14.5, 17.4)
    assert(textureRenderXYSpy.calledWith("sprite", 15, 17))
  })
  
  it('View area limits are successfully calculated', () =>{
    //tileWidth: 74, tileHeight: 34
    //viewWidthPx: 277, viewHeightPx: 653
    var viewArea = mapView.viewAreaLimits(680, 99)
    assert.equal(viewArea.startCol, 9)
    assert.equal(viewArea.endCol, 13)
    assert.equal(viewArea.startRow, 2)
    assert.equal(viewArea.endRow, 22)
  })
  
  it('Offset is successfully calculated', () =>{
    //cameraX, cameraY, startCol, startRow
    var offset = mapView.offset(2, 59, 7, 11)
    assert.equal(offset.x, 516)
    assert.equal(offset.y, 315)
  })

  it('Pixel coordinates are successfully calculated', () =>{
    //col, row, startCol, startRow, offset
    var pxCoord = mapView.ColAndRowToPx(16, 17, 4, 15, {x: 45, y: 78})
    assert.equal(pxCoord.x, 933)
    assert.equal(pxCoord.y, 146)
  })
  
  it('Selection highlight is functioning correctly', () =>{
    var highlight = mapView.highlight()
    assert(highlight.beginFill.calledWith(0x000000, 0.2))
    assert(highlight.drawRoundedRect.calledWith(0, 0, 74, 34, 9))
    assert.equal(highlight.endFill.callCount, 1)
  })
  
})