const assert = require('assert');
const Peg = require('../src/peg')

describe('Peg', function() {
    it('must return an array with a "name" property', function(){
        let peg = Peg('testPeg')
        assert('name' in peg)
    })
    it('must throw error if discs are wrongly positioned', function(){
        assert.throws(function(){
            let peg = Peg('testPeg',[1,2])
        })
    })
    it('must throw error if disc values are not numbers', function(){
        assert.throws(function(){
            let peg = Peg('testPeg',['hue','hua'])
        })
    })

});
