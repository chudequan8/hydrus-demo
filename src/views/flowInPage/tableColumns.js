export function formatRate(a, b) {
  if (!a && !b) {
    return '-'
  }
  if (!a || !b) {
    return 0 + '%'
  }
  return ((a * 100) / b).toFixed(1) + '%'
}

export function calcRate(a, b) {
  if (!a || !b) {
    return 0
  }
  return ((a * 100) / b).toFixed(1)
}

const colModels = [
  {
    label: '日期',
    prop: 'summaryDate',
    width: 65,
    fixed: true,
    disabled: true,
    checked: true,
    render: row => {
      return row.summaryDate.length === 10
        ? row.summaryDate.substr(5)
        : row.summaryDate
    }
  },
  {
    label: '渠道名称',
    prop: 'channelCode',
    slotName: 'channelName',
    width: 110,
    fixed: true,
    disabled: true,
    checked: true
    // render(row) {
    //   return (
    //     row.channelCode + "\n" + (row.channelCode ? " (" + "马王" + ")" : "")
    //   );
    // }
  },
  {
    label: 'PV',
    prop: 'pvCount',
    width: 70,
    sortable: 'custom',
    checked: false
  },
  {
    label: 'UV',
    prop: 'uvCount',
    width: 70,
    sortable: 'custom',
    checked: true
  },
  {
    label: '下载数',
    prop: 'downloadCount',
    width: 80,
    sortable: 'custom',
    checked: true
  },
  {
    label: '渠道UV',
    prop: 'channelUvCount',
    width: 90,
    sortable: 'custom',
    checked: true
  },
  {
    label: '渠道下载',
    prop: 'channelDownloadCount',
    width: 90,
    sortable: 'custom',
    checked: true
  },
  {
    label: '注册数',
    prop: 'registerCount',
    width: 100,
    sortable: 'custom',
    checked: true,
    rate(row) {
      return calcRate(row.registerCount, row.uvCount)
    },
    render: row => {
      const rate = formatRate(row.registerCount, row.uvCount)
      return row.registerCount + (rate === '-' ? '' : ' (' + rate + ')')
    }
  },
  // {
  //   label: "注册率",
  //   prop: "registerRate",
  //   width: 80,
  //   sortable: "custom",
  //   render: row => {
  //     return formatRate(row.registerCount, row.uvCount);
  //   },
  //   checked: true
  // },
  {
    label: '注册数(扣)',
    prop: 'registerDeduction',
    width: 100,
    sortable: 'custom',
    checked: true,
    rate(row) {
      return calcRate(row.registerDeduction, row.uvCount)
    },
    render: row => {
      const rate = formatRate(row.registerDeduction, row.uvCount)
      return row.registerDeduction + (rate === '-' ? '' : ' (' + rate + ')')
    }
  },
  // {
  //   label: "注册率(扣)",
  //   prop: "registerDeductionRate",
  //   width: 100,
  //   sortable: "custom",
  //   render: row => {
  //     return formatRate(row.registerDeduction, row.uvCount);
  //   },
  //   checked: true
  // },
  {
    label: '登录数',
    prop: 'loginCount',
    width: 80,
    sortable: 'custom',
    checked: true
  },
  {
    label: '登录数(扣)',
    prop: 'loginDeduction',
    width: 100,
    sortable: 'custom',
    checked: true,
    rate(row) {
      return calcRate(row.loginDeduction, row.registerDeduction)
    },
    render: row => {
      const rate = formatRate(row.loginDeduction, row.registerDeduction)
      return row.loginDeduction + (rate === '-' ? '' : ' (' + rate + ')')
    }
  },
  // {
  //   label: "登录率(扣)",
  //   prop: "loginDeductionRate",
  //   width: 100,
  //   sortable: "custom",
  //   render: row => {
  //     return formatRate(row.loginDeduction, row.registerDeduction);
  //   },
  //   checked: true
  // },
  {
    label: '转换PV',
    prop: 'aimPv',
    width: 80,
    sortable: 'custom',
    checked: false
  },
  {
    label: '转换UV',
    prop: 'aimUv',
    width: 100,
    sortable: 'custom',
    checked: true,
    rate(row) {
      return calcRate(row.aimUv, row.registerDeduction)
    },
    render: row => {
      const rate = formatRate(row.aimUv, row.registerDeduction)
      return row.aimUv + (rate === '-' ? '' : ' (' + rate + ')')
    }
  },
  // {
  //   label: "转换率(扣)",
  //   prop: "aimUvDeductRate",
  //   width: 100,
  //   sortable: "custom",
  //   render: row => {
  //     return formatRate(row.aimUv, row.registerDeduction);
  //   },
  //   checked: true
  // },
  {
    label: '下载数(下游)',
    prop: 'outDownloadCount',
    width: 110,
    sortable: 'custom',
    checked: true,
    rate(row) {
      return calcRate(row.outDownloadCount, row.aimUv)
    },
    render: row => {
      const rate = formatRate(row.outDownloadCount, row.aimUv)
      return row.outDownloadCount + (rate === '-' ? '' : ' (' + rate + ')')
    }
  },
  // {
  //   label: "下载率(下游)",
  //   prop: "outDownloadRate",
  //   width: 120,
  //   sortable: "custom",
  //   render: row => {
  //     return formatRate(row.outDownloadCount, row.aimUv);
  //   },
  //   checked: true
  // },
  {
    label: 'WX/QQ',
    prop: 'wxqqCount',
    width: 70,
    checked: true,
    render: row => {
      return (row.wxCount || 0) + (row.qqCount || 0)
    }
  },
  // {
  //   label: "QQ",
  //   prop: "qqCount",
  //   width: 60,
  //   checked: true,
  //   render: row => {
  //     return row.qqCount >= 0 ? row.qqCount : "-";
  //   }
  // },
  {
    label: 'U/A成本',
    prop: 'partPrice',
    slotName: 'partPrice',
    width: 100,
    checked: true,
    render() {}
  },
  {
    label: '总成本',
    prop: 'totalCost',
    width: 75,
    checked: true,
    sortable: 'custom',
    render(row) {
      let val = (row.uvPrice || 0) + (row.registerPrice || 0)
      return parseInt(val) === val ? val : val.toFixed(1)
    }
  },
  // {
  //   label: "UV成本",
  //   prop: "uvPrice",
  //   width: 80,
  //   sortable: "custom",
  //   checked: true
  // },
  // {
  //   label: "注册成本",
  //   prop: "registerPrice",
  //   width: 90,
  //   sortable: "custom",
  //   checked: true
  // },
  {
    label: 'UV收益',
    prop: 'uvProfitPrice',
    width: 80,
    sortable: 'custom',
    checked: true
  },
  {
    label: 'ROI差值',
    prop: 'diffRoi',
    width: 80,
    checked: true,
    sortable: 'custom',
    render: row => {
      let val =
        row.uvProfitPrice - ((row.uvPrice || 0) + (row.registerPrice || 0))
      return parseInt(val) === val ? val : val.toFixed(1)
    }
  },
  {
    label: 'ROI',
    prop: 'uuROI',
    slotName: 'roi',
    width: 110,
    checked: true,
    render: () => {}
  },
  // {
  //   label: "UV/UV-ROI",
  //   prop: "uuROI",
  //   width: 100,
  //   render: row => {
  //     return formatRate(row.uvProfitPrice, row.uvPrice);
  //   },
  //   checked: true
  // },
  // {
  //   label: "UV/注册-ROI",
  //   prop: "urROI",
  //   width: 110,
  //   render: row => {
  //     return formatRate(row.uvProfitPrice, row.registerPrice);
  //   },
  //   checked: true
  // },
  {
    label: '活跃度',
    prop: 'totalActiveCount',
    width: 80,
    render: row => {
      return formatRate(row.summaryCount, row.totalActiveCount)
    },
    checked: true
  },
  {
    label: 'T0',
    prop: 'one',
    render: row => {
      const formatVal =
        formatRate(row.one, row.registerCount) === '-'
          ? '-'
          : (row.one || 0) + ` (${formatRate(row.one, row.registerCount)})`
      return formatVal
    },
    checked: true
  },
  {
    label: 'T1',
    prop: 'two',
    render: row => {
      const formatVal =
        formatRate(row.two, row.registerCount) === '-'
          ? '-'
          : (row.two || 0) + ` (${formatRate(row.two, row.registerCount)})`
      return formatVal
    },
    checked: true
  },
  {
    label: 'T2',
    prop: 'three',
    render: row => {
      const formatVal =
        formatRate(row.three, row.registerCount) === '-'
          ? '-'
          : (row.three || 0) + ` (${formatRate(row.three, row.registerCount)})`
      return formatVal
    },
    checked: true
  },
  {
    label: 'T3',
    prop: 'four',
    render: row => {
      const formatVal =
        formatRate(row.four, row.registerCount) === '-'
          ? '-'
          : (row.four || 0) + ` (${formatRate(row.four, row.registerCount)})`
      return formatVal
    },
    checked: false
  },
  {
    label: 'T4',
    prop: 'five',
    render: row => {
      const formatVal =
        formatRate(row.five, row.registerCount) === '-'
          ? '-'
          : (row.five || 0) + ` (${formatRate(row.five, row.registerCount)})`
      return formatVal
    },
    checked: false
  },
  {
    label: 'T5',
    prop: 'six',
    render: row => {
      const formatVal =
        formatRate(row.six, row.registerCount) === '-'
          ? '-'
          : (row.six || 0) + ` (${formatRate(row.six, row.registerCount)})`
      return formatVal
    },
    checked: false
  },
  {
    label: 'T6',
    prop: 'seven',
    render: row => {
      const formatVal =
        formatRate(row.seven, row.registerCount) === '-'
          ? '-'
          : (row.seven || 0) + ` (${formatRate(row.seven, row.registerCount)})`
      return formatVal
    },
    checked: false
  },
  {
    label: '操作',
    slotName: 'handle',
    prop: 'handle',
    fixed: 'right',
    align: 'center',
    width: 150,
    checked: true
  }
]

export default colModels
