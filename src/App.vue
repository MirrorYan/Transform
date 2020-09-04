<template>
  <div id="app">
    <Header v-if="$route.path !== '/login'" />
    <router-view />
  </div>
</template>

<script>
import Header from './components/parts/Header';
import { WebSocketTst } from './utils/websocket';

export default {
  name: 'App',
  components: {
    Header
  },
  mounted () {
    WebSocketTst();
  }
};
</script>