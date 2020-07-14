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
      <el-upload
        :action="uploadHar"
        :on-success="handleSuccess"
        accept=".har"
      >
        <el-button type="info" plain>har2yaml</el-button>
      </el-upload>
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
      v-if="runData"
      :drawer="drawer"
      :datas="runData"
      @request="onRequstDtl"
      @close="DrawerClose"
    />
    <el-dialog
      v-if="requestDtl"
      title="Request and Response data"
      center="true"
      destroy-on-close="true"
      :visible.sync="dialogTableVisible">
      <div class="dialog-block">
        <p class="title">Request</p>
        <div class="table-container">
          <table class="table">
            <tr v-for="(value, key) in requestDtl.request" :key="key">
              <th>{{key}}</th>
              <td v-if="typeof value == 'object'">
                <p v-for="(innerValue, innerKey) in value" :key="innerKey">
                  <strong>{{innerKey}} : </strong>{{innerValue}}
                </p>
              </td>
              <td v-else>{{value}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="dialog-block">
        <p class="title">Response</p>
        <div class="table-container">
          <table class="table">
            <tr v-for="(value, key) in requestDtl.response" :key="key">
              <th>{{key}}</th>
              <td v-if="typeof value == 'object'">
                <p v-for="(innerValue, innerKey) in value" :key="innerKey">
                  <strong>{{innerKey}} : </strong>{{innerValue}}
                </p>
              </td>
              <td v-else>{{value}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="dialog-block">
        <p class="title">Validators</p>
        <el-table :data="runData.validators" fit>
          <el-table-column type="check" label="check" />
          <el-table-column type="check_value" label="check value" />
          <el-table-column type="check_result" label="check result" />
          <el-table-column type="expect" label="expect value" />
          <el-table-column type="comparator" label="comparator" />
          <el-table-column type="method" label="method" />
        </el-table>
      </div>
      <div class="dialog-block">
        <p class="title">Step Extractor</p>
        <div class="table-container">
          <table class="table">
            <template v-for="item in requestDtl.step_extractor">
              <tr v-for="(value, key) in item" :key="key">
                <th>{{key}}</th>
                <td>{{value}}</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </el-dialog>
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
      url: '',
      runData: null,
      requestDtl: null,
      drawer: false,
      dialogTableVisible: false,
      uploadHar: URL.uploadHar
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
    // Click(Run btn) => Run the code & Open SideDrawer.
    onRunClk () {
      let json;
      try {
        json = JSON.parse(this.jsonValue);
      } catch (err) {
        this.$message({
          type: "warning",
          message: 'JSON内容不符合规则，不能执行哦',
          duration: 2000
        });
        return;
      }
      axios({
        url: URL.runYaml,
        method: 'post',
        data: {
          json_data: json
        }
      }).then((res) => {
        if (res.data.code != 10000) return;
        this.runData = res.data;
        this.drawer = true;
      });
    },
    onRequstDtl (requestDtl) {
      console.log(1);
      this.requestDtl = requestDtl;
      this.dialogTableVisible = true;
    },
    DrawerClose () {
      this.drawer = false;
    },
    // For .har file upload success.
    handleSuccess (res, file, fileList) {
      this.jsonValue = JSON.stringify(res, null, 2);
      this.yamlValue = '';
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
  margin: 20px auto 0;
  padding: 10px 15px;
  font-size: 16px;
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

.dialog-block {
  & + .dialog-block {
    margin-top: 40px;
  }
  .title {
    display: inline-block;
    padding: 8px 10px;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 3px;
    background-color: $light-blue;
  }
  table {
    text-align: left;
    line-height: 1.4;
    border-top: 1px solid #EBEEF5;
  }
  th, td {
    padding: 10px;
    border-bottom: 1px solid #EBEEF5;
  }
  th {
    padding-left: 0;
    white-space: nowrap;
  }
}
</style>