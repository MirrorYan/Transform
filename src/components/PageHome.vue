<template>
  <div class="container">
    <Sidebar />
    <codemirror
      ref="mycode"
      :options="jsonOpt"
    />
    <codemirror
      ref="mycode"
      :options="yamlOpt"
    />
  </div>
</template>

<script>
import Sidebar from './parts/Sidebar';

import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';

export default {
  name: 'PageHome',
  components: {
    Sidebar
  },
  data () {
    return {
      jsonOpt: {
        mode: {
          name: "javascript",
          json: true
        }
      },
      yamlOpt: {
        mode: {
          name: "application/yaml"
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @include flex;
}
.el-menu {
  @include flex-grow(1);
}
.vue-codemirror {
  @include flex-grow(3);
}
.CodeMirror {
  height: 100%;
}
.CodeMirror-scroll {
  width: 100%;
}
</style>