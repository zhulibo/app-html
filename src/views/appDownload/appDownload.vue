<template>
  <div class="download-app">
    <div class="ct">
      <div><img class="i1" src="../../assets/img/downloadApp3.png"></div>
      <div><img class="i2" src="../../assets/img/downloadApp2.png"></div>
      <div><img class="i3" src="../../assets/img/downloadApp1.png"></div>
      <div class="btn">
        <a @click="downloadApp"><img class="i4" src="../../assets/img/downloadApp5.png"></a>
        <a @click="downloadApp"><img class="i5" src="../../assets/img/downloadApp4.png"></a>
      </div>
      <div class="text">现实有形<span></span>漫想无限</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appDownload',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    downloadApp() {
      this.global.downloadApp()
    }
  }
}
</script>

<style lang="stylus" scoped>
.download-app {
  flexCenter()
  box-sizing border-box
  padding: 1em 0
  width: 100vw
  min-height: 100vh
  text-align: center
  color: #fff
  background: purple
  .i1 {
    width: 5em
  }
  .i2 {
    margin-top: 1em
    width: 11em
  }
  .i3 {
    margin-top: 1em
    width: 2em
  }
  .i4 {
    margin-top: 1em
    width: 12em
  }
  .i5 {
    width: 12em
  }
  a {
    display: block
  }
  .text {
    margin-top: 1em
    letter-spacing 1em
    span {
      display: inline-block
      width: 2em
    }
  }
}
</style>
