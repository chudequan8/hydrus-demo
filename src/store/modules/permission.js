import { addAsyncRouter, constantRouterMap } from '@/router/routerList'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, menus) {
      return new Promise(resolve => {
        const asyncRouter = addAsyncRouter(menus)
        commit('SET_ROUTERS', asyncRouter)
        resolve()
      })
    }
  }
}

export default permission
