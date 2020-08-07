<template>
  <div>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <video controls autoplay :src="socialDetailVideo.videoUrl" :poster="socialDetailVideo.videoImage"></video>
    <div class="social-comment">
      <dl>
        <dt>全部评论(4)</dt>
        <dd>
          <div class="l"><img src="../../assets/img/openApp1.png" alt=""></div>
          <div class="r">
            <h3>张三</h3>
            <p>同款报丧<span>3天前</span></p>
            <ul>
              <li>
                <div class="l"><img src="../../assets/img/openApp1.png" alt=""></div>
                <div class="r">
                  <h3>小明</h3>
                  <p>同款报丧<span>3天前</span></p>
                </div>
              </li>
            </ul>
          </div>
        </dd>
      </dl>
    </div>
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
video {
  width: 100%
  background-color: #000
}
.social-comment {
  padding: .6em
}
</style>