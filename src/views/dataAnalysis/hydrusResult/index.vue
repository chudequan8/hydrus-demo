<template>
  <div class="app-container hydrus-result-container">
    <el-card>
      <el-tabs type="border-card" v-model="type" class="hydrus-result-tabbar">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        >
          <div class="search-row">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                  v-model="searchForm[index].mobile"
                  placeholder="请输入手机号"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="searchForm[index].idcardNo"
                  placeholder="请输入身份证号"
                />
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
            :ref="`hydrusResultGrid${item.name}`"
            :formOptions="queryFormValues"
            :reqMethod="$api.hydrusResult.getHydrusResultList"
            :autoLoad="false"
            showExpand
            @expand-change="getExpandData"
            :columns="curColModels"
          >
            <template slot="expandTable" slot-scope="scope">
              <el-table
                :data="rowData[scope.row.id] || []"
                style="width: 100%"
                :max-height="300"
              >
                <el-table-column
                  v-for="(column, index) in ruleDetailColumns"
                  :label="column.label"
                  :key="index"
                  :prop="column.prop"
                >
                  <template slot-scope="expand_scope">
                    <span v-if="column.prop === 'pass'">
                      <el-tag v-if="expand_scope.row.pass" type="success"
                        >是</el-tag
                      >
                      <el-tag v-else type="danger">否</el-tag>
                    </span>
                    <span v-else-if="column.prop === 'score'">
                      <span
                        :class="[
                          expand_scope.row.score >= 0 ? 'isPass' : 'notPass'
                        ]"
                        >{{ expand_scope.row.score }}</span
                      >
                    </span>
                    <span v-else>
                      {{ expand_scope.row[column.prop] }}
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </grid-unit>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
import { deepClone } from 'utils'

const colModels1 = [
  { prop: 'id', label: 'id' },
  {
    prop: 'ruleResult',
    label: '是否通过',
    type: 'status',
    unitFilters: {
      renderStatusType(status) {
        const statusMap = {
          1: 'success',
          2: 'danger',
          3: 'info'
        }
        return statusMap[status] || 'info'
      },
      renderStatusValue(status) {
        const statusStrData = ['通过', '拒绝', '待定']
        return statusStrData[status - 1] || '待定'
      }
    }
  },
  { prop: 'crtTime', label: '创建时间' }
]

const colModels2 = [
  { prop: 'id', label: 'id' },
  { prop: 'version', label: '版本' },
  { prop: 'initialScore', label: '初始评分' },
  { prop: 'resultScore', label: '最终评分' },
  { prop: 'crtTime', label: '创建时间' }
]

const detailColumns1 = [
  {
    prop: 'name',
    label: '风控参数'
  },
  {
    prop: 'desc',
    label: '描述'
  },
  {
    prop: 'value',
    label: '风控因子'
  },
  {
    prop: 'pass',
    label: '是否通过'
  }
]

const detailColumns2 = [
  {
    prop: 'name',
    label: '风控参数'
  },
  {
    prop: 'desc',
    label: '描述'
  },
  {
    prop: 'value',
    label: '风控因子'
  },
  {
    prop: 'score',
    label: '因子得分'
  }
]

export default {
  components: { GridUnit },
  data() {
    return {
      tabs: [
        {
          name: '1',
          label: '规则墙'
        },
        {
          name: '2',
          label: '评分卡'
        }
      ],
      type: '1',
      mobile: '',
      idcardNo: '',
      searchForm: [
        {
          mobile: '',
          idcardNo: ''
        },
        {
          mobile: '',
          idcardNo: ''
        }
      ],
      queryFormValues: {
        type: '1',
        mobile: '',
        idcardNo: ''
      },
      curColModels: [],
      rowData: {}
    }
  },
  computed: {
    ruleDetailColumns() {
      return this.type === '1' ? detailColumns1 : detailColumns2
    }
  },
  watch: {
    type(val) {
      if (val === '1') {
        this.curColModels = colModels1
      } else {
        this.curColModels = colModels2
      }
      this.queryFormValues.mobile = this.searchForm[this.type - 1].mobile
      this.queryFormValues.idcardNo = this.searchForm[this.type - 1].idcardNo
      this.queryFormValues.type = val
      this.$nextTick(() => {
        this.$refs['hydrusResultGrid' + val][0].changeTableSize()
      })
    }
  },
  methods: {
    handleSearch(searchType) {
      const curSearchForm = this.searchForm[this.type - 1]
      if (searchType === 1) {
        if (curSearchForm.mobile === '' && curSearchForm.idcardNo === '') {
          this.$message.error('请至少输入一个查询条件')
          return false
        }
        this.queryFormValues.mobile = curSearchForm.mobile
        this.queryFormValues.idcardNo = curSearchForm.idcardNo
        this.$nextTick(this.searchParams)
      } else {
        this.queryFormValues.mobile = curSearchForm.mobile = ''
        this.queryFormValues.idcardNo = curSearchForm.idcardNo = ''
      }
    },
    searchParams() {
      const curTable = `hydrusResultGrid${this.type}`
      this.$refs[curTable][0].searchHandler()
    },
    // 获取展开行数据 children
    getExpandData(row) {
      if (this.rowData[row.id]) {
        return false
      }
      if (this.type === '1') {
        this.$set(this.rowData, `${row.id}`, deepClone(row.ruleDetailList))
      } else {
        this.$set(
          this.rowData,
          `${row.id}`,
          deepClone(row.scorecardResultDetailList)
        )
      }
    }
  },
  created() {
    this.curColModels = colModels1
  }
}
</script>

<style lang="scss" scoped>
.hydrus-result-container {
  .hydrus-result-tabbar {
    box-shadow: 0 0;
  }
  .isPass {
    color: #30b08f;
  }
  .notPass {
    color: #e65d6e;
  }
}
</style>
