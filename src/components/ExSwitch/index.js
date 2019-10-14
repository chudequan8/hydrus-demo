import { Switch } from 'element-ui'

export default {
  name: 'ExSwitch',

  mixins: [Switch],

  props: {
    beforeChange: {
      type: Function,
      default: () => Promise.resolve(true)
    }
  },

  methods: {
    async handleChange() {
      await this.beforeChange()

      const val = this.checked ? this.inactiveValue : this.activeValue
      this.$emit('input', val)
      this.$emit('change', val)
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked
      })
    }
  }
}
