var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")


function parseImage(lines) {
    let layer = ['', 150]
    for(let i = 0;i < lines.length;i+=150) {
        const curr = lines.slice(i, i+150)
        const zeros = (curr.match(new RegExp("0", "g")) || []).length
        if (zeros < layer[1]) {
            layer = [curr, zeros]
        }
    }
    return (layer[0].match(new RegExp("1", "g")) || []).length * (layer[0].match(new RegExp("2", "g")) || []).length
}

async function  run() {
    const answer = await parseImage(lines[0])
    return answer
}

async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}


timer().then((res)=>console.log(res))
