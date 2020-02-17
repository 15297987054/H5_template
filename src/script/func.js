
export default {
  install (Vue) {
    Vue.prototype.validator = {
      // 必填验证
      required: (value = '', msg) => {
        value = value === 0 ? (value + '') : value
        if (!value) {
          return msg
        }
        return ''
      },
      // 正则表达式匹配
      match: (value = '', regEx, msg) => {
        value = value + ''

        if (!value.match(regEx)) {
          return msg
        }
        return ''
      },
      // 函数判断
      func: (value, func, msg) => {
        let flag = typeof func === 'function' && func(value)
        if (!flag) {
          return msg
        }
        return ''
      }
    }
  }
}
