<template>
  <div class="app-container">
    <el-card>
      <el-tabs type="border-card" v-model="basicDataType">
        <el-tab-pane
          v-for="item in basicDataTypeTabs"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <basic-data-grid
            :tableType="item.name"
            :curTableType="basicDataType"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import basicDataGrid from './components/basicDataGrid'
export default {
  name: 'basicDataManager',
  components: { basicDataGrid },
  data() {
    return {
      basicDataType: '1',
      basicDataTypeTabs: [
        {
          label: '身份证',
          name: '1'
        },
        {
          label: '手机号',
          name: '2'
        }
      ]
    }
  }
}
</script>
