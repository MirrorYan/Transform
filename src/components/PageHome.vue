<template>
  <div class="container">
    <Sidebar />
    <codemirror
      ref="mycode"
      class="code"
    />
  </div>
</template>

<script>
import Sidebar from './parts/Sidebar';
import 'codemirror/mode/javascript/javascript.js'

export default {
  name: 'PageHome',
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
// .container {
//   @include flex;
// }
</style>