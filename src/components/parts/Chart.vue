<template>
  <div class="echarts" :id="id"></div>
</template>

<script>
import Echarts from 'echarts';

export default {
  name: 'Chart',
  props: {
    id: String,
    option: Object
  },
  data () {
    return {
      chart: null
    }
  },
  methods: {
    initChart () {
      var chart = Echarts.init(document.getElementById(this.id));
      chart.setOption(this.option);
    }
  },
  mounted () {
    this.initChart();
  }
}
</script>