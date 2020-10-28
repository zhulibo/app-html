<template>
  <div class="couponNewUserHasCode">
    <div class="head">
      <img src="../../assets/img/coupon22.png" alt="">
    </div>
    <ul class="coupon-ct clearfix">
      <li v-for="item in couponList">
        <h3>新人礼包</h3>
        <h4>￥{{ item.price }}</h4>
        <h5>{{ item.name }}</h5>
        <p>已领取</p>
      </li>
    </ul>
    <div class="tip">
      <p>已存入卡包</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'couponNewUserHasCode',
  data() {
    return {
      userId: '',
      pageId: '',
      couponList: [],
    }
  },
  created() {
    this.userId = this.$route.query.userId

    this.$http({
      url: '/order/app/discount/InvitationPage/ls',
      method: 'GET',
      params: {
        id: this.userId,
      }
    })
      .then(res => {
        this.couponList = res.data.discounts
      }).catch(e => {
      console.log(e)
    })
  },
  mounted() {
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
.couponNewUserHasCode {
  min-height 100vh;
  background: #fff url(../../assets/img/coupon23.png) top center / 100% auto no-repeat
  .head {
    padding-top: 1.5em
    text-align: center
    img {
      width: 15em
    }
  }
}
.coupon-ct {
  margin-left: auto;
  margin-right: auto;
  width: 25em
  li {
    position: relative
    float: left
    box-sizing border-box
    padding: 0 .5em
    margin-top: 2em
    margin-right: .6em
    margin-left: .6em
    width: 7em
    height: 8.5em
    text-align: center;
    font-weight: bold
    filter: drop-shadow(0 .2em .5em rgba(103, 39, 226, .5));
    background: url(../../assets/img/coupon24.png) center center / 100% 100% no-repeat
    &:nth-child(1) {
      margin-left: 5em
      filter: drop-shadow(0 .2em .5em rgba(103, 39, 226, .3));
    }
    &:nth-child(2) {
      filter: drop-shadow(0 .2em .5em rgba(103, 39, 226, .3));
    }
    h3 {
      margin-top: 1em
      opacity: .5;
      color: #ff2a14
      font-size 16rem
    }
    h4 {
      position: relative
      z-index: 100
      margin-top: .5em
      padding-bottom: .5em
      margin-bottom: .5em
      color: #ff2a14
      font-size 16rem
      border-bottom: 2px dashed #fa7414
    }
    h5 {
      color: #7f3b00
      font-size 16rem
      line-height: 1.2
      line1()
    }
    p {
      position: absolute
      top: 1.8em
      left: .6em
      transform rotateZ(-20deg)
      opacity: .3;
      color: #ff2a14
      font-size 24rem
    }
  }
}
.tip {
  padding-top: 2em
  padding-bottom: 2em
  text-align: center
  color: #b996ff
  p {
    font-weight: bold
    text-decoration underline
  }
}
</style>
