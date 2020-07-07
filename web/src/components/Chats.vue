<template>
<div class="chats">
<h2>Чаты:</h2>
<ol class = characters>
<li tag = "a"><router-link to="/Chats/Chat">Чат1</router-link></li>
<li tag = "a"><router-link to="/Chats/Chat">Чат2</router-link></li>
<li tag = "a"><router-link to="/Chats/Chat">Чат3</router-link></li>
<li tag = "a"><router-link to="/Chats/Chat">Чат4</router-link></li>
</ol>
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
.chats {
overflow: scroll;
width: 400px;
height: 500px;
padding: 5px;
border: solid 2px red;
color:red;
}
a{
  text-decoration: none;
}
ol{
list-style-type: none;
margin-left: -40px;
color: white;
}
li{
font-size: 150%;
margin-top: 5px;
color: red;
padding: 10px;
}
.chats li:hover{
color:white;
border: 1px solid #f5615a;
background-color: #f5615a;
}

</style>
