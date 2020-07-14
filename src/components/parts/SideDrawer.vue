<template>
  <el-drawer
    title="实时执行记录"
    direction="rtl"
    size="80%"
    :visible.sync="drawer"
    :before-close="onBeforeClose">
    <div class="drawer-body">
      <el-card shadow="hover" class="drawer-card">
        <div slot="header">执行进度</div>
        <el-progress :percentage="100" />
        <div class="data-analys">
          <p>已执行用例数：{{datas.details.length || 0}}</p>
          <p>用例总数：{{datas.details.length || 0}}</p>
        </div>
      </el-card>
      <el-card shadow="hover" class="drawer-card">
        <div slot="header">成功率</div>
        <el-progress :percentage="100" />
        <div class="data-analys">
          <span>成功数：{{datas.stat.successes || 0}}</span>
          <span>失败数：{{datas.stat.failures || 0}}</span>
          <span>忽略数：{{datas.stat.failures || 0}}</span>
          <span>用例总数：{{datas.stat.testsRun || 0}}</span>
        </div>
      </el-card>
      <el-card shadow="hover" class="drawer-card">
        <div slot="header">前置脚本</div>
        <el-table
          data=""
          class="table">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="name" label="脚本名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="operate" label="操作" />
        </el-table>
      </el-card>
      <el-card shadow="hover" class="drawer-card">
        <div slot="header">测试步骤</div>
        <el-table
          :data="datas.details[0].records"
          fit
          stripe>
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="name" label="用例名称" />
          <el-table-column label="执行状态">
            <el-tag
              slot-scope="scope"
              :type="handleStatus(scope.row.status)"
            >{{scope.row.status}}</el-tag>
          </el-table-column>
          <el-table-column prop="attachment" label="日志" />
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="onWatchClk(scope.row)"
              >查看</el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'SideDrawer',
  props: {  
    drawer: {
      type: Boolean,
      default: false
    },
    datas: {
      type: Object
    }
  },
  methods: {
    // Close => Tell the parent component will close.
    onBeforeClose () {
      this.$emit('close');
    },
    // Click => Send reuqest details to the parent component.
    onWatchClk (data) {
      this.$emit('request', data.meta_data)
    },
    // Return tag status type.
    handleStatus (status) {
      if (status === 'success') return 'success';
      if (status === 'failure') return 'warning';
      if (status === 'skipped') return 'info';
      if (status === 'error') return 'danger';
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
.drawer-body {
  display: flex;
  flex-wrap: wrap;
  .drawer-card {
    width: 49%;
    margin-top: 30px;
    &:nth-child(2n+1) {
      margin-right: 2%;
    }
  }
}
.table {
  width: 100%;
}
.data-analys {
  margin-top: 10px;
  span {
    display: inline-block;
    width: 45%;
  }
}
</style>