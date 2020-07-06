<template>
  <header>
    <h2>JSON和YML在线转换</h2>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">mock</el-menu-item>
      <el-menu-item index="3">config</el-menu-item>
      <el-menu-item index="4">report</el-menu-item>
      <el-menu-item index="5">log</el-menu-item>
      <el-menu-item index="6">cron</el-menu-item>
      <el-menu-item index="7">py</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  data () {
    return {
      activeIndex: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  @include flex;
  padding: 0 10px;
  background: $blue;
}
h2 {
  color: #fff;
}
.el-menu {
  @include flex-grow(1);
  background-color: transparent;
  border: none;
  & > .el-menu-item.is-active {
    background-color: transparent;
    color: #fff;
    border-color: #fff;
  }
}
.el-menu-item {
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  &:not(.is-disabled):hover {
    background: rgba(255, 255, 255, .1);
    color: #fff;
  }
}
</style>