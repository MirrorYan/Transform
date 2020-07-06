import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/components/PageHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: PageHome
    }
  ]
})
