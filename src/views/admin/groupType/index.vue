<template>
  <div class="app-container calendar-list-container">
    <el-card>
      <div class="handle-options-left">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="请输入类型名称" v-model="listQuery.name" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleFilter"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <div class="aside-options" v-if="groupTypeManager_btn_add">
          <el-button
            type="success"
            size="small"
            plain
            icon="el-icon-plus"
            @click="handleCreate"
            >新增</el-button
          >
        </div>
      </div>
      <grid-unit
        ref="groupTypeGrid"
        :formOptions="formOptions"
        :reqMethod="$api.groupType.page"
        :columns="colModels"
      >
        <template slot="handle" slot-scope="scope">
          <el-button
            v-if="groupTypeManager_btn_edit"
            size="small"
            type="warning"
            @click="handleUpdate(scope.row)"
            >编辑
          </el-button>
          <el-button
            v-if="groupTypeManager_btn_del"
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </grid-unit>
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="编码" prop="code">
          <el-input v-model="form.code" placeholder="请输入编码"></el-input>
        </el-form-item>
        <el-form-item label="类型名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入类型名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="form.description"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          v-if="dialogStatus == 'create'"
          type="primary"
          @click="create('form')"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="update('form')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GridUnit from '@/components/GridUnit/grid'
export default {
  name: 'groupType',
  components: { GridUnit },
  data() {
    return {
      form: {
        code: undefined,
        name: undefined,
        description: undefined
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入类型名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      listQuery: {
        name: undefined
      },
      formOptions: {
        name: undefined
      },
      colModels: [
        { prop: 'id', label: 'id' },
        { prop: 'code', label: '编码' },
        { prop: 'name', label: '类型名称' },
        { prop: 'description', label: '描述' },
        { prop: 'updTime', label: '最后更新时间' },
        { prop: 'updName', label: '最后更新人' },
        { prop: 'updHost', label: '最后更新主机' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          width: 150
        }
      ],
      dialogFormVisible: false,
      dialogStatus: '',
      groupTypeManager_btn_edit: false,
      groupTypeManager_btn_del: false,
      groupTypeManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0
    }
  },
  created() {
    this.groupTypeManager_btn_edit = this.elements['groupTypeManager:btn_edit']
    this.groupTypeManager_btn_del = this.elements['groupTypeManager:btn_del']
    this.groupTypeManager_btn_add = this.elements['groupTypeManager:btn_add']
  },
  computed: {
    ...mapGetters(['elements'])
  },
  methods: {
    handleFilter() {
      this.formOptions.name = this.listQuery.name
      this.searchParams()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.$api.groupType.getObj(row.id).then(response => {
        this.form = response
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.groupType.delObj(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.searchParams()
        })
      })
    },
    create(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.groupType.addObj(this.form).then(() => {
            this.dialogFormVisible = false
            this.searchParams()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          this.form.password = undefined
          this.$api.groupType.putObj(this.form.id, this.form).then(() => {
            this.dialogFormVisible = false
            this.searchParams()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined
      }
    },
    searchParams() {
      this.$refs.groupTypeGrid.searchHandler()
    }
  }
}
</script>
