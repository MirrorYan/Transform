<template>
  <div class="container">
    <Sidebar @detail="onGetDetail" />
    <div class="code-container json-code">
      <div class="title">JSON</div>
      <codemirror
        ref="jsonEditor"
        :options="jsonOpt"
        :value="jsonValue"
        @changes="onJsonChg"
      />
    </div>
    <div class="button-group">
      <el-button type="primary">Save</el-button>
      <el-button
        type="success"
        @click="onRunClk"
      >Run</el-button>
      <el-button type="info" plain>har2yaml</el-button>
      <el-button
        type="warning"
        plain
        @click="onTransClk(1, jsonValue)">
        <em class="el-icon-right"></em>json2yaml
      </el-button>
      <el-button
        type="danger"
        plain
        @click="onTransClk(2, yamlValue)">
        <em class="el-icon-back"></em>yaml2json
      </el-button>
    </div>
    <div class="code-container yml-code">
      <div class="title">YAML</div>
      <codemirror
        ref="ymlEditor"
        :options="yamlOpt"
        :value="yamlValue"
        @changes="onYamlChg"
      />
    </div>
    <SideDrawer
      :drawer="drawer"
      @close="DrawerClose"
    />
  </div>
</template>

<script>
import Sidebar from './parts/Sidebar';
import SideDrawer from './parts/SideDrawer';
import axios from 'axios';
import { URL } from '../utils/request';
import 'codemirror/addon/lint/lint.css';
require('script-loader!jsonlint');
import 'codemirror/addon/lint/lint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/addon/lint/yaml-lint';
// import 'codemirror/addon/fold/foldgutter.css'
// import 'codemirror/addon/fold/foldcode';
// import 'codemirror/addon/fold/foldgutter';
// import 'codemirror/addon/fold/brace-fold';
// import 'codemirror/addon/fold/comment-fold';

window.jsyaml = require('js-yaml');

export default {
  name: 'PageHome',
  components: {
    Sidebar,
    SideDrawer
  },
  data () {
    return {
      jsonOpt: {
        mode: "application/json"
      },
      yamlOpt: {
        mode: "text/x-yaml"
      },
      jsonValue: '',
      yamlValue: '',
      drawer: false
    }
  },
  methods: {
    // Custom => Get file content from Sidebar component.
    onGetDetail (detail) {
      detail.yamlDetail
        ? (this.yamlValue = detail.yamlDetail)
        : (this.yamlValue = '');
      if (detail.jsonDetail) {
        this.jsonValue = JSON.stringify(detail.jsonDetail, null, 2);
      } else {
        this.jsonValue = '';
      }
    },
    // Change => Synchronize data to jsonValue.
    onJsonChg (el) {
      this.jsonValue = el.getValue();
    },
    // Change => Synchronize data to yamlValue.
    onYamlChg (el) {
      this.yamlValue = el.getValue();
    },
    // Click(YAML <=> JSON) => Transform the code type.
    onTransClk (type, text) {
      const that = this;
      type === 1 && (text = JSON.parse(text));
      axios({
        method: 'post',
        url: URL.convert,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          type,
          data: text
        }
      }).then((res) => {
        const { detail } = res.data;
        if (type === 1) {
          that.yamlValue = detail;
        } else if (type === 2) {
          that.jsonValue = detail;
        }
      });
    },
    // Click(Run btn) => 
    onRunClk () {
      this.drawer = true;
    },
    DrawerClose () {
      this.drawer = false;
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
.button-group {
  padding: 50px 10px 10px;
}
.el-button {
  display: block;
  width: 100%;
  margin: auto;
  padding: 10px 15px;
  font-size: 16px;
  & + .el-button {
    margin-top: 20px;
  }
  em {
    font-size: 20px;
    font-weight: bold;
  }
}
.code-container {
  flex: 3;
}
.code-container {
  height: 100%;
  display: flex;
  width: 0;
  flex-direction: column;
  border: 1px solid #efefef;
  .title {
    padding: 10px;
    background-color: #efefef;
  }
}
.vue-codemirror {
  flex: 1;
  height: 0;
}
</style>