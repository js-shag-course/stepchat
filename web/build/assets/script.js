'use strict'

Vue.component('header-component', {
    data: {},
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


            <footer-component class = "footer" />

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