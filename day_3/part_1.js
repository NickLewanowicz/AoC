var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")

var testA = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(",")
var testB = 'U62,R66,U55,R34,D71,R55,D58,R83'.split(",")

var wireA = lines[0].split(",")
var wireB = lines[1].split(",")

const getWireSet = (arr) => {
    let x = 0
    let y = 0
    const coords = new Set()
    coords.add(`${x},${y}`)
    for (let i = 0; i < arr.length; i++) {
        let direction = arr[i].charAt(0)
        let distance = Number(arr[i].substr(1))
        
        switch (direction) {
            case 'R':
                for (let j = x; x < j + distance; x++) {
                    coords.add(`${x+1},${y}`)
                }
                break;
            case 'L':
                for (let j = x; x > j - distance; x--) {
                    coords.add(`${x-1},${y}`)
                }
                break;
            case 'U':
                for (let j = y; y < j + distance; y++) {
                    coords.add(`${x},${y+1}`)
                }
                break;
            case 'D':
                for (let j = y; y > j - distance; y--) {
                    coords.add(`${x},${y-1}`)
                }
                break;
        
            default:
                break;
        }
    }
    return coords
}

const findCrosses = (a,b) => {
    const crosses = []
    for (const el of a) {
        if (b.has(el)) {
            crosses.push(el)

        }
    }

    return crosses.slice(1)
}

const findMinimumDistance = (coords) => {
    let minDistance = Infinity;
    for (let i = 0; i < coords.length; i++) {
        const x = Math.abs(Number(coords[i].split(',')[0]))
        const y = Math.abs(Number(coords[i].split(',')[1]))
        minDistance = Math.min(x+y, minDistance)
    }
    

    return minDistance
}

const run = async () => {
    const setA = getWireSet(wireA)
    const setB = getWireSet(wireB)
    const crosses = findCrosses(setA, setB)
    const minDis = await findMinimumDistance(crosses)

    return minDis
}


async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}

timer().then((res)=>console.log(res))
