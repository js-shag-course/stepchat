<template>
  <div class="container">
      <div class="sender-img">
        <img src="">
      </div>
      <div class="msg-box">
        <div class="msg-inbox">
          <p class="sender">{{ username }}</p>
          <p class="msg">{{ message }}</p>
          <span class="timestamp">{{ time }}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'IncomingMessage',
  props: {
    username: String,
    message: String,
    time: Date
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 50%

img
  max-width: 100%
  border-radius: 50%

.sender-img
  display: inline-block
  width: 3rem

.msg-box
  display: inline-block
  vertical-align: top
  width: 92%

.msg-inbox
  width: 57%

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
  display: block
  font-size: .7rem
  margin: .5rem 0 0
</style>
