<template>
  <div class="couponInvite">
    <h2>优惠卷已放入账户：{{phone}}</h2>
    <div class="coupon-list">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li @click="seeCoupon">
          <h3>立即查看</h3>
          <h4>有效期至：注册后7日内</h4>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'couponNewUser',
  data() {
    return {
      phone: '',
      userId: '',
      pageId: '',
    }
  },
  created() {
    this.phone = this.$route.query.phone
    this.userId = this.$route.query.userId
    this.pageId = this.$route.query.pageId
  },
  mounted() {
  },
  methods: {
    seeCoupon() {
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003"
    }
  },
}
</script>

<style lang="stylus" scoped>
.couponInvite {
  position: relative
  margin-left: auto;
  margin-right: auto;
  max-width 475px
  min-height 100vh;
  overflow: hidden
  background: url(../../assets/img/coupon18.png) center 70% / 100% auto no-repeat,
    url(../../assets/img/coupon19.png) center bottom / 100% auto no-repeat;
}
.couponInvite::after {
  content ""
  position: absolute
  z-index: -1;
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-image: linear-gradient(#1C9EAA, #000)
}
.couponInvite h2 {
  margin-top: 2em
  font-size 16rem
  color: #fff
  text-align: center
}
.coupon-list {
  position relative
  margin-top: 1.5em
  padding-bottom: 5em
  background: url(../../assets/img/coupon4.png) left 1em / 7em auto no-repeat,
    url(../../assets/img/coupon5.png) right 1em / 7em auto no-repeat;
  ul {
    display: flex;
    flex-wrap: wrap
    justify-content space-between
    margin-left: auto;
    margin-right: auto;
    padding 1em 1.5em 2em 1.5em
    width: 18em
    background: url(../../assets/img/coupon2.png) center center / 100% 100% no-repeat
    li {
      margin-top: 1em
      width: 8.5em
      height: 5.2em
      background: center center / 100% 100% no-repeat
      &:nth-child(1) {
        background-image: url(../../assets/img/coupon15.png);
      }
      &:nth-child(2) {
        background-image: url(../../assets/img/coupon6.png);
      }
      &:nth-child(3) {
        background-image: url(../../assets/img/coupon14.png);
      }
      &:nth-child(4) {
        background-image: url(../../assets/img/coupon16.png);
      }
      &:nth-child(5) {
        width: 100%
        height: 6em
        background-image: url(../../assets/img/coupon7.png);
      }
      &:nth-child(6) {
        position: relative
        width: 100%
        height: 6em
        color: #fff
        text-align: center
        box-shadow 0 0 1em rgba(0, 0, 0, 0.5), 0 0 2em rgba(255, 255, 255, 1) inset;
        border-radius: .6em;
        border: .4em solid #6c40a7
        background-image: linear-gradient(90deg, #fd818f, #f21d2e)
        h3 {
          margin-top: .9em
          font-size 22rem
          font-weight: bold
        }
        h4 {
          font-size 12rem;
        }
        &::after {
          position: absolute
          top: 0
          left: 0
          content ""
          box-sizing border-box
          width: 100%
          height: 100%
          border: .4em solid #fcb660
          border-radius: .4em;
        }
      }
    }
  }
}
</style>
