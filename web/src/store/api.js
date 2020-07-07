import axios from 'axios'
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL
})
export default {
  host: process.env.VUE_APP_API_URL,
  endpoint: {
    chats: '/chats/',
    users: '/users',
    messages: '/chats/messages/'
  },
  users: {
    async register ({ id, userName, password, friends, chats }) {
      try {
        return await api.post('/users/', {
          id,
          userName,
          password,
          friends,
          chats
        })
      } catch (err) {
        return err.response
      }
    },
    async users () {
      try {
        return await api.get('/users')
      } catch (err) {
        return err.response
      }
    },
    async change ({ id, userName, password, friends, chats }) {
      try {
        return await api.put(`/users/${id}`, {
          userName,
          password,
          friends,
          chats
        })
      } catch (err) {
        return err.response
      }
    },
    async user (id) {
      try {
        return await api.get(`/users/${id}`)
      } catch (err) {
        return err.response
      }
    },
    async deleteFriend (id, friendId) {
      try {
        return await api.delete(`/users/${id}/friends/${friendId}`)
      } catch (err) {
        return err.response
      }
    }
  },
  chats: {
    async chats () {
      try {
        return await api.get('/chats')
      } catch (err) {
        return err.response
      }
    },
    async chat (id) {
      try {
        return await api.get(`/chats/${id}`)
      } catch (err) {
        return err.response
      }
    },
    async create ({ id, title, users, admins, messages }) {
      try {
        return await api.post('/chats', {
          id, title, users, admins, messages
        })
      } catch (err) {
        return err.response
      }
    },
    async delete (id) {
      try {
        return await api.delete(`/chats/${id}`)
      } catch (err) {
        return err.response
      }
    },
    async deleteuser (chatid, userid) {
      try {
        return await api.delete(`/chats/${chatid}/users/${userid}`)
      } catch (err) {
        return err.response
      }
    },
    async change ({ id, title, users, admins, messages }) {
      try {
        return await api.put(`/chats/${id}`, { title, users, admins, messages })
      } catch (err) {
        return err.response
      }
    },
    async messages (id) {
      try {
        return await api.get(`/chats/messages/${id}`)
      } catch (err) {
        return err.response
      }
    }
  }
}
