<template>
    <SignIn :username="username" />
</template>

<script>
// @ is an alias to /src
import SignIn from '@/components/SignIn.vue'

import api from '@/store/api.js'

export default {
  name: 'Sign',
  components: {
    SignIn
  },
  data: () => ({
    api: api
  }),
  computed: {
    login: function () {
      return `${api.host}${api.endpoint.users}`
    },
    username: {
      get () {
        return localStorage.getItem('userName')
      },
      set (newValue) {
        localStorage.setItem('userName', newValue)
      }
    }
  }
}
</script>
