<template>
    <SignIn />
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
  })
}
</script>
