<template>
  <div class="app-container">
    <el-card>
      <div class="handle-options-left">
        <el-form :inline="true">
          <el-form-item>
            <el-input
              v-model="searchForm.idcardNo"
              placeholder="请输入身份证号"
            />
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.type" placeholder="请选择类型">
              <el-option
                v-for="(item, index) in typeList"
                :key="index"
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
        <div class="aside-options">
          <el-button
            type="success"
            size="small"
            plain
            icon="el-icon-plus"
            @click="blacklistDialogVisible = true"
            >新增</el-button
          >
        </div>
      </div>
      <grid-unit
        ref="blacklistGrid"
        :formOptions="formOptions"
        :reqMethod="$api.blacklistManager.getBlacklists"
        :columns="colModels"
      >
        <template slot="versionStatus" slot-scope="scope">
          <toggle-button
            :sync="true"
            :value="scope.row.status === 1"
            :labels="{ checked: '开', unchecked: '关' }"
            color="#67C23A"
            @click.native="toggleSwitch(scope.row, $event)"
          />
        </template>
        <template slot="handle" slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDeleteBlacklist(scope.row)"
            >删除</el-button
          >
        </template>
      </grid-unit>
    </el-card>
    <el-dialog
      title="新增黑名单"
      :visible.sync="blacklistDialogVisible"
      width="400px"
      @closed="handleDialogClosed"
    >
      <el-form
        :model="blacklistForm"
        ref="blacklistForm"
        class="blacklistForm"
        :rules="blacklistFormRules"
        label-width="90px"
      >
        <el-form-item label="身份证号" prop="idcardNo">
          <el-input
            v-model="blacklistForm.idcardNo"
            placeholder="请输入身份证号"
          />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="blacklistForm.type" style="width: 100%">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="blacklistForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="blacklistDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveBlacklist">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
// import {
//   fetchBlacklists,
//   fetchAddBlacklist,
//   fetchDeleteBlacklist
// } from '@/api/dataAnalysis'
// import { validateIdCard } from '@/utils/validate'
import { deepClone } from '@/utils'
export default {
  name: 'blacklistManager',
  components: { GridUnit },
  data() {
    const checkIdCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('身份证号码不能为空'))
      } else {
        callback()
        // if (validateIdCard(value)) {
        //   callback()
        // } else {
        //   callback(new Error('请输入正确的身份证号码'))
        // }
      }
    }
    return {
      searchForm: {
        idcardNo: '',
        type: ''
      },
      typeList: [
        {
          label: '被拒绝',
          value: 1
        },
        {
          label: '逾期3天',
          value: 2
        }
      ],
      formOptions: {
        idcardNo: '',
        type: ''
      },
      colModels: [
        { prop: 'idcardNo', label: '身份证号' },
        { prop: 'description', label: '描述' },
        { prop: 'crtTime', label: '创建时间' },
        { label: '状态', slotName: 'versionStatus' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          width: 80
        }
      ],
      blacklistDialogVisible: false,
      blacklistForm: {
        idcardNo: '',
        type: '',
        description: ''
      },
      blacklistFormRules: {
        idcardNo: [{ validator: checkIdCard, trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查询列表
    handleSearch(type) {
      if (type === 1) {
        this.$set(this, 'formOptions', deepClone(this.searchForm))
      } else {
        this.searchForm.idcardNo = ''
        this.searchForm.type = ''
        this.$set(this, 'formOptions', {
          idcardNo: '',
          type: ''
        })
      }
      this.$nextTick(this.searchParams)
    },
    // 保存新建黑名单
    handleSaveBlacklist() {
      this.$refs.blacklistForm.validate(valid => {
        if (valid) {
          this.$api.blacklistManager
            .addBlacklist(this.blacklistForm)
            .then(res => {
              if (res.rel) {
                this.$message({
                  type: 'success',
                  message: '新增黑名单成功'
                })
                this.blacklistDialogVisible = false
                this.searchParams()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message || '新增黑名单成功'
                })
              }
            })
        }
      })
    },
    // 删除黑名单
    handleDeleteBlacklist(row) {
      this.$confirm('确定删除当前用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.blacklistManager.deleteBlacklist(row.id).then(res => {
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
    toggleSwitch(obj, e) {
      e.preventDefault()
    },
    handleDialogClosed() {
      this.$set(this, 'blacklistForm', {
        idcardNo: '',
        type: '',
        description: ''
      })
      this.$nextTick(() => {
        this.$refs.blacklistForm.clearValidate()
      })
    },
    searchParams() {
      this.$refs.blacklistGrid.searchHandler()
    }
  }
}
</script>
