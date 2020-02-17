import request from '@/script/ajax'
// let test = 'http://192.168.1.50:8084/api'
// let test = '/api'
let test = '/api'
// let test = 'http://uatjoin.aihuaol.com/api'
const baseUrl = process.env.NODE_ENV === 'development' ? test : '/api'

const api = {
  /**
   * 登录-验证码
   * @param params
   */
  getVerifycode (params) {
    return request(baseUrl + '/verifycode', params)
  },

  /**
   * 加盟商-注册接口
   * @param params
   */
  register (params) {
    return request(baseUrl + '/register', params)
  },

  /**
   * 加盟商-登录接口
   * @param params
   */
  login (params) {
    return request(baseUrl + '/login', params)
  }

}
export default api
