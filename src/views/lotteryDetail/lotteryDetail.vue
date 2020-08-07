<template>
  <div>
    <open-app :extinfo="{page: 'socialDetail', id: 123}"></open-app>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <div>
      <div class="countdown-time">
        <div class="title">开奖倒计时</div>
        <div class="time" v-if="leftTime"><span>{{hour}}</span>时<span>{{minute}}</span>分<span>{{second}}</span>秒</div>
        <div class="expired" v-else>已过期</div>
      </div>
      <div class="lottery">
        <div>
          <img class="img" :src="lotteryDetail.icon" alt="">
        </div>
        <div class="time">开奖时间：{{lotteryDetail.drawTime}}</div>
        <h2>{{lotteryDetail.title}}</h2>
        <div class="info clearfix">
          <span class="s1">￥0抽奖价</span>
          <span class="s2">1个名额</span>
          <span class="s3">￥{{lotteryDetail.oldPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import openApp from "../../components/openApp/openApp";
import openAppBtn from "../../components/openAppBtn/openAppBtn";

export default {
  name: 'lotteryDetail',
  data() {
    return {
      drawId: '',
      lotteryDetail: {},
      leftTime: 0,
      hour: '',
      minute: '',
      second: '',
    }
  },
  components: {
    openApp,
    openAppBtn,
  },
  created() {
    this.drawId = this.$route.query.drawId
    this.getLotteryDetail()
  },
  mounted() {
  },
  methods: {
    getLotteryDetail() {
      let formData = new FormData();
      formData.append('id', this.drawId);
      this.$http({
        url: '/cartoonThinker/system/lottery/look/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.lotteryDetail = res.data

          let lotteryBeijingTimestamp = new Date(this.lotteryDetail.drawTime.replace(/-/g, '/')).getTime(); // 开奖北京时间戳
          let nowBeijingTimestamp = this.global.getNowBeijingTimestamp()

          if (nowBeijingTimestamp > lotteryBeijingTimestamp) { // 开奖北京时间戳 - 此时北京时间戳
            this.countdownTime = 0
          } else {
            this.leftTime = (lotteryBeijingTimestamp - nowBeijingTimestamp) / 1000
            this.countdownTime()
          }
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
.countdown-time {
  padding: 4.2em 1em 0
  background-color: #fff
  .title {
    display: inline-block
    padding: .2em .5em
    color: #fff
    background-color: black-1c
    border-radius: .5em .5em .5em 0;
  }
  .time {
    margin-top: .4em
    span {
      padding: 5px
      font-weight: bold
      font-size 30rem
    }
  }
  .expired {
    margin-top: .4em
    padding-left: 1em
    font-size 16rem
  }
}
.lottery {
  padding: .6em
  background-color: #fff
  .img {
    width: 100%
  }
  h2 {
    margin-top: .5em
    font-size 18rem
    line2()
  }
  .info {
    margin-top: 1em
    .s1 {
      font-size 18rem
      color: #f23b3b
    }
    .s2 {
      margin-left: 1em
      padding: 2px 3px
      font-size 12rem
      border: 1px solid #000
      vertical-align: text-bottom;
    }
    .s3 {
      font-size 18rem
      float: right
      text-decoration line-through
      color: #999
    }
  }
  .time {
    margin-top: .5em
    text-align: center
    font-size 12rem
    color: #999
    text-align: left;
  }
}
</style>
