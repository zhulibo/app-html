<template>
  <div id="app">
    <loading v-if="isLoading"></loading>
    <keep-alive include="articleIndex">
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import loading from "@/components/loading/loading";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    loading
  },
  created() {
  },
  mounted() {
    window.onload = () => {
      document.title = this.$route.meta.title
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading
    },
  },
}
</script>

<style lang="stylus">
@import '//at.alicdn.com/t/font_1970543_nulnc3dx4i.css'
@import './assets/css/base.css'
@import './assets/css/common.css'
</style>