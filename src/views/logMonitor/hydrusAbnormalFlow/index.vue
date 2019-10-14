<template>
  <div class="app-container">
    <el-card>
      <el-tabs
        type="border-card"
        v-model="abnormalType"
        class="hydrus-abnormal-tabbar"
      >
        <el-tab-pane
          v-for="tab in tabList"
          :key="tab.name"
          :label="tab.label"
          :name="tab.name"
        >
          <AbnormalFlowTable
            :ref="'flowTable' + tab.name"
            :tableType="tab.name"
          ></AbnormalFlowTable>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import AbnormalFlowTable from './abnormalFlowTable'
export default {
  components: { AbnormalFlowTable },
  data() {
    return {
      abnormalType: '1',
      tabList: [
        {
          label: '风控异常记录',
          name: '1'
        },
        {
          label: '数据处理异常记录',
          name: '2'
        }
      ]
    }
  },
  watch: {
    abnormalType(val) {
      this.$nextTick(() => {
        this.$refs[
          'flowTable' + val
        ][0].$refs.hydrusAbnormalGrid.changeTableSize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hydrus-abnormal-tabbar {
  box-shadow: 0 0;
}
</style>
