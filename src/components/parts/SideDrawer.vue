<template>
  <el-drawer class="result-drawer"
    title="Request Detail"
    direction="rtl"
    size="65%"
    :visible.sync="drawer"
    :open="handleOpen()"
    :before-close="onBeforeClose">
    <el-scrollbar style="height: 100%">
      <div class="drawer-body">
        <el-card class="drawer-card chart-card">
          <div slot="header">Results</div>
          <div class="results-container">
            <el-progress type="circle" :percentage="100" status="success" />
            <div class="details">
              <p><strong>请求平均耗时：<span class="green">{{datas.time.avg || 0}} ms</span></strong></p>
              <p><strong>执行总耗时：<span class="green">{{datas.time.duration || 0}} s</span></strong></p>
            </div>
          </div>
          <div class="results-container">
            <el-progress type="circle"
              :percentage="datas.stat.successes/datas.stat.testsRun"
              :status="succStatus" />
            <div class="details succRateDtl">
              <span style="margin-right:20px;">
                <p><strong>总数：{{datas.stat.testsRun || 0}}</strong></p>
                <p>成功：{{datas.stat.successes || 0}}</p>
                <p>失败：{{datas.stat.failures || 0}}</p>
              </span>
              <span>
                <p><strong>通过率：<span class="green">{{passRate}}</span></strong></p>
                <p>忽略数：{{datas.stat.failures || 0}}</p>
              </span>
            </div>
          </div>
        </el-card>
        <el-card class="drawer-card">
          <div slot="header">测试步骤</div>
          <el-table
            :data="datas.details[0].records"
            max-height="500"
            fit
            stripe>
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="name" label="用例名称" />
            <el-table-column
              prop="meta_data.response.response_time_ms"
              width="110"
              label="执行时间(ms)"
              align="center"
            />
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
    </el-scrollbar>
  </el-drawer>
</template>

<script>
import Chart from './Chart';

export default {
  name: 'SideDrawer',
  components: {
    Chart
  },
  props: {  
    drawer: {
      type: Boolean,
      default: false
    },
    datas: {
      type: Object
    }
  },
  computed: {
    succStatus () {
      let status = '';
      const details = this.datas.stat;
      const sum = details.successes / details.testsRun;
      if (sum < 0.3) {
        status = 'warning';
      } else if (sum == 1) {
        status = 'success';
      }
      return status;
    },
    passRate () {
      let sum = 0;
      const details = this.datas.stat;
      sum = (details.successes/details.testsRun).toFixed(1);
      return sum + '%';
    }
  },
  methods: {
    handleOpen () {
      console.log(this.datas)
    },
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
    },
    // 测试用例成功率饼图参数
    // handleExeChart () {
    //   let data = this.datas.stat;
    //   console.log(this.datas)
    //   return {
    //     tooltip: {},
    //     legend: {
    //       orient: 'vertical',
    //       left: 'left',
    //       selectedMode: false,
    //       selectorLabel: {
    //         color: 'auto'
    //       },
    //       formatter: '{}',
    //       data: ['成功', '跳过', '错误', '失败']
    //     },
    //     series: [{
    //       type: 'pie',
    //       radius: ['35%', '50%'],
    //       hoverOffset: 5,
    //       label: {
    //         show: false,
    //         position: 'center'
    //       },
    //       emphasis: {
    //         label: {
    //           show: true,
    //           fontSize: '18',
    //           fontWeight: 'bold'
    //         }
    //       },
    //       data: [{
    //         name: '成功',
    //         value: data.successes,
    //         itemStyle: {
    //           color: '#a6db8c'
    //         }
    //       },{
    //         name: '跳过',
    //         value: data.skipped,
    //         itemStyle: {
    //           color: '#5ab1ef'
    //         }
    //       }, {
    //         name: '错误',
    //         value: data.errors,
    //         itemStyle: {
    //           color: '#fbb980'
    //         }
    //       }, {
    //         name: '失败',
    //         value: data.failures,
    //         itemStyle: {
    //           color: '#ff9898'
    //         }
    //       }]
    //     }]
    //   }
    // },
  }
}
</script>

<style lang="scss">
.result-drawer {
  .drawer-card + .drawer-card {
    margin-top: 30px;
  }
  .results-container {
    display: inline-flex;
    align-items: center;
    width: 48%;
    min-width: 400px;
    padding-left: 3%;
    margin: 10px 0;
    .details {
      margin-left: 30px;
      line-height: 1.6;
    }
    .succRateDtl {
      > span {
        display:inline-block;
        vertical-align:top;
        > span {
          display: block;
        }
      }
    }
    strong {
      display: block;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.chart-card {
  .el-card__body {
    text-align: center;
  }
  .results-container {
    text-align: left;
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