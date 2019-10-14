<template>
  <div class="app-container calendar-list-container">
    <el-card>
      <div class="handle-options-left">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              placeholder="姓名或账户"
              v-model="listQuery.name"
              clearable
            />
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
        <div class="aside-options" v-if="userManager_btn_add">
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
        ref="userGrid"
        :formOptions="formOptions"
        :reqMethod="reqFunc"
        :columns="colModels"
      >
        <template slot="handle" slot-scope="scope">
          <el-button
            v-if="userManager_btn_edit"
            size="small"
            type="warning"
            @click="handleUpdate(scope.row)"
            >编辑
          </el-button>
          <el-button
            v-if="userManager_btn_del"
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </grid-unit>
    </el-card>
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      append-to-body
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input
            v-if="dialogStatus == 'create'"
            v-model="form.username"
            placeholder="请输入账户"
          ></el-input>
          <el-input
            v-else
            v-model="form.username"
            placeholder="请输入账户"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="dialogStatus == 'create'"
          label="密码"
          placeholder="请输入密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            class="filter-item"
            v-model="form.sex"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sexOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
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
  name: 'user',
  components: { GridUnit },
  data() {
    return {
      form: {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      listQuery: {
        name: undefined
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: false,
      userManager_btn_del: false,
      userManager_btn_add: false,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      formOptions: {
        name: ''
      },
      reqFunc: this.$api.user.page,
      colModels: [
        { prop: 'id', label: '序号' },
        { prop: 'name', label: '姓名' },
        { prop: 'username', label: '账户' },
        { prop: 'sex', label: '性别' },
        { prop: 'description', label: '备注' },
        { prop: 'updTime', label: '最后时间' },
        { prop: 'updName', label: '最后更新人' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          width: 150
        }
      ]
    }
  },
  created() {
    this.userManager_btn_edit = this.elements['userManager:btn_edit']
    this.userManager_btn_del = this.elements['userManager:btn_del']
    this.userManager_btn_add = this.elements['userManager:btn_add']
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
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    handleUpdate(row) {
      this.$api.user.getObj(row.id).then(response => {
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
        this.$api.user.delObj(row.id).then(() => {
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
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.$api.user.addObj(this.form).then(() => {
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
          this.$api.user.putObj(this.form.id, this.form).then(() => {
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
      this.$refs.userGrid.searchHandler()
    }
  }
}
</script>
