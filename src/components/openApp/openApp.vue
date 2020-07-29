<template>
	<div>
		<div class="launch-app-ct" v-if="wechatState">
		  <wx-open-launch-app class="launch-app" @launch="launch" @error="error" appid="wxc0c9a1b05291389d" :extinfo="extinfo">
		    <script type="text/wxtag-template">
		      <div class="btn" style="opacity: 0;height: 80px;">打开APP</div>
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
    props: ['extinfo'],
    data() {
      return {
        aa: 'sdfsdfsdf',
        isIos: null,
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
      // 判断设备类型
      if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        this.isIos = true
      }

      let _this = this
      // 微信版本号大于7.0.12支持开放标签
      try {
        let wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i) ;
        let judgewechat = wechat[1].split('.')
        if(judgewechat[0]>=7){
          if(judgewechat[1]>=0){
            if(judgewechat[2]>=12){
              _this.wechatState = true
              _this.z = true
              _this.wxInit()
            }
          }
        }
      } catch (e) {
      }
      _this.wechatState = true
      _this.wxInit()
    },
    mounted() {
    },
    methods: {
      launch() {
        this.d = true
        if (!this.ios){
          setTimeout(this.downloadApp(),1000)
        }
      },
      error(e) {
        this.e = true
        this.downloadApp()
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
            wx.ready(function(){
              _this.b = true
            });
            wx.error(function (res) {
              _this.c = true
              _this.c1 = res
            });
          })
      },
      downloadApp() {
        if(this.isIos) {
          location.href = "https://apps.apple.com/cn/app/id1518819615";
        }
        if(!this.isIos) {
          location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003";
        }
      },
      openApp() {
        if(this.isIos) {
          location.href = "cartoonThinkerService://";
          setTimeout(function() {
            location.href = "https://apps.apple.com/cn/app/id1518819615";
          }, 1000)
        } else {
          location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003";
          setTimeout(function() {
            location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003";
          }, 1000)
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .launch-app{
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #f00;
    opacity: 0;
  }
  .launch-app-bg{
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    height: 80px;
    padding: 13px 10px 0;
    background-color: #fff;
    box-shadow: 0 -3px 10px rgba(0, 0, 0, .1);
    display: flex;
    .l{
      width: 50px;
      height: 50px;

      img{
        width: 100%;
      }
    }
    .m{
      overflow: hidden;
      flex: 1;
      padding-top: 1px;
      padding-left: 10px;
      img{
        height: 20px;
      }
      p{
        margin-top: 5px
        font-size: 14px;
        color: #666;
        line1()
      }
    }
    .r{
      padding-top: 5px;
      width: 120px;
      text-align: center;
      div{
        display: inline-block;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        background-color: rgb(117, 67, 255);
        color: #fff;
        border-radius: 20px;
      }
    }
  }
</style>
