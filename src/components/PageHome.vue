<template>
  <div class="container">
    <Sidebar />

  </div>
</template>

<script>
import Sidebar from './parts/Sidebar';
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