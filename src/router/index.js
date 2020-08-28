import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

// 定义路由
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      icon: 'el-icon-s-home',
      component: () => import ('@/components/PageHome')
    }, {
      path: '/login',
      name: 'Login',
      icon: '',
      component: () => import ('@/components/PageLogin')
    }, {
      path: '/report',
      name: 'Report',
      icon: '',
      component: () => import ('@/components/PageReport')
    }
  ]
});
// 拦截器
router.beforeEach((route, redirect, next) => {
  const token = window.localStorage.getItem('token');
  if (!token && route.path !== '/login') {
    next({ path: '/login' });
  } else {
    next();
  }
})

export default router;