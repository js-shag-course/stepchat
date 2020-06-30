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
export default {
  name: 'messages',
  data () {
    return {
      id: 'Mwh8CZC4S',
      url: {
        chatUrl: `http://localhost:3000/chats/messages/${this.id}`
      },
      messages: []
    }
  },
  components: {
    IncomingMessages
  },
  methods: {
    getMessagesJson () {
      axios.get(this.url.chatUrl).then(response => {
        this.messages = response.data
      })
    }
  }

}
</script>
<style></style>
