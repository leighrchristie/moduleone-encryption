const msg = "Lets meet at midnight under the clock";
const tokens = msg.split("")
let blocks = [];
let slice = 0;
const blockSize = 8;

while (slice < tokens.length) {
    blocks.push(tokens.slice(slice, slice += blockSize));
}

while (blocks[blocks.length - 1].length < 8) {
    blocks[blocks.length - 1].push("a")
}

blocks = blocks.map(block => block.map(char => char.charCodeAt()))

function hashBlocks(blocks) {
    const state = [77, 100, 306, 387, 50]
    blocks.forEach(block => {
        state[0] = block[0] + block[7]
        state[1] = block[1] - 1
        state[2] = state[1] / 2
    })
    return state.join('')
}
console.log(hashBlocks(blocks))