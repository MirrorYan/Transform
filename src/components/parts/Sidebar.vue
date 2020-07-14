<template>
  <el-menu
    default-active="2"
    class="left-aside-menu">
    <el-menu-item
      v-for="(item, index) in ymlList"
      :index="'a-'+index"
      :key="index"
      :data-url="item.url"
      @click="onMenuClk">
      <em class="el-icon-document"></em>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import axios from 'axios';
import { URL } from '../../utils/request';
export default {
  name: 'Sidebar',
  components: {
  },
  beforeCreate () {
    let that = this;
    axios({
      method: 'get',
      url: URL.getList
    }).then((res) => {
      that.ymlList = res.data.detail;
    });
  },
  data () {
    return {
      ymlList: []
    }
  },
  methods: {
    // Click(Left aside Menu) => Load json
    onMenuClk (e) {
      const url = e.$attrs['data-url'];
      const that = this;
      axios({
        method: 'get',
        url: URL.getDetail + '?yaml_path=' + url
      }).then((res) => {
        that.$emit('detail', res.data);
      });
    }
  }
}
</script>

<style lang="scss">

</style>