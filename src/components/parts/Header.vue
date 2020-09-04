<template>
  <header>
    <img class="logo" src="../../assets/logo.png" alt="Logo">
    <el-menu :default-active="$route.path"
      mode="horizontal"
      router>
      <template v-for="(item, index) in $router.options.routes">
        <el-menu-item v-if="item.path !== '/login'"
          :index="item.path"
          :key="index"
        ><em :class="item.icon"/>{{item.name}}</el-menu-item>
      </template>
    </el-menu>
    <div class="user-container">
      <span><em class="el-icon-user-solid"></em>{{username}}</span>
      <button @click="handleLogout"><em class="logout-icon"></em>SIGN OUT</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      username: 'Mirror'
    }
  },
  methods: {
    handleLogout () {

    }
  }
}
</script>

<style lang="scss">
header {
  display: flex;
  height: 90px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 10px #eee;
  .logo {
    width: 160px;
    margin: 5px 0 4px 30px;
  }
  // Navigation
  .el-menu {
    flex: 1;
    display: flex;
    align-items: stretch;
    margin-left: 10%;
    margin-right: 30px;
    &.el-menu--horizontal {
      border: none;
    }
    > .el-menu-item {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
      &.is-active,
      &.is-active:hover {
        color: $blue;
      }
    }
  }
  .user-container {
    margin-right: 30px;
    display: inline-flex;
    align-items: center;
  }
}
.logout-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url(../../assets/logout.svg);
}
.user-container {
  .el-icon-user-solid {
    display: inline-block;
    margin-right: 5px;
    color: $red;
  }
  button {
    margin-left: 15px;
    padding: 8px 20px;
    font-size: 13px;
    color: #fff;
    border: none;
    border-radius: 20px;
    background-color: $red;
    transition: opacity .2s ease;
    &:hover {
      opacity: .8;
    }
  }
  .logout-icon {
    margin-right: 7px;
    vertical-align: text-top;
  }
}
</style>