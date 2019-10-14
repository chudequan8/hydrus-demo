/* eslint-disable */
export default {
  props: {
    speed: {
      type: Number,
      required: false,
      default: 50
    },
    times: {
      type: Number,
      required: false,
      default: 10
    },
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: false,
      default: 0
    },
    format: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return {
      showNumber: 0
    }
  },
  render(h) {
    return h('span', this.format ? this.format(this.showNumber) : this.showNumber)
  },
  // template: '<span><template v-if="format">{{ format(showNumber) }}</template><template v-else>{{ showNumber }}</template></span>',
  created() {
    this.showNumber = this.start
  },
  mounted() {
    this.JNumberScroll({
      speed: this.speed,
      times: this.times,
      start: this.start,
      end: this.end
    })
  },
  watch: {
    end(newValue, oldValue) {
      this.JNumberScroll({
        speed: this.speed,
        times: this.times,
        start: oldValue,
        end: newValue
      })
    }
  },
  methods: {
    JNumberScroll(params) {

      let splitArr = []
      let gap = Math.abs(params.end - params.start)
      let add = params.end - params.start > 0
      let splitNum = gap / params.times
      let endStr = String(params.end)
      let isFloat = endStr.indexOf('.') !== -1

      !isFloat && (splitNum < 1) && (splitNum = 1) && (params.times = gap)

      for (let i = 0; i < params.times; i++) {
        let tempNum = add ? (params.start + splitNum * i) : (params.start - splitNum * i)

        let decimalNum = 0
        isFloat && (decimalNum = endStr.length - endStr.indexOf('.') - 1)
        splitArr.push(isFloat ? (parseInt(tempNum * 10 ** decimalNum) / (10 ** decimalNum)) : parseInt(tempNum))
      }
      ((add && (splitArr[splitArr.length - 1] < params.end)) || (!add && (splitArr[splitArr.length - 1] > params.end))) && splitArr.push(params.end)

      let _index = 0
      let _this = this
      let intervalId = setInterval(function () {

        if (_index < splitArr.length)
          _this.showNumber = (splitArr[_index++])
        else {
          clearInterval(intervalId)
        }
      }, params.speed)
    }
  }
}