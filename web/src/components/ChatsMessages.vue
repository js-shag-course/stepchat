<template>
  <div id="messages" @click: (getMessagesJson())>
    <ul>
      <IncomingMessages v-for="message in messages" :message = "message"></IncomingMessages>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import IncomingMessages from '@/components/IncomingMessage'
import api from '@/store/api'
export default {
  name: 'messages',
  data () {
    return {
      api: api,
      id: '',
      messages: api.chats.messages(id)
    }
  },
  components: {
    IncomingMessages
  }
}
</script>
<style></style>
