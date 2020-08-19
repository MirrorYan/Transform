import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import ('@/components/PageHome')
    }, {
      path: '/login',
      name: 'Login',
      component: () => import ('@/components/PageLogin')
    }, {
      path: '/report',
      name: 'Report',
      component: () => import ('@/components/PageReport')
    }
  ]
})
