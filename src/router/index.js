import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Auth from '../components/auth/Auth'
import Main from '../components/main/Main'
import Management from '../components/main/management/Management'
import Timeline from '../components/main/time_show/Timeline'
import TimeSlide from '../components/main/time_show/TimeSlide'

import store from '../store'

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/auth', component: Auth },
    {
      path: '/main',
      component: Main,
      children: [
        { path: 'management', component: Management },
        { path: 'timeline', component: Timeline },
        { path: 'time-slide', component: TimeSlide },
        { path: '', redirect: 'timeline' }
      ]
    },
    { path: '/', redirect: '/auth' }
  ]
})

router.beforeEach((to, from, next) => { // 对特定路径进行验证，增强锁屏功能
  if (to.path === '/') {
    next('/auth')
  } else if (to.path === '/auth' && !store.state.lockScreen) {
    next('/main')
  } else if (to.path !== '/auth' && store.state.lockScreen) {
    next('/auth')
  } else {
    next()
  }
})

export default router
