<template>
  <div class="coupon">
    <div class="coupon-head">
      <div class="ct">
        <img class="i1" src="../../assets/img/coupon1.png" alt="">
        <img class="i2" src="../../assets/img/coupon8.png" alt="">
        <img class="i3" src="../../assets/img/coupon9.png" alt="">
      </div>
    </div>
    <div class="coupon-list">
      <img class="i1" src="../../assets/img/coupon10.png" alt="">
      <img class="i2" src="../../assets/img/coupon11.png" alt="">
      <img class="i3" src="../../assets/img/coupon13.png" alt="">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li @click="invokeAppCouponShare">
          <h3>分享好友成功注册</h3>
          <h4>领 365元现金券</h4>
        </li>
      </ul>
      <div class="inviteNumber" v-if="inviteNumber>0">
        <p><span>已完成{{inviteNumber}}人</span></p>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data() {
    return {
      title: '分享优惠券',
      userId: '',
      pageId: '',
      inviteNumber: 0
    }
  },
  created() {
    let _this = this
    _this.userId = _this.$route.query.userId
    _this.pageId = _this.$route.query.pageId
    _this.invokeAppSetTitle()

    let formData = new FormData();
    formData.append('userId', _this.userId);
    _this.$http({
      url: '/cartoonThinker/app/discountuser/invitationNumber/json', // 邀请了几个人
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData,
    })
      .then(function (res) {
        _this.inviteNumber = res.data
      })
  },
  mounted() {
  },
  methods: {
    invokeAppSetTitle() {
      try {
        let params = {
          title: this.title
        }
        console.log(params)
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppSetTitle.postMessage(params)
        } else {
          window.android.invokeAppSetTitle(params)
        }
      } catch (e) {
        console.log(e)
      }
    },
    invokeAppCouponShare() {
      let params = {
        userId: this.userId,
        pageId: this.pageId
      }
      if (this.global.isIos) {
        console.log(params)
        window.webkit.messageHandlers.invokeAppCouponShare.postMessage(params)
      } else {
        console.log(JSON.stringify(params))
        window.android.invokeAppCouponShare(JSON.stringify(params))
      }
    }
  },
  computed: {},
}
</script>

<style lang="stylus" scoped>
.coupon {
  overflow hidden
  margin-left: auto;
  margin-right: auto;
  max-width 475px
  background-color: #0A0616
}
.coupon-head {
  margin-top: 4em
  .ct {
    position relative
    margin-left: auto;
    margin-right: auto;
    width: 20em
    .i2 {
      position: absolute;
      top: -4em;
      left: -3em;
      height: 7em;
    }
    .i3 {
      position: absolute;
      top: -2.3em;
      right: -2.3em;
      height: 3.5em;
    }
  }
}
.coupon-list {
  position relative
  margin-top: 4em
  padding-bottom: 15em
  background: url(../../assets/img/coupon4.png) left 1em / 7em auto no-repeat,
    url(../../assets/img/coupon5.png) right 1em / 7em auto no-repeat,
    url(../../assets/img/coupon12.png) left 90% / 12em auto no-repeat;
  .i1 {
    position: absolute;
    top: -3.5em;
    left: -0.5em;
    height: 6em;
  }
  .i2 {
    position: absolute;
    top: -2em;
    right: .5em;
    height: 5em;
  }
  .i3 {
    position: absolute;
    bottom: 0
    right: 0;
    width: 12.5em
  }
  ul {
    display: flex;
    flex-wrap: wrap
    justify-content space-between
    margin-left: auto;
    margin-right: auto;
    padding 1em 1.5em 1em 1.5em
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
          margin-top: .8em
          font-size 20rem
          font-weight: bold
          font-style: italic;
        }
        h4 {
          font-size 22rem;
          font-weight: bold
          font-style: italic;
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
.inviteNumber {
  position: relative
  margin-top: 3em;
  margin-left: auto
  margin-right: auto
  width: 20em
  text-align: center
  color: #fff
  font-weight: bold
  p {
    box-sizing border-box
    width: 19em
    height: 4em
    border: .3em solid #9cf1ff
    border-radius: 2em;
    box-shadow 0 0 1em rgb(156, 241, 255),
    inset 0 0 1em rgb(156, 241, 255);
    background-image: linear-gradient(90deg, #7242e4, #73d3e2)
    span {
      display: inline-block
      padding-top: .4em
      font-size 22rem
      font-weight: bold
      letter-spacing .1em
    }
  }
  i {
    position: absolute
    right: 0;
    bottom: 0
    width: 4.6em
    height: 4.6em
    border-radius: 50%;
    border: .3em solid #9cf1ff
    background-color: #7242e4
    box-shadow 0 0 1em rgb(156, 241, 255),
    inset 0 0 1em rgb(156, 241, 255);
    &::before {
      content: "";
      position: absolute;
      top: 2.45em
      left: 1.8em;
      width: .3em;
      height: 1em;
      background-color: #9cf1ff;
      transform: translateY(-.2em) rotate(-45deg);
    }
    &::after {
      content: "";
      position: absolute;
      top: 2em
      left: 2.75em;
      width: .3em;
      height: 2.05em;
      background-color: #9cf1ff;
      transform: translateY(-.6em) rotate(45deg);
    }
  }
}
</style>
