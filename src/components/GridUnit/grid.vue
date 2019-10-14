<template>
  <div class="model-table-pagenation">
    <div class="model-table">
      <el-table
        ref="gridUnit"
        v-loading.lock="loading"
        :data="tableData"
        :border="border"
        :stripe="stripe"
        :max-height="tableHeight"
        :fit="fit"
        :size="size"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :row-ket="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :cell-class-name="cellClassName"
        :span-method="spanMethod"
        :header-row-style="headerRowStyle"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :footerScopedSlots="footerScopedSlots"
        style="width: 100%;"
        @select="(selection, row) => emitEventHandler('select', selection, row)"
        @select-all="selection => emitEventHandler('select-all', selection)"
        @selection-change="
          selection => emitEventHandler('selection-change', selection)
        "
        @cell-mouse-enter="
          (row, column, cell, event) =>
            emitEventHandler('cell-mouse-enter', row, column, cell, event)
        "
        @cell-mouse-leave="
          (row, column, cell, event) =>
            emitEventHandler('cell-mouse-leave', row, column, cell, event)
        "
        @cell-click="
          (row, column, cell, event) =>
            emitEventHandler('cell-click', row, column, cell, event)
        "
        @cell-dblclick="
          (row, column, cell, event) =>
            emitEventHandler('cell-dblclick', row, column, cell, event)
        "
        @row-click="
          (row, event, column) =>
            emitEventHandler('row-click', row, event, column)
        "
        @row-dblclick="
          (row, event) => emitEventHandler('row-dblclick', row, event)
        "
        @row-contextmenu="
          (row, event) => emitEventHandler('row-contextmenu', row, event)
        "
        @header-click="
          (column, event) => emitEventHandler('header-click', column, event)
        "
        @sort-change="args => emitEventHandler('sort-change', args)"
        @filter-change="filters => emitEventHandler('filter-change', filters)"
        @current-change="
          (currentRow, oldCurrentRow) =>
            emitEventHandler('current-change', currentRow, oldCurrentRow)
        "
        @header-dragend="
          (newWidth, oldWidth, column, event) =>
            emitEventHandler(
              'header-dragend',
              newWidth,
              oldWidth,
              column,
              event
            )
        "
        @expand-change="
          (row, expanded) => emitEventHandler('expand-change', row, expanded)
        "
      >
        <el-table-column
          v-if="showRowIndex"
          type="index"
          width="40"
          align="center"
        />
        <el-table-column v-if="showExpand" type="expand" width="40">
          <template slot-scope="scope">
            <slot name="expandTable" :row="scope.row" />
            <slot name="expandForm" :row="scope.row" />
          </template>
        </el-table-column>
        <template v-for="(column, columnIndex) in columns">
          <slot v-if="column.slot && showSelection" :name="column.slot" />
          <el-table-column
            :key="columnIndex"
            v-if="!column.slot"
            :column-key="column.columnKey"
            :prop="column.prop"
            :label="column.label"
            :width="column.minWidth ? '-' : column.width || `auto`"
            :min-width="column.minWidth || column.width || 100"
            :fixed="column.fixed"
            :render-header="column.renderHeader"
            :sortable="column.sortable"
            :sort-method="column.method"
            :resizable="column.resizable"
            :formatter="column.formatter"
            :show-overflow-tooltip="column.showOverflowTooltip || true"
            :align="column.align || `left`"
            :header-align="column.headerAlign || column.align"
            :class-name="column.className"
            :label-class-name="column.labelClassName"
            :selectable="column.selectable"
            :reserve-selection="column.reserveSelection"
            :filters="column.filters"
            :filter-placement="column.filterPlacement"
            :filter-multiple="column.filterMultiple"
            :filter-method="column.filterMethod"
            :filtered-value="column.filteredValue"
          >
            <template slot-scope="scope">
              <!-- 全局过滤器 -->
              <span v-if="column.filter">
                <i
                  v-if="
                    column.filter === 'parseTime' &&
                      scope.row[column.prop] &&
                      scope.row[column.prop] != ''
                  "
                  class="el-icon-time"
                />
                {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
              </span>
              <!-- 图片 -->
              <div v-else-if="column.type === 'img'" style="display: flex;">
                <img
                  v-lazy="scope.row[column.prop]"
                  width="40"
                  height="40"
                  class="image preview-img image-center"
                  @click="previewImage(scope.row[column.prop])"
                />
              </div>
              <!-- 链接 -->
              <a
                v-else-if="column.type === 'link'"
                :href="scope.row[column.prop]"
                target="_blank"
                style="color:#409eff"
              >
                {{ scope.row[column.prop] }}
              </a>
              <!-- tags渲染
                * renderStatusType： 渲染tag type
                * renderStatusValue： 渲染tag 内容
              -->
              <el-tag
                v-else-if="column.type === 'status' && column.unitFilters"
                :type="
                  column.unitFilters.renderStatusType(scope.row[column.prop])
                "
              >
                {{
                  column.unitFilters.renderStatusValue(scope.row[column.prop])
                }}
              </el-tag>
              <!-- slot插槽 基本上是适配操作列的 -->
              <span v-else-if="column.slotName">
                <slot
                  :name="column.slotName"
                  :row="scope.row"
                  :$index="scope.$index"
                />
              </span>
              <span v-else-if="column.isHandle">
                <el-button :icon="column.icon" type="primary" size="small">{{
                  column.text
                }}</el-button>
              </span>
              <span v-else>
                {{
                  column.render
                    ? column.render(scope.row)
                    : scope.row[column.prop]
                }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div v-if="showPagination" ref="gridPagination" class="model-pagenation">
      <el-pagination
        :background="pagenationBg"
        :current-page="pagination.pageNo"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        :layout="paginationLayout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import props from './props'
import { ObjectMap, deepClone } from '@/utils'
import debounce from 'throttle-debounce/debounce'

let tableToTopH = 0
let paginationH = 0
let tabsPaddingH = 15
const cardPaddingH = 20
const contentPaddingH = 15

export default {
  name: 'tablePagination',
  props,
  data() {
    return {
      Vue,
      pagination: {
        pageNo: 1,
        pageSize: this.pageSizes ? this.pageSizes[0] : 20
      },
      total: 0,
      loading: false,
      tableData: [], // 表格数据
      searchParams: {},
      multipleSelection: [], // 当前页已选择数据
      multipleSelectionAll: [], // 所有页已选择数据
      tableHeight: 600
    }
  },
  computed: {},
  watch: {
    formOptions: {
      immediate: true,
      handler(val) {
        this.searchParams = Object.assign(val, this.params)
      },
      deep: true
    },
    params: {
      handler(val) {
        this.searchParams = Object.assign(val, this.params)
      },
      deep: true
    }
  },
  mounted() {
    this.$refs.gridUnit.$on('expand-change', (row, expanded) =>
      this.emitEventHandler('expand-change', row, expanded)
    )
    const { type, autoLoad, formOptions, params, data } = this
    if (type === 'remote' && autoLoad) {
      this.searchParams = formOptions
        ? Object.assign(formOptions, params)
        : params
      this.fetchHandler()
    } else if (type === 'local' && Array.isArray(data)) {
      this.tableData = data
      this.total = data.length
    }

    // 设置table高度
    this.$nextTick(() => {
      tabsPaddingH = document.querySelectorAll('.el-tabs')[0] ? 15 : 0
      this.changeTableSize()
      window.addEventListener('resize', this.changeTableSize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.changeTableSize)
  },
  methods: {
    /* 查看图片 */
    previewImage(imageUrl) {
      if (!imageUrl) {
        return false
      }
      const previewObj = { src: imageUrl }
      const _img = new Image()
      _img.src = imageUrl
      _img.onload = function() {
        previewObj.w = _img.width || 800
        previewObj.h = _img.height || 600
        Vue.$preview.open(0, [previewObj])
      }
    },
    /* changeSize */
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.fetchHandler('selection')
    },
    /* change pageNo */
    handleCurrentChange(pageNo) {
      this.pagination.pageNo = pageNo
      this.changePageHoldSelection()
      this.fetchHandler('selection')
    },
    // 数据查询
    searchHandler(options) {
      this.pagination.pageNo = 1
      if (options && options.type === 'clear') {
        this.searchParams = options.data
      }
      this.fetchHandler()
    },
    // 请求数据
    fetchHandler(fetchType, isUpdate) {
      let params
      const {
        reqMethod,
        listField,
        pageNoKey,
        pageSizeKey,
        totalField,
        showPagination,
        pagination
      } = this
      if (typeof reqMethod !== 'function') {
        this.$message.error('请传入请求方法')
        return false
      }
      this.loading = !isUpdate
      params = ObjectMap(deepClone(this.searchParams))
      if (showPagination) {
        params = Object.assign(params, {
          [pageNoKey]:
            pageNoKey === 'offset'
              ? (pagination.pageNo - 1) * pagination.pageSize
              : pagination.pageNo,
          [pageSizeKey]: pagination.pageSize
        })
      }
      reqMethod(params)
        .then(res => {
          let response = res
          let result = response
          if (response && !(response instanceof Array)) {
            if (listField && listField.indexOf('.') !== -1) {
              listField.split('.').forEach(vv => {
                result = result[vv]
              })
            } else {
              result = response[listField] || []
            }
          }
          if (!result || !(result instanceof Array)) {
            this.loading = false
            return false
          }
          if (this.dataHandler) {
            this.tableData = this.dataHandler(result)
          } else {
            this.tableData = result
          }
          let totalValue = response
          if (Object.prototype.toString.call(response) === '[object Array]') {
            totalValue = response.length
          } else if (typeof response === 'object') {
            if (totalField && totalField.indexOf('.') !== -1) {
              totalField.split('.').forEach(vv => {
                totalValue = totalValue[vv]
              })
            } else {
              totalValue = response[totalField] || 0
            }
          } else {
            totalValue = 0
          }
          this.total = totalValue
          this.loading = false
          if (fetchType === 'selection') {
            setTimeout(() => {
              this.setSelectRow()
            }, 0)
          } else {
            this.multipleSelection = []
            this.multipleSelectionAll = []
          }
        })
        .catch(error => {
          this.$message.error(error.msg || '请求失败')
          this.loading = false
        })
    },
    // 父子组件通信
    emitEventHandler(event) {
      if (event === 'selection-change') {
        this.multipleSelection = [...Array.from(arguments).slice(1)][0]
        setTimeout(() => {
          this.changePageHoldSelection()
          this.$emit(event, ...Array.from(arguments).slice(1))
        }, 0)
      } else {
        this.$emit(event, ...Array.from(arguments).slice(1))
      }
    },
    // 切换表格selection
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      const selectionKey = this.selectionKey
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[selectionKey])
      })
      this.$refs.gridUnit.clearSelection()
      for (let i = 0; i < this.tableData.length; i++) {
        if (selectAllIds.includes(this.tableData[i][selectionKey])) {
          this.$refs.gridUnit.toggleRowSelection(this.tableData[i], true)
        }
      }
    },
    // 跨页选择保留选项
    changePageHoldSelection() {
      const selectionKey = this.selectionKey
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[selectionKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[selectionKey])
        if (!selectAllIds.includes(row[selectionKey])) {
          this.multipleSelectionAll.push(row)
        }
      })
      // 当前页没有选中的id
      const noSelectIds = []
      this.tableData.forEach(row => {
        if (!selectIds.includes(row[selectionKey])) {
          noSelectIds.push(row[selectionKey])
        }
      })
      // 如果所有已选择列表中有未被选中的，删除
      noSelectIds.forEach(id => {
        if (selectAllIds.includes(id)) {
          for (let i = 0; i < this.multipleSelectionAll.length; i++) {
            if (this.multipleSelectionAll[i][selectionKey] === id) {
              this.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    // 改变table高度
    changeTableSize: debounce(100, function() {
      tableToTopH = this.$refs.gridUnit.$el.getBoundingClientRect().top
      paginationH = this.$refs.gridPagination.offsetHeight
      const tempTableHeight =
        document.body.clientHeight -
        tableToTopH -
        paginationH -
        tabsPaddingH -
        cardPaddingH -
        contentPaddingH
      this.tableHeight = Math.max(tempTableHeight, 250)
    })
  }
}
</script>

<style lang="scss" scoped>
.model-table {
  .expandHeader {
    background-color: #f5f7fa !important;
  }
  .el-table__expanded-cell .el-table {
    border-bottom: 0;
  }
}

.model-pagenation {
  padding-top: 20px;
  text-align: center;
}

.table-expand {
  font-size: 0;
  .el-form-item__content {
    font-size: 12px;
  }
  .el-form-item__label {
    font-size: 12px;
  }
}

.table-expand label {
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
</style>
