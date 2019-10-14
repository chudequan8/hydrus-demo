<template>
  <el-card style="height: 100%">
    <div slot="header" class="chart-header">
      <strong class="chart-title">● {{ chartTitle }}</strong>
      <div class="aside-count">
        <span>今日新增： {{ todaySaveCount }}人</span>
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
  name: 'increased-user-chart',
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
      todaySaveCount: 0,
      data: [],
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
                      ${item.type === '今日' ? '当日' : '七日'}新增数: ${
            item.value
          }
                    </li>`
        })
        return `<div class="g2-tooltip">
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
      if (JSON.stringify(chartData) !== '{}') {
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
              sevenDayAverageSaveCountByHour: 0
            })
          }
          if (!todayActiveTime.includes(time)) {
            chartData.todayOutList.push({
              countTime: index,
              todaySaveCount: 0
            })
          }
        })
        this.data = []
        chartData.todayOutList.forEach(item => {
          this.data.push({
            type: '今日',
            time: item.countTime,
            value: item.todaySaveCount
          })
        })
        chartData.sevenDayOutList.forEach(item => {
          this.data.push({
            type: '七日平均',
            time: item.countTime,
            value: item.sevenDayAverageSaveCountByHour
          })
        })
        this.todaySaveCount = chartData.totalTodaySaveCount || 0
      } else {
        this.todaySaveCount = 0
      }
    }
  }
}
</script>
