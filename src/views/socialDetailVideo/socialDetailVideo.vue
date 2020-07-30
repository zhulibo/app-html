<template>
  <div>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <video controls autoplay :src="socialDetailVideo.videoUrl" :poster="socialDetailVideo.videoImage"></video>
    <h1>{{socialDetailVideo.content}}</h1>
  </div>
</template>

<script>
  import openAppBtn from "../../components/openAppBtn/openAppBtn";

  export default {
    name: 'socialDetailVideo',
    data() {
      return {
        shareId: '',
        socialDetailVideo: {},
      }
    },
    components: {
      openAppBtn,
    },
    created() {
      this.shareId = this.$route.query.shareId
      this.getSocialDetailVideo()
    },
    mounted() {
    },
    methods: {
      getSocialDetailVideo() {
        let formData = new FormData();
        formData.append('id', this.shareId);
        this.$http({
          url: '/cartoonThinker/system/article/look/json',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          data: formData,
        })
          .then(res => {
            this.socialDetailVideo = res.data
          })
      },
    }
  }
</script>

<style lang="stylus" scoped>
  video{
    width: 100%
    min-height 100vh
    background-color: #000
    vertical-align: bottom;
  }
  h1{
    position: absolute
    bottom: 150px
    left: 10px
    padding: .5em
    color: #fff
    background-color: rgba(255,255,255,.2)
    border-radius: .4em;
  }
</style>
