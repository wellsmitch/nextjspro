const cfn = ()=> {
    let count = 0
    return ()=> {
        count++;
        console.log('count',count)
    }
}
const fn = cfn()
const fn2 = cfn()
console.log(fn())
console.log(fn())
console.log(fn2())