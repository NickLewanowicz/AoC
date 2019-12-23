var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var opcodes = text.split(",").map(el => Number(el))

const opcodeOutput = (noun, verb, array) => {
    const copcodes = array.slice(0)
    copcodes[1] = noun
    copcodes[2] = verb
    
    let i = 0
    while(copcodes[i] != 99) {
        if (copcodes[i] === 1) {
            copcodes[copcodes[i+3]] = copcodes[copcodes[i+1]] + copcodes[copcodes[i+2]]
        } else if (copcodes[i] === 2) {
            copcodes[copcodes[i+3]] = copcodes[copcodes[i+1]] * copcodes[copcodes[i+2]]
        } 
        i+=4
    }

    return copcodes[0]
}

const findNounVerb = (limit, array, search) => {
    for(let i = 0; i < limit; i++) {
        for(let j = 0; j < limit; j++) {
            if (opcodeOutput(i, j, array) === search) {
                return 100 * i + j
            }
        }   
    }    
}

console.log(findNounVerb(100, opcodes, 19690720))

