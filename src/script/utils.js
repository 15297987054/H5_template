let CryptoJS = require('crypto-js')

const Utils = {
  getStore (key) {
    let _value = sessionStorage.getItem(key)
    _value = _value === null ? '' : _value
    return _value
  },
  setStore (key, value) {
    if (key && value !== '') {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      sessionStorage.setItem(key, value)
    }
  },
  removeStore (key) {
    if (this.getStore(key)) {
      sessionStorage.removeItem(key)
    }
  },
  getLocalstorageStore (key) {
    let _value = window.localStorage.getItem(key)
    _value = _value === null ? '' : _value
    return _value
  },
  setLocalstorageStore (key, value) {
    if (key && value !== '') {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      window.localStorage.setItem(key, value)
    }
  },
  removeLocalstorageStore (key) {
    if (this.getStore(key)) {
      window.localStorage.removeItem(key)
    }
  },
  getCookie (name) {
    if (!document.cookie.length) return
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)

    if (Array.isArray(arr)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  setCookie (name, value, days = 30) {
    let exp = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  },
  delCookie (name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = Utils.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  },
  padStart (sourceString) {
    if (typeof sourceString === 'undefined') return ''
    return (sourceString - 10) < 0 ? '0' + sourceString : sourceString
  },
  encryptByDES (message) {
    if (!message) return
    let key = '29582849'
    let iv = '98626432'
    key = CryptoJS.MD5(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    let encrypted = CryptoJS.DES.encrypt(message, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  generateDateByString (str) {
    let result = {}
    if (str && typeof str === 'string') {
      str = str.replace(/-/g, '/') // 苹果safari, - 穿件日期NAN.
      result = new Date(str)
    } else {
      result = new Date()
    }
    return result
  },
  getQueryString (name) {
    let str = `(^|&)${name}=([^&]*)(&|$)`
    let reg = new RegExp(str, 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURI(r[2])
    return null
  },
  setBodyScroll (flag) {
    let body = document.getElementsByTagName('body')[0]
    if (flag) {
      body.style.position = 'fixed'
    } else {
      body.style.position = 'initial'
    }
  },
  // 获取屏幕宽度
  getWindowWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  },
  // 获取屏幕高度
  getWindowHeight () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  },
  // 处理async/await的异常
  async errorCaptured (asyncFunc) {
    try {
      let res = await asyncFunc()
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  },
  debounce (func, wait = 50, immediate = false) {
    let timer, context, args
    const later = () => setTimeout(() => {
      timer = null
      if (!immediate) {
        func.apply(context, args)
        context = args = null
      }
    }, wait)
    return function (...params) {
      // 如果没有创建延迟执行函数（later），就创建一个
      if (!timer) {
        timer = later()
        // 如果是立即执行，调用函数
        // 否则缓存参数和调用上下文
        if (immediate) {
          func.apply(this, params)
        } else {
          context = this
          args = params
        }
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
      } else {
        clearTimeout(timer)
        timer = later()
      }
    }
  },
  // 去掉字符串左右空格
  trim (s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
  },
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}

export default Utils
