/**
 * Represents a collection of pegs. Has utility functions for manipulation
 * @param {Peg[]} pegs
 */
const Board = (pegs) => {

    if(pegs.length != 3) throw new Error('Exatamente 3 hastes devem ser informadas')

    //returns a peg containing disc == size
    pegs.pegByDiscSize = (size) => pegs.find(peg => peg.find(disc => disc == size))

    //returns the auxiliary peg between a and b
    pegs.aux = (from,to) => pegs.find(peg => peg.name != from.name && peg.name != to.name)

    //sum of discs in all pegs
    pegs.discCount = () => pegs.map(peg => peg.map(disc => disc)).reduce((a,b) => a.concat(b)).length

    pegs.pegByName = (name) => {
        let peg = pegs.find(peg => peg.name == name)
        if(!peg) throw new Error(
            `Não existe haste com este nome: "${name}"`
        )
        return peg
    }
    return pegs
}
module.exports = Board
