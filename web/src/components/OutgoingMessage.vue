<template>
  <div class="container">
    <div class="msg-box">
      <p>{{ message }}</p>
      <span class="timestamp">{{ time }}</span>
    </div>
    <div class="sender-img">
      <img :src="require('')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutgoingMessage',
  props: {
    message: String,
    time: Date,
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  display: flex
  flex-direction: row
  justify-content: flex-end

img
  max-width: 100%
  border-radius: 50%

.sender-img
  margin-left: 1.5rem
  width: 3rem

.msg-box
  width: auto

  p
    background: rgb(0,123,255) none repeat scroll 0 0
    color: rgb(255,255,255)
    font-size: 1rem
    border-radius: .625rem
    margin: 0
    padding: .375rem .625rem .375rem .375rem
    width: 100%

.timestamp
  color: rgb(119,119,119)
  font-size: .7rem
  margin: .5rem 0 0
</style>
