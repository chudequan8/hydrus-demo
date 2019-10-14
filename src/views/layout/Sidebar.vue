<template>
  <el-menu
    mode="vertical"
    :default-active="$route.path"
    :collapse="isCollapse"
    :default-openeds="defaultOpened"
    text-color="rgba(255, 255, 255, .6)"
    active-text-color="#73fbf4"
  >
    <router-link :to="{ path: '/' }" class="hydrus-logo">
      <img src="@/assets/hydrus_logo.svg" width="130px" alt="Hydrus-Admin" />
    </router-link>
    <sidebar-item
      v-for="item in permissionMenus"
      :route="item"
      :key="item.id"
    ></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      defaultOpened: [],
      permissionMenus: [],
      systemTitle: {}
    }
  },
  created() {
    this.systemTitle = this.$store.state.user.permissionMenus[0] || {}
    this.permissionMenus =
      JSON.stringify(this.systemTitle) === '{}' ? [] : this.systemTitle.children
    // 默认展开所有菜单
    const defaultOpened = []
    function openMenu(arr) {
      arr.forEach(item => {
        if (item.children.length) {
          defaultOpened.push(item.title)
          openMenu(item.children)
        }
      })
    }
    openMenu(this.permissionMenus)
    this.defaultOpened = defaultOpened
  }
}
</script>

<style lang="scss" scoped>
.hydrus-logo {
  display: block;
  height: 50px;
  padding: 5px 10px;
  background-color: #090909;
}
</style>
