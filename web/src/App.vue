<template>
  <div id="app">
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
    background-color: #ffe7e7;
}
</style>
