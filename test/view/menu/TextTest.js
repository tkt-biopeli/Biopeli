import Text from '../../../src/view/menu/menuitems/Text'
const assert = require('assert')

describe('Text test', () => {
    it('Set text works', () => {
        var textMock = {anchor: {set: ()=>{}}}
        var text = new Text({
            game: {
                add: {
                    text: function (ret) {
                        var r = () => { return ret }
                        return r
                    }(textMock)
                }
            }, fontSize: 0, text: "sd", x: 0, y: 0, anchor: {x: 0, y: 0}
        })
        text.setText("asd")
        assert.equal("asd", textMock.text)
    })
})