<template>
  <el-tabs class="sidebar" v-model="activeTab">
    <el-tab-pane label="Server List" name="serverLst">
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
  </el-tabs>
</template>

<script>
export default {
  name: 'PageMock',  
}
</script>