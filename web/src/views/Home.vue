<template>
<div class="home">
    <TheHeader />
    <Chats />
    <TheFooter />
</div>
</template>

<script>
// @ is an alias to /src
import TheHeader from '@/components/TheHeader.vue'
import Chats from '@/components/Chats.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'Home',
  components: {
    TheHeader,
    Chats,
    TheFooter
  }
}
</script>
