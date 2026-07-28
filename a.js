const total = 10;
let min = 1
let max = 30
const list = []
let s = 100
for (let i = 0; i < total; i++) {
    const tempMin = s - (total - i - 1) * max
    if (min < tempMin) {
        min = tempMin
    }

    const tempMax = s - (total - i - 1) * min
    if (max > tempMax) {
        max = tempMax
    }

    const v = Math.floor(Math.random() * (max - min)) + min
    list.push(v)
    s = s - v

}
const d = list.reduce((pre, cur) => pre + cur, 0)
console.log('list', list)
console.log('d', d)