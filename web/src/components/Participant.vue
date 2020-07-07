<template>
<div class="Participant">
    <div class = userPhoto><img src="../assets/photo.jpg"></div>
    <div class = userName>Name</div>
</div>

</template>

<script>
export default {
  name: 'Chats',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Participant {
width: 200px;
height: 200px;
padding: 5px;
border: solid 2px red;
color:red;
text-align: center;
display: flex;
flex-direction: column;
}
.userPhoto img{
 width: 35%;
}
.userName{
 font-size: 200%;
 color:red;
}

</style>
