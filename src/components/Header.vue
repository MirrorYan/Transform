<template>
  <header>
    <h2>JSON和YML在线转换</h2>
    <div className="button-group">
      <button onClick={this.onConfigClick}>Config</button>
      <button>Convert</button>
      <button>Save</button>
      <button>Run</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',

  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped>
  header {
    display: flex;
    padding: 10px;
  }
  h2 {
    flex: 1;
  }
</style>