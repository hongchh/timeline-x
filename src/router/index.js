import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from '../components/Hello'
import Auth from '../components/auth/auth'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/hello', component: Hello },
    { path: '/auth', component: Auth },
    { path: '/', redirect: '/hello' }
  ]
})
