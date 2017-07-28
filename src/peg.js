/**
 * Represents a peg in the board, or a collection of discs that can be empty
 * adds a name attribute, so we can find it inside arrays
 * @throws {Error} if input is invalid (disc sizes not numeric or out of place)
 */
const Peg = (name,elements) => {
    if(!elements) elements = []
    elements.name = name
    if(!elements.length) return elements
    elements.forEach(disc =>{
        if(!!parseInt(disc) == false) throw new Error(
            `Erro na haste "${name}", elemento "${disc}" deve ser numérico`
        )
    })
    for(let i=0 ; i < elements.length; i++){
        let currentDisc = elements[i];
        let nextDisc = elements[i+1]
        if(!nextDisc) continue
        if(currentDisc <= nextDisc) throw new Error(
            `Erro na haste ${name}, elemento ${nextDisc} é maior que ${currentDisc}`
        )
    }
    return elements
}
module.exports = Peg
