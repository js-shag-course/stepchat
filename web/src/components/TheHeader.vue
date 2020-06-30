<template>
    <div class = "header">
        <div class = "logo"> <img src="../assets/logo.png"> </div>
        <div class = "something">Какой-то текст </div>
        <div class = "user-corner">
            <div class = "user-photo"><img src="../assets/photo.jpg"> </div>
            <div class = "username">Имя</div>
            <input class = "exit-submit" type = "submit" value="Выход">
        </div>
    </div>

</template>

<script>
export default {
  name: 'TheHeader',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    display: flex;
    flex-direction: row;
}

.logo{
    border: 1px solid red;
    width: 15%;
    padding: 1%;
    text-align: center;
}

.logo img{
    width: 80px;
}

.something{
    border: 1px solid red;
    width: 71%;
    padding: 1%;
    text-align: center;
}

.user-corner{
    border: 1px solid red;
    width: 14%;
    padding: 1%;
    text-align: center;
}

.user-photo{

    text-align: left;
    float: left;
}

.user-photo img{
    width: 100px;
}

.username{
    text-align: center;
}

.exit-submit{
    width: 50%;
    margin-top: 15%;
}
</style>
