<template>
  <div>
    <el-form :inline="true">
      <el-form-item v-if="tableType === '1'">
        <el-input v-model="searchForm.idcardNo" placeholder="请输入身份证号" />
      </el-form-item>
      <el-form-item v-else>
        <el-input v-model="searchForm.mobile" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.merchantNo" placeholder="请选择商户号">
          <el-option
            v-for="(item, index) in merchantNoList"
            :key="index"
            :label="item.merchantName"
            :value="item.merchantNo"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchForm.type" placeholder="请选择类型">
          <el-option
            v-for="(item, index) in typeList"
            :key="index"
            :label="item.typeName"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch(1)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button plain icon="el-icon-delete" @click="handleSearch(2)"
          >清空</el-button
        >
      </el-form-item>
    </el-form>
    <grid-unit
      ref="basicDataGrid"
      :formOptions="queryFormValues"
      :reqMethod="reqFunc"
      :autoLoad="false"
      :columns="curColModels"
    >
      <template slot="dataContent" slot-scope="scope">
        <el-button
          v-if="typeof scope.row.content === 'boolean'"
          size="small"
          type="success"
          @click="handleDownload(scope.row)"
          >下载</el-button
        >
        <el-button
          v-if="typeof scope.row.content === 'object'"
          size="small"
          type="warning"
          @click="handleCheckDetail(scope.row.content)"
          >详情</el-button
        >
        <span v-if="typeof scope.row.content === 'string'">{{
          scope.row.content
        }}</span>
      </template>
      <template slot="dataStatus" slot-scope="scope">
        <toggle-button
          :sync="true"
          :value="scope.row.status === 1"
          :labels="{ checked: '开', unchecked: '关' }"
          color="#67C23A"
          @click.native="toggleSwitch(scope.row, $event)"
        />
      </template>
    </grid-unit>
    <Drawer :visible.sync="contentDialogVisible" title="查看详情" width="600px">
      <el-table :data="curContent" border style="width: 100%">
        <el-table-column prop="label" label="标签" width="180">
        </el-table-column>
        <el-table-column prop="value" label="数据"> </el-table-column>
      </el-table>
    </Drawer>
  </div>
</template>

<script>
import GridUnit from '@/components/GridUnit/grid'
import Drawer from '@/components/Drawer'
import dataDetailLabelMap from './dataDetailLabel'

export default {
  name: 'basicDataGrid',
  components: { GridUnit, Drawer },
  props: {
    tableType: String,
    curTableType: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      searchForm:
        this.tableType === '1'
          ? {
              idcardNo: '',
              merchantNo: '',
              type: ''
            }
          : {
              mobile: '',
              merchantNo: '',
              type: ''
            },
      queryFormValues: {},
      merchantNoList: [],
      typeList: [],
      contentDialogVisible: false,
      curContent: []
    }
  },
  computed: {
    reqFunc() {
      return this.$api.basicDataManager[
        this.tableType === '1' ? 'getIdCardList' : 'getMobileList'
      ]
    },
    curColModels() {
      const colModels = [
        { prop: 'merchantNo', label: '商户号' },
        { prop: 'type', label: '类型' },
        { slotName: 'dataStatus', label: '状态' },
        {
          slotName: 'dataContent',
          label: '内容'
        },
        { prop: 'crtTime', label: '创建时间' },
        { prop: 'updTime', label: '更新时间' }
      ]
      colModels.splice(
        1,
        0,
        this.tableType === '1'
          ? { prop: 'idcardNo', label: '身份证号' }
          : { prop: 'mobile', label: '手机号' }
      )
      return colModels
    }
  },
  watch: {
    curTableType: {
      immediate: true,
      handler(val) {
        if (val === this.tableType) {
          this.initTable()
        }
      }
    }
  },
  methods: {
    // 初始化表格查询，商户号列表查询，类型列表查询
    initTable() {
      this.handleMerchantNoList()
      this.handleTypeList()
      this.$nextTick(() => {
        this.searchParams()
        this.$refs.basicDataGrid.changeTableSize()
      })
    },
    // 商户号列表查询
    handleMerchantNoList() {
      if (this.merchantNoList.length) {
        return false
      }
      this.$api.charging.getShopList().then(res => {
        this.merchantNoList = res || []
      })
    },
    // 类型列表查询
    handleTypeList() {
      if (this.typeList.length) {
        return false
      }
      const fetchTypeList = this.$api.basicDataManager[
        this.tableType === '1' ? 'getIdCardTypeList' : 'getMobileTypeList'
      ]
      fetchTypeList().then(res => {
        this.typeList = res || []
      })
    },
    toggleSwitch(obj, e) {
      e.preventDefault()
    },
    // 下载文件
    handleDownload(row) {
      const downloadMethod = this.$api.basicDataManager[
        this.tableType === '1' ? 'downloadIdCard' : 'downloadMobile'
      ]
      downloadMethod(row.id, undefined, {
        responseType: 'blob'
      }).then(res => {
        const fileName =
          row[this.tableType === '1' ? 'idcardNo' : 'mobile'] + '_' + row.type
        if ('download' in document.createElement('a')) {
          const downloadLink = document.createElement('a')
          downloadLink.download = fileName
          downloadLink.style.display = 'none'
          downloadLink.href = URL.createObjectURL(res)
          document.body.appendChild(downloadLink)
          downloadLink.click()
          URL.revokeObjectURL(downloadLink.href)
          document.body.removeChild(downloadLink)
        } else {
          // eslint-disable-next-line
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    // 查看详情
    handleCheckDetail(content) {
      this.curContent = []
      Object.keys(content).forEach(key => {
        this.curContent.push({
          label: dataDetailLabelMap[key] || key,
          value: content[key]
        })
      })
      this.contentDialogVisible = true
    },
    // 点击查询
    handleSearch(type) {
      if (type === 2) {
        Object.keys(this.searchForm).forEach(key => {
          this.searchForm[key] = ''
        })
      }
      this.$set(this, 'queryFormValues', this.searchForm)
      this.$nextTick(this.searchParams)
    },
    searchParams() {
      this.$refs.basicDataGrid.searchHandler()
    }
  }
}
</script>
