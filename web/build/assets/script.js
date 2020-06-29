'use strict'

Vue.component('header-component', {
    data: function(){
        return {}
    },
    computed: {},
    template: `
     <div>
        <div class = "logo"> <img src="mobile-app.svg"> </div>
        <div class = "something">Какой-то текст </div>
        <div class = "user-corner">
            <div class = "user-photo"><img src="photo.jpg"> </div>
            <div class = "username">Имя</div>
            <input class = "exit-submit" type = "submit" value="Выход"></div>
        </div>   
     </div>
    `,
    methods: {
 
    } 
 })

Vue.component('registration-component', {
    data: function(){
        return {}
    },
    computed: {},
    template: `
     <div>
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
        </div>
    `,
    methods: {
 
    } 
 })

 Vue.component('vhod-component', {
    data: function(){
        return {}
    },
    computed: {},
    template: `
     <div>
        <div class = "vhod-table">
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
                <input type="submit" class = "inputcolor" value = "Войти">
            </div>
        </div>
        </div>
    `,
    methods: {
 
    } 
 })

const app = new Vue({
    el: '#app',
    data: {
        // hello: 'Hello',
        // name: 'ChatiK',
        // field: 'HI HI hI'
    },
    computed: {
        // hiString () {
        //     return ` ${ this.hello }, ${ this.name }`
        // }
    },
    template: `
        <div>

            <header-component class = "header" />


            <registration-component class = "registration" />
            

            <vhod-component class = "vhod" />

        </div>
    `
})

//мб кому-нибудь этот код пригодится, он из template:

{/* <h1>{{ field }}</h1>
<b>{{ hiString }}</b><br />
<input type="text" name="inp" v-model="field" />
<new-component class="comp">
    <b>Slot 1</b>
</new-component>
<new-component class="comp 2" />
<new-component class="comp3" /> */}
