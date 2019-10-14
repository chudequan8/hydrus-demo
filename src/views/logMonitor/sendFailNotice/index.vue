<template>
  <div class="app-container">
    <el-card>
      <div class="handle-options">
        <el-button
          type="danger"
          size="small"
          plain
          icon="el-icon-delete"
          @click="handleBatchDelete"
          >批量删除</el-button
        >
      </div>
      <grid-unit
        ref="sendFailNoticeGrid"
        :reqMethod="$api.sendFailNotice.getSendFailNoticeList"
        showSelection
        :columns="colModels"
        selectionKey="noticeId"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          slot="selection"
          type="selection"
          width="50px"
          align="center"
        >
        </el-table-column>
        <template slot="handle" slot-scope="scope">
          <el-button
            size="small"
            type="success"
            @click="refreshFailNotice(scope.row)"
            >重试</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteFailNotice(scope.row)"
            >删除</el-button
          >
        </template>
      </grid-unit>
    </el-card>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
export default {
  name: 'sendFailNotice',
  components: { GridUnit },
  data() {
    return {
      colModels: [
        { slot: 'selection' },
        { prop: 'merchantNo', label: '商户号' },
        { prop: 'callbackType', label: '回调类型' },
        { prop: 'noticeId', label: '通知Id' },
        { prop: 'noticeUrl', label: '通知Url' },
        { prop: 'noticeContent', label: '通知内容' },
        { prop: 'sendTimes', label: '发送次数' },
        {
          prop: 'status',
          label: '状态',
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                1: 'success',
                0: 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusMap = {
                1: '有效',
                0: '无效'
              }
              return statusMap[status]
            }
          }
        },
        {
          prop: 'success',
          label: '是否通知成功',
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                1: 'success',
                0: 'danger'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusMap = {
                1: '通知成功',
                0: '初始化'
              }
              return statusMap[status]
            }
          }
        },
        { prop: 'crtTime', label: '创建时间' },
        { prop: 'updTime', label: '更新时间' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          align: 'center',
          width: 150
        }
      ],
      selectedRows: []
    }
  },
  methods: {
    // 重试
    refreshFailNotice(row) {
      this.$api.sendFailNotice.refreshFailNotice(row.noticeId).then(res => {
        this.$message({
          type: res.rel ? 'success' : 'error',
          message: res.rel ? '重试成功' : '重试失败'
        })
        if (res.rel) {
          this.searchParams()
        }
      })
    },
    // 删除
    deleteFailNotice(row) {
      this.selectedRows = [row]
      this.handleBatchDelete()
    },
    // 批量删除
    handleBatchDelete() {
      if (!this.selectedRows.length) {
        this.$message({
          type: 'error',
          message: '请先选择要删除的数据!'
        })
        return false
      }
      this.$confirm(
        `确定删除${this.selectedRows.length === 1 ? '该' : '这些'}通知吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$api.sendFailNotice
            .deleteFailNotice(this.selectedRows.map(item => item.noticeId))
            .then(res => {
              this.$refs.sendFailNoticeGrid.$refs.gridUnit.clearSelection()
              this.selectedRows = []
              this.$message({
                type: res.rel ? 'success' : 'error',
                message: res.message || (res.rel ? '删除成功' : '删除失败')
              })
              if (res.rel) {
                this.searchParams()
              }
            })
        })
        .catch(() => false)
    },
    handleSelectionChange(list) {
      this.selectedRows = list
    },
    searchParams() {
      this.$refs.sendFailNoticeGrid.searchHandler()
    }
  }
}
</script>

<style lang="scss" scoped></style>
