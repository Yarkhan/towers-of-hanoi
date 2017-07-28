const Peg = require('./peg')

/**
 * transfers the last element of {src} to {dst}
 * @throws {Error} if the last of {src} is bigger than {dst}
 */
const transfer = (src,dst) => {
    if(!src.length) return
    let [a,b] = [src[src.length-1],dst[dst.length-1]]
    if (a > b) throw new Error(`Um disco maior não pode ficar sobre um menor`)
    return dst.push(src.pop())
}

/**
 * Checks if we are done moving discs around
 */
const solved = (pegs,dst) => {
    let peg = pegs.pegByName(dst)
    return peg.length == pegs.discCount()
}

/**
 * Default solution to the towers of hanoi algorithm
 * moves n discs to destination recursively.
 * every movement made is stored in moves[] argument
 */
const solve = (n, from, through, to, moves) => {
    if(!moves) moves = []
    if(!(n > 0)) return
    solve(n-1, from, to, through,moves)
    transfer(from,to)
    moves.push(`${n} para ${to.name}`)
    solve(n-1, through, from, to,moves)
}

/**
 * Searches for the biggest contiguous sequence of discs where disc 1 is found
 * @returns an object that can be feed into solve(n,from,through,to)
 */
const getNextMove = (pegs, dst, n) => {
    if(!n) n = 1
    let from = pegs.pegByDiscSize(n)
    if(n >= pegs.discCount()){
        let to = pegs.pegByName(dst)
        return {n,from,to,through:pegs.aux(from,to)}
    }
    let inPlace = from[from.indexOf(n)-1] == n+1
    if(inPlace) return getNextMove(pegs,dst,n+1)
    let to = pegs.pegByDiscSize(n+1)
    let through = pegs.aux(from,to)
    return {n,from,to,through}
}
/**
 * given a destination, checks if the game was solved, and recursively
 * calls getNextMove(), feeding it into solve() until the game is done.
 * stores all movements made into moves[]
 * @returns an array with the movements made
 */
const resolve = (pegs,dst,moves) => {
    if(!moves) moves = []
    if(solved(pegs,dst)) return moves
    let next = getNextMove(pegs,dst)
    solve(next.n, next.from, next.through, next.to, moves)
    resolve(pegs,dst,moves)
    return moves
}
/**
 * Given a config string, proccess it and return an Array of Peg's with discs included.
 * for each line, takes the string before "-" as label, and a colon-separated
 * list of numbers as discs
 */
const processInput = (config) => config.trim()
    .split("\n")
    .map(line => {
        let [name,discs] = line.split("-")
        if(!discs) discs = ''
        discs = discs.trim().split(":").map(disc => parseInt(disc)||disc).filter(disc => disc != false)
        return Peg(name,discs)
    })
module.exports = {
    resolve,solve,getNextMove,solved,transfer,processInput
}
