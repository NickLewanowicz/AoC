var fs = require("fs");
var text = fs.readFileSync("./part_2.txt", "utf-8");
var input = text.split("\n")

const part2Fuel = (modules) => {
    const getFuelArray = (arr) => {
        return arr.map(el => {
            return Math.max(((Number(el) / 3) | 0) - 2, 0)
        })
    }

    let fuelArray = getFuelArray(modules)
    let totalFuel = 0

    while(fuelArray.reduce(function(a,b) { return a + b }) > 0) {
        totalFuel += fuelArray.reduce(function(a,b) { return a + b });
        fuelArray = getFuelArray(fuelArray)
    }

    return totalFuel
}

console.log(part2Fuel(input))
