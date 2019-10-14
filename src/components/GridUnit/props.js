const props = {
  // Element UI table配置
  maxHeight: [String, Number],
  stripe: {
    type: Boolean,
    default: true
  },
  border: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'medium'
  },
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: {
    type: Boolean,
    default: true
  },
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [String, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  cellClassName: [String, Function],
  headerRowStyle: [Function],
  headerCellStyle: [Function],
  cellStyle: [Function],
  footerScopedSlots: [Object],
  // 自定义配置

  // axios url
  // url: {
  //   type: String
  // },

  // axios method  一般post
  // method: {
  //   type: String,
  //   default: 'post',
  //   validator: value => {
  //     const methodTypes = ['get', 'post', 'put', 'delete']
  //     return methodTypes.indexOf(value.toLowerCase()) !== -1
  //   }
  // },

  // axios dataMethod
  // dataMethod: {
  //   type: String
  // },

  // 请求方法
  reqMethod: Function,

  // selection表格数据的唯一key
  selectionKey: {
    type: String,
    default: 'id'
  },

  // axios headers  一般不需要
  headers: {
    type: Object,
    default: () => ({})
  },
  // showRowIndex
  showRowIndex: {
    type: Boolean,
    default: false
  },
  // showSelection
  showSelection: {
    type: Boolean,
    default: false
  },
  // showExpand
  showExpand: {
    type: Boolean,
    default: false
  },
  // 获取列表数据  需要与后台约定数据格式
  listField: {
    type: String,
    default: 'rows'
  },
  // 列表数据总数
  totalField: {
    type: String,
    default: 'total'
  },
  /* 传参  基本上使用formOptions就好啦 */
  params: {
    type: Object,
    default: () => ({})
  },
  formOptions: {
    type: Object,
    default: () => ({})
  },
  /* 自动加载数据 */
  autoLoad: {
    type: Boolean,
    default: true
  },

  spanMethod: {
    type: Function
  },

  indexMethod: {
    type: Function
  },

  /* 接口数据排列，后续可以增加本地数据操作 */
  type: {
    type: String,
    default: 'remote',
    validator(value) {
      const types = ['remote', 'local']
      const validType = types.indexOf(value) !== -1
      if (!validType) {
        // this.$message.error(`不支持'${value}'.`)
        return false
      }
      return validType
    }
  },
  data: {
    type: Array
  },
  dataHandler: {
    type: Function
  },
  columns: {
    type: Array,
    required: true,
    /*
      Element UI table-column配置
      供参考，需要一下配置时在cloum中添加对应参数配置
    */

    columnKey: String,
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: {
      type: Number,
      default: 100
    },
    fixed: [Boolean, String],
    renderHeader: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    resizable: Boolean,
    formatter: Function,
    showOverflowTooltip: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    },
    headerAlign: String,
    className: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    selectable: Function,
    reserveSelection: Boolean,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    filterMethod: Function,
    filteredValue: Array,
    // table-column attribute
    filter: {
      type: String
    },
    render: {
      type: Function
    },
    slotName: {
      type: String
    }
  },

  // expand展开行列表数据
  expandColums: {
    type: Array,
    default: () => []
  },

  // pageNation配置
  showPagination: {
    type: Boolean,
    default: true
  },
  pagenationBg: {
    type: Boolean,
    default: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  pageNoKey: {
    type: String,
    default: 'page'
  },
  pageSizeKey: {
    type: String,
    default: 'size'
  }
}

export default props
