export default {
  host: process.env.VUE_APP_API_URL,
  endpoint: {
    chats: '/chats/',
    users: '/users',
    messages: '/chats/messages/'
  }
}
