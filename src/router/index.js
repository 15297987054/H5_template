import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/Index'
import Home from '../views/Home/Index'
import E404 from '../views/exception/E_404'
// 确认下单
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '',
      redirect: '/404',
      component: E404,
      meta: {
        title: '404'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  console.info('跳转之前...')
  next()
})

router.afterEach((to) => {
  if (typeof _hmt === 'undefined') return

  _hmt && _hmt.push(['_trackPageview', '/#' + to.path])
})

export default router
