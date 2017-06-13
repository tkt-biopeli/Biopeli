const assert = require('assert')
const sinon = require('sinon')
import MapView from '../../../src/view/map/MapView'

describe('MapView tests', () =>{
  var game, map, menu, mockRenderTexture, mockRenderSprite
  var mapView
  var spriteStub = sinon.stub()
  var renderTextureStub = sinon.stub()
  var textureClearSpy = sinon.spy()
  var textureRenderXYSpy = sinon.spy()
  var spriteResetSpy = sinon.spy()

  beforeEach(() =>{
    game = {
      add: {
        renderTexture: renderTextureStub,
        sprite: spriteStub
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
    
    renderTextureStub.returns(mockRenderTexture)
    spriteStub.returns(mockRenderSprite)
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
  
  it('draw clears the view', () =>{
    mapView.draw(5, 87)
    assert.equal(textureClearSpy.callCount, 1)
  })
  
// calculate grid coordinates for new view
// calculate offset
// get tiles from Map and fill view with Sprites
// Selection highlight
})