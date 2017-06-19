import Text from '../../../src/view/menu/Text'
const assert = require('assert')

describe('Text test', ()=>{
    it('Set text works', ()=>{
        var textMock = {}
        var text = new Text({game: {add: {text: function(ret){
            var r = ()=>{return ret}
            return r
        }(textMock)}}, fontSize: 0, text: "sd"})

        text.setText("asd")

        assert.equal("asd", textMock.text)

    })
})