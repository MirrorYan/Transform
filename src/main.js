import Vue from 'vue';
import ElementUI from 'element-ui';
import VueCodemirror from 'vue-codemirror';
import App from './App';
import 'element-ui/lib/theme-chalk/index.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars';
import router from './router';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueCodemirror, {
  options: {
    theme: 'duotone-light',
    scrollbarStyle: 'simple',
    tabSize: 2,
    lint: true, // 开启语法检查
    lineWrapping: false, // 滚动以显示长行
    lineNumbers: true,   // 在左侧显示行号
    matchBrakets: true, // 括号匹配
    cursorScrollMargin: 5,
    // foldGutter: true, // 支持代码折叠
    gutters: ['CodeMirror-lint-markers'],
    // gutters: ['CodeMirror-foldgutter', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
