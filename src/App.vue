<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {},
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
@import '//at.alicdn.com/t/font_1970543_wbg20ubyuj8.css'
@import './assets/css/base.css'
@import './assets/css/common.css'
</style>