<template>
  <div id="app" class="flow_in-container">
    <div class="search-bar">
      <el-form inline>
        <el-form-item>
          <el-date-picker
            ref="myPicker"
            v-model="formParams.timeRange"
            :value-format="'yyyy-MM-dd HH:mm:ss'"
            :picker-options="pickerOptions"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            style="width: 370px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formParams.channelArr"
            multiple
            placeholder="选择渠道"
            clearable
            filterable
            reserve-keyword
            :default-first-option="true"
            style="width: 450px"
          >
            <el-option
              v-for="item in channelList"
              :key="item.channelCode"
              :label="item.channelName"
              :value="item.channelCode"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="formParams.channelOperator"
            placeholder="选择渠道所属"
            clearable
            filterable
            :default-first-option="true"
          >
            <el-option
              v-for="item in channelOperatorList"
              :key="item.userId"
              :label="item.username"
              :value="item.username"
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
          <el-button icon="el-icon-delete" @click="handleSearch(2)"
            >清空</el-button
          >
        </el-form-item>
      </el-form>
      <div class="aside-option">
        <el-dropdown trigger="click" :hide-on-click="false">
          <el-link type="primary">
            筛选列<i class="el-icon-arrow-down el-icon--right"></i>
          </el-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in colModels" :key="index">
              <el-checkbox
                v-model="item.checked"
                :disabled="item.disabled"
                @change="handleCheckedChange(item, index)"
                >{{ item.label || item.slotName }}</el-checkbox
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <grid-unit
      ref="flowInGrid"
      :formOptions="queryFormValues"
      :reqMethod="reqFunc"
      :columns="curColModels"
      showSummary
      :footerScopedSlots="footerScopedSlots"
      :summary-method="getSummaries"
      :dataHandler="dataHandler"
      :headerCellStyle="headerCellStyle"
      :cellStyle="cellStyle"
      :autoLoad="false"
      pageSizeKey="limit"
      pageNoKey="offset"
      @sort-change="sortChange"
    >
      <template slot="channelName" slot-scope="scope">
        <p class="table-slot-text">{{ scope.row.channelCode }}</p>
        <p class="table-slot-text" v-if="scope.row.channelOperator">
          ({{ scope.row.channelOperator }})
        </p>
      </template>
      <template slot="partPrice" slot-scope="scope">
        <p class="table-slot-text">
          U
          <span style="float: right">{{ scope.row.uvPrice }}</span>
        </p>
        <p class="table-slot-text">
          A
          <span style="float: right">{{ scope.row.registerPrice }}</span>
        </p>
      </template>
      <template slot="roi" slot-scope="scope">
        <p class="table-slot-text">
          U/U
          <span style="float: right">{{
            formatRate(scope.row.uvProfit, scope.row.uvPrice)
          }}</span>
        </p>
        <p class="table-slot-text">
          U/A
          <span style="float: right">{{
            formatRate(scope.row.reProfit, scope.row.registerPrice)
          }}</span>
        </p>
      </template>
      <template slot="handle" slot-scope="scope">
        <el-button
          title="渠道详情"
          size="small"
          icon="el-icon-s-promotion"
          @click="handleChannerDialogVisible(scope.row)"
        ></el-button>
        <el-button
          title="甲方详情"
          size="small"
          type="success"
          icon="el-icon-s-custom"
          @click="handleAPartDialogVisible(scope.row)"
        ></el-button>
      </template>
    </grid-unit>
    <el-dialog
      :visible.sync="channerDialogVisible"
      width="1000px"
      title="渠道详情"
    >
      <grid-unit
        ref="channelDetailGrid"
        :formOptions="channelDetailFormValues"
        :reqMethod="channelDetailReqFunc"
        :columns="expandColModels"
        :autoLoad="false"
        pageSizeKey="limit"
        pageNoKey="offset"
        size="small"
        :pageSizes="[100, 200, 500]"
      >
      </grid-unit>
    </el-dialog>
    <el-dialog
      :visible.sync="APartDialogVisible"
      width="1000px"
      title="甲方详情"
    >
      <grid-unit
        ref="aPartDetailGrid"
        :formOptions="aPartDetailFormValues"
        :reqMethod="aPartDetailReqFunc"
        :columns="aPartDetailColModels"
        :autoLoad="false"
        pageSizeKey="limit"
        pageNoKey="offset"
        size="small"
      >
      </grid-unit>
    </el-dialog>
    <el-dialog
      :visible.sync="todayDetailDialogVisible"
      width="1000px"
      title="今日明细"
    >
      <grid-unit
        ref="todayDetailGrid"
        :formOptions="todayDetailFormValues"
        :reqMethod="todayDetailReqFunc"
        :columns="todayDetailColModels"
        :autoLoad="false"
        pageSizeKey="limit"
        pageNoKey="offset"
        size="small"
      >
        <template slot="handle" slot-scope="scope">
          <span v-if="scope.row.summaryDate === '全部'">-</span>
          <el-button
            v-else
            title="编辑"
            type="warning"
            size="mini"
            icon="el-icon-edit-outline"
            @click="editTodayDetail(scope.row)"
          ></el-button>
        </template>
      </grid-unit>
    </el-dialog>
    <el-dialog
      :visible.sync="sourceDetailDialogVisible"
      width="800px"
      title="来源明细"
    >
      <grid-unit
        ref="sourceDetailGrid"
        :formOptions="sourceDetailFormValues"
        :reqMethod="sourceDetailReqFunc"
        :columns="sourceDetailColModels"
        :autoLoad="false"
        pageSizeKey="limit"
        pageNoKey="offset"
        size="small"
      >
      </grid-unit>
    </el-dialog>
    <el-dialog
      :visible.sync="editDetailDialogVisible"
      width="500px"
      title="修改今日明细"
      @closed="handleEditDetailDialogClosed"
    >
      <el-form
        :model="todayDetailForm"
        ref="todayDetailForm"
        :rules="todayDetailFormRules"
        label-width="110px"
      >
        <el-form-item label="实际注册数：" prop="registerCount">
          <el-input
            v-model.number="todayDetailForm.registerCount"
            clearable
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="实际登录数：" prop="loginCount">
          <el-input
            v-model.number="todayDetailForm.loginCount"
            clearable
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="注册数：" prop="registerDeduction">
          <el-input
            v-model.number="todayDetailForm.registerDeduction"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="登录数：" prop="loginDeduction">
          <el-input
            v-model.number="todayDetailForm.loginDeduction"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="放款数：" prop="transferDeduction">
          <el-input
            v-model.number="todayDetailForm.transferDeduction"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="放款金额：" prop="transferAmount">
          <el-input
            v-model="todayDetailForm.transferAmount"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDetailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTodayDetail">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import GridUnit from 'components/GridUnit/grid'
import colModels, { formatRate } from './tableColumns'

let localColumnsStr = localStorage.getItem('ERTIX_FLOWIN_COLUMN')
if (localColumnsStr) {
  const localColumns = localColumnsStr.split(',')
  colModels.forEach(item => {
    item.checked =
      localColumns.includes(item.label || item.slotName) ||
      'summaryDate,channelCode,handle'.includes(item.prop)
  })
}

const calcColumn = colModels
  .filter(
    item =>
      typeof item.render === 'function' &&
      'summaryDate,wxCount,qqCount'.indexOf(item.prop) === -1
  )
  .map(item => item.prop)

const transferAmountPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('放款金额不能为空'))
  } else {
    if (isNaN(value)) {
      callback(new Error('放款金额必须为数字'))
    }
    callback()
  }
}

const slotColumnProps = colModels
  .filter(item => item.slotName)
  .map(item => item.prop)

export default {
  name: 'channel-page',
  components: { GridUnit },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate(),
                0,
                0,
                0
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        showNowBtn: true
      },
      totalRow: {},
      channelList: [],
      channelOperatorList: [],
      formParams: {
        timeRange: [],
        channelArr: [],
        channelOperator: ''
      },
      footerScopedSlots: {
        partPrice: () => (
          <div class="cell">
            <p class="table-slot-text">
              U<span style="float: right">{this.totalRow.uvPrice}</span>
            </p>
            <p class="table-slot-text">
              A<span style="float: right">{this.totalRow.registerPrice}</span>
            </p>
          </div>
        ),
        uuROI: () => (
          <div class="cell">
            <p class="table-slot-text">
              U/U
              <span style="float: right">
                {formatRate(this.totalRow.uvProfitPrice, this.totalRow.uvPrice)}
              </span>
            </p>
            <p class="table-slot-text">
              U/A
              <span style="float: right">
                {formatRate(
                  this.totalRow.uvProfitPrice,
                  this.totalRow.registerPrice
                )}
              </span>
            </p>
          </div>
        ),
        handle: () => (
          <div class="cell">
            <el-button
              title="渠道详情"
              size="small"
              icon="el-icon-s-promotion"
              on-click={() => this.handleChannerDialogVisible(this.totalRow)}
            />
            <el-button
              title="甲方详情"
              size="small"
              type="success"
              icon="el-icon-s-custom"
              on-click={() => this.handleAPartDialogVisible(this.totalRow)}
            ></el-button>
          </div>
        )
      },
      queryFormValues: {},
      channelDetailFormValues: {},
      aPartDetailFormValues: {},
      todayDetailFormValues: {},
      sourceDetailFormValues: {},
      reqFunc: this.$api.flowIn.getFlowInList,
      channelDetailReqFunc: this.$api.flowIn.getChannelDetail,
      aPartDetailReqFunc: this.$api.flowIn.getAPartDetail,
      todayDetailReqFunc: params =>
        axios.get('/stream/in/detail/list', {
          params
        }),
      sourceDetailReqFunc: params =>
        axios.get('/stream/in/detail/source/list', {
          params
        }),
      colModels,
      curColModels: [],
      channelDetailData: [],
      expandColModels: [
        { prop: 'osName', label: '操作系统' },
        { prop: 'pvCount', label: 'PV数' },
        { prop: 'uvCount', label: 'UV数' },
        { prop: 'channelUvCount', label: '渠道UV数' },
        { prop: 'downloadCount', label: '下载数' },
        { prop: 'channelDownloadCount', label: '渠道下载数' },
        { prop: 'registerCount', label: '注册数' },
        { prop: 'loginCount', label: '登录数' },
        { prop: 'aimPv', label: '目标PV' },
        { prop: 'aimUv', label: '目标UV' },
        { prop: 'outDownloadCount', label: '甲方下载数' },
        { prop: 'registerLoginCount', label: '首日登录数' },
        { prop: 'loginUvCount', label: '次日UV' },
        {
          prop: 'UvRate',
          label: 'UV留存率',
          render(row) {
            return formatRate(row.loginUvCount, row.registerLoginCount)
          }
        }
        // { prop: "reLoginCount", label: "次日再次登录数" }
      ],
      aPartDetailColModels: [
        // {
        //   label: "汇总日期",
        //   prop: "summaryDate"
        // },

        {
          label: '渠道编码',
          prop: 'channelCode'
        },
        {
          label: '应用名称',
          prop: 'appName'
        },
        {
          label: 'PV数',
          prop: 'pvCount'
        },
        {
          label: 'UV数',
          prop: 'uvCount'
        },
        {
          label: '下载数',
          prop: 'downloadCount'
        }
      ],
      todayDetailColModels: [
        {
          label: '时间',
          prop: 'summaryDate',
          width: 170
        },
        {
          label: '实际注册数',
          prop: 'registerCount'
        },
        {
          label: '注册数(渠道)',
          prop: 'registerDeduction'
        },
        {
          label: '实际登录数',
          prop: 'loginCount'
        },
        {
          label: '登录数(渠道)',
          prop: 'loginDeduction'
        },
        {
          label: '下款数(渠道)',
          prop: 'transferDeduction'
        },
        {
          label: '下款金额(渠道)',
          prop: 'transferAmount'
        },
        {
          label: '操作',
          slotName: 'handle',
          fixed: 'right',
          align: 'center',
          width: 70
        }
      ],
      sourceDetailColModels: [
        {
          prop: 'softSource',
          label: '可检测来源'
        },
        {
          prop: 'clickNumber',
          label: '点击数'
        },
        {
          prop: 'userNumber',
          label: '点击用户数'
        }
      ],
      channerDialogVisible: false,
      APartDialogVisible: false,
      todayDetailDialogVisible: false,
      sourceDetailDialogVisible: false,
      editDetailDialogVisible: false,
      todayDetailForm: {
        registerCount: '',
        loginCount: '',
        registerDeduction: '',
        loginDeduction: '',
        transferDeduction: '',
        transferAmount: ''
      },
      todayDetailFormRules: {
        registerCount: [
          { required: true, message: '实际注册数不能为空', trigger: 'blur' }
        ],
        loginCount: [
          { required: true, message: '实际登录数不能为空', trigger: 'blur' }
        ],
        registerDeduction: [
          { required: true, message: '注册数不能为空', trigger: 'blur' },
          { type: 'number', message: '注册数必须为数字', trigger: 'blur' }
        ],
        loginDeduction: [
          { required: true, message: '登录数不能为空', trigger: 'blur' },
          { type: 'number', message: '登录数必须为数字', trigger: 'blur' }
        ],
        transferDeduction: [
          { required: true, message: '放款数不能为空', trigger: 'blur' },
          { type: 'number', message: '放款数必须为数字', trigger: 'blur' }
        ],
        transferAmount: [{ validator: transferAmountPass, trigger: 'blur' }]
      },
      formatRate
    }
  },
  watch: {
    formParams: {
      deep: true,
      handler(val) {
        this.$set(this, 'queryFormValues', {
          channelCode: val.channelArr.join(','),
          channelOperator: val.channelOperator,
          startTime: val.timeRange ? val.timeRange[0] : '',
          endTime: val.timeRange ? val.timeRange[1] : ''
        })
        this.$nextTick(() => {
          this.searchParams()
          this.$refs.flowInGrid.$refs.gridUnit.clearSort()
        })
      }
    }
  },
  methods: {
    setDefaultTime(val) {
      if (
        val &&
        val.maxDate &&
        val.maxDate.getTime() > new Date().getTime() - 24 * 3600 * 1000
      ) {
        return [
          '00:00:00',
          [
            new Date().getHours(),
            new Date().getMinutes(),
            new Date().getSeconds()
          ]
            .map(item => (item < 10 ? '0' + item : item))
            .join(':')
        ]
      } else {
        return ['00:00:00', '23:59:59']
      }
    },
    dataHandler(tableData) {
      const totalRow = tableData.filter(item => item.summaryDate === '全部')[0]
      if (totalRow) {
        this.totalRow = this.$set(this, 'totalRow', totalRow)
        tableData = tableData.filter(item => item.summaryDate !== '全部')
      }
      return tableData
    },
    getSummaries(param) {
      if (!param.data.length) {
        return ['全部']
      } else {
        return param.columns.map(item => {
          if (slotColumnProps.includes(item.property)) {
            return 'needSlots'
          }
          const curColModel = colModels.find(a => a.prop === item.property)
          function formatCell(min, max) {
            const cellText = curColModel.render(this.totalRow)
            const cellVal = curColModel.rate(this.totalRow)
            if (cellText === '-') {
              return '-'
            }
            const color =
              cellVal > max ? 'green' : cellVal < min ? 'red' : '#606266'
            return `<span style="color: ${color}">${cellText}</span>`
          }
          switch (item.property) {
            case 'registerDeduction':
            case 'registerCount':
            case 'loginDeduction':
            case 'outDownloadCount': {
              return formatCell.apply(this, [40, 60])
            }
            case 'aimUv': {
              return formatCell.apply(this, [150])
            }
            default:
              return curColModel.render
                ? curColModel.render(this.totalRow)
                : this.totalRow[item.property]
          }
        })
      }
    },
    handleCheckedChange() {
      this.$refs.flowInGrid.loading = true
      setTimeout(() => {
        this.curColModels = this.colModels.filter(item => item.checked)
        setTimeout(() => {
          this.$refs.flowInGrid.loading = false
        }, 0)
      }, 0)
      const showColumns = this.colModels
        .filter(item => item.checked)
        .map(item => item.label || item.slotName)
        .join(',')
      localStorage.setItem('ERTIX_FLOWIN_COLUMN', showColumns)
    },
    handleSearch(type) {
      if (type === 2) {
        this.formParams.channelArr = []
        this.formParams.timeRange = []
        this.formParams.channelOperator = ''
      }
      const params =
        type === 1
          ? {
              channelCode: this.formParams.channelArr.join(','),
              channelOperator: this.formParams.channelOperator,
              startTime: this.formParams.timeRange
                ? this.formParams.timeRange[0]
                : '',
              endTime: this.formParams.timeRange
                ? this.formParams.timeRange[1]
                : ''
            }
          : {}
      this.$set(this, 'queryFormValues', params)
      this.$nextTick(() => {
        this.searchParams()
        this.$refs.flowInGrid.$refs.gridUnit.clearSort()
      })
    },
    searchParams() {
      this.$refs.flowInGrid.searchHandler()
    },
    handleChannerDialogVisible(row) {
      this.$set(this, 'channelDetailFormValues', {
        summaryDate: row.summaryDate,
        channelCode: row.channelCode,
        channelCodes: this.queryFormValues.channelCode,
        startTime: this.queryFormValues.startTime || '',
        endTime: this.queryFormValues.endTime || ''
      })
      this.channerDialogVisible = true
      this.$nextTick(() => {
        this.$refs.channelDetailGrid.searchHandler()
      })
    },
    handleAPartDialogVisible(row) {
      this.$set(this, 'aPartDetailFormValues', {
        summaryDate: row.summaryDate,
        channelCode: row.channelCode,
        channelCodes: this.queryFormValues.channelCode,
        startTime: this.queryFormValues.startTime || '',
        endTime: this.queryFormValues.endTime || ''
      })
      this.APartDialogVisible = true
      this.$nextTick(() => {
        this.$refs.aPartDetailGrid.searchHandler()
      })
    },
    handleTodayDialogVisible(row) {
      this.$set(this, 'todayDetailFormValues', {
        summaryDate: row.summaryDate,
        channelCode: row.channelCode
      })
      this.todayDetailDialogVisible = true
      this.$nextTick(() => {
        this.$refs.todayDetailGrid.searchHandler()
      })
    },
    handleSourceDialogVisible(row) {
      this.$set(this, 'sourceDetailFormValues', {
        summaryDate: row.summaryDate,
        channelCode: row.channelCode
      })
      this.sourceDetailDialogVisible = true
      this.$nextTick(() => {
        this.$refs.sourceDetailGrid.searchHandler()
      })
    },
    editTodayDetail(row) {
      const {
        id,
        registerCount,
        loginCount,
        registerDeduction,
        loginDeduction,
        transferDeduction,
        transferAmount
      } = row
      this.$set(this, 'todayDetailForm', {
        id,
        registerCount,
        loginCount,
        registerDeduction,
        loginDeduction,
        transferDeduction,
        transferAmount
      })
      this.editDetailDialogVisible = true
    },
    saveTodayDetail() {
      this.$refs.todayDetailForm.validate(valid => {
        if (valid) {
          axios({
            url: '/stream/in/update',
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: [
              function(data) {
                return Object.keys(data)
                  .map(
                    key =>
                      `${encodeURIComponent(key)}=${encodeURIComponent(
                        data[key]
                      )}`
                  )
                  .join('&')
              }
            ],
            data: this.todayDetailForm
          }).then(res => {
            if (res.data.code === 0) {
              this.$message({
                type: 'success',
                message: res.data.msg || '操作成功'
              })
              this.editDetailDialogVisible = false
              this.$refs.todayDetailGrid.fetchHandler()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg || '操作失败'
              })
            }
          })
        }
      })
    },
    handleEditDetailDialogClosed() {
      this.$refs.todayDetailForm.clearValidate()
      this.$set(this, 'todayDetailForm', {
        registerCount: '',
        loginCount: '',
        registerDeduction: '',
        loginDeduction: '',
        transferDeduction: '',
        transferAmount: ''
      })
    },
    headerCellStyle({ column }) {
      if (calcColumn.includes(column.property)) {
        return {
          color: '#4d5dec'
        }
      } else {
        return false
      }
    },
    cellStyle({ row, column, columnIndex }) {
      const prop = column.property
      function formatCell(min, max) {
        const cellVal = this.curColModels[columnIndex].rate(row)
        return {
          color: cellVal > max ? 'green' : cellVal < min ? 'red' : '#606266'
        }
      }
      switch (prop) {
        case 'channelCode': {
          const wxCount = row.wxCount || 0
          const qqCount = row.qqCount || 0
          const isError = wxCount + qqCount > (row['uvCount'] || 0) / 2
          return isError ? { color: 'red' } : false
        }
        case 'registerDeduction':
        case 'registerCount':
        case 'loginDeduction':
        case 'outDownloadCount': {
          return formatCell.apply(this, [40, 60])
        }
        case 'aimUv': {
          return formatCell.apply(this, [150])
        }
        default:
          return false
      }
    },
    sortChange({ prop, order }) {
      this.$set(this, 'queryFormValues', {
        ...this.queryFormValues,
        sort: order ? prop : '',
        sortOrder: order ? order.replace('ending', '') : ''
      })
      this.$nextTick(this.searchParams)
    }
  },
  mounted() {
    // 默认查询当天数据
    this.$refs.myPicker.emitInput([
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      ),
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 1,
        0,
        0,
        0
      )
    ])
  },
  async created() {
    this.curColModels = this.colModels.filter(item => item.checked)
    const channelRes = await this.$api.flowIn.getChannelList()
    const channelOperatorRes = await this.$api.flowIn.getChannelOperator()
    this.channelList = channelRes.data || []
    this.channelOperatorList = channelOperatorRes.data || []
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
}
.table-slot-text {
  margin: 0;
  line-height: 1.2;
}
.el-dropdown-menu {
  max-height: 300px;
  overflow-y: scroll;
}
.flow_in-container {
  padding: 20px;
  .el-table {
    font-size: 13px;
    .caret-wrapper {
      width: 10px;
    }
    .sort-caret {
      left: 5px;
      &.ascending {
        top: 4px;
      }
      &.descending {
        bottom: 8px;
      }
    }
    .cell {
      width: 100% !important;
    }
    .el-table__footer {
      .cell {
        white-space: nowrap;
        text-overflow: initial;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  .el-button {
    vertical-align: top;
  }
  .aside-option {
    position: absolute;
    top: 0;
    right: 0;
    .el-dropdown {
      line-height: 36px;
    }
  }
}
</style>
