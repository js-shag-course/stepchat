<template>
<div class="home">
    <TheHeader />
    <TheFooter />
    </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'Home',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
