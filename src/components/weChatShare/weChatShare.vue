<template>
  <div>
    <p>{{y}}</p>
    <p v-if="z">微信浏览器环境 && >7.0.12</p>
    <p v-if="a">请求成功</p>
    <p v-if="a">请求res{{a1}}</p>
    <br>
    <br>
    <p v-if="b">wx.ready</p>
    <p v-if="c">签名失败</p>
    <p v-if="c">签名res{{c1}}</p>
    <p v-if="d">打开成功</p>
    <p v-if="e">打开失败</p>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  name: 'openAppBtn',
  data() {
    return {
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
    this.wechatState = true
    this.wxInit()
  },
  mounted() {
  },
  methods: {
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
            debug: true,
            appId: 'wx626b8475e0bff0a7',
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: [
              'updateAppMessageShareData',
            ],
          });
          wx.ready(function () {
            _this.b = true
            // wx.updateAppMessageShareData({
            //   title: '111', // 分享标题
            //   desc: '222', // 分享描述
            //   link: 'http://app.mxjclub.com/share/#/agreementUser', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            //   imgUrl: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/png8778.png', // 分享图标
            //   success: function () {
            //     // 设置成功
            //     alert('2333')
            //   }
            // })
          });
          wx.error(function (res) {
            _this.c = true
            _this.c1 = res
          });
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
</style>
