<template>
  <header>
    <img src="../../assets/logo.png" alt="Logo">
    <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router>
      <el-menu-item
        v-for="(item, index) in $router.options.routes"
        :index="item.path"
        :key="index"
      >{{item.name}}</el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
header {
  padding: 0 10px;
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