<template>
  <div class="wrap">
    <div class="banner">
      <div>
        <h3>品牌商家入驻</h3>
        <p>更多优惠政策，期待您的加入</p>
      </div>
    </div>
    <section class="list settle">
      <div class="title"><h4>入驻条件</h4></div>
      <div class="ct">
        <p>1、具备公司主体</p>
        <p>2、有合法品牌授权或者采购链路证明</p>
        <p>3、其他平台合作记录或者良好的销售记录</p>
      </div>
    </section>
    <section class="list join">
      <div class="title"><h4>加入我们</h4></div>
      <div class="ct">
        <p>请联系<a>bd@mxjclub.com</a></p>
      </div>
    </section>
    <div class="welcome">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
        <p>漫想家APP欢迎您的加入</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.wrap{
  position: relative
  height: 100vh
  background-color: #fff
  .banner{
    width: 100%
    height: 0
    padding-bottom: 50%
    color: #fff
    text-align: center
    background: url(../../assets/img/toBeSeller1.png) center center/cover no-repeat
    div{
      padding-top: 12%
    }
    h3{
      font-size 30rem
    }
    p{
      font-size 16rem
    }
  }
  .list{
    margin-top: 3em
    padding: 0 2em
  }
  .title{
    font-size 18rem
    text-align: center
    h4{
      font-weight: bold
      display: inline-block
      padding: 0 5em
      background: url(../../assets/img/toBeSeller2.png) left center/3em auto no-repeat,
        url(../../assets/img/toBeSeller3.png) right center/3em auto no-repeat,
    }
  }
  .settle{
    .ct{
      margin-top: 1em
      color: #666
      font-size 16rem
    }
  }
  .join{
    .ct{
      margin-top: 1em
      color: #666
      font-size 16rem
      text-align: center
      a{
        color: purple

      }
    }
  }
  .welcome{
    position: absolute
    left: 0
    width: 100%
    bottom: 2em
    text-align: center
    img{
      margin-bottom: .3em
      width: 4em
    }
    p{
      font-size 18rem
    }
  }
}
</style>