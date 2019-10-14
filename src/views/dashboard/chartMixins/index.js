export default {
  data() {
    return {
      height: 400
    }
  },
  methods: {
    changeChartsHeight() {
      this.height =
        document.querySelectorAll('.el-card')[0].offsetHeight - 56 - 40
    }
  },
  mounted() {
    window.addEventListener('resize', this.changeChartsHeight)
    this.changeChartsHeight()
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.changeChartsHeight)
    })
  }
}
