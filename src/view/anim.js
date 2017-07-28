document.write('<canvas style="border:1px solid black" id="canvas" width="500" height="400"></canvas>')

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d');

const Disc = (size,x,y) => {
    let colors = {
        "4": 'red',
        "3": 'yellow',
        "2": 'cyan',
        "1": 'green'
    }
    return {
        size,x,y,
        dx: x,
        dy: y,
        update(){
            this.x += (this.dx - this.x) * .16
            this.y += (this.dy - this.y) * .16
        },
        draw(ctx){
            ctx.save()
            ctx.fillStyle = colors[size];
            ctx.fillRect(this.x,this.y,this.size*20+20,10)
            ctx.restore()
        }
    }
}
const Peg = ({name,discs},x,y) =>{
    if(!discs) discs =[]
    for(let i=0; i<discs.length; i++){
        let size = discs[i];
        let disc = Disc(size,x - (size*20+10)/2,y+90 - 10*i)
        discs[i] = disc
    }
    return {
        name,discs,x,y,
        draw(ctx){
            ctx.save()
            ctx.fillStyle = 'orange'
            ctx.fillRect(this.x,this.y,10,100)
            ctx.restore()
        }
    }
}

let pegs = []
for(let i = 0; i < lastBoard.length; i++){
    pegs.push(Peg(lastBoard[i],110+120 * i,280))
}
const anim = (i) => {
    context.clearRect(0,0,canvas.width,canvas.height)
    pegs.map(p =>{
        p.draw(context)
        p.discs.map(disc => {
            disc.draw(context)
            disc.update()
        })
    })
    requestAnimationFrame(()=>{
        anim(i+1)
    })
}

const move = (a,b) => {
    let src = pegs.find(peg => peg.discs.find(disc => disc.size == a))
    console.log(src)
    let dst = pegs.find(peg => peg.name == b)
    // console.log(dst)
    let disc = src.discs.pop()
    console.log(disc)
    dst.discs.push(disc)
    disc.dx = dst.x - (disc.size*20+10)/2
    disc.dy = dst.y+100 - 10*dst.discs.length
}

const playResult = (i) => {
    if(!i) i=0
    let [a,b] = lastResult[i].split(" para ")
    move(a,b)
    setTimeout(()=>{
        if (i+1 >= lastResult.length) return
        playResult(i+1)
    },500)
}
anim(0)
playResult()
