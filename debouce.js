// 输入框输入操作
const debounce = (fn, delay) => {

    let timer;
    return (...args) => {
        clearTimeout(timer)
        const This = this
        let timer = setTimeout(() => {
            fn.apply(This, args)
        }, delay)


    }
}
// 例如滚动事件  200ms 触发一次
const throttle = (fn, time) => {
    let ltime = 0;

    return (...args) => {
        let nowTime = Date.now()
        if (nowTime - ltime > time) {
            fn.apply(this, args)
            ltime = nowTime
        }


    }
}

function typeOf(obj) {
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

const deepCopy = (sourceObj) => {
    const type = typeOf(sourceObj)
    const o = undefined
    if (type == "array") {
        o = []
    } else if (type == "object") {
        o = {}
    } else {
        return data
    }
    if (t === 'array') {
        for (var i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (var _i in data) {
            o[_i] = deepCopy(data[_i]);
        }
    }
    return o;
}