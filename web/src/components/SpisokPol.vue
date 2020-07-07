<template>
<div class="participants">
<h2>Список участников:</h2>
<ol class = SpisokPol>
<li tag = "a">Пользователь1</li>
<li tag = "a">Пользователь2</li>
<li tag = "a">Пользователь3</li>
<li tag = "a">Пользователь4</li>
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
.participants {
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
.SpisokPol li:hover{
color:white;
border: 1px solid #f5615a;
background-color: #f5615a;
}

</style>
