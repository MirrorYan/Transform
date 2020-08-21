<template>
  <div id="app">
    <Header v-if="$route.path !== '/login'" />
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