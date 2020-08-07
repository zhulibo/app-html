<template>
  <div>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <video controls autoplay :src="socialDetailVideo.videoUrl" :poster="socialDetailVideo.videoImage"></video>
    <h1>{{socialDetailVideo.content}}</h1>
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
    getSocialCommentList1() {
      let formData = new FormData();
      formData.append('appUserId', 0);
      formData.append('itemId', this.shareId);
      formData.append('type', 2);
      formData.append('pageIndex', 1);
      this.$http({
        url: '/cartoonThinker/app/articleComment/list/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.socialCommentList1 = res.data
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
.social-comment {
  display: none
  margin-top: .6em
  padding: .6em
  background-color: #fff
  dt{
    font-size 16rem
  }
  dd{
    margin-top: .6em
    display: flex
  }
  li{
    display: flex
    padding: .6em 0
  }
  .l{
    margin-right: .6em
    width: 2em
    img{
      width: 2em
      height: 2em
      border-radius: 50%;
    }
  }
  .r{
    flex: 1
  }
}
</style>