<template>
  <el-card style="height: 100%">
    <div slot="header" class="chart-header">
      <strong class="chart-title">● {{ chartTitle }}</strong>
      <div class="aside-count">
        <span>今日调用： {{ todayCallCount }}次</span>
        <span>今日异常： {{ todayErrorCount }}次</span>
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
      <v-axis dataKey="time" :label="label" />
      <v-legend />
      <v-line position="time*value" :size="2" :color="color" />
      <v-area position="time*value" :color="color" />
      <v-guide
        type="line"
        :top="true"
        :start="start"
        :end="end"
        :lineStyle="lineStyle"
        :text="text"
      >
      </v-guide>
    </v-chart>
  </el-card>
</template>

<script>
import chartMixins from '../chartMixins'
const scale = [
  {
    dataKey: 'time',
    type: 'linear',
    tickInterval: 2,
    min: 0,
    max: 24
  }
]
const color = [
  'type',
  ['rgba(201, 224, 255, 0.71)', 'rgba(174, 255, 221, 0.63)']
]
const allTime = [...Array(24).keys()]
export default {
  name: 'product-call-chart',
  mixins: [chartMixins],
  props: {
    chartData: {
      type: Object
    },
    chartTitle: {
      type: String
    }
  },
  data() {
    return {
      data: [],
      todayCallCount: 0,
      todayErrorCount: 0,
      scale,
      color,
      label: {
        formatter(val) {
          return val + 'h'
        }
      },
      htmlContent: title => {
        const curTime = this.data.filter(item => item.time === Number(title))
        let itemHtml = ''
        curTime.forEach((item, index) => {
          itemHtml += `<li data-index=${index} style="margin-bottom: 4px;">
                      <span style="background-color:${
                        color[1][index]
                      };width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span>
                      ${item.type === '今日' ? '当日' : '七日'}成功数: ${
            item.value
          } (${item.rate})
                    </li>`
        })
        return `<div class="g2-tooltip">
                  <ul class="g2-tooltip-list">
                    ${itemHtml}
                  </ul>
                </div>`
      },
      lineStyle: {
        stroke: '#595959',
        lineWidth: 1,
        lineDash: [3, 3]
      },
      start: ['0', 9],
      end: ['24', 9],
      text: {
        position: 'start',
        style: {
          fill: '#8c8c8c',
          fontSize: 12,
          fontWeight: 300
        },
        content: '均值线 5,396万',
        offsetY: -5
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
      if (JSON.stringify(chartData) !== '{}') {
        this.start[1] = chartData.sevenDayAverageSuccessCount
        this.end[1] = chartData.sevenDayAverageSuccessCount
        this.text.content = '七日平均值' + chartData.sevenDayAverageSuccessCount
        const sevenDayActiveTime = chartData.sevenDayOutList.map(
          item => item.countTime
        )
        const todayActiveTime = chartData.todayOutList.map(
          item => item.countTime
        )
        allTime.forEach((time, index) => {
          if (!sevenDayActiveTime.includes(time)) {
            chartData.sevenDayOutList.push({
              countTime: index,
              sevenDayAverageSuccessCountByHour: 0,
              sevenDayAverageSuccessRateByHour: '0%'
            })
          }
          if (!todayActiveTime.includes(time)) {
            chartData.todayOutList.push({
              countTime: index,
              todaySuccessCount: 0,
              todaySuccessRate: '0%'
            })
          }
        })
        this.data = []
        chartData.todayOutList.forEach(item => {
          this.data.push({
            type: '今日',
            time: item.countTime,
            value: item.todaySuccessCount,
            rate: item.todaySuccessRate
          })
        })
        chartData.sevenDayOutList.forEach(item => {
          this.data.push({
            type: '七日平均',
            time: item.countTime,
            value: item.sevenDayAverageSuccessCountByHour,
            rate: item.sevenDayAverageSuccessRateByHour
          })
        })
        this.todayCallCount = chartData.totalTodayCallCount || 0
        this.todayErrorCount = chartData.totalTodayErrorCount || 0
      } else {
        this.todayCallCount = 0
        this.todayErrorCount = 0
      }
    }
  }
}
</script>
