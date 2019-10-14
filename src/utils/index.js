/* 去除对象空值 */
export function ObjectMap(obj = {}) {
  const newObject = {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (
      typeof value !== 'undefined' &&
      value !== '' &&
      value !== null &&
      !Number.isNaN(value) &&
      value !== -1
    ) {
      newObject[key] = value
    }
  }
  return newObject
}

/* 深拷贝 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/* 转驼峰 */
export function camelCase(string) {
  return string.replace(/-([a-z])/g, (all, letter) => {
    return letter.toUpperCase()
  })
}

/* 生成随机数 */
export function random(num) {
  return Math.round(Math.random() * num)
}

/* 生成随机哈希 */
export function createHash(hashLength) {
  hashLength = Number(hashLength)
  if (!hashLength || typeof hashLength !== 'number') {
    return ''
  }
  const hashString = '1234567890abcdefghijklmnopqrstuvwxyz'
  return hashString
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('')
    .substr(hashString.length - hashLength)
}

/* 生成验证码 */
export function createVeryCode() {
  var selfWidth = 90,
    selfHeight = 30,
    canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    temp = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPRSTUVWXYZ23456789'.split(''),
    vCode = '',
    color =
      'rgb(' +
      randInt(1, 120) +
      ',' +
      randInt(1, 120) +
      ',' +
      randInt(1, 120) +
      ')'

  canvas.width = selfWidth
  canvas.height = selfHeight
  ctx.fillStyle = '#f3fbfe'
  ctx.fillRect(0, 0, selfWidth, selfHeight)
  ctx.globalAlpha = 0.8
  ctx.font = '16px sans-serif'

  for (var _i = 0; _i < 10; _i++) {
    ctx.fillStyle =
      'rgb(' +
      randInt(150, 225) +
      ',' +
      randInt(150, 225) +
      ',' +
      randInt(150, 225) +
      ')'
  }

  ctx.font = 'bold 32px sans-serif'
  for (var i = 0; i < 4; i++) {
    var temp_index = randInt(0, temp.length)
    ctx.fillStyle = color
    ctx.fillText(temp[temp_index], 5 + i * 23, 25)
    ctx.transform(
      randFloat(0.85, 1.0),
      randFloat(-0.04, 0),
      randFloat(-0.3, 0.3),
      randFloat(0.85, 1.0),
      0,
      0
    )
    vCode += temp[temp_index]
  }

  ctx.beginPath()
  ctx.strokeStyle = color
  var b = randFloat(selfHeight / 4, (3 * selfHeight) / 4),
    f = randFloat(selfHeight / 4, (3 * selfHeight) / 4),
    w = (2 * Math.PI) / randFloat(selfHeight * 1.5, selfWidth),
    linePoint = function(x) {
      return randFloat(10, selfHeight / 2) * Math.sin(w * x + f) + b
    }

  ctx.lineWidth = 5
  for (var x = -20; x < 200; x += 4) {
    ctx.moveTo(x, linePoint(x))
    ctx.lineTo(x + 3, linePoint(x + 3))
  }
  ctx.closePath()
  ctx.stroke()

  return {
    code: vCode.toLowerCase(),
    dataURL: canvas.toDataURL()
  }
}

/**
 * 随机获得一个范围内的浮点数
 * @param start
 * @param end
 * @returns {*}
 */
function randFloat(start, end) {
  return start + Math.random() * (end - start)
}

/**
 * 随机获得一个范围内的整数
 * @param start
 * @param end
 * @returns {*}
 */
function randInt(start, end) {
  return Math.floor(Math.random() * (end - start)) + start
}
