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
        { path: '', redirect: 'management' }
      ]
    },
    { path: '/', redirect: '/auth' }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/auth')
  } else if (to.path === '/auth' && !store.state.lockScreen ||
    to.path !== '/auth' && store.state.lockScreen) {
    next(false)
  } else {
    next()
  }
})

export default router
