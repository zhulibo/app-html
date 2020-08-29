<template>
  <div class="couponNewUserHasCode">
    <div class="head">
      <img src="../../assets/img/coupon22.png" alt="">
    </div>
    <ul class="coupon-ct clearfix">
      <li v-for="item in couponList">
        <h3>新人礼包</h3>
        <h4>￥{{item.price}}</h4>
        <h5>{{item.realName}}</h5>
        <h6>{{item.realBrandName}}</h6>
        <p v-if="item.isgetDiscount == 1">已领取</p>
      </li>
    </ul>
    <div class="tip" v-if="couponList.length > 0">
      <p v-if="couponList[0].isgetDiscount == 1">已存入卡包</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'couponNewUserHasCode',
  data() {
    return {
      // title: '新人礼包',
      userId: '',
      pageId: '',
      couponList: [],
    }
  },
  created() {
    this.userId = this.$route.query.userId
    this.pageId = this.$route.query.pageId

    let formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('id', this.pageId);
    this.$http({
      url: '/cartoonThinker/app/discountuser/selectPageDiscounts/json', // 获取优惠券
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      data: formData,
    })
      .then(res => {
        this.couponList = res.data
        this.couponList.forEach(function (value, index, array) {
          let arr = value.name.trim().split(" ")
          this.couponList[index].realName = arr[1]
          this.couponList[index].realBrandName = arr[0]
        })
      }).catch(e => {console.log(e)})
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>
.couponNewUserHasCode {
  min-height 100vh;
  background: #6628e2 url(../../assets/img/coupon23.png) top center / 100% auto no-repeat
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
    height: 9em
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
    h6 {
      color: #7f3b00
      font-size 12rem
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
