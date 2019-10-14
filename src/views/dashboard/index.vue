<template>
  <div class="app-container dashboard-container">
    <div
      class="dashboard-block animated zoomIn"
      v-for="chart in charts"
      :key="chart.name"
    >
      <component
        v-loading="isLoading"
        v-if="chart.data"
        :is="chart.name"
        :chartData="chart.data"
        :chartTitle="chart.title"
      ></component>
    </div>
  </div>
</template>

<script>
import RuleChart from './components/RuleChart'
import ScorecardChart from './components/ScorecardChart'
import ProductCallChart from './components/ProductCallChart'
import IncreasedUserChart from './components/IncreasedUserChart'

export default {
  name: 'dashboard',
  components: {
    RuleChart,
    ScorecardChart,
    ProductCallChart,
    IncreasedUserChart
  },
  data() {
    return {
      searchOptions: {
        merchantNo: '',
        productCode: '',
        timeRange: []
      },
      charts: [
        {
          title: '豆瓣图书TOP10',
          name: 'rule-chart',
          methods: 'getRuleChart'
        },
        {
          title: '百度/谷歌用户比',
          name: 'scorecard-chart',
          methods: 'getScorecardChart'
        },
        {
          title: '各时段/商户/产品调用量成功数值',
          name: 'product-call-chart',
          methods: 'getProductCallChart'
        },
        {
          title: '各时段/商户新增用户数量',
          name: 'increased-user-chart',
          methods: 'getIncreasedUserChart'
        }
      ],
      isLoading: true
    }
  },
  methods: {
    getChartData() {
      this.isLoading = true
      function generateParams(type) {
        const merchantNo = this.searchOptions.merchantNo
        const productCode = this.searchOptions.productCode
        const startTime = this.searchOptions.timeRange
          ? this.searchOptions.timeRange[0]
          : ''
        const endTime = this.searchOptions.timeRange
          ? this.searchOptions.timeRange[1]
          : ''
        switch (type) {
          case 'rule-chart':
          case 'scorecard-chart':
            return {
              merchantNo,
              productCode,
              startTime,
              endTime
            }
          case 'product-call-chart':
            return {
              merchantNo,
              productCode
            }
          case 'increased-user-chart':
            return {
              merchantNo
            }
        }
      }
      function getMethods() {
        return this.charts.map(item => {
          return this.$api.chart[item.methods](
            generateParams.call(this, item.name)
          )
        })
      }
      Promise.all(getMethods.call(this))
        .then(res => {
          res.forEach((data, index) => {
            this.$set(this.charts[index], 'data', data)
          })
          this.isLoading = false
        })
        .catch(err => {
          this.$message.error(err.message || '请求失败')
        })
    }
  },
  created() {
    this.getChartData()
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 10px;
}
.dashboard-block {
  display: inline-block;
  width: 50%;
  height: 50%;
  padding: 10px;
}
</style>
