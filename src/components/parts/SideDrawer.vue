<template>
  <el-drawer
    title="实时执行记录"
    direction="rtl"
    size="80%"
    :visible.sync="drawer"
    :before-close="onBeforeClose">
    <el-row :gutter="18">
      <el-col :span="12">
        <el-card shadow="hover">
          <span class="title">执行进度</span>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          从不显示
        </el-card>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
export default {
  name: 'SideDrawer',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Close => Tell the parent component will close.
    onBeforeClose () {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 20px;
}
</style>