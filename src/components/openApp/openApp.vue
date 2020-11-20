<template>
  <div>
    <div class="launch-app-ct" v-if="wechatState">
      <wx-open-launch-app class="launch-app" @launch="launch" @error="error" appid="wx0bbdce2da9ec10e2"
                          :extinfo="extinfo">
        <script type="text/wxtag-template">
          <div class="btn" style="opacity: 0;height: 4em;">打开APP</div>
        </script>
      </wx-open-launch-app>
    </div>
    <div class="launch-app" v-else @click="openApp"></div>
    <div class="launch-app-bg">
      <div class="l">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="m">
        <img src="../../assets/img/openApp2.png" alt="">
        <p>为玩具而生 为玩家而来</p>
      </div>
      <div class="r">
        <div>打开漫想家</div>
      </div>
    </div>
<!--    <p v-if="a">请求成功{{a1}}</p>-->
<!--    <p v-if="b">wx.ready</p>-->
<!--    <p v-if="c">签名失败{{c1}}</p>-->
<!--    <p v-if="d">打开成功</p>-->
<!--    <p v-if="e">打开失败{{e1}}</p>-->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  name: 'openApp',
  data() {
    return {
      extinfo: {
        url: ''
      },
      wechatState: false,
      url: '',
      a: false,
      a1: null,
      b: false,
      c: false,
      c1: null,
      d: false,
      e: false,
      e1: null,
    }
  },
  computed: {},
  created() {
    this.extinfo.url = location.href
    this.url = location.href.split('#')[0]

    // 微信版本号大于7.0.12支持开放标签
    try {
      let wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
      let judgewechat = wechat[1].split('.')
      if (judgewechat[0] >= 7) {
        if (judgewechat[1] >= 0) {
          if (judgewechat[2] >= 12) {
            this.wechatState = true
            this.z = true
            this.wxInit()
          }
        }
      }
    } catch (e) {
    }
    this.wechatState = true
    this.wxInit()
  },
  mounted() {
  },
  methods: {
    wxInit() {
      this.$http({
        url: '/userorg/app/jsToken/ls',
        method: 'POST',
        data: {
          url: this.url
        }
      })
        .then(res => {
          this.a = true
          this.a1 = res
          wx.config({
            // debug: true,
            appId: 'wx626b8475e0bff0a7',
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'onMenuShareTimeline', // 分享给好友
              'onMenuShareAppMessage', // 分享到朋友圈
            ],
            openTagList: ['wx-open-launch-app'] // 获取开放标签权限
          })
          wx.ready(() => {
            this.b = true
          })
          wx.error(res => {
            this.c = true
            this.c1 = res
          })
        }).catch(e => {
        console.log(e)
      })
    },
    launch() {
      this.d = true
      if (!this.global.isIos) {
        setTimeout(this.global.downloadApp(), 1000)
      }
    },
    error(e) {
      this.e = true
      this.e1 = e.detail
      this.global.downloadApp()
    },
    openApp() {
      if (this.global.isIos) {
        location.href = "cartoonThinkerService://"
      } else {
        location.href = "cartoonThinkerService://"
      }
      setTimeout(this.global.downloadApp(), 1000)
    },
  }
}
</script>

<style lang="stylus" scoped>
.launch-app {
  position: fixed;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0
  width: 100%;
  height: 4em;
  opacity: 0;
}
.launch-app-bg {
  position: fixed;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0
  box-sizing: border-box;
  width: 100%;
  height: 4em;
  padding: .4em .6em 0;
  background-color: rgba(50, 50, 50, .5);
  display: flex;
  color: #fff
  .l {
    width: 3.2em;
    height: 3.2em;
    img {
      width: 100%;
    }
  }
  .m {
    overflow: hidden;
    flex: 1;
    padding-left: .6em;
    img {
      padding-top: .2em
      height: 1.5em;
    }
    p {
      margin-top: .2em
      color: #eee
      line1()
    }
  }
  .r {
    padding-top: .4em;
    width: 8em;
    text-align: center;
    div {
      display: inline-block;
      padding: 0 1em;
      height: 2.4em;
      line-height: 2.4;
      background-color: purple
      color: #fff;
      border-radius: 1.2em;
    }
  }
}
</style>
