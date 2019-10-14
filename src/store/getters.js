const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  introduction: state => state.user.introduction,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  addRouters: state => state.permission.addRouters,
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews
}
export default getters
