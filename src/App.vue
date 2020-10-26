<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    window.onload = () => {
      document.title = this.$route.meta.title
    }
  }
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1970543_4syl6lpr3j3.css'
@import './assets/css/base.css'
@import './assets/css/common.css'
</style>