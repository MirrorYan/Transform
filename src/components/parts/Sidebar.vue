<template>
  <el-tabs class="sidebar" v-model="activeTab">
    <el-tab-pane label="History" name="history">      
    </el-tab-pane>
    <el-tab-pane label="Collections" name="collection">
      <el-menu class="left-aside-menu" default-active="test-0">
        <el-menu-item
          v-for="(item, index) in testcaseLst"
          :index="'test-'+index"
          :key="index"
          @click="onTestcaseClk(item.id)">
          <em class="el-icon-document"></em>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </el-tab-pane>
    <el-tab-pane label="APIs" name="api"></el-tab-pane>
  </el-tabs>
</template>

<script>
import { getTstcsLst, getTstcsDtl } from '../../utils/api';
export default {
  name: 'Sidebar',
  components: {
  },
  beforeCreate () {
    let that = this;
    // Load testcase list.
    getTstcsLst().then(res => { that.testcaseLst = res.data });
  },
  data () {
    return {
      activeTab: 'history',
      testcaseLst: []
    }
  },
  methods: {
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
  .el-tabs__header {
    margin-bottom: 0;
  }
  .el-tabs__item.is-top{
    &:nth-child(2) {
      padding-left: 20px;
    }
    &:last-child {
      padding-right: 20px;
    }
  }
}
</style>