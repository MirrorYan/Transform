<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style>
* {
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100vh;
}
</style>
