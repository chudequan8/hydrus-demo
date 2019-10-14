<template>
  <div class="h5-page">
    <el-card
      class="h5-contaienr"
      :body-style="{ width: '415px', height: '707px' }"
    >
      <iframe
        src="https://chudequan8.github.io/costway-mobile-test"
        id="show"
        width="100%"
        height="100%"
        frameborder="0"
        name="showHere"
      ></iframe>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang="scss" scoped>
.h5-page {
  padding-top: 20px;
  text-align: center;
}
.h5-contaienr {
  display: inline-block;
}
</style>
