const assert = require('assert');
const Board = require('../src/board')
const Peg = require('../src/peg')
const util = require('../src/util')

describe('#transfer', function(){
    it('must move the last element of {a} into the end of {b}', function(){
        let a = [3,2,1],
            b = [6,5,4]
        util.transfer(a,b)
        assert(a[a.length-1] == 2 && b[b.length-1] == 1)
    })
    it('must not allow a bigger element to be on top of a smaller element', function(){
        let a = [3,2,1],
            b = [6,5,4]

        assert.throws(function(){
            util.transfer(b,a)
        })
    })
    it('must not do anything when src is empty', function(){
        let a = [],
            b = [6,5,4]
        util.transfer(a,b)
        assert(a.length == 0 && b.length == 3)
    })
})

describe('#solved', function(){
    it('must return true if all discs are in the specified peg', function(){
        const board = Board([
            Peg('a',[]),
            Peg('b',[]),
            Peg('c',[4,3,2,1])
        ])
        assert(util.solved(board,'c') == true)
    })
})

describe('#getNextMove', function(){
    it('must correctly return the next operation to feed into #solve', function(){
        const board = Board([
            Peg('a',[]),
            Peg('b',[1]),
            Peg('c',[4,3,2])
        ])
        let result = util.getNextMove(board,'a')
        assert(
            result.n == 1
            && result.to.name == 'c'
            && result.from.name == 'b'
            && result.through.name == 'a'
        )
    })
})

describe('#solve', function(){
    const board = Board([
        Peg('a',[]),
        Peg('b',[]),
        Peg('c',[3,2,1])
    ])
    let moves = []
    util.solve(
        3, board[2], board[1], board[0],moves
    )
    it('must mutate {moves} with all movements made', function(){
        assert(moves.length == 7)
    })
})

describe('#resolve', function(){
    const board = Board([
        Peg('a',[]),
        Peg('b',[1]),
        Peg('c',[3,2])
    ])
    let moves = []
    util.resolve(board,'a',moves)
    it('must mutate {board} moving discs to destination', function(){
        assert(board.pegByName('a').length == 3)
    })
})

describe('#processInput', function(){
    let config =
    `A-4:3:2:1
    B-
    C-
    `
    let result = util.processInput(config)

    it('must return an array that has three objects', function(){
        assert(result.length == 3)
    })
})
