<template>
  <div class="container">
    <Sidebar />
    <div class="code-container json-code">
      <div class="title">JSON</div>
      <codemirror
        ref="jsonEditor"
        :options="jsonOpt"
      />
    </div>
    <div class="code-container yml-code">
      <div class="title">YAML</div>
      <codemirror
        ref="ymlEditor"
        :options="yamlOpt"
      />
    </div>
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
  display: flex;
}
.el-menu {
  flex: 1;
}
.code-container {
  flex: 3;
}
.vue-codemirror {
  height: 100%;
}
</style>