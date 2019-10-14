<template>
  <iframe
    :src="iframeUrl"
    id="show"
    width="100%"
    height="100%"
    frameborder="0"
    name="showHere"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      iframeUrl: `${process.env.VUE_APP_SERVICE_URL}:9411`
    }
  }
}
</script>
