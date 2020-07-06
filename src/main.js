import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCodemirror from 'vue-codemirror';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import 'codemirror/lib/codemirror.css';

Vue.config.productionTip = false;
Vue.use(
  ElementUI,
  VueCodemirror
);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
