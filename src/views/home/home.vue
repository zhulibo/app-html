<template>
  <div class="test">
    <h1>app-html交互文档<span>最后修改日期：2020.7.31</span></h1>

    <!--月-->
    <h2><span>2020.7</span></h2>
    <div><router-link :to="{path: '/coupon'}">coupon 分享优惠券</router-link><span>http://app.mxjclub.com/share/#/coupon</span>参数：userId：用户id；pageId:礼包id</div>
    <h3>html调app方法：（type：ios：object | android：string）</h3>
    <p>分享优惠券：invokeAppCouponShare 参数：userId：用户id；pageId:礼包id</p>
    <h3 class="app">app调html方法：（type：object）</h3>
    <p>测试：invokeHtmlTest 参数：userId：用户id</p>
    <p>测试：invokeHtmlTest 参数：userId：用户id</p>
    <div><router-link :to="{path: '/couponInvite'}">couponInvite 分享优惠券邀请新用户注册</router-link><span>http://app.mxjclub.com/share/#/couponInvite</span>参数：userId：用户id；pageId:礼包id</div>
    <div><router-link :to="{path: '/activityRule'}">activityRule 协议</router-link></div>
    <div><router-link :to="{path: '/couponNewUser'}">couponNewUser 新用户受邀注册</router-link></div>
    <div><router-link :to="{path: '/couponNewUserHasCode'}">couponNewUserHasCode 邀请码礼包</router-link><span>http://app.mxjclub.com/share/#/couponNewUserHasCode</span>参数：userId：用户id；pageId:礼包id</div>
    <div><router-link :to="{path: '/goodsDetail'}">goodsDetail 商品详情</router-link><span>http://app.mxjclub.com/share/#/goodsDetail</span>参数：goodId：商品id</div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径（type：object）</h3>
    <div><router-link :to="{path: '/socialDetail'}">socialDetail 社区动态详情</router-link><span>http://app.mxjclub.com/share/#/socialDetail</span>参数：shareId：社区动态id</div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径（type：object）</h3>
    <div><router-link :to="{path: '/socialDetailVideo'}">socialDetailVideo 社区动态详情视频</router-link><span>http://app.mxjclub.com/share/#/socialDetailVideo</span>参数：shareId：社区动态id</div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径（type：object）</h3>
    <div><router-link :to="{path: '/lotteryDetail'}">lotteryDetail 抽奖详情</router-link><span>http://app.mxjclub.com/share/#/lotteryDetail</span>参数：drawId：抽奖id</div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径（type：object）</h3>
    <div><router-link :to="{path: '/downloadApp'}">downloadApp 下载APP中间页</router-link><span>http://app.mxjclub.com/share/#/downloadApp</span></div>
    <div><router-link :to="{path: '/test'}">test 测试</router-link></div>

  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  .test{
    box-sizing border-box
    padding: 1em
    background-color: #fff
    border-left: 4em solid #f1f1f1
    h1{
      text-align: center;
      font-size 18rem
      font-weight: bold;
      color: #666
      span{
        margin-left: 1em
        font-weight: normal
        font-size 12rem
      }
    }
    h2{
      margin-top: 1em
      span{
        display: inline-block
        margin-left: -4em
        padding: .2em .5em
        font-weight: bold
        background-color: #ccc
      }
    }
    div{
      margin-top: .5em
      padding-top: .5em
      border-top: 1px dashed #ccc
      a{
        color: #135ce0
      }
      span{
        margin-left: 2em
        margin-right: 2em
      }
    }
    h3{
      margin .3em 0 .3em 2em
      padding-left: .5em
      border-left: .3em solid #444
      &.app{
        border-color: #c00
      }
      &.wx{
        border-color: #0c0
      }
    }
    p{
      margin .3em 0 .3em 4em
      padding: .5em
      font-size 13rem
      background: #eee;
      background-image: linear-gradient(45deg, aliceblue 25%, transparent 25%, transparent 75%, aliceblue 75%, aliceblue), linear-gradient(45deg, aliceblue 25%, transparent 25%, transparent 75%, aliceblue 75%, aliceblue);
      background-size: 4px 4px;
      background-position: 0 0, 2px 2px;
    }
  }
</style>
