var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var input = `357253-892942`.split("-")

function findPasswords(min, max) {
    const passwords = []
    for (let i = min; i<=max; i++) {
        if (neverDecreases(i) && hasDouble(i) && (99999 < i < 1000000)) {
            passwords.push(i)
        }
    }
    return passwords.length
}

function neverDecreases(input) {
    const arr = input.toString().split('').map(el=> Number(el))
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i+1]) {
            return false
        }
    }
    return true
}

function hasDouble(input) {
    const arr = input.toString().split('').map(el=> Number(el))
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i+1]) {
            return true
        }
    }
    return false
}


async function  run() {
    const answer = await findPasswords(input[0], input[1])
    return answer
}

async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}


timer().then((res)=>console.log(res))
