// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vant/lib/index.css'
import App from './App'
import router from './router'
import Utils from './script/utils'
import func from './script/func'
import ExceptionHandle from './script/Exception'
import VConsole from 'vconsole'
import { Dialog } from 'vant'

// 全局注册, 组件使用dialog
Vue.use(Dialog)

Vue.prototype.utils = Utils
Vue.use(func)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.errorHandler = ExceptionHandle
Vue.prototype.$throw = function (error, that, type) {
  ExceptionHandle(error, that, type)
}

// Todo app 发版本自动修改版本号
Vue.prototype.GLOBAL = {
  appVersion: '1.0.0'
}

// ************* 添加百度统计 ************* start
let hm = document.createElement('script')
if (process.env.NODE_ENV === 'testing') { // 50, AT 等测试环境.
  // 测试环境添加vconsole方便在手机中调试
  let vConsole = new VConsole()
  console.log('[system] 已启用 vconsole' + vConsole.version)
} else if (process.env.NODE_ENV === 'production') { // 正式环境.
  // hm.src = 'https://hm.baidu.com/hm.js?921603e257e39e5b618482a7c85ea0b3'
}
let s = document.getElementsByTagName('body')[0]
s.appendChild(hm)
// ***************** 添加百度统计 ************ end

// 金额过滤器
Vue.filter('money', function (value) {
  if (typeof value !== 'number') return ''
  return parseFloat(value / 100).toFixed(2).toLocaleString()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
