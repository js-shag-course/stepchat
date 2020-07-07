<template>
  <div>
    <h1>Chat</h1>
    <SpisokPol/>
    <Participant/>
  </div>
</template>

<script>
import SpisokPol from '@/components/SpisokPol.vue'
import Participant from '@/components/Participant.vue'

export default {
  name: 'Chat',
  components: {
    SpisokPol,
    Participant
  }
}
</script>
