exports.run = function run(lambda) {
    timer(lambda).then((res)=>console.log(res))
}

async function timer(lambda) {
    const start = Date.now();
    const answer = await lambda()
    const delta = Date.now() - start; 
    return {answer, delta}
}
