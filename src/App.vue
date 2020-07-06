<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/parts/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
</style>
