<template>
  <div>
    <div class="launch-app-ct" v-if="wechatState">
      <wx-open-launch-app class="launch-app" @launch="launch" @error="error" appid="wxc0c9a1b05291389d"
                          :extinfo="extinfo">
        <script type="text/wxtag-template">
          <div class="btn" style="opacity: 0;height: 4em;">打开APP</div>
        </script>
      </wx-open-launch-app>
    </div>
    <div class="launch-app" v-else @click="openApp"></div>
    <div class="launch-app-bg">
      <div class="l">
        <img src="../../assets/img/openApp1.png" alt="">
      </div>
      <div class="m">
        <img src="../../assets/img/openApp2.png" alt="">
        <p>为玩具而生 为玩家而来</p>
      </div>
      <div class="r">
        <div>打开漫想家</div>
      </div>
    </div>
    <!--<p>{{y}}</p>-->
    <!--<p v-if="z">微信浏览器环境 && >7.0.12</p>-->
    <!--<p v-if="a">请求成功</p>-->
    <!--<p v-if="a">请求res{{a1}}</p>-->
    <!--<br>-->
    <!--<br>-->
    <!--<p v-if="b">wx.ready</p>-->
    <!--<p v-if="c">签名失败</p>-->
    <!--<p v-if="c">签名res{{c1}}</p>-->
    <!--<p v-if="d">打开成功</p>-->
    <!--<p v-if="e">打开失败</p>-->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  name: 'openApp',
  // props: ['extinfo'],
  data() {
    return {
      extinfo: {
        url: ''
      },
      wechatState: false,
      y: '',
      z: false,
      a: false,
      a1: null,
      b: false,
      c: false,
      c1: null,
      d: false,
      e: false,
    }
  },
  computed: {},
  created() {
    this.extinfo.url = location.href
    this.y = location.href.split('#')[0]

    // 微信版本号大于7.0.12支持开放标签
    try {
      let wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
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
    // _this.wechatState = true
    // _this.wxInit()
  },
  mounted() {
  },
  methods: {
    launch() {
      this.d = true
      if (!this.global.isIos) {
        setTimeout(this.global.downloadApp(), 1000)
      }
    },
    error(e) {
      this.e = true
      this.global.downloadApp()
    },
    wxInit() {
      let _this = this
      let formData = new FormData();
      formData.append('url', _this.y);
      this.$http({
        url: 'https://app.mxjclub.com/cartoonThinker/app/weChatPay/accessToken/json',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
      })
        .then(res => {
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
          });
          wx.ready(function () {
            _this.b = true
          });
          wx.error(function (res) {
            _this.c = true
            _this.c1 = res
          });
        })
    },
    openApp() {
      if (this.global.isIos) {
        location.href = "cartoonThinkerService://";
      } else {
        location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003";
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
