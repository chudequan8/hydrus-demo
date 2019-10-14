<template>
  <div>
    <div class="search-row">
      <el-form :inline="true">
        <el-form-item>
          <el-select
            v-model="searchForm.status"
            placeholder="请选择状态"
            clearable
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchForm.complete"
            placeholder="请选择完成状态"
            clearable
          >
            <el-option
              v-for="item in completeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch(1)"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button plain icon="el-icon-delete" @click="handleSearch(2)"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <grid-unit
      ref="hydrusAbnormalGrid"
      :formOptions="queryFormValues"
      :reqMethod="reqFunction"
      :columns="curColModels"
    >
      <template slot="handle" slot-scope="scope" v-if="scope.row.status === 1">
        <el-button
          size="small"
          type="success"
          @click="refreshHydrusAbnormal(scope.row)"
          >重试</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="deleteHydrusAbnormal(scope.row)"
          >删除</el-button
        >
      </template>
    </grid-unit>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
const colModels = [
  { prop: 'merchantNo', label: '商户号' },
  { prop: 'product', label: '产品' },
  { prop: 'noticeId', label: '通知id' },
  { prop: 'unitId', label: 'unitId' },
  { prop: 'dataSource', label: '数据类型' },
  { prop: 'dataKey', label: 'key' },
  {
    prop: 'complete',
    label: '是否完成',
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
        const statusStrData = ['初始化', '已完成', '待定']
        return statusStrData[status] || '待定'
      }
    }
  },
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
        const statusStrData = ['无效', '有效', '待定']
        return statusStrData[status] || '待定'
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
]
export default {
  name: 'abnormalFlowTable',
  components: { GridUnit },
  props: ['tableType'],
  data() {
    return {
      queryFormValues: {
        status: '1',
        complete: '0'
      },
      searchForm: {
        status: '1',
        complete: '0'
      },
      statusOptions: [
        {
          label: '无效',
          value: '0'
        },
        {
          label: '有效',
          value: '1'
        }
      ],
      completeOptions: [
        {
          label: '未完成',
          value: '0'
        },
        {
          label: '已完成',
          value: '1'
        }
      ],
      curColModels:
        this.tableType === '1'
          ? colModels.filter(
              item => !['dataSource', 'dataKey'].includes(item.prop)
            )
          : colModels.filter(item => item.prop !== 'unitId'),
      reqFunction: this.$api.hydrusAbnormalFlow[
        this.tableType === '1' ? 'getHydrusAbnormalList' : 'getDataAbnormalList'
      ]
    }
  },
  methods: {
    handleSearch(searchType) {
      if (searchType === 1) {
        this.queryFormValues.status = this.searchForm.status
        this.queryFormValues.complete = this.searchForm.complete
      } else {
        this.queryFormValues.status = this.searchForm.status = ''
        this.queryFormValues.complete = this.searchForm.complete = ''
      }
      this.$nextTick(this.searchParams)
    },
    searchParams() {
      this.$refs.hydrusAbnormalGrid.searchHandler()
    },
    refreshHydrusAbnormal(row) {
      const reqMethod = this.$api.hydrusAbnormalFlow[
        this.tableType === '1' ? 'recoverHydrusAbnormal' : 'recoverDataAbnormal'
      ]
      reqMethod(this.tableType, row.id)
        .then(res => {
          this.$message({
            type: res.rel ? 'success' : 'error',
            message: res.message
          })
          if (res.rel) {
            this.searchParams()
          }
        })
        .catch(err => {
          this.$message.error(err.msg || '请求失败')
        })
    },
    deleteHydrusAbnormal(row) {
      this.$confirm('确定删除该记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const reqMethod = this.$api.hydrusAbnormalFlow[
            this.tableType === '1'
              ? 'deleteHydrusAbnormal'
              : 'deleteDataAbnormal'
          ]
          reqMethod(this.tableType, row.id)
            .then(res => {
              this.$message({
                type: res.rel ? 'success' : 'error',
                message: res.message
              })
              if (res.rel) {
                this.searchParams()
              }
            })
            .catch(err => {
              this.$message.error(err.msg || '请求失败')
            })
        })
        .catch(() => false)
    }
  }
}
</script>

<style></style>
