<template>
  <div class="app-container">
    <el-card class="product-card">
      <div class="product-card-body">
        <el-row
          class="product-card-body-row"
          :class="[versionVisible ? 'show-version' : '']"
        >
          <el-col :span="12" class="product-table">
            <div class="handle-options">
              <el-button
                type="success"
                size="small"
                plain
                icon="el-icon-plus"
                @click="handleAddProduct"
                >新增</el-button
              >
            </div>
            <grid-unit
              ref="productGrid"
              :reqMethod="$api.productManager.getProductList"
              :columns="colModels"
            >
              <template slot="productStatus" slot-scope="scope">
                <toggle-button
                  :sync="true"
                  :value="scope.row.status === 1"
                  :labels="{ checked: '开', unchecked: '关' }"
                  color="#67C23A"
                  @click.native="toggleSwitch(scope.row, $event)"
                />
              </template>
              <template slot="handle" slot-scope="scope">
                <!-- <el-button size="small" type="danger" @click="handleDeleteProduct(scope.row)">删除</el-button> -->
                <el-button
                  v-if="scope.row.type === 2 && scope.row.argument"
                  size="small"
                  type="warning"
                  @click="handleEditProduct(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  type="success"
                  @click="handleVersionManager(scope.row.productCode)"
                  >版本管理</el-button
                >
                <el-button
                  v-if="scope.row.type === 2"
                  size="small"
                  type="info"
                  @click="handleThirdConfig(scope.row.productCode)"
                  >配置</el-button
                >
              </template>
            </grid-unit>
          </el-col>
          <el-col :span="12" class="version-table">
            <version-manager
              :visible.sync="versionVisible"
              :productCode.sync="curProductCode"
            ></version-manager>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog
      title="第三方配置"
      :visible.sync="configDialogVisible"
      width="400px"
      @closed="handleDialogClosed(2)"
    >
      <el-checkbox-group v-model="checkedConfig" class="third-config-checkbox">
        <el-checkbox
          v-for="config in configList"
          :label="config.id"
          :key="config.id"
          >{{ config.description }}</el-checkbox
        >
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="configDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveConfig">确 定</el-button>
      </span>
    </el-dialog>
    <Drawer
      ref="productDrawer"
      :visible.sync="drawerVisible"
      :title="curProductId === -1 ? '新建产品' : '编辑产品'"
      width="600px"
      :beforeClose="checkDrawerClose"
      @closed="handleDialogClosed(1)"
    >
      <el-form
        :model="productForm"
        ref="productForm"
        class="productForm"
        :rules="productFormRules"
        label-width="90px"
      >
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="productForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品代号" prop="productCode">
          <el-input v-model="productForm.productCode"></el-input>
        </el-form-item>
        <el-form-item label="产品方法" prop="productMethod">
          <el-select v-model="productForm.productMethod" multiple>
            <el-option
              v-for="(item, index) in methodsList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收费方法" prop="chargesMethod">
          <el-select v-model="productForm.chargesMethod">
            <el-option
              v-for="(item, index) in methodsList"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本" prop="version">
          <el-input v-model="productForm.version"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="productForm.type">
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="productForm.price"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input v-model="productForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="参数" prop="argument">
          <el-select
            v-model="productForm.argument"
            multiple
            allow-create
            filterable
            default-first-option
            placeholder="手动输入创建"
          >
            <el-option
              v-for="(item, index) in []"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer="{ handleClose }">
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSaveProduct">确 定</el-button>
        </span>
      </template>
    </Drawer>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
import Drawer from '@/components/Drawer'
import VersionManager from './components/versionManager'
import { deepClone } from '@/utils'

let tempProductForm = {}

export default {
  name: 'productManager',
  components: { GridUnit, Drawer, VersionManager },
  data() {
    return {
      colModels: [
        { prop: 'productName', label: '产品名称' },
        { prop: 'productCode', label: '产品代号' },
        { prop: 'productMethod', label: '产品方法' },
        { prop: 'chargesMethod', label: '收费方法' },
        { prop: 'argument', label: '参数' },
        { prop: 'version', label: '版本' },
        {
          prop: 'type',
          label: '类型',
          render(row) {
            return row.type === 1 ? '快捷产品' : '联合建模产品'
          }
        },
        { prop: 'price', label: '价格' },
        { label: '状态', slotName: 'productStatus' },
        { prop: 'crtTime', label: '更新时间' },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          width: 240
        }
      ],
      configDialogVisible: false,
      curProductId: -1,
      curProductCode: '-1',
      productForm: {
        productName: '',
        productCode: '',
        productMethod: [],
        chargesMethod: '',
        version: '',
        type: '',
        price: '',
        status: 1,
        orderNum: '',
        argument: []
      },
      productFormRules: {
        productName: [
          { required: true, message: '产品名称不能为空', trigger: 'blur' }
        ],
        productCode: [
          { required: true, message: '产品代号不能为空', trigger: 'blur' }
        ],
        productMethod: [
          { required: true, message: '请选择产品方法', trigger: 'blur' }
        ],
        chargesMethod: [
          { required: true, message: '请选择收费方法', trigger: 'blur' }
        ],
        version: [{ required: true, message: '版本不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        price: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '排序号不能为空', trigger: 'blur' }
        ],
        argument: [
          { required: true, message: '请至少创建一个参数', trigger: 'blur' }
        ]
      },
      methodsList: [],
      typeList: [
        {
          label: '快捷产品',
          value: 1
        },
        {
          label: '联合建模产品',
          value: 2
        }
      ],
      statusList: [
        {
          label: '无效',
          value: 0
        },
        {
          label: '有效',
          value: 1
        }
      ],
      configList: [],
      checkedConfig: [],
      argumentsList: [],
      drawerVisible: false,
      versionVisible: false,
      switchValue: false
    }
  },
  methods: {
    // 获取方法列表
    handleMethodsList() {
      this.$api.productManager.getProductMethods().then(res => {
        this.methodsList = res
      })
    },
    // 新建产品
    handleAddProduct() {
      this.drawerVisible = true
      this.$nextTick(() => {
        tempProductForm = deepClone(this.productForm)
      })
    },
    // 编辑产品
    handleEditProduct(row) {
      const {
        id,
        chargesMethod,
        orderNum,
        price,
        productCode,
        productName,
        status,
        type,
        version
      } = row
      const productMethod = row.productMethod.split(',')
      const argument = row.argument.split(',')
      this.curProductId = id
      this.$set(this, 'productForm', {
        productName,
        productCode,
        productMethod,
        chargesMethod,
        version,
        type,
        price,
        status,
        orderNum,
        argument
      })
      this.drawerVisible = true
      this.$nextTick(() => {
        tempProductForm = deepClone(this.productForm)
      })
    },
    // 保存产品
    handleSaveProduct() {
      this.$refs.productForm.validate(valid => {
        function callback(res) {
          if (res.rel) {
            this.$message({
              type: 'success',
              message: `${this.curProductId === -1 ? '新增' : '编辑'}产品成功`
            })
            this.drawerVisible = false
            this.searchParams()
          } else {
            this.$message({
              type: 'error',
              message: res.message || '保存失败'
            })
          }
        }
        if (valid) {
          const form = deepClone(this.productForm)
          form.argument = form.argument.join(',')
          form.productMethod = form.productMethod.join(',')
          if (this.curProductId >= 0) {
            this.$api.productManager
              .editProduct(form, this.curProductId)
              .then(callback.bind(this))
          } else {
            this.$api.productManager.addProduct(form).then(callback.bind(this))
          }
        } else {
          return false
        }
      })
    },
    // 删除产品
    // handleDeleteProduct(row) {
    //   this.$confirm('确定删除此产品吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$api.productManager.deleteProduct(row.id).then(res => {
    //         this.$message({
    //           type: res.rel ? 'success' : 'error',
    //           message: res.message || (res.rel ? '删除成功' : '删除失败')
    //         })
    //         if (res.rel) {
    //           this.searchParams()
    //         }
    //       })
    //     })
    //     .catch(() => false)
    // },
    // 第三方配置
    handleThirdConfig(productCode) {
      this.curProductCode = productCode
      this.$api.productManager
        .getThirdConfig({
          productCode
        })
        .then(res => {
          this.configList = res || []
          this.checkedConfig = res
            .filter(config => config.selected === 1)
            .map(config => config.id)
          this.configDialogVisible = true
        })
    },
    // 保存第三方配置
    handleSaveConfig() {
      this.$api.productManager
        .saveThirdConfig({
          productCode: this.curProductCode,
          methodIds: this.checkedConfig
        })
        .then(res => {
          if (res.rel) {
            this.$message({
              type: 'success',
              message: '第三方配置绑定成功!'
            })
            this.configDialogVisible = false
            this.searchParams()
          } else {
            this.$message({
              type: 'error',
              message: '第三方配置绑定失败!'
            })
          }
        })
    },
    // 关闭弹窗
    handleDialogClosed(type) {
      if (type === 1) {
        this.curProductId = -1
        this.$refs.productForm.clearValidate()
        this.$set(this, 'productForm', {
          productName: '',
          productCode: '',
          productMethod: [],
          chargesMethod: '',
          version: '',
          type: '',
          price: '',
          status: 1,
          orderNum: '',
          argument: []
        })
      } else {
        this.curProductCode = '-1'
        this.checkedConfig = []
      }
    },
    searchParams() {
      this.$refs.productGrid.searchHandler()
    },
    // 关闭产品编辑模态框前进行确认操作
    checkDrawerClose(done) {
      if (
        JSON.stringify(this.productForm) !== JSON.stringify(tempProductForm)
      ) {
        this.$confirm('您已进行过编辑，是否放弃本次修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            done()
          })
          .catch(() => {})
      } else {
        done()
      }
    },
    // 展示版本管理列表
    handleVersionManager(productCode) {
      this.curProductCode = productCode
      this.versionVisible = true
    },
    toggleSwitch(obj, e) {
      e.preventDefault()
      const editParams = deepClone(obj)
      editParams.status = editParams.status === 1 ? 0 : 1
      this.$api.productManager.editProduct(editParams, obj.id).then(res => {
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
  },
  mounted() {
    this.handleMethodsList()
  }
}
</script>

<style lang="scss" scoped>
.productForm {
  .el-select {
    width: 100%;
  }
}
.third-config-checkbox {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .el-checkbox {
    width: 50%;
    margin: 0 0 20px;
  }
}
.product-card-body {
  overflow: hidden;
  .product-card-body-row {
    width: 200%;
    transition: transform 0.5s;
    &.show-version {
      transform: translateX(-50%);
    }
  }
}
</style>
