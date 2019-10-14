<template>
  <div class="app-container">
    <el-card style="height: 100%" :body-style="{ height: '100%' }">
      <el-tabs type="border-card" v-model="activeName" style="height: 100%">
        <el-tab-pane
          v-for="item in tabMapOptions"
          :label="item.name"
          :key="item.id"
          :name="item.code"
        >
          <keep-alive>
            <tab-pane v-if="activeName == item.code" :type="item.id"></tab-pane>
          </keep-alive>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import tabPane from './components/groupDetail'
export default {
  name: 'group',
  components: {
    tabPane
  },
  data() {
    return {
      tabMapOptions: [],
      activeName: 'role'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$api.group.getAllGroupTypes().then(data => {
        this.tabMapOptions = data
      })
    }
  }
}
</script>

<style scoped></style>
