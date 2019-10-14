import { deepClone } from 'utils'
const _import =
  process.env.NODE_ENV === 'development'
    ? file => require('@/views' + file).default
    : file => () => import('@/views' + file)
/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('/login'),
    hidden: true
  },
  // {
  //   path: '/401',
  //   component: _import('/error/401'),
  //   hidden: true
  // },
  {
    path: '/',
    component: _import('/layout/Layout'),
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [
      {
        path: 'dashboard',
        component: _import('/dashboard')
      }
    ]
  },
  {
    path: '*',
    component: _import('/error/404'),
    hidden: true
  }
]

export function addAsyncRouter(menus) {
  const rootMenu = menus[0]
  if (!rootMenu) {
    return []
  }
  const menuList = deepClone(rootMenu.children)
  const targetMenus = []
  function setRouters(routers, targetRouters) {
    routers.forEach((item, index) => {
      const isSubMenu = item.parentId === rootMenu.id
      try {
        targetRouters[index] = {
          path: (isSubMenu ? '/' : '') + item.code,
          name: item.title,
          icon: item.icon,
          authority: item.code,
          children: [],
          component: _import(
            isSubMenu ? '/layout/Layout' : item.href + '/index'
          )
        }
      } catch (err) {
        console.error(err)
      }
      if (isSubMenu) {
        targetRouters[index].redirect = item.children[0]
          ? '/' + item.code + '/' + item.children[0].code
          : ''
        setRouters(item.children, targetRouters[index].children)
      }
    })
  }
  setRouters(menuList, targetMenus)
  return targetMenus
}
