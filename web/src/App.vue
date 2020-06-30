<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Главная </router-link>|
      <router-link to="/about"> About </router-link>|
      <router-link to="/reg"> Регистрация </router-link>|
      <router-link to="/sign"> Вход </router-link>
    <router-view/>
    </div>
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
#nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
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
