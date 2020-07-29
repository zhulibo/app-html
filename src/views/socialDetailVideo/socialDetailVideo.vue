<template>
  <div>
    <open-app :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app>
    <video controls autoplay :src="socialDetailVideo.videoUrl" :poster="socialDetailVideo.videoImage"></video>
  </div>
</template>

<script>
  import openApp from "../../components/openApp/openApp";

  export default {
    name: 'socialDetailVideo',
    data() {
      return {
        shareId: '',
        socialDetailVideo: {},
      }
    },
    components: {
      openApp,
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
    height: calc(100vh - 80px)
    background-color: #000
  }
</style>
