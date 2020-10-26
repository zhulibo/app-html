<template>
  <div class="coupon">
    <div class="coupon-head">
      <img src="../../assets/img/coupon1.png" alt="">
    </div>
    <div class="coupon-body">
      <div class="ct clearfix">
        <h3>领取成功！优惠券已放入您的账户</h3>
        <img class="i1" src="../../assets/img/coupon15.png" alt="">
        <img class="i2" src="../../assets/img/coupon6.png" alt="">
        <img class="i3" src="../../assets/img/coupon14.png" alt="">
        <img class="i4" src="../../assets/img/coupon16.png" alt="">
        <img class="i5" src="../../assets/img/coupon7.png" alt="">
      </div>
      <div class="share-btn" @click="seeCoupon">
        <h3>立即查看</h3>
        <p>（有效期至注册7日后）</p>
      </div>
    </div>
    <div class="recommend-goods">
      <ul class="clearfix">
        <li v-for="item in goodsList">
          <div class="ct" v-if="item.type == 1">
            <div class="img">
              <img :src="item.tbGoods.listedImage" alt="">
            </div>
            <div class="txt">
              <h3>{{item.tbGoods.title}}</h3>
              <div class="clearfix"><b>￥<i>{{item.tbGoods.sellPrice}}</i></b><span>{{item.tbGoods.sellNumber}}</span></div>
            </div>
          </div>
          <div class="ct" v-else-if="item.type == 2">
            <div class="img">
              <img :src="item.tbPresellGoods.listedImage" alt="">
            </div>
            <div class="txt">
              <h3>{{item.tbPresellGoods.title}}</h3>
              <div class="clearfix"><b>￥<i>{{item.tbPresellGoods.totalPrice}}</i></b><span>{{item.tbPresellGoods.sellNumber}}</span></div>
            </div>
          </div>
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
      goodsList: [],
    }
  },
  created() {
    this.phone = this.$route.query.phone
    this.getGoodsList()
  },
  mounted() {
  },
  methods: {
    getGoodsList() {
      this.$http({
        url: '/goodsmanage/app/goods/recommend/list/ls',
        method: 'GET',
      })
        .then(res => {
          this.goodsList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    seeCoupon() {
      location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.chuizi.cartoonthinker&fromcase=40003"
    }
  },
  computed: {},
}
</script>

<style lang="stylus" scoped>
.coupon-head{
  padding: 5em 0 8em
  text-align: center
  img{
    height: 4em
  }
  background: url(../../assets/img/downloadApp6.png) bottom center/cover no-repeat
}
.coupon-body{
  margin-top: -1em
  padding: 0 1em
  text-align: center
  .ct{
    padding: .8em
    padding-bottom: 2em
    border-radius: 1em;
    background: url(../../assets/img/coupon2.png) center center/cover no-repeat
    h3{
      font-weight: bold
      font-size 18rem
      color: #fff
    }
    img{
      float: left
      display: inline-block
      &.i1,&.i2,&.i3{
        width: 32%
        margin-right: 2%
      }
      &.i3{
        margin-right: 0
      }
      &.i4,&.i5{
        width: 48%
      }
      &.i4{
        margin-right: 4%
      }
    }
  }
  .share-btn{
    margin-top: 1em
    btn1()
    font-size 16rem
    font-weight: bold
    height: auto
    padding: .4em 5em
    border-radius: 3em;
    color: #fff
    background-image: linear-gradient(180deg,#a549fd,purple)
    box-shadow 0 0 .6em rgba(151,111,217,.8)
    h3{
      line-height: 1.2
    }
    p{
      font-size 12rem
      line-height: 1.2
    }
  }
}
.recommend-goods{
  margin-bottom: 2em
  padding: .6em
  ul{
    li{
      margin-top: .6em
      float: left
      width: calc((100% - .6em)/2)
      margin-right: .6em
      background-color: #fff
      border-radius: .5em
      &:nth-child(2n){
        margin-right: 0
      }
      .img{
        position: relative
        width: 100%
        padding-bottom: 100%
        img{
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
        }
      }
      .txt{
        padding: .3em
        h3{
          line2()
          min-height 2.8em
        }
        div{
          b{
            color: purple
            i{
              font-style normal
            }
          }
          span{
            float: right
            color: #999
            font-size 12rem
          }
        }
      }
    }
  }
}
</style>
