// 手机号 正则表达式
export const phoneEx = /^1(3[0-9]|4[57]|5[0-35-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9])\d{8}$/

// 身份证号
export const idCardEx = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 邮箱
export const emailEx = /^\w+((-\w+)|(\.\w+))*\u0040[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/

// qq
export const qqEx = /^[1-9]\d{4,9}$/

// 银行卡号
export const bankCardEx = /^([1-9]\d{14,18})$/

// 图片
export const imageEx = /^.+\.(jpg|jpeg|png|gif|GIF|JPG|PNG|JPEG)$/
// word文档
export const wordEx = /^.+.(doc|docx)$/
// ppt文档
export const pptEx = /^.+.(ppt|pptx)$/
// excel文档
export const excelEx = /^.+.(xlsx|xls)$/
// 视频
export const videoEx = /^.+.(mp4|ogg|avi|wmv|mov|mpg)$/
// 音频
export const audioEx = /^.+.(mp3|wav|ogg|m4a)$/
// pdf文档
export const pdfEx = /^.+.pdf$/

// 真实姓名
// const nameRegex = /^[\uDB40DC00-\uDB7FDFFF\.\·\u2022]+(?:\.\·[\uDB40DC00-\uDB7FDFFF\.\·\u2022]+)*$/
export const nameRegex = /^[\u4E00-\u9FA5\uf900-\ufa2d|·]{2,10}$/

/**
 * 验证姓名是否正确
 * @param {name} 姓名
 */
export function isValidName (name) {
  return nameRegex.test(name) && name.length >= 2 && name.length <= 16
}
/**
 * 验证身份证是否有效
 * @param {id} 身份证号
 */
export function isValidLastNumberOfId (id) {
  if (!id || id.length !== 18) return false

  let length = 18
  let sum = 0
  let originLastNumber = id[length - 1].toUpperCase()
  let bases = '7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2'.split(' ')
  let mapping = '1 0 X 9 8 7 6 5 4 3 2'.split(' ')
  let lastNumber

  length--

  while (--length >= 0) {
    sum += id[length] * bases[length]
  }

  lastNumber = mapping[sum % 11]

  return lastNumber === originLastNumber
}
