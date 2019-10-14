import { createHash } from 'utils'
export default {
  token: {
    reg: /\/api\/auth\/jwt\/token/,
    res: {
      data: createHash(24),
      status: 200
    }
  },
  info: {
    reg: /\/api\/admin\/user\/front\/info/,
    res: {
      id: '1',
      username: 'admin',
      name: '小哥哥',
      description: '',
      menus: [
        {
          code: 'userManager',
          type: 'menu',
          uri: '/admin/user',
          method: 'GET',
          name: '访问',
          menu: '用户管理'
        },
        {
          code: 'baseManager',
          type: 'menu',
          uri: '/admin',
          method: 'GET',
          name: '访问',
          menu: '基础配置管理'
        },
        {
          code: 'menuManager',
          type: 'menu',
          uri: '/admin/menu',
          method: 'GET',
          name: '访问',
          menu: '菜单管理'
        },
        {
          code: 'groupManager',
          type: 'menu',
          uri: '/admin/group',
          method: 'GET',
          name: '访问',
          menu: '角色权限管理'
        },
        {
          code: 'groupTypeManager',
          type: 'menu',
          uri: '/admin/groupType',
          method: 'GET',
          name: '访问',
          menu: '角色类型管理'
        },
        {
          code: 'adminSys',
          type: 'menu',
          uri: '/base',
          method: 'GET',
          name: '访问',
          menu: '权限管理系统'
        },
        {
          code: 'gateLogManager',
          type: 'menu',
          uri: '/admin/gateLog',
          method: 'GET',
          name: '访问',
          menu: '操作日志'
        },
        {
          code: 'productManager',
          type: 'menu',
          uri: '/admin/productManager',
          method: 'GET',
          name: '访问',
          menu: '产品管理'
        }
      ],
      elements: [
        {
          code: 'userManager:btn_del',
          type: 'button',
          uri: '/admin/user/{*}',
          method: 'DELETE',
          name: '删除',
          menu: '用户管理'
        },
        {
          code: 'menuManager:element',
          type: 'uri',
          uri: '/admin/element',
          method: 'GET',
          name: '按钮页面',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_add',
          type: 'button',
          uri: '/admin/menu/{*}',
          method: 'POST',
          name: '新增',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_edit',
          type: 'button',
          uri: '/admin/menu/{*}',
          method: 'PUT',
          name: '编辑',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_del',
          type: 'button',
          uri: '/admin/menu/{*}',
          method: 'DELETE',
          name: '删除',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_element_add',
          type: 'button',
          uri: '/admin/element',
          method: 'POST',
          name: '新增元素',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_element_edit',
          type: 'button',
          uri: '/admin/element/{*}',
          method: 'PUT',
          name: '编辑元素',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:btn_element_del',
          type: 'button',
          uri: '/admin/element/{*}',
          method: 'DELETE',
          name: '删除元素',
          menu: '菜单管理'
        },
        {
          code: 'groupManager:btn_add',
          type: 'button',
          uri: '/admin/group',
          method: 'POST',
          name: '新增',
          menu: '角色权限管理'
        },
        {
          code: 'groupManager:btn_edit',
          type: 'button',
          uri: '/admin/group/{*}',
          method: 'PUT',
          name: '编辑',
          menu: '角色权限管理'
        },
        {
          code: 'groupManager:btn_del',
          type: 'button',
          uri: '/admin/group/{*}',
          method: 'DELETE',
          name: '删除',
          menu: '角色权限管理'
        },
        {
          code: 'groupManager:btn_resourceManager',
          type: 'button',
          uri: '/admin/group/{*}/authority',
          method: 'GET',
          name: '分配权限',
          menu: '角色权限管理'
        },
        {
          code: 'groupManager:menu',
          type: 'uri',
          uri: '/admin/group/{*}/authority/menu',
          method: 'POST',
          name: '分配菜单',
          menu: '角色权限管理'
        },
        {
          code: 'groupManager:element',
          type: 'uri',
          uri: '/admin/group/{*}/authority/element',
          method: 'POST',
          name: '分配资源',
          menu: '角色权限管理'
        },
        {
          code: 'userManager:view',
          type: 'uri',
          uri: '/admin/user/{*}',
          method: 'GET',
          name: '查看',
          menu: '用户管理'
        },
        {
          code: 'menuManager:view',
          type: 'uri',
          uri: '/admin/menu/{*}',
          method: 'GET',
          name: '查看',
          menu: '菜单管理'
        },
        {
          code: 'menuManager:element_view',
          type: 'uri',
          uri: '/admin/element/{*}',
          method: 'GET',
          name: '查看',
          menu: '菜单管理'
        },
        {
          code: 'groupManager:view',
          type: 'uri',
          uri: '/admin/group/{*}',
          method: 'GET',
          name: '查看',
          menu: '角色权限管理'
        },
        {
          code: 'groupTypeManager:view',
          type: 'uri',
          uri: '/admin/groupType/{*}',
          method: 'GET',
          name: '查看',
          menu: '角色类型管理'
        },
        {
          code: 'groupTypeManager:btn_add',
          type: 'button',
          uri: '/admin/groupType',
          method: 'POST',
          name: '新增',
          menu: '角色类型管理'
        },
        {
          code: 'groupTypeManager:btn_edit',
          type: 'button',
          uri: '/admin/groupType/{*}',
          method: 'PUT',
          name: '编辑',
          menu: '角色类型管理'
        },
        {
          code: 'groupTypeManager:btn_del',
          type: 'button',
          uri: '/admin/groupType/{*}',
          method: 'DELETE',
          name: '删除',
          menu: '角色类型管理'
        },
        {
          code: 'serviceManager:btn_add',
          type: 'button',
          uri: '/auth/service',
          method: 'POST',
          name: '新增',
          menu: '服务管理'
        },
        {
          code: 'serviceManager:btn_edit',
          type: 'button',
          uri: '/auth/service/{*}',
          method: 'PUT',
          name: '编辑',
          menu: '服务管理'
        },
        {
          code: 'userManager:btn_edit',
          type: 'button',
          uri: '/admin/user/{*}',
          method: 'PUT',
          name: '编辑',
          menu: '用户管理'
        },
        {
          code: 'groupManager:btn_userManager',
          type: 'button',
          uri: '/admin/group/{*}/user',
          method: 'PUT',
          name: '分配用户',
          menu: '角色权限管理'
        },
        {
          code: 'serviceManager:view',
          type: 'URI',
          uri: '/auth/service/{*}',
          method: 'GET',
          name: '查看',
          menu: '服务管理'
        },
        {
          code: 'serviceManager:btn_del',
          type: 'button',
          uri: '/auth/service/{*}',
          method: 'DELETE',
          name: '删除',
          menu: '服务管理'
        },
        {
          code: 'serviceManager:btn_clientManager',
          type: 'button',
          uri: '/auth/service/{*}/client',
          method: 'POST',
          name: '服务授权',
          menu: '服务管理'
        },
        {
          code: 'gateLogManager:view',
          type: 'button',
          uri: '/admin/gateLog',
          method: 'GET',
          name: '查看',
          menu: '操作日志'
        }
      ]
    }
  },
  menus: {
    reg: /\/api\/admin\/user\/front\/menus/,
    res: [
      {
        id: 13,
        parentId: -1,
        children: [
          {
            id: 5,
            parentId: 13,
            children: [
              {
                id: 102,
                parentId: 5,
                children: [],
                icon: '',
                title: '上游流量',
                href: '/flowInPage',
                spread: false,
                path: '/adminSys/baseManager/flowInManager',
                code: 'flowInManager'
              },
              {
                id: 105,
                parentId: 5,
                children: [],
                icon: '',
                title: 'h5页面',
                href: '/h5Demo',
                spread: false,
                path: '/adminSys/baseManager/h5Manager',
                code: 'h5Manager'
              }
            ],
            icon: 'basic_config',
            title: '基础配置管理',
            href: '/admin',
            spread: false,
            path: '/adminSys/baseManager',
            code: 'baseManager'
          }
        ],
        icon: 'setting',
        title: '风控管理系统',
        href: '/base',
        spread: false,
        path: '/adminSys',
        code: 'adminSys'
      }
    ]
  }
}
