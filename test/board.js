const assert = require('assert');
const Board = require('../src/board')
const Peg = require('../src/peg')

const board = Board([
    Peg('a',[4,3,2]),
    Peg('b',[]),
    Peg('c',[1])
])

describe('Board', function() {
    describe('#pegByName', function(){
        it('must return a peg specified by name', function(){
            assert(board.pegByName('a').name == 'a')
        })
        it('must thrown an error if doesnt exist', function(){
            assert.throws(function(){
                board.pegByName('test')
            })
        })
        it('throws error if pegs < 3', function(){
            assert.throws(function(){
                Board([Peg('a')])
            })
        })
        it('throws error if pegs > 3', function(){
            assert.throws(function(){
                Board([Peg('a'),Peg('e'),Peg('c'),Peg('c')])
            })
        })

    })
    describe('#discCount', function(){
        it('must return the sum of all discs in the pegs', function(){
            assert(board.discCount() == 4)
        })
    })
    describe('#aux', function(){
        it('must return the auxiliary peg between two pegs', function(){
            let a = board.pegByName('a')
            let b = board.pegByName('b')
            assert(board.aux(a,b).name == 'c')
        })
    })
    describe('#pegByDiscSize', function(){
        it('must return the pegs that contains the the disc', function(){
            assert(board.pegByDiscSize(1).name == 'c')
        })
        it('throws error if peg cannot be found', function(){
            assert.throws(function(){
                board.pegByName('this peg does not exist!!!')
            })
        })
    })
});
