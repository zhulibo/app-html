<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    }
  },
  beforeCreate() {
    // url中没有token，取出缓存中的token（防止页面刷新vuex中token丢失）
    let userInfo ={
      token: this.$route.query.token
    }
    if(!userInfo.token) {
      let userInfoLocal = JSON.parse(localStorage.getItem('userInfo'))
      if(userInfoLocal) {
        this.$store.dispatch('updateUserInfo', userInfoLocal)
      }
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
@import '//at.alicdn.com/t/font_1970543_7fnwwdg4kih.css'
@import './assets/css/base.css'
@import './assets/css/common.css'
</style>