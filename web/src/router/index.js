import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/SignIn',
    name: 'Login',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/Chats',
    name: 'ChatList',
    component: () => import('../views/ChatList.vue')
  },
  {
    path: '/Chats/Chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
