<template>
  <div class="test">
    <h1>app-html交互文档</h1>

    <div>
      <router-link :to="{path: '/toBeSeller'}">toBeSeller 申请入驻</router-link>
      <span>http://new.mxjclub.com/share/#/toBeSeller</span>
    </div>

    <div>
      <router-link :to="{path: '/lotteryDetail'}">lotteryDetail 抽奖</router-link>
      <span>http://new.mxjclub.com/share/#/lotteryDetail</span>参数：drawId：抽奖id；code：要分享抽奖码id
    </div>

    <div>
      <router-link :to="{path: '/articleIndex'}">articleIndex 模玩文化列表</router-link>
      <span>http://new.mxjclub.com/share/#/articleIndex</span>参数：token：用户token
    </div>
    <h3>html调app方法：</h3>
    <p>显示app的底部菜单：invokeAppShowTab 参数：url：当前页面url</p>

    <div>
      <router-link :to="{path: '/articleSch'}">articleSch 模玩文化搜索</router-link>
      <span>http://new.mxjclub.com/share/#/articleSch</span>参数：articleId：文章id
    </div>
    <h3>html调app方法：</h3>
    <p>隐藏app的底部菜单：invokeAppHiddenTab 参数：url：当前页面url</p>

    <div>
      <router-link :to="{path: '/articleDetail'}">articleDetail 模玩文化详情</router-link>
      <span>http://new.mxjclub.com/share/#/articleDetail</span>参数：articleId：文章id
    </div>
    <h3>html调app方法：</h3>
    <p>隐藏app的底部菜单：invokeAppHiddenTab 参数：url：当前页面url</p>
    <p>分享模玩文化详情：invokeAppArticleShare 参数：articleId：文章id；title：文章标题；img：文章图片</p>
    <p>调登录：invokeAppLogin 参数：url：当前页面url</p>

    <div>
      <router-link :to="{path: '/goodsDetail'}">goodsDetail 商品详情</router-link>
      <span>http://new.mxjclub.com/share/#/goodsDetail</span>参数：goodId：商品id；type: 1现货 2预售
    </div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径</h3>

    <div>
      <router-link :to="{path: '/social'}">socialDetail 社区动态详情</router-link>
      <span>http://new.mxjclub.com/share/#/socialDetail</span>参数：shareId：社区动态id
    </div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径</h3>

    <div>
      <router-link :to="{path: '/socialDetailVideo'}">socialDetailVideo 社区动态详情视频</router-link>
      <span>http://new.mxjclub.com/share/#/socialDetailVideo</span>参数：shareId：社区动态id
    </div>
    <h3 class="wx">微信内跳转app：参数：url：页面路径</h3>

    <div>
      <router-link :to="{path: '/couponShare'}">couponShare 分享优惠券</router-link>
      <span>http://new.mxjclub.com/share/#/couponShare</span>参数：userId：用户id
    </div>
    <h3 class="html">html调app方法：</h3>
    <p>分享优惠券：invokeAppCouponShare 参数：userId：用户id</p>
<!--    <h3 class="app">app调html方法：</h3>-->
<!--    <p>测试：invokeHtmlTest 参数：userId：用户id</p>-->

    <div>
      <router-link :to="{path: '/couponInvite'}">couponInvite 分享优惠券邀请新用户注册</router-link>
      <span>http://new.mxjclub.com/share/#/couponInvite</span>参数：userId：用户id
    </div>

    <div>
      <router-link :to="{path: '/couponNewUser'}">couponNewUser 新人邀请码礼包</router-link>
      <span>http://new.mxjclub.com/share/#/couponNewUser</span>参数：userId：用户id
    </div>

    <div>
      <router-link :to="{path: '/agreementUser'}">agreementUser 用户协议</router-link>
      <span>http://new.mxjclub.com/share/#/agreementUser</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementPrivacy'}">agreementPrivacy 隐私协议</router-link>
      <span>http://new.mxjclub.com/share/#/agreementPrivacy</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementLottery'}">agreementLottery APP抽奖规则</router-link>
      <span>http://new.mxjclub.com/share/#/agreementLottery</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementPresale'}">agreementPresale 预售规则</router-link>
      <span>http://new.mxjclub.com/share/#/agreementPresale</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementCoupon'}">agreementCoupon 优惠券规则</router-link>
      <span>http://new.mxjclub.com/share/#/agreementCoupon</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementArticle'}">agreementArticle 模玩文化版权协议</router-link>
      <span>http://new.mxjclub.com/share/#/agreementArticle</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementBuy'}">agreementBuy 买家须知</router-link>
      <span>http://new.mxjclub.com/share/#/agreementBuy</span>
    </div>

    <div>
      <router-link :to="{path: '/agreementShopSettle'}">agreementShopSettle 商家入驻须知</router-link>
      <span>http://new.mxjclub.com/share/#/agreementShopSettle</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.test {
  box-sizing border-box
  padding: 1em
  background-color: #fff
  border-left: 4em solid #f1f1f1
  h1 {
    text-align: center;
    font-size 18rem
    font-weight: bold;
    color: #666
    span {
      margin-left: 1em
      font-weight: normal
      font-size 12rem
    }
  }
  h2 {
    margin-top: 1em
    span {
      display: inline-block
      margin-left: -4em
      padding: .2em .5em
      font-weight: bold
      background-color: #ccc
    }
  }
  div {
    margin-top: .5em
    padding-top: .5em
    border-top: 1px dashed #ccc
    a {
      color: #135ce0
    }
    span {
      margin-left: 2em
      margin-right: 2em
    }
    &.disable {
      opacity .4
    }
  }
  h3 {
    margin .3em 0 .3em 2em
    padding-left: .5em
    border-left: .3em solid #444
    &.app {
      border-color: #c00
    }
    &.wx {
      border-color: #0c0
    }
  }
  p {
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
