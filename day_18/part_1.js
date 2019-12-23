var {run} = require("../utilities");
var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")
var sampleLines = `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`.split("\n")

function map(input) {
    return input.map(el=>el.split(''))
}

function numberOfKeys(map) {
    let count = 0
    for (let i = 0; i<map.length;i++) {
        for (let j = 0; j<map[i].length;j++) {
            if(map[i][j].match(/[a-z]/g)) {
                count++
            }
        }
    }
    return count
}

function findStart(map) {
    for (let i = 0; i<map.length;i++) {
        for (let j = 0; j<map[i].length;j++) {
            if (map[i][j] == '@') {
                return {x: i, y: j}
            } 
        }
    }
    return Error()
}

async function findKeyMst(coords, originalMap, keys) {
    const numOfKeys = numberOfKeys(originalMap)
    const map = JSON.parse(JSON.stringify(originalMap))
    const curr = coords
    let min = 1000
    const bestScores = {}
    let keysFound = []
    const mst = {}
    await searchSquare(curr, map, 0, [])


    console.log(min)
    async function searchSquare(coord, map, distance, keys, min) {
        const curr = map[coord.x][coord.y].toString()
        const key = keys.sort().reduce((acc,el) => acc+el,'') + `${coord.x}_${coord.y}`
        // if(distance === 136 && keys.length > 13) {
        //     console.log(keys, keys.length)
        // }

        
        if (!bestScores[key] || bestScores[key] > distance ) {
            bestScores[key] = distance
        } else {
            return
        }
        if(keys.length === numOfKeys) {
            return
        }

        map[coord.x][coord.y] = keys.length
        if(curr == '.' || curr == '@' || Number(curr) < keys.length) {
            searchSquare({x: coord.x-1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x+1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x, y: coord.y+1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x, y: coord.y-1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
        } else if(curr.match(/[a-z]/g)) {
            if(!keys.includes(curr.toLowerCase())){
                keys.push(curr)
            }
            searchSquare({x: coord.x-1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x+1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x, y: coord.y+1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            searchSquare({x: coord.x, y: coord.y-1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
        } else if(curr.match(/[A-Z]/g)) {
            if(keys.includes(curr.toLowerCase())){
                searchSquare({x: coord.x-1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
                searchSquare({x: coord.x+1, y: coord.y}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
                searchSquare({x: coord.x, y: coord.y+1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
                searchSquare({x: coord.x, y: coord.y-1}, JSON.parse(JSON.stringify(map)), distance + 1, keys.slice())
            }
        }
    }
}

function findAllNexts(coords, map, keys) {
    const toCheck = [{coord: coords, dis: 0}]
    const nexts = {}

    while (toCheck.length > 0) {
        const {coord, dis} = toCheck.shift()
        const curr = map[coord.x][coord.y].toString()
        map[coord.x][coord.y] = "`"
        if (curr.match(/[a-z]/g) && !keys.includes(curr.toLowerCase())) {
            if (!nexts.curr || nexts.curr.dis > dis) {
                nexts[curr] = {dis, coord, keys}
            }
        } else if (curr == '.' || curr == '@' || (curr.match(/[A-Z]/g) && keys.includes(curr.toLowerCase()))) {
            toCheck.push({coord: {x: coord.x-1, y: coord.y}, dis: dis + 1}, {coord: {x: coord.x+1, y: coord.y}, dis: dis + 1}, {coord: {x: coord.x, y: coord.y+1}, dis: dis + 1}, {coord: {x: coord.x, y: coord.y-1}, dis: dis + 1})
        }
    }

    return nexts
}

function findSteps(map) {
    const start = findStart(map)
    const keyCount = numberOfKeys(map)
    const toCheck = [{coord: start, curr: '*', distance: 0, keys: []}]
    let count = 0
    while (toCheck.length > 0) {
        const {coord, curr, distance, keys} = toCheck.shift()
        const keyMap = findAllNexts(coord, JSON.parse(JSON.stringify(map)), [...keys])
        for (let key in keyMap) {
            console.log({coord: keyMap[key].coord, curr: key, distance: keyMap[key].dis + distance, keys: [...keys, key]})
            toCheck.push({coord: keyMap[key].coord, curr: key, distance: keyMap[key].dis + distance, keys: [...keys, key]})
        }
        console.log(count++)

    }
    console.log(toCheck)
    return toCheck
}



run(()=>findSteps(map(sampleLines)))
