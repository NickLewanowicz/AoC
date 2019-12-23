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

function timeStep(moons) {
    for(let i = 0; i<moons.length; i++) {
        for(let j = 0; j<moons.length; j++) {
            if(i != j) {
                if (moons[i].x > moons[j].x) {
                    moons[i].xv--
                } else if (moons[i].x < moons[j].x) {
                    moons[i].xv++
                }
                if (moons[i].y > moons[j].y) {
                    moons[i].yv--
                } else if (moons[i].y < moons[j].y) {
                    moons[i].yv++
                }
                if (moons[i].z > moons[j].z) {
                    moons[i].zv--
                } else if (moons[i].z < moons[j].z) {
                    moons[i].zv++
                }
            }
        }
    }
    return moons.map(moon => {
        moon.x = moon.x + moon.xv
        moon.y = moon.y + moon.yv
        moon.z = moon.z + moon.zv
        return moon
    })
}

function performSteps(moons, steps) {
    for(let i = 0; i<steps; i++) {
        moons = timeStep(moons)
    }
    return moons
}

function calculateTotalEnergy(moons) {
    return moons.reduce((acc, moon) => {
        return acc + (Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z)) * (Math.abs(moon.xv) + Math.abs(moon.yv) + Math.abs(moon.zv))
    },0)
}

async function  run() {
    const answer = await calculateTotalEnergy(performSteps(inputToMoons(lines), 1000))
    return answer
}

async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}


timer().then((res)=>console.log(res))
