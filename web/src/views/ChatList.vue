<template>
  <div>
    <h1>ChatList</h1>
    <Chats/>
  </div>
</template>

<script>
import Chats from '@/components/Chats.vue'
export default {
  name: 'ChatList',
  components: {
    Chats
  }
}
</script>
