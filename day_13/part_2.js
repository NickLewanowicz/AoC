var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")
var sampleLines = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`.split("\n")


function inputToMoons(lines) {
    return lines.map((line) => {
        return [line.slice(1,-1)].reduce((moon, str)=> {
            const coords = str.split(', ')
            moon.x = Number(coords[0].split('=')[1])
            moon.y = Number(coords[1].split('=')[1])
            moon.z = Number(coords[2].split('=')[1])
            moon.xv = 0
            moon.yv = 0
            moon.zv = 0
            return moon
        },{})
    })
}

function moonsToVectors(moons) {
    return {
        x: [{p: moons[0].x, v: moons[0].xv}, {p: moons[1].x, v: moons[1].xv}, {p: moons[2].x, v: moons[2].xv}, {p: moons[3].x, v: moons[3].xv}],
        y: [{p: moons[0].y, v: moons[0].yv}, {p: moons[1].y, v: moons[1].yv}, {p: moons[2].y, v: moons[2].yv}, {p: moons[3].y, v: moons[3].yv}],
        z: [{p: moons[0].z, v: moons[0].zv}, {p: moons[1].z, v: moons[1].zv}, {p: moons[2].z, v: moons[2].zv}, {p: moons[3].z, v: moons[3].zv}],
    }
}

function vectorStep(vector) {
    for(let i = 0; i<vector.length; i++) {
        for(let j = 0; j<vector.length; j++) {
            if(i != j) {
                if (vector[i].p > vector[j].p) {
                    vector[i].v--
                } else if (vector[i].p < vector[j].p) {
                    vector[i].v++
                }
            }
        }
    }
    for(let i = 0; i<vector.length; i++) {
        vector[i].p += vector[i].v
    }
    return vector
}

function findLoopSize(vectors) {
    return Object.values(vectors).map(vector => {
        const hash = JSON.stringify(vector)
        let count = 0
        let step = vectorStep(vector)
        while(hash != JSON.stringify(step)) {
            step = vectorStep(step)
            count++ 
        }
        return count
    }).reduce(lcm)
}

function gcd(a, b) {
    return a ? gcd(b % a, a) : b;
}

function lcm(a, b) {
    return a * b / gcd(a, b);
}




async function  run() {
    const answer = await findLoopSize(moonsToVectors(inputToMoons(lines)))
    return answer
}

async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}


timer().then((res)=>console.log(res))
