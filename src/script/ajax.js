import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Toast } from 'vant'
import utils from './utils'
import ExceptionHandle from './Exception'
import qs from 'qs'
Vue.use(Toast)

/**
  * 封装请求方法
  * @param  {url}  请求url
  * @param  {data}  请求参数
  * @param  {method}  请求方式
  */
export default function getAjax (url, data = {}, method = 'post', contentType = false) {
  return new Promise(function (resolve, reject) {
    const options = {
      url,
      method
    }
    options.headers = {
      'platform': 'H5',
      'requestAim': 'aiHuaJoinIn',
      'Authorization': utils.getLocalstorageStore('Authorization') || '',
      'clientKey': utils.getLocalstorageStore('clientKey') || '',
      'path': '/' + window.location.hash || ''
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      if (contentType) {
        options.data = data
      } else {
        options.data = qs.stringify(data)
      }
    }

    axios(options).then(res => {
      let result = res.data
      if (Number(result.code) === 0) {
        resolve(result)
      } else if (Number(result.code) === 501) { // 未登录
        router.replace('/login')
      } else if (Number(result.code) === 502) { // 直接跳转登陆.
        router.replace('/login')
      } else {
        if (result.msg) {
          Toast(result.msg)
        }
      }
    }).catch(error => {
      reject(error)
      Toast(error)
      ExceptionHandle(error, this)
    })
  }).catch(error => {
    ExceptionHandle(error, this)
    Toast('服务器出问题啦！')
  })
}
