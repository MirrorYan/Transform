import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
