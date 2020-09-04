<template>
  <div class="container home-page" v-loading="loading">
    <Sidebar @detail="handleGetDetail" />
    <div class="right-container">
      <div class="button-group">
        <el-button type="primary"
          icon="el-icon-download"
        >Save</el-button>
        <el-button type="success"
          icon="el-icon-video-play"
          :disabled="jsonValue === ''"
          @click="onRunClk"
        >Run</el-button>
        <el-upload class="upload-har"
          action="actionString"
          accept=".har"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :http-request="handleUpload">
          <el-button type="info"
            icon="el-icon-upload2"
          >Upload .har file</el-button>
        </el-upload>
        <el-button type="warning"
          icon="el-icon-refresh"
          @click="onTransClk(1, jsonValue)"
        >json2yaml</el-button>
        <el-button type="danger"
          icon="el-icon-refresh"
          @click="onTransClk(2, yamlValue)"
        >yaml2json</el-button>
      </div>
      <div class="code-container">
        <div class="code-content json-code">
          <div class="title">JSON</div>
          <codemirror
            ref="jsonEditor"
            :options="jsonOpt"
            :value="jsonValue"
            @changes="onJsonChg"
          />
        </div>
        <div class="code-content yml-code">
          <div class="title">YAML</div>
          <codemirror
            ref="ymlEditor"
            :options="yamlOpt"
            :value="yamlValue"
            @changes="onYamlChg"
          />
        </div>
      </div>
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
import { uploadHar, JsYmConvert, runTstcs } from '../utils/api';
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
      loading: false,
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
      uploadHar
    }
  },
  methods: {
    // Custom => Get file content from Sidebar component.
    handleGetDetail (detail) {
      detail.yamldata
        ? (this.yamlValue = detail.yamldata)
        : (this.yamlValue = '');
      detail.jsondata
        ? (this.jsonValue = JSON.stringify(detail.jsondata, null, 2))
        : (this.jsonValue = '');
    },
    // Change => Synchronize data to jsonValue.
    onJsonChg (el) {
      this.jsonValue = el.getValue();
    },
    // Change => Synchronize data to yamlValue.
    onYamlChg (el) {
      this.yamlValue = el.getValue();
    },
    // Click(Run btn) => Run the code & Open SideDrawer.
    onRunClk () {
      if (this.loading) return;
      let json;
      try {
        json = JSON.parse(this.jsonValue);
      } catch (err) {
        this.$message({
          type: 'error',
          message: 'JSON内容不符合规则，不能执行!',
          duration: 2000
        });
        return;
      }
      this.loading = true;
      runTstcs(json).then(res => {
        this.runData = res.data;
        this.drawer = true;
        this.loading = false;
      })
    },
    onRequstDtl (requestDtl) {
      console.log(1);
      this.requestDtl = requestDtl;
      this.dialogTableVisible = true;
    },
    DrawerClose () {
      this.drawer = false;
    },
    // Series functions for uploading .har files.
    handleBeforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) { 
        this.$message.error('上传文件大小不能超过 10MB ！');
      }
      return isLt10M;
    },
    handleUpload (param) {
      let formData = new FormData();
      formData.append('file', param.file);
      uploadHar(formData).then(res => {
        this.$message({
          type: 'success',
          message: '文件上传成功！',
          duration: 1500
        });
        this.jsonValue = JSON.stringify(res.json_data, null, 2);
        this.yamlValue = res.yaml_data;
      }).catch(res => {
        this.$message.error({
          message: '文件上传失败！',
          duration: 1500
        });
      });
    },
    // Click(YAML <=> JSON) => Transform the code type.
    onTransClk (type, text) {
      const that = this;
      type === 1 && (text = JSON.parse(text));
      JsYmConvert({
        type,
        data: text
      }).then(res => {
        if (type === 1) {
          that.yamlValue = res.detail;
        } else {
          that.jsonValue = JSON.stringify(res.detail, null, 2);
        }
      });
    }
  }
}
</script>

<style lang="scss">
.home-page {
  display: flex;
  .el-menu {
    flex: 1;
  }
  .button-group {
    padding: 10px 20px;
  }
  .el-button {
    margin: 5px;
    padding: 10px 15px;
    font-size: 16px;
    em {
      font-size: 20px;
      font-weight: bold;
    }
  }
  .upload-har {
    display: inline-block;
  }
  .right-container,
  .code-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .code-container {
    flex: 1;
    display: flex;
  }
  .code-content {
    width: 0;
    height: 100%;
    border-right: 1px solid #eee;
    .title {
      padding: 10px;
      background-color: #efefef;
    }
  }
  .vue-codemirror {
    flex: 1;
    height: 0;
  }
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