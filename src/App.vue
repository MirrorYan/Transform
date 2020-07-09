<template>
  <div id="app">
    <Header />
    <router-view />
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