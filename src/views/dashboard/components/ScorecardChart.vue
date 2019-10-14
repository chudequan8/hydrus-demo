<template>
  <el-card style="height: 100%">
    <div slot="header" class="chart-header">
      <strong class="chart-title">● {{ chartTitle }}</strong>
      <div class="aside-count">
        <span>平均： {{ averageAge }}岁</span>
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
      :force-fit="forceFit"
      :height="height"
      :data="data"
      :padding="[10, 30, 50, 30]"
    >
      <v-tooltip :htmlContent="htmlContent" />
      <v-legend data-key="scoreType" />
      <v-facet
        type="rect"
        :fields="facetFields"
        :padding="facetPadding"
        :col-title="facetColTitle"
        :views="facetViews"
      ></v-facet>
    </v-chart>
  </el-card>
</template>

<script>
import chartMixins from '../chartMixins'
const DataSet = require('@antv/data-set')
const { DataView } = DataSet

const scoreMap = {
  totalInterval1: {
    score: '0-10岁',
    color: 'rgba(255, 119, 112, 1)'
  },
  totalInterval2: {
    score: '11-20岁',
    color: 'rgba(255, 216, 106, 1)'
  },
  totalInterval3: {
    score: '21-30岁',
    color: 'rgba(43, 216, 194, 1)'
  },
  totalInterval4: {
    score: '31-50岁',
    color: 'rgba(45, 114, 255, 1)'
  },
  totalInterval5: {
    score: '50岁以上',
    color: 'rgba(128, 111, 235, 1)'
  }
}

const views = (view, facet) => {
  const data = facet.data
  const dv = new DataView()
  dv.source(data).transform({
    type: 'percent',
    field: 'value',
    dimension: 'scoreType',
    as: 'percent'
  })

  return {
    data: dv,
    scale: {
      dataKey: 'percent',
      formatter: '.2%'
    },
    coord: {
      type: 'theta',
      innerRadius: 0.6
    },
    series: {
      quickType: 'stackBar',
      position: 'percent',
      color: [
        'scoreType',
        a => {
          let color = ''
          Object.keys(scoreMap).forEach(key => {
            if (scoreMap[key].score === a) {
              color = scoreMap[key].color
            }
          })
          return color
        }
      ],
      label: ['percent', {}],
      style: {
        lineWidth: 1,
        stroke: '#fff'
      }
    }
  }
}

export default {
  name: 'scorecard-chart',
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
      averageAge: 0,
      forceFit: true,
      data: [],
      facetViews: views,
      facetFields: ['versionType'],
      facetPadding: 60,
      facetColTitle: {
        offsetY: -50,
        style: {
          fontSize: 16,
          textAlign: 'center',
          fill: '#333'
        }
      },
      htmlContent: (title, b) => {
        const block = b[0]
        let itemHtml = ''
        itemHtml += `<li data-index=${block.point.point.i} style="margin-bottom: 4px;">
                    <span style="
                      background-color:${block.color};
                      width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;">
                    </span>
                    ${block.name}: ${block.point.point.value} (${block.value})
                  </li>`

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
      this.data = []
      if (chartData.outList && chartData.outList.length) {
        chartData.outList.forEach(item => {
          Object.keys(item).forEach((key, index) => {
            if (key === 'scorecardVersion') {
              return false
            }
            this.data.push({
              versionType: item['scorecardVersion'],
              scoreType: scoreMap[key].score,
              value: item[key],
              i: index
            })
          })
        })
      }
      this.averageAge = chartData.averageAge || 0
    }
  }
}
</script>
