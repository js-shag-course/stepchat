<template>
  <div class="container">
    <li>
      <div class="sender-img">
        <img :src="require('')">
      </div>
      <div class="msg-box">
        <div class="msg-inbox">
          <p class="sender">{{ message.username }}</p>
          <p class="msg">{{ message.message }}</p>
          <span class="timestamp">{{ message.time }}</span>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: 'IncomingMessage',
  props: {
    message: {
      type: Object,
      requried: true
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  display: flex
  flex-direction: row
  justify-content: flex-start

img
  max-width: 100%
  border-radius: 50%

.sender-img
  padding: .25rem .5rem
  width: 3rem

.msg-inbox
  width: auto

.msg-inbox
  p
    background: rgb(239,239,239) none repeat scroll 0 0
    font-size: 1rem
    margin: 0
    width: 100%

.sender
  color: rgb(220,20,60)
  border-radius: .625rem .625rem 0 0
  padding: .375rem .625rem 0 .75rem

.msg
  color: rgb(100,100,100)
  border-radius: 0 0 .625rem .625rem
  padding: .375rem .625rem .375rem .75rem

.timestamp
  color: rgb(119,119,119)
  font-size: .7rem
  margin: .5rem 0 0
</style>
