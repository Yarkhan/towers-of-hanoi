const Peg = require('./peg')
const Board = require('./board')
const resolve = require('./util').resolve
const processInput = require('./util').processInput
const readFileSync = require('fs').readFileSync
const writeFileSync = require('fs').writeFileSync
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Saves the input into a file so we can watch it later =D
 */
const writeBoardToFile = (board) =>{
    let result = board.map(peg => ({
        name: peg.name,
        discs: peg.map(disc=>disc)
    }));
    writeFileSync('src/view/lastBoard.js',`let lastBoard = ${JSON.stringify(result)}`)
}

/**
 * Reads input, throw it into the board, tries to solve, display results,
 * save state into ./view so we can watch later
 * Explodes in case of errors
 */
const main = ()=>{
    let pegs = processInput(readFileSync('src/config','utf8'))
    let board = Board(pegs)
    let options = board.map(peg => peg.name).join('|')
    console.log('Robô BB8, às suas ordens. Pressione CTRL+C a qualquer momento para sair')
    rl.question(`para qual haste deseja mover os discos? [${options}] \n> `, answer => {
        writeBoardToFile(board)
        let result = resolve(board,answer.trim())
        console.log(`Os movimentos necessários para mover os discos para ${answer} são:`)
        console.log(result)
        writeFileSync('src/view/lastResult.js',`let lastResult = ${JSON.stringify(result)}`)
        console.log('Pronto! Veja uma animação do resultado no arquivo src/view/index.html')
        rl.close()
    })
}
main()
