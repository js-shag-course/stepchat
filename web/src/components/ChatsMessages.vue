<template>
  <div id="messages" @click: (getMessagesJson())>
    <ul>
      <li class="sent" v-for="message in getAllMessages" :key = "message" >
        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
        <p> {{message.message}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
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
