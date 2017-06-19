import CurrentTime from '../../src/game/CurrentTime.js';
const assert = require("assert")

describe('CurrentTime tests', function(){
  it('ToString works', function(){
    var time = new CurrentTime()
    assert.equal('Viikko 1 vuonna 1980', time.toString())
  })
})
