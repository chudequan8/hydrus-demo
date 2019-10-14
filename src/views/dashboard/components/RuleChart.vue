<template>
  <el-card style="height: 100%">
    <div slot="header" class="chart-header">
      <strong class="chart-title">● {{ chartTitle }}</strong>
      <div class="aside-count">
        <span>总点赞数： {{ totalSuccess }}次</span>
        <span>总评论数： {{ totalReject }}次</span>
      </div>
    </div>
    <div
      v-if="JSON.stringify(chartData) === '{}'"
      :style="{
        height: height + 'px',
        textAlign: 'center',
        lineHeight: height + 'px'
      }"
    >
      暂无数据
    </div>
    <v-chart
      v-else
      :forceFit="true"
      :height="height"
      :data="data"
      :scale="scale"
    >
      <v-tooltip :htmlContent="htmlContent" />
      <v-axis dataKey="ruleName" :tickLine="tickLine" :label="{ rotate: 15 }" />
      <v-interval
        :label="label"
        position="ruleName*value"
        :opacity="1"
        :color="color"
      />
    </v-chart>
  </el-card>
</template>

<script>
import chartMixins from '../chartMixins'
const colorList = [
  'rgba(255, 116, 108, .3)',
  'rgba(255, 116, 108, 1)',
  'rgba(255, 172, 104, .3)',
  'rgba(255, 172, 104, 1)',
  'rgba(255, 216, 106, .3)',
  'rgba(255, 216, 106, 1)',
  'rgba(186, 223, 85, .3)',
  'rgba(186, 223, 85, 1)',
  'rgba(43, 216, 194, .3)',
  'rgba(43, 216, 194, 1)',
  'rgba(128, 111, 235, .3)',
  'rgba(128, 111, 235, 1)',
  'rgba(87, 182, 255, .3)',
  'rgba(87, 182, 255, 1)',
  'rgba(45, 114, 255, .3)',
  'rgba(45, 114, 255, 1)'
]
export default {
  name: 'rule-chart',
  mixins: [chartMixins],
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    },
    chartTitle: {
      type: String
    }
  },
  data() {
    return {
      totalSuccess: 0,
      totalReject: 0,
      data: [],
      tickLine: {
        alignWithLabel: false,
        length: 0
      },
      color: [
        'color',
        val => {
          return val
        }
      ],
      scale: [
        {
          dataKey: 'value',
          min: 0,
          formatter: function(text) {
            return text + '%'
          }
        }
      ],
      label: [
        'value*type',
        (a, b) => {
          if (b === '点赞数') {
            return {
              position: 'top',
              content: this.data.filter(item => item.value === a)[0]
                ? this.data.filter(item => item.value === a)[0].count
                : 0
            }
          } else {
            return null
          }
        },
        {
          offset: 10
        }
      ],
      htmlContent: title => {
        const curBar = this.data.filter(item => item.ruleName === title)
        let itemHtml = ''
        curBar.forEach((item, index) => {
          itemHtml += `<li data-index=${index} style="margin-bottom: 4px;">
                      <span
                        style="
                          background-color:${item.color};
                          width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;
                        "
                      >
                      </span>
                      ${item.type}: ${item.count} (${item.value}%)
                    </li>`
        })

        return `<div class="g2-tooltip">
                  <div class="g2-tooltip-title" style="margin-bottom: 4px; font-size: 14px">${title}</div>
                  <ul class="g2-tooltip-list">
                    ${itemHtml}
                  </ul>
                </div>`
      }
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        this.initChart(val)
      }
    }
  },
  methods: {
    initChart(chartData) {
      let index = 0
      this.data = []
      if (chartData.outList && chartData.outList.length) {
        chartData.outList.forEach(item => {
          this.data.push({
            type: '点赞数',
            ruleName: item.ruleName,
            value: Number(item.rejectRate.replace('%', '')),
            count: item.rejectTotalCount,
            color: colorList[index++]
          })
          this.data.push({
            type: '评论数',
            ruleName: item.ruleName,
            value: Number(item.uniqueHitRate.replace('%', '')),
            count: item.uniqueHitTotalCount,
            color: colorList[index++]
          })
        })
      }
      this.totalSuccess = chartData.ruleCheckTotalSuccessCount || 0
      this.totalReject = chartData.ruleCheckTotalRejectCount || 0
    }
  }
}
</script>
