<template>
  <div>
    <open-app></open-app>
    <open-app-btn></open-app-btn>
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
        <div class="swiper-slide" v-for="(item, index) in articleRecommendList">
          <div class="item-ct">
            <img :src="item.topImage">
          </div>
        </div>
      </div>
    </div>
    <div class="h6em"></div>
  </div>
</template>

<script>
import openApp from "@/components/openApp/openApp";
import openAppBtn from "@/components/openAppBtn/openAppBtn";
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'lotteryDetail',
  data() {
    return {
      drawId: '',
      detail: {},
      leftTime: 0,
      hour: '',
      minute: '',
      second: '',
      articleRecommendList: [
        {
          id: 1,
          topImage: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg3117.jpg'
        },
        {
          id: 2,
          topImage: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg3117.jpg'
        },
        {
          id: 3,
          topImage: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg3117.jpg'
        },
        {
          id: 4,
          topImage: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg3117.jpg'
        },
        {
          id: 5,
          topImage: 'http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/timg3117.jpg'
        }
      ],
      swiperOption: {
        slidesPerView: 3.5,
        spaceBetween: 10,
        centeredSlides: true,
      },
    }
  },
  components: {
    openApp,
    openAppBtn,
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },
  beforeCreate() {
    // 存储url中的token
    let userInfo ={
      token: this.$route.query.token
    }
    if(userInfo.token) {
      this.$store.dispatch('updateUserInfo', userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  created() {
    this.drawId = this.$route.query.drawId
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/goodsmanage/app/draw/detail',
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.lottery{
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
.swiper-slide {
  transition: 300ms;
  transform: scale(0.9);
}
.swiper-slide-active,.swiper-slide-duplicate-active{
  transform: scale(1);
}
</style>
