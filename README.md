# hydrus-demo
一个通过vue全家桶搭建的后台管理系统demo

## 开发
```
  # 克隆项目
  git clone https://github.com/chudequan8/hydrus-demo.git
  
  # 安装依赖
  yarn 或cnpm install
  
  # 启动服务
  yarn serve 或 npm run serve
```
打开浏览器访问 http://localhost:8080 查看页面。

## 目录结构
```
.
├── README.md
├── babel.config.js
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── index.html
├── release.js
├── src
│   ├── App.vue
│   ├── api
│   │   ├── admin
│   │   │   ├── element
│   │   │   │   └── index.js
│   │   │   ├── group
│   │   │   │   └── index.js
│   │   │   ├── groupType
│   │   │   │   └── index.js
│   │   │   ├── index.js
│   │   │   ├── menu
│   │   │   │   └── index.js
│   │   │   ├── productManager
│   │   │   │   └── index.js
│   │   │   └── user
│   │   │       └── index.js
│   │   ├── dashboard
│   │   │   └── index.js
│   │   ├── flowIn
│   │   │   └── index.js
│   │   ├── index.js
│   │   └── login
│   │       └── index.js
│   ├── assets
│   │   ├── 404_images
│   │   │   ├── 404.png
│   │   │   └── 404_cloud.png
│   │   ├── default-avatar.jpg
│   │   ├── hydrus_logo.png
│   │   ├── hydrus_logo.svg
│   │   └── login_bg.jpg
│   ├── components
│   │   ├── Drawer
│   │   │   └── index.vue
│   │   ├── GridUnit
│   │   │   ├── grid.vue
│   │   │   └── props.js
│   │   ├── Hamburger
│   │   │   └── index.vue
│   │   └── Screenfull
│   │       └── index.vue
│   ├── element.js
│   ├── main.js
│   ├── mock
│   │   ├── index.js
│   │   └── modules
│   │       ├── dashboard.js
│   │       ├── flowIn.js
│   │       ├── index.js
│   │       └── user.js
│   ├── router
│   │   ├── index.js
│   │   └── routerList.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       ├── app.js
│   │       ├── permission.js
│   │       └── user.js
│   ├── styles
│   │   ├── element-ui.scss
│   │   ├── index.scss
│   │   ├── mixin.scss
│   │   └── sidebar.scss
│   ├── utils
│   │   ├── auth.js
│   │   ├── fetch.js
│   │   ├── filters.js
│   │   └── index.js
│   └── views
│       ├── dashboard
│       │   ├── chartMixins
│       │   │   └── index.js
│       │   ├── components
│       │   │   ├── IncreasedUserChart.vue
│       │   │   ├── ProductCallChart.vue
│       │   │   ├── RuleChart.vue
│       │   │   └── ScorecardChart.vue
│       │   └── index.vue
│       ├── error
│       │   ├── 401.vue
│       │   └── 404.vue
│       ├── flowInPage
│       │   ├── index.vue
│       │   └── tableColumns.js
│       ├── h5Demo
│       │   └── index.vue
│       ├── layout
│       │   ├── AppMain.vue
│       │   ├── Layout.vue
│       │   ├── Levelbar.vue
│       │   ├── Navbar.vue
│       │   ├── Sidebar.vue
│       │   ├── SidebarItem.vue
│       │   ├── TabsView.vue
│       │   └── index.js
│       └── login
│           └── index.vue
├── vue.config.js
└── yarn.lock
```
