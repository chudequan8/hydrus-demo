<template>
  <el-submenu :index="route.title">
    <template slot="title">
      <svg v-if="route.icon" class="icon" aria-hidden="true">
        <use :xlink:href="`#icon-${route.icon}`"></use>
      </svg>
      <span>{{ route.title }}</span>
    </template>
    <template v-for="child in route.children">
      <sidebar-item
        class="nest-menu"
        v-if="child.children && child.children.length > 0"
        :routes="[child]"
        :key="child.id"
      >
      </sidebar-item>
      <router-link
        v-else
        :to="'/' + route.code + '/' + child.code"
        :key="child.id"
      >
        <el-menu-item :index="'/' + route.code + '/' + child.code">
          <svg v-if="child.icon" class="icon" aria-hidden="true">
            <use :xlink:href="`#icon-${child.icon}`"></use>
          </svg>
          <span>{{ child.title }}</span>
        </el-menu-item>
      </router-link>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    route: {
      type: Object
    }
  }
}
</script>
