var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var textByLine = text.split("\n")

const fuelArray = textByLine.map(el => {
    return ((Number(el) / 3) | 0) - 2
})

const totalFuel = fuelArray.reduce((el, acc) => acc + el, 0)


console.log(totalFuel)