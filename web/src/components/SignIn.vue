<template>
<div class = "vhod-table">
    <div class = "tab">
        <input type="text"  v-model="name" name = "name" autocomplete="off" required>
        <label for="name" class = "label-name">
        <span class = "content-name">Name</span>
        </label>
    </div>

    <div class = "tab">
        <input type="password" v-model="password" name = "name" required>
        <label for="name" class = "label-name">
        <span class = "content-name">Password</span>
        </label>
    </div>

    <div class = "check">
        <button @click="login" >Регистрация</button>
    </div>
</div>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    name: null,
    password: null
  }),
  props: {
    username: {
      type: String,
      default: 'anon'
    }
  },
  watch: {
    name: function (newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },
  methods: {
    login () {
      alert('KARAMBA')
    }
  },
  beforeMount () {},
  beforeCreate () {},
  beforeUpdate() {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.vhod-table{
    flex-direction: column;
    background-color:#ccc9da ;
    width: 300px;
    height: 200px;
    margin-left: 40%;
    border-radius: 5%;
}

.vhod-table input{
    margin-left: 65%;
}

.vhod-table label{
        margin-left: 65%;
}
.vhod-table .check{
    position: relative;
    margin-top: 30px;
    width: 50%;
    border-radius: 10%;
    margin-left: 10%;
}

.tab{
    position: relative;
    width: 50%;
    height: 50px;
    padding-top: 5px;
    margin-left: -5%;
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
