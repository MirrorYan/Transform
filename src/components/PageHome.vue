<template>
  <div class="container">
    <Sidebar @detail="onGetDetail" />
    <div class="code-container json-code">
      <div class="title">JSON</div>
      <codemirror
        ref="jsonEditor"
        :options="jsonOpt"
        :value="jsonValue"
      />
    </div>
    <div class="button-group">
      <el-button type="primary">Save</el-button>
      <el-button type="success">Run</el-button>
      <el-button type="info" plain>har2yaml</el-button>
      <el-button
        type="warning"
        plain
        @click="onJSONtoYML(1, json)">
        <em class="el-icon-right"></em>json2yaml
      </el-button>
      <el-button
        type="danger" plain>
        <em class="el-icon-back"></em>yaml2json
      </el-button>
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
import axios from 'axios';
import { URL } from '../utils/request';
import 'codemirror/addon/lint/lint.css';
require('script-loader!jsonlint');
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
        mode: "application/json"
      },
      yamlOpt: {
        mode: "application/yaml"
      },
      json: {},
      jsonValue: ""
    }
  },
  methods: {
    onGetDetail (detail) {
      this.json = detail;
      this.jsonValue = JSON.stringify(detail, null, 2);
    },
    onJSONtoYML (type, text) {
      console.log(URL.convert)
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
         console.log(res.data.detail);
      }).then((res) => {
        console.log(res);
      })
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