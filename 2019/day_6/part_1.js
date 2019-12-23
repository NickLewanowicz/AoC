var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")

const buildMap = (arr) => {
    const map = {}
    for (let i in arr) {
        const pair = arr[i].split(')')
        map[pair[1]] = pair[0]
    }
    return map
}

const countOrbits = (map) => {
    const indirect = {}
    for ( let el in map) {
        let distance = 1
        let curr = map[el]
        while(map[curr]) {
            distance++
            curr = map[curr]
        }
        indirect[el] = distance
    }
    return Object.keys(indirect).reduce((sum,key)=>sum+indirect[key],0)
}

const run = async () => {
    const answer = await countOrbits(buildMap(lines))
    return answer
}

run().then((res)=>console.log(res))
