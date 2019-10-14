import Vue from 'vue'
import { getToken, setToken, removeToken } from 'utils/auth'

const user = {
  state: {
    token: getToken(),
    roles: [],
    name: '',
    avatar: '',
    introduction: '',
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus
    }
  },
  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_MENUS', undefined)
      commit('SET_ELEMENTS', undefined)
      removeToken()
      return new Promise((resolve, reject) => {
        Vue.prototype.$api.login
          .loginByEmail(userInfo)
          .then(response => {
            setToken(response)
            commit('SET_TOKEN', response)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        Vue.prototype.$api.login
          .getInfo(state.token)
          .then(response => {
            if (!response) {
              reject('获取用户信息失败!')
            }
            const data = response
            commit('SET_ROLES', 'admin')
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', require('@/assets/default-avatar.jpg'))
            commit('SET_INTRODUCTION', data.description)
            const menus = {}
            for (let i = 0; i < data.menus.length; i++) {
              menus[data.menus[i].code] = true
            }
            commit('SET_MENUS', menus)
            const elements = {}
            for (let i = 0; i < data.elements.length; i++) {
              elements[data.elements[i].code] = true
            }
            commit('SET_ELEMENTS', elements)
            Vue.prototype.$api.login.getMenus(state.token).then(res => {
              commit('SET_PERMISSION_MENUS', res)
              resolve(res)
            })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_MENUS', undefined)
        commit('SET_ELEMENTS', undefined)
        commit('SET_PERMISSION_MENUS', undefined)
        removeToken()
        resolve()
      })
    }
  }
}

export default user
