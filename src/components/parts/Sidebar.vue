<template>
  <el-tabs class="sidebar" v-model="activeTab">
    <el-tab-pane label="History" name="history">
      <el-scrollbar>
        <el-menu class="left-aside-menu">
          <el-menu-item v-for="(item, index) in historyLst"
            :index="'history-'+index"
            :key="index"
            @click="onHistoryClk(item.id)">
            <el-tag :type="handleColor(item.method)">{{item.method}}</el-tag>
            <span slot="title">{{item.url}}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="Testcases" name="collection">
      <el-scrollbar>
        <el-button type="primary"><em class="el-icon-plus"></em> Add Testcase</el-button>
        <el-menu class="left-aside-menu">
          <el-menu-item
            v-for="(item, index) in testcaseLst"
            :index="'test-'+index"
            :key="index"
            @click="onTestcaseClk(item.id)">
            <em class="el-icon-document"></em>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="APIs" name="api"></el-tab-pane>
  </el-tabs>
</template>

<script>
import { getTstcsLst, getTstcsDtl, getHistoryLst } from '../../utils/api';
export default {
  name: 'Sidebar',
  components: {
  },
  beforeCreate () {
    let that = this;
    // Load history list.
    getHistoryLst().then(res => { console.log(res.data);this.historyLst = res.data; });
    // Load testcase list.
    getTstcsLst().then(res => { that.testcaseLst = res.data; });
  },
  data () {
    return {
      activeTab: 'history',
      historyLst: [],
      testcaseLst: []
    }
  },
  methods: {
    handleColor (method) {
      if (method === 'GET') return 'success';
      if (method === 'POST') return '';
      if (method === 'PUT') return 'blue';
      return 'info ';
    },
    // Click(history) => Load json
    onHistoryClk (id) {

    },
    // Click(testcase) => Load json
    onTestcaseClk (id) {
      const that = this;
      getTstcsDtl(id).then(res => { that.$parent.handleGetDetail(res.data) });
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  width: 300px;
  &.el-tabs {
    display: flex;
    flex-direction: column;
  }
  .el-tabs__content {
    flex: 1;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tab-pane {
    height: 100%;
    .el-button {
      display: block;
      width: 90%;
      margin: 10px auto;
    }
  }
  .el-tabs__item.is-top {
    &:nth-child(2) {
      padding-left: 20px;
    }
    &:last-child {
      padding-right: 20px;
    }
  }
  .el-menu {
    float: left;
    min-width: 100%;
    border: none;
  }
  .el-menu-item {
    color: $blue;
    .el-tag {
      height: auto;
      margin-right: 5px;
      padding: 5px;
      line-height: 1;
      background-color: transparent;
    }
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    height: calc(100% + 15px);
  }
  .el-scrollbar__view {
    &::after {
      @include clear;
    }
  }
}
</style>