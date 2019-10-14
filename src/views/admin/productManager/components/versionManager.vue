<template>
  <div>
    <div class="handle-options">
      <el-button
        class="back-button"
        plain
        icon="el-icon-arrow-left"
        size="small"
        @click="backToProductManager"
        >返回</el-button
      >
      <el-button
        type="success"
        size="small"
        plain
        icon="el-icon-plus"
        @click="handleAddVersion"
        >新增</el-button
      >
    </div>
    <grid-unit
      ref="versionGrid"
      :formOptions="formOptions"
      :reqMethod="$api.productManager.getProductVersionList"
      :autoLoad="false"
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
          type="warning"
          @click="handleEditVersion(scope.row)"
          >编辑</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDeleteVersion(scope.row)"
          >删除</el-button
        >
      </template>
    </grid-unit>
    <el-dialog
      :title="curVersionId === -1 ? '新增版本' : '编辑版本'"
      :visible.sync="versionDialogVisible"
      append-to-body
      width="400px"
      @closed="handleDialogClosed"
    >
      <el-form
        :model="versionForm"
        ref="versionForm"
        class="versionForm"
        :rules="versionFormRules"
        label-width="90px"
      >
        <el-form-item label="产品代号" prop="productCode">
          <el-input v-model="versionForm.productCode" disabled></el-input>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="versionForm.version"></el-input>
        </el-form-item>
        <el-form-item label="评分卡" prop="scorecard">
          <el-select v-model="versionForm.scorecard" style="width: 100%">
            <el-option
              v-for="(item, index) in scoreCardList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则组" prop="ruleGroup">
          <el-select
            v-model="versionForm.ruleGroup"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="(item, index) in ruleGroupList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="versionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveVersion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone } from '@/utils'
export default {
  name: 'versionManager',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    productCode: {
      type: String,
      default: '-1'
    }
  },
  components: { GridUnit },
  data() {
    return {
      colModels: [
        { prop: 'productCode', label: '产品代号' },
        { prop: 'ruleGroup', label: '规则组' },
        { prop: 'scorecard', label: '评分卡' },
        { prop: 'version', label: '版本' },
        { label: '状态', slotName: 'versionStatus' },
        { prop: 'crtTime', label: '创建时间' },
        { prop: 'updTime', label: '更新时间' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          width: 150
        }
      ],
      formOptions: {
        productCode: ''
      },
      ruleGroupList: [],
      scoreCardList: [],
      versionDialogVisible: false,
      versionForm: {
        productCode: '',
        scorecard: '',
        version: '',
        ruleGroup: [],
        status: 1
      },
      versionFormRules: {
        productCode: [
          { required: true, message: '产品代号不能为空', trigger: 'blur' }
        ],
        scorecard: [
          { required: true, message: '评分卡不能为空', trigger: 'blur' }
        ],
        version: [{ required: true, message: '版本不能为空', trigger: 'blur' }],
        ruleGroup: [
          { required: true, message: '规则组不能为空', trigger: 'blur' }
        ]
      },
      curVersionId: -1
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.formOptions.productCode = this.productCode
        this.versionForm.productCode = this.productCode
        this.$nextTick(() => {
          this.searchParams()
          this.handleRuleGroupList()
          this.handleScoreCardList()
        })
      }
    }
  },
  methods: {
    // 打开新增弹窗
    handleAddVersion() {
      this.versionDialogVisible = true
    },
    // 打开编辑弹窗
    handleEditVersion(row) {
      const { version, productCode, ruleGroup, status, scorecard, id } = row
      this.curVersionId = id
      this.$set(this, 'versionForm', {
        version,
        productCode,
        ruleGroup: ruleGroup.split(','),
        status,
        scorecard
      })
      this.versionDialogVisible = true
    },
    // 删除版本
    handleDeleteVersion(row) {
      this.$confirm('确定删除此版本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$api.productManager.deleteVersion(row.id).then(res => {
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
    searchParams() {
      this.$refs.versionGrid.searchHandler()
    },
    // 返回产品列表
    backToProductManager() {
      this.$emit('update:visible', false)
      this.$emit('update:productCode', '-1')
    },
    // 获取规则组列表
    handleRuleGroupList() {
      this.$api.productManager.getRuleGroupList().then(res => {
        this.ruleGroupList = res || []
      })
    },
    // 获取评分卡列表
    handleScoreCardList() {
      this.$api.productManager.getScoreCardList().then(res => {
        this.scoreCardList = res || []
      })
    },
    // 保存版本
    handleSaveVersion() {
      this.$refs.versionForm.validate(valid => {
        if (valid) {
          const isAdd = this.curVersionId === -1
          const saveMethod = this.$api.productManager[
            isAdd ? 'addVersion' : 'editVersion'
          ]
          const versionParams = deepClone(this.versionForm)
          versionParams.ruleGroup = versionParams.ruleGroup.join(',')
          saveMethod(versionParams, isAdd ? undefined : this.curVersionId).then(
            res => {
              if (res.rel) {
                this.$message({
                  type: 'success',
                  message: `${isAdd ? '新增' : '编辑'}版本成功`
                })
                this.versionDialogVisible = false
                this.searchParams()
              } else {
                this.$message({
                  type: 'error',
                  message: res.message || `${isAdd ? '新增' : '编辑'}版本失败`
                })
              }
            }
          )
        }
      })
    },
    // 关闭弹窗
    handleDialogClosed() {
      this.curVersionId = -1
      this.$refs.versionForm.clearValidate()
      this.$set(this, 'versionForm', {
        productCode: this.productCode,
        scorecard: '',
        version: '',
        ruleGroup: [],
        status: 1
      })
    },
    toggleSwitch(obj, e) {
      e.preventDefault()
      const editParams = deepClone(obj)
      editParams.status = editParams.status === 1 ? 0 : 1
      this.$api.productManager.editVersion(editParams, obj.id).then(res => {
        if (res.rel) {
          this.$message({
            type: 'success',
            message: '状态切换成功'
          })
          obj.status = obj.status === 1 ? 0 : 1
        } else {
          this.$message({
            type: 'error',
            message: '状态切换失败'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back-button {
  float: left;
}
</style>
