import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCodemirror from 'vue-codemirror';
import App from './App';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-light.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueCodemirror, {
  options: {
    theme: 'duotone-light',
    tabSize: 2,
    lineWrapping: false, // 滚动以显示长行
    lineNumbers: true,   // 在左侧显示行号
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
