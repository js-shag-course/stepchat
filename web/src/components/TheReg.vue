<template>
 <div class = "registration-table">
        <div class = "tab">
            <input type="text" name = "name" autocomplete="off" required>
            <label for="name" class = "label-name">
            <span class = "content-name">Name</span>
            </label>
        </div>
        <div class = "tab">
            <input type="password" name = "name" required>
            <label for="name" class = "label-name">
            <span class = "content-name">Password</span>
            </label>
        </div>
        <div class = "check">
            <input type="submit" class = "inputcolor" value = "Зарегистрироваться">
        </div>
    </div>

</template>

<script>
export default {
  name: 'Registration',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.registration-table{
    position: absolute;
    flex-direction: column;
    background-color:#ccc9da ;
    width: 300px;
    height: 200px;
    margin-left: 40%;
    border-radius: 5%;
}

.tab{
    position: relative;
    width: 50%;
    height: 50px;
    padding-top: 5px;
    margin-left: -5%;
}

.registration-table input{
    margin-left: 65%;
}

.registration-table label{
        margin-left: 65%;
}

.tab input{
    width: 100%;
    height: 100%;
    padding-top: 15px;
    border: none;
    outline: none;
    background-color: #ccc9da;
}

.tab label{
    bottom: 0px;
    left: 0%;
    width: 95%;
    height: 100%;
    position: absolute;
    pointer-events: none;
    border-bottom: 1px solid #feff45;
}

.content-name{
    position: absolute;
    bottom: 5px;
    left: 45px;
    transition: all 0.3s ease;
}

.tab input:focus + .label-name .content-name,
.tab input:valid + .label-name .content-name
    {
    transform: translateY(-150%);
}

.check{
    position: relative;
    margin-top: 30px;
    width: 50%;
    border-radius: 10%;
    margin-left: -5%;
}

.inputcolor{
    background: #8e8e8e;
    color: #fff6aa;
    border: 3px solid #8e8e8e;
    border-radius: 5px;
}
</style>
