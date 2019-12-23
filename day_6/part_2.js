var fs = require("fs");
var text = fs.readFileSync("./part_2.txt", "utf-8");
var lines = text.split("\n")

const buildMap = (arr) => {
    const map = {}
    for (let i in arr) {
        const pair = arr[i].split(')')
        map[pair[1]] = pair[0]
    }
    return map
}

const findAncestors = (map, el) => {
    const ancestors = []
    let curr = el
    while(map[curr]) {
        ancestors.push(curr)
        curr = map[curr]
    }
    return ancestors
}

const countDistance = (map) => {
    const meAncestors = findAncestors(map, map['YOU'])
    const sanAncestors = findAncestors(map, map['SAN'])
    for (let i = 0; i < meAncestors.length; i++) {
        for (let j = 0; j < sanAncestors.length; j++) {
            if (meAncestors[i] == sanAncestors[j]) {
                return i+j
            }
        }
    }
}

async function timer() {
    const start = Date.now();
    const answer = await countDistance(buildMap(lines))
    const delta = Date.now() - start; 
    return {answer, delta}
}

timer().then((res)=>console.log(res))