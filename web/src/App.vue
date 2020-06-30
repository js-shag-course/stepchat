<template>
  <div id="app">
    <div id="nav">
      <TheHeader/>
      <router-view/>
      <TheFooter/>
    </div>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
export default {
  name: 'app',
  data: function () {
    return {}
  },
  methods: {},
  components: {
    TheFooter,
    TheHeader
  }
}
</script>

<style lang="scss">
html, body, form{
  margin: 0;
  padding: 0
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
