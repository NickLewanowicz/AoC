var fs = require("fs");
var text = fs.readFileSync("./part_1.txt", "utf-8");
var lines = text.split("\n")


function parseImage(data) {
    let layers = []
    for(let i = 0;i < data.length;i+=150) {
        layers.push(data.slice(i, i+150))
    }
    return layers
}

function computeLayers(layers) {
    let image = layers[0]
    for (let i = 1; i < layers.length; i++) {
        for (let j = 0; j < layers[i].length; j++) {
            if (image[j] == "2"){
                image = image.substr(0,j) + layers[i][j] + image.substr(j+1)
            }
        }
    }
    return image
}

function printImage(image) {
    for(let i = 0;i < image.length;i+=25) {
        console.log(image.slice(i, i+25).replace(/0/g, "⬜").replace(/1/g, "⬛"))
    }
}

async function  run() {
    const answer = await printImage(computeLayers(parseImage(lines[0])))
    return answer
}

async function timer() {
    const start = Date.now();
    const answer = await run()
    const delta = Date.now() - start; 
    return {answer, delta}
}


timer().then((res)=>console.log(res))
