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
            </div>
          </div>
          <div class="item-ct" :class="item.code ? 'on' : ''" @click="itemClick" v-else="item.code">
            <div>
              <h3>{{item.text}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loginFlag" class="login">
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
    <div v-if="loginFlag" class="login-bg" @click="loginFlag = false"></div>
    <br>
    <br>
    <br>
    <button @click="getCodeList">getCodeList</button>
    <p>0元抽奖结果</p>
    {{a}}
    <p>获取抽奖码列表</p>
    {{c}}
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
      a: '',
      c: '',
      drawId: '',
      code: '',
      shareCode: '',
      detail: {},
      leftTime: 0,
      hour: '',
      minute: '',
      second: '',
      lotteryList: [
        {
          text: '0元抽奖',
          code: '',
          url: '',
        },
        {
          text: '好友助力',
          code: '',
          url: '',
        },
        {
          text: '好友助力',
          code: '',
          url: '',
        },
        {
          text: '好友助力',
          code: '',
          url: '',
        },
        {
          text: '好友助力',
          code: '',
          url: '',
        },
        {
          text: '好友助力',
          code: '',
          url: '',
        },
      ],
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 10,
        centeredSlides: true,
      },
      loginFlag: false,
      phone: '',
      verificationCode: '',
      userInfo: {
        token: '',
      },
      content: '发送验证码',
      time: 60,
      canClick: true
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
    this.codeId = this.$route.query.codeId

    // 读取localStorage用户信息
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      this.userInfo = userInfo
      this.$store.dispatch('updateUserInfo', this.userInfo)
      this.getCodeList()
    }

    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
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
            this.countdownTime = 0
          } else {
            this.leftTime = (lotteryBeijingTimestamp - nowBeijingTimestamp) / 1000
            this.countdownTime()
          }
        }).catch(e => {
        console.log(e)
      })
    },
    countdownTime() { // 倒计时
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
    itemClick() {
      if(!this.userInfo.token){
        this.loginFlag = true
        return
      }
    },
    getZeroCode() {
      this.$http({
        url: '/goodsmanage/app/draw/h5',
        method: 'POST',
        data: {
          drawId: this.drawId,
          level: 1,
          status: 2,
          inviteUser: this.inviteUserId,
        }
      })
        .then(res => {
          this.a = res
          this.lotteryList[0].code = res.data
          this.getShareCode()
        }).catch(e => {console.log(e)})
    },
    getVerificationCode() {
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
    submitForm() {
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
          this.loginFlag = false
          this.userInfo.token = res.data.token
          this.$store.dispatch('updateUserInfo', this.userInfo)
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          this.getCodeList()
        }).catch(e => {console.log(e)})
    },
    getCodeList() {
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
            }
            this.getShareCode()
          }else{
            this.getZeroCode()
          }
        }).catch(e => {console.log(e)})
    },
    getShareCode() {
      this.$http({
        url: '/goodsmanage/app/draw/hp/h5',
        method: 'POST',
        data:{
          drawId: this.drawId
        }
      })
        .then(res => {
          this.shareCode = res.data.id
          this.c = res
        }).catch(e => {console.log(e)})
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
    background: url(../../assets/img/lotteryDetail1.png) center center/100% 100% no-repeat
    h2{
      padding-top: 40%
      font-weight: bold
    }
    p{
      font-weight: bold
      font-size 20rem
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
</style>
