import Map from '../../src/models/Map'

describe('Map tests', () =>{

    describe('my suite', function() {
      var newMap = new Map ( {
        gridSizeX: 100,
        gridSizeY: 100,
        tileWidth: 10,
        tileHeight: 10
      })
    });

    it('Constructor test', () =>{
      assert.equal(100, newMap.gridSizeX)
      assert.equal(100, newMap.gridSizeY)
      assert.equal(10, newMap.tileHeight)
      assert.equal(10, newMap.tileWidth)
    })

    it('Add tile with grid coordinates test', () =>{

    })
  })