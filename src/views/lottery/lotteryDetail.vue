<template>
  <div>
<!--    <open-app></open-app>-->
<!--    <open-app-btn></open-app-btn>-->
    <we-chat-share v-if="userInfo.userId" :drawId="drawId"  :code="shareCode" :imgUrl="detail.tbGoods.listedImage" :title="detail.tbGoods.title"></we-chat-share>
    <div class="lottery" v-if="detail.tbGoods">
      <div class="goods-banner">
        <img v-if="detail" :src="detail.tbGoods.skus[0].skuImage" alt="">
      </div>
      <h2>{{detail.tbGoods.skus[0].name}}</h2>
      <div class="info">
        <span class="s1">￥<b>0</b> 抽奖价</span>
        <span class="s2">￥{{ detail.tbGoods.skus[0].price }}</span>
      </div>
    </div>
    <div class="countdown-time">
      <div class="title"><p>开奖</p><p>倒计时</p></div>
      <div class="time" v-if="leftTime"><span>{{ hour }}</span>时<span>{{ minute }}</span>分<span>{{ second }}</span>秒
      </div>
      <div class="expired" v-else>已过期</div>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in lotteryList">
          <div class="item-ct" :class="item.code ? 'on' : ''" @click="itemClick" v-if="item.code">
            <div>
              <h2>我的抽奖码</h2>
              <p>{{item.code}}</p>
              <img v-if="item.header" :src="item.header" alt="">
              <img v-else src="../../assets/img/openApp1.png" alt="">
            </div>
          </div>
          <div class="item-ct" :class="item.code ? 'on' : ''" @click="itemClick" v-else>
            <div>
              <h3>{{item.text}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loginLayer" class="login">
      <div class="title">
        <h3>手机验证登录</h3>
      </div>
      <div class="ct">
        <div class="li">
          <i class="iconfont icon-shouji"></i>
          <input type="text" v-model="phone">
        </div>
        <div class="li">
          <i class="iconfont icon-xinxi"></i>
          <input type="text" v-model="verificationCode">
          <span class="code" @click="getVerificationCode">{{content}}</span>
        </div>
        <div class="li">
          <button @click="submitForm">确定</button>
        </div>
      </div>
    </div>
    <div v-if="loginLayer" class="login-bg" @click="loginLayer = false"></div>
    <div v-if="zeroCodeLayer" class="zero-code">
      <h3>恭喜你<br>成功获得1张抽奖码</h3>
      <p>{{lotteryList[0].code}}</p>
      <h6>点击右上角<br>分享邀请好友再得1张</h6>
      <i class="iconfont icon-guanbi" @click="zeroCodeLayer = false"></i>
    </div>
    <div v-if="zeroCodeLayer" class="zero-code-bg" @click="zeroCodeLayer = false"></div>
    <div class="h6em"></div>
  </div>
</template>

<script>
import openApp from "@/components/openApp/openApp";
import openAppBtn from "@/components/openAppBtn/openAppBtn";
import weChatShare from "@/components/weChatShare/weChatShare";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'lotteryDetail',
  data() {
    return {
      c: null,
      drawId: '', // 抽奖id
      code: '', // 从url中获取的抽奖码
      shareCode: '', // 要分享出去的抽奖码
      detail: {},
      leftTime: 0,
      hour: '',
      minute: '',
      second: '',
      lotteryList: [
        {
          text: '0元抽奖',
          code: '',
          header: '',
        },
        {
          text: '好友助力',
          code: '',
          header: '',
        },
        {
          text: '好友助力',
          code: '',
          header: '',
        },
        {
          text: '好友助力',
          code: '',
          header: '',
        },
        {
          text: '好友助力',
          code: '',
          header: '',
        },
        {
          text: '好友助力',
          code: '',
          header: '',
        },
      ], // 抽奖码banner
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 10,
        centeredSlides: true,
      },
      loginLayer: false,
      phone: '',
      verificationCode: '',
      userInfo: {
        token: '',
      },
      content: '获取验证码',
      time: 60, // 获取验证码倒计时
      canClick: true, // 获取验证码开关
      zeroCodeLayer: false,
    }
  },
  components: {
    // openApp,
    // openAppBtn,
    weChatShare,
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },
  created() {
    this.drawId = this.$route.query.drawId
    this.code = this.$route.query.code

    // 读取localStorage用户信息
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      this.userInfo = userInfo
      this.$store.dispatch('updateUserInfo', this.userInfo)
      this.getCodeList() // 有登录信息直接查询所有抽奖码
    }

    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() { // 抽奖商品详情
      this.$http({
        url: '/goodsmanage/app/draw/detail/ls',
        method: 'GET',
        params: {
          id: this.drawId,
        }
      })
        .then(res => {
          this.detail = res.data
          let lotteryBeijingTimestamp = new Date(this.detail.drawTime).getTime() // 开奖北京时间戳
          // let lotteryBeijingTimestamp = new Date(this.detail.drawTime.replace(/-/g, '/')).getTime() // 开奖北京时间戳
          let nowBeijingTimestamp = this.global.getNowBeijingTimestamp()
          if (nowBeijingTimestamp > lotteryBeijingTimestamp) { // 开奖北京时间戳 - 此时北京时间戳
            this.leftTime = 0
          } else {
            this.leftTime = (lotteryBeijingTimestamp - nowBeijingTimestamp) / 1000
            this.countdownTime()
          }
        }).catch(e => {
        console.log(e)
      })
    },
    countdownTime() { // 抽奖商品倒计时
      let leftTime = this.leftTime

      if (leftTime <= 0) { // 倒计时为0时，清除定时器timer
        clearTimeout(timer)
        return
      }

      let hour = parseInt(leftTime / (60 * 60));
      let minute = parseInt(leftTime / 60 % 60);
      let second = parseInt(leftTime % 60);

      function checkTime(i) { // 检测分秒是否为两位数 不是的两位数在前面加个0
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      }

      hour = checkTime(hour);
      minute = checkTime(minute);
      second = checkTime(second);

      this.hour = hour
      this.minute = minute
      this.second = second
      this.leftTime = leftTime - 1
      let timer = setTimeout(this.countdownTime, 1000);
    },
    itemClick() { // 点击抽奖，判断是否登录了
      if(!this.userInfo.token){
        this.loginLayer = true
        return
      }
      if(this.shareCode){
        this.$toast('点击右上角分享给好友，再得1张')
      }
    },
    getVerificationCode() { // 获取邀请码
      let phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!phone.test(this.phone)) {
        console.log(123)
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.canClick) return
      this.$http({
        url: '/userorg/app/login/captcha',
        method: 'GET',
        params: {
          phone: this.phone,
        }
      })
        .then(res => {

          // 60s验证码倒计时
          this.canClick = false
          this.content = this.time + ' s'
          this.timer = setInterval(() => {
            if (this.time <= 1) {
              this.canClick = true
              clearInterval(this.timer)
              this.time = 60
              this.content = '获取验证码'
              return false
            }
            this.time--
            this.content = this.time + ' s'

          }, 1000)
        }).catch(e => {console.log(e)})
    },
    submitForm() { // 手机登录
      let phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!phone.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.verificationCode) {
        this.$toast('请输入验证码')
        return false
      }
      this.$http({
        url: '/userorg/app/login',
        method: 'POST',
        data: {
          phone: this.phone,
          loginType: 2,
          code: this.verificationCode,
        }
      })
        .then(res => {
          this.loginLayer = false

          this.userInfo.token = res.data.token
          this.$store.dispatch('updateUserInfo', this.userInfo)
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))

          this.getCodeList()

        }).catch(e => {console.log(e)})
    },
    getCodeList() { // 查询全部抽奖码
      this.$http({
        url: '/goodsmanage/app/draw/userNum/detail',
        method: 'GET',
        params:{
          drawId: this.drawId
        }
      })
        .then(res => {
          this.c = res
          if (res.data.length > 0){
            for (let i = 0; i < res.data.length; i++) {
              this.lotteryList[i].code = res.data[i].number
              if(res.data[i].header) this.lotteryList[i].header = res.data[i].header
            }
            this.getShareCode() // 参与过，获取分享给别人的抽奖码
          }else{
            this.getZeroCode() // 没有参与过，获取0元抽奖码
          }
        }).catch(e => {console.log(e)})
    },
    getShareCode() { // 获取要分享给别人的抽奖码
      this.$http({
        url: '/goodsmanage/app/draw/hp/h5',
        method: 'POST',
        data:{
          drawId: this.drawId
        }
      })
        .then(res => {
          this.shareCode = res.data.id
        }).catch(e => {console.log(e)})
    },
    getZeroCode() { // 获取自己的0元抽奖码
      this.$http({
        url: '/goodsmanage/app/draw/h5',
        method: 'POST',
        data: {
          id: this.code,
        }
      })
        .then(res => {
          this.zeroCodeLayer = true
          this.lotteryList[0].code = res.data.number
          this.getShareCode() // 获取要分享给别人的抽奖码
        }).catch(e => {
        this.getShareCode() // 获取要分享给别人的抽奖码
        console.log(e)
        })
    },
  }
}
</script>

<style lang="stylus" scoped>
.lottery{
  background-color: #fff
  .goods-banner{
    img{
      width: 100%
    }
  }
  h2{
    padding: .6em
    font-size 18rem
    text-align: center
  }
  .info{
    font-size 18rem
    text-align: center
    .s1{
      display: inline-block
      margin-right: 10px
      color: #F62F2F
      b{
        font-size 24rem
      }
    }
    .s2{
      color: #999
      text-decoration line-through
    }
  }
}
.countdown-time{
  padding: 1em
  display: flex
  justify-content center
  align-items: center;
  font-size 16rem
  background-color: #fff
  .title{
    margin-right: .6em
    color: purple
    text-align: center
    p:nth-child(2){
      font-size 12rem
    }
  }
  .time{
    color: purple;
    font-size 12rem
    span{
      margin-right: 2px
      margin-left: 2px
      font-size 24rem
      font-weight: bold
    }
  }
}
.login-bg{
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  z-index: 100
}
.login{
  position: fixed
  z-index: 200
  top: 50%
  left: 50%
  transform translate(-50%, -50%)
  width: 20em
  padding: 1em
  background-color: #fff
  border-radius: .5em;
  box-shadow 0 0 1em rgba(0,0,0,.2)
  .title{
    font-size 18rem
    text-align: center
  }
  .ct{
    .li{
      display: flex
      padding: .6em 0
      line-height: 2.6em
      border-bottom: 1px solid #ddd
      i{
        font-size 24rem
        color: #999
      }
      input{
        flex: 1
        padding-left: 1em
        height: 2.6em
        border: none
        width: 0
      }
      .code{
        width: 6em
        text-align: center
      }
      button{
        btn2()
        border: none
        color: #fff
        font-size 18rem
        background-image: linear-gradient(90deg, #814DFF, purple);
      }
      &:last-child{
        border: none
      }
    }
  }
}
.banner{
  padding: 1em 0
  background-color: #fff
}
.swiper-slide {
  transition: 300ms;
  transform: scale(0.9);
}
.swiper-slide-active,.swiper-slide-duplicate-active{
  transform: scale(1);
}
.item-ct{
  width: 100%
  height: 0
  padding-bottom: 130%
  text-align: center
  box-shadow 0 0 .6em rgba(101,36,226,.6)
  h3{
    padding-top: 40%
    color: #fff
    font-size 18rem
    font-weight: bold
  }
  border-radius: .6em;
  background: url(../../assets/img/lotteryDetail2.png) center center/100% 100% no-repeat
  &.on{
    color: purple
    text-shadow 0 0 .2em rgba(0,0,0,.4)
    background: url(../../assets/img/lotteryDetail3.png) center center/100% 100% no-repeat
    h2{
      padding-top: 30%
      font-weight: bold
      margin-bottom: .2em
    }
    p{
      font-weight: bold
      font-size 20rem
    }
    img{
      display: inline-block
      margin-top: .2em
      width: 2em
      height: 2em
      border-radius: 50%;
      box-shadow 0 0 .6em rgba(0,0,0,.2)
    }
  }
}
.swiper-slide-active{
  .item-ct{
    h3{
      text-shadow 0 0 .6em rgba(104,255,217,1)
    }
  }
}
.zero-code-bg{
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  z-index: 100
  background-color: rgba(0,0,0,.4)
}
.zero-code{
  position: fixed
  z-index: 200
  top: 50%
  left: 50%
  transform translate(-50%, -50%)
  box-sizing border-box
  padding: 1em
  padding-top: 3em
  width: 15em
  height: 20em
  color: purple
  text-align: center
  background: url(../../assets/img/lotteryDetail1.png) center center/100% 100% no-repeat
  border-radius: .5em;
  box-shadow 0 0 1em rgba(0,0,0,.2)
  i{
    position: absolute
    bottom: -2em
    left: 50%
    transform translate(-50%, 0)
    color: #fff
    font-size 18rem
  }
  h3{
    font-size 18rem
  }
  p{
    margin-top: 1em
    font-size 26rem
    font-weight: bold
  }
  h6{
    margin-top: 2em
    btn1()
    background-image: linear-gradient(90deg, #814DFF, #6524E2)
    color: #fff
    height: 3.4em
    line-height: 1.5
    border-radius: 3.4em
    padding: .2em 1em
  }
}
</style>