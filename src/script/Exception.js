/**
 * 全局的异常处理类.
 * @param error 错误消息
 * @param vm vue 组件对象.
 * @param type 默认 0: 系统异常, 如 404, 500等. 1 业务异常, 如身份证号重复等.
 * @constructor
 */
export default function GlobalExceptionHandle (error, vm, type = 0) {
  // Todo 全局的异常上报. 异步处理.
  console.error(vm)
  console.error(type + '-' + error)
}
