import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Hello from '../components/Hello'

export default new Router({
  mode: 'history',
  routes: [
    { path: '/hello', component: Hello },
    { path: '/', redirect: '/hello' }
  ]
})
