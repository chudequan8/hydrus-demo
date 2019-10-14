<template>
  <div class="app-container">
    <el-card>
      <div class="handle-options">
        <el-button
          type="success"
          size="small"
          plain
          icon="el-icon-plus"
          @click="handleAddTask"
          >新增</el-button
        >
      </div>
      <grid-unit
        ref="taskGrid"
        :reqMethod="$api.taskManager.getTaskList"
        :columns="colModels"
      >
        <template slot="handle" slot-scope="scope">
          <el-button
            v-if="scope.row.status === 0"
            size="small"
            type="success"
            @click="handleSwitchTaskStatus(scope.row.id)"
            >启动</el-button
          >
          <el-button
            v-else
            size="small"
            type="info"
            @click="handleSwitchTaskStatus(scope.row.id)"
            >暂停</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteTask(scope.row)"
            >删除</el-button
          >
          <el-button
            size="small"
            type="warning"
            @click="handleEditTask(scope.row)"
            >修改</el-button
          >
        </template>
      </grid-unit>
    </el-card>
    <el-dialog
      :title="curTaskId === -1 ? '新建任务' : '编辑任务'"
      :visible.sync="taskDialogVisible"
      width="500px"
      @closed="handleDialogClosed"
    >
      <el-form
        :model="taskForm"
        ref="taskForm"
        :rules="taskFormRules"
        label-width="110px"
      >
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="taskForm.jobName"></el-input>
        </el-form-item>
        <el-form-item label="任务类名" prop="beanName">
          <el-input v-model="taskForm.beanName"></el-input>
        </el-form-item>
        <el-form-item label="任务方法名" prop="methodName">
          <el-input v-model="taskForm.methodName"></el-input>
        </el-form-item>
        <el-form-item label="CRON表达式" prop="cronExpression">
          <el-input v-model="taskForm.cronExpression"></el-input>
        </el-form-item>
        <el-form-item label="服务名称" prop="serviceName">
          <el-input v-model="taskForm.serviceName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveTask">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
export default {
  name: 'taskManager',
  components: { GridUnit },
  data() {
    return {
      colModels: [
        { prop: 'jobName', label: '任务名称' },
        { prop: 'beanName', label: '任务类名' },
        { prop: 'methodName', label: '任务方法名' },
        { prop: 'cronExpression', label: 'CRON表达式' },
        { prop: 'serviceName', label: '服务名称' },
        {
          prop: 'status',
          label: '状态',
          type: 'status',
          unitFilters: {
            renderStatusType(status) {
              const statusMap = {
                0: 'info',
                1: 'success'
              }
              return statusMap[status] || 'info'
            },
            renderStatusValue(status) {
              const statusMap = {
                0: '初始化',
                1: '已启动'
              }
              return statusMap[status]
            }
          }
        },
        { prop: 'crtTime', label: '创建时间' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          align: 'center',
          width: 220
        }
      ],
      taskDialogVisible: false,
      taskForm: {
        jobName: '',
        beanName: '',
        methodName: '',
        cronExpression: '',
        serviceName: ''
      },
      taskFormRules: {
        jobName: [
          { required: true, message: '任务名称不能为空', trigger: 'blur' }
        ],
        beanName: [
          { required: true, message: '任务类名不能为空', trigger: 'blur' }
        ],
        methodName: [
          { required: true, message: '任务方法名不能为空', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: 'CRON表达式不能为空', trigger: 'blur' }
        ],
        serviceName: [
          { required: true, message: '服务名称不能为空', trigger: 'blur' }
        ]
      },
      curTaskId: -1
    }
  },
  methods: {
    // 打开新增弹窗
    handleAddTask() {
      this.taskDialogVisible = true
    },
    // 打开编辑弹窗
    handleEditTask(row) {
      const {
        id,
        jobName,
        beanName,
        methodName,
        cronExpression,
        serviceName
      } = row
      this.curTaskId = id
      this.$set(this, 'taskForm', {
        jobName,
        beanName,
        methodName,
        cronExpression,
        serviceName
      })
      this.taskDialogVisible = true
    },
    // 保存任务
    handleSaveTask() {
      this.$refs.taskForm.validate(valid => {
        function callback(res) {
          if (res.rel) {
            this.$message({
              type: 'success',
              message: `${this.curTaskId === -1 ? '新增' : '修改'}任务成功`
            })
            this.taskDialogVisible = false
            this.searchParams()
          } else {
            this.$message({
              type: 'error',
              message: res.message || '保存失败'
            })
          }
        }
        if (valid) {
          if (this.curTaskId >= 0) {
            this.$api.taskManager
              .editTask(this.taskForm, this.curTaskId)
              .then(callback.bind(this))
          } else {
            this.$api.taskManager
              .addTask(this.taskForm)
              .then(callback.bind(this))
          }
        } else {
          return false
        }
      })
    },
    // 关闭弹窗回调
    handleDialogClosed() {
      this.curTaskId = -1
      this.$refs.taskForm.clearValidate()
      this.$set(this, 'taskForm', {
        jobName: '',
        beanName: '',
        methodName: '',
        cronExpression: '',
        serviceName: ''
      })
    },
    // 删除任务
    handleDeleteTask(row) {
      this.$confirm('确定删除此任务吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.taskManager.deleteTask(row.id).then(res => {
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
    // 切换任务状态
    handleSwitchTaskStatus(id) {
      this.$api.taskManager.switchTaskStatus(id).then(res => {
        if (res.rel) {
          this.$message({
            type: 'success',
            message: '状态切换成功'
          })
          this.searchParams()
        } else {
          this.$message({
            type: 'error',
            message: '状态切换失败'
          })
        }
      })
    },
    // 表格查询
    searchParams() {
      this.$refs.taskGrid.searchHandler()
    }
  }
}
</script>

<style></style>
