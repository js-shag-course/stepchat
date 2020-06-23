'use strict'

Vue.component('new-component', {
   data: {},
   computed: {},
   template: `
    <div>
        Sub Component: <slot />
    </div>
   `,
   mathods: {

   } 
})

const app = new Vue({
    el: '#app',
    data: {
        hello: 'Hello',
        name: 'ChatiK',
        field: 'HI HI hI'
    },
    computed: {
        hiString () {
            return ` ${ this.hello }, ${ this.name }`
        }
    },
    template: `
        <div>
            <h1>{{ field }}</h1>
            <b>{{ hiString }}</b><br />
            <input type="text" name="inp" v-model="field" />
            <new-component class="comp">
                <b>Slot 1</b>
            </new-component>
            <new-component class="comp 2" />
            <new-component class="comp3" />
        </div>
    `
})