<template>
  <div class="app-container">
    <el-card>
      <div class="search-row">
        <el-form :inline="true">
          <el-form-item>
            <el-date-picker
              v-model="searchForm.startTime"
              type="datetime"
              placeholder="请选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="startTimeChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.endTime"
              type="datetime"
              placeholder="请选择结束时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="endTimeChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item style="width: 150px">
            <el-select
              v-model="searchForm.originalRouterkey"
              placeholder="请选择名称"
              clearable
            >
              <el-option
                v-for="item in keyOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 120px">
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
            <el-input
              v-model="searchForm.messageContent"
              placeholder="请填写消息内容"
            ></el-input>
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
        ref="deadQueGrid"
        :formOptions="queryFormValues"
        :reqMethod="$api.deadQueue.getDeadQueueList"
        :columns="colModels"
      >
        <template
          slot="handle"
          slot-scope="scope"
          v-if="scope.row.status === 1"
        >
          <el-button
            size="small"
            type="success"
            @click="refreshDeadQueue(scope.row)"
            >重试</el-button
          >
        </template>
      </grid-unit>
    </el-card>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone } from 'utils'
export default {
  name: 'deadQue',
  components: { GridUnit },
  data() {
    return {
      searchForm: {
        startTime: '',
        endTime: '',
        originalRouterkey: '',
        status: '',
        messageContent: ''
      },
      keyOptions: [],
      statusOptions: [
        {
          label: '已处理',
          value: '0'
        },
        {
          label: '未处理',
          value: '1'
        }
      ],
      queryFormValues: {},
      colModels: [
        { prop: 'originalRouterkey', label: '名称' },
        { prop: 'messageContent', label: '消息内容' },
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
                1: '未处理',
                0: '已处理'
              }
              return statusMap[status]
            }
          }
        },
        { prop: 'failedReanson', label: '失败原因' },
        { prop: 'createdTime', label: '创建时间' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          align: 'center',
          width: 100
        }
      ],
      notValid: false
    }
  },
  methods: {
    handleSearch(searchType) {
      if (searchType === 2) {
        Object.keys(this.searchForm).forEach(key => {
          this.searchForm[key] = ''
        })
      } else {
        if (this.notValid) {
          this.notValid = false
          return false
        }
      }
      this.$set(this, 'queryFormValues', deepClone(this.searchForm))
      this.$nextTick(this.searchParams)
    },
    searchParams() {
      this.$refs.deadQueGrid.searchHandler()
    },
    startTimeChange() {
      this.checkTimeValid(1)
    },
    endTimeChange() {
      this.checkTimeValid(2)
    },
    refreshDeadQueue(row) {
      this.$api.deadQueue
        .recoverDeadQueue({
          id: row.id
        })
        .then(res => {
          this.$message({
            type: res.rel ? 'success' : 'error',
            message: res.rel ? '重试成功！' : '重试失败！'
          })
          if (res.rel) {
            this.searchParams()
          }
        })
    },
    checkTimeValid(type) {
      const judgeParams = type === 1 ? 'startTime' : 'endTime'
      const judgeCondition =
        this.searchForm.startTime &&
        this.searchForm.endTime &&
        new Date(this.searchForm.startTime) > new Date(this.searchForm.endTime)
      if (judgeCondition) {
        this.$message({
          message:
            type === 1
              ? '开始时间不能大于结束时间！'
              : '结束时间不能小于开始时间！',
          type: 'error'
        })
        this.searchForm[judgeParams] = ''
        this.notValid = true
      } else {
        this.notValid = false
      }
    }
  },
  created() {
    this.$api.deadQueue.getOriginalRouterkeyList().then(res => {
      this.keyOptions = res.rows || []
    })
  }
}
</script>
