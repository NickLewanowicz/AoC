var {run} = require("../utilities");
var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var opcodes = text.split(",")

function prepOpcode(opcodes) {
    opcodes = opcodes.map(el => Number(el))
    opcodes[1] = 12
    opcodes[2] = 2
    return opcodes
}

function findHaltValue(opcodes) {
    let i = 0
    while(opcodes[i] != 99) {
        if (opcodes[i] === 1) {
            opcodes[opcodes[i+3]] = opcodes[opcodes[i+1]] + opcodes[opcodes[i+2]]
        } else if (opcodes[i] === 2) {
            opcodes[opcodes[i+3]] = opcodes[opcodes[i+1]] * opcodes[opcodes[i+2]]
        } 
        i+=4
    }
    return opcodes[0]
}



run(()=>findHaltValue(prepOpcode(opcodes)))
