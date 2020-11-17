<template>
  <div>
    <open-app></open-app>
    <open-app-btn></open-app-btn>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannerList">
          <img :src="item">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="goods-head">
      <div class="price" v-if="goodDetail.sellPrice">￥{{ goodDetail.sellPrice }}</div>
      <div class="price" v-else>￥---</div>
      <div class="title">{{ goodDetail.title }}</div>
    </div>
    <div class="genuine">
      <img :src="goodDetail.qualityAssuranceImage" alt="">
    </div>
    <ul v-if="type == 1" class="param">
      <li v-if="goodDetail.brandName">品牌<span>{{ goodDetail.brandName }}</span></li>
      <li v-if="goodDetail.tbGoodsDetail.cargoNo">货号<span>{{ goodDetail.tbGoodsDetail.cargoNo }}</span></li>
      <li>材质<span>{{ goodDetail.tbGoodsDetail.material }}</span></li>
      <li>尺寸<span>{{ goodDetail.tbGoodsDetail.size }}</span></li>
    </ul>
    <ul v-else-if="type == 2" class="param">
      <li v-if="goodDetail.brandName">品牌<span>{{ goodDetail.brandName }}</span></li>
      <li v-if="goodDetail.tbPresellGoodsDetail.cargoNo">货号<span>{{ goodDetail.tbPresellGoodsDetail.cargoNo }}</span></li>
      <li>材质<span>{{ goodDetail.tbPresellGoodsDetail.material }}</span></li>
      <li>尺寸<span>{{ goodDetail.tbPresellGoodsDetail.size }}</span></li>
    </ul>
    <div class="content">
      <h3>商品简介</h3>
      <img v-for="item in contentList" :src="item" alt="">
    </div>
  </div>
</template>

<script>
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import openApp from "@/components/openApp/openApp";
import openAppBtn from "@/components/openAppBtn/openAppBtn";

export default {
  name: 'goodsDetail',
  data() {
    return {
      goodId: '',
      type: '',
      goodDetail: {
        sellPrice: ''
      },
      bannerList: [],
      contentList: [],
      swiperOption: {
        autoHeight: true, // 高度随内容变化
        // preloadImages: true,
        // updateOnImagesReady : true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        on: {
          // imagesReady: function(){
          //   alert('图片加载完成了');
          // },
        },
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    openApp,
    openAppBtn,
  },
  directives: {
    swiper: directive
  },
  created() {
    this.goodId = this.$route.query.goodId
    this.type = this.$route.query.type
    this.getGoodsDetail()
  },
  mounted() {
  },
  methods: {
    getGoodsDetail() {
      console.log(this.goodId)
      this.$http({
        url: this.type == 1 ? '/goodsmanage/app/goods/ls/' + this.goodId : '/goodsmanage/login/presellgoods/detail/' + this.goodId,
        method: 'GET',
      })
        .then(res => {
          this.goodDetail = res.data
          for (let i = 0; i < res.data.images.length; i++) {
            if (res.data.images[i].type == 1) {
              this.bannerList.push(res.data.images[i].url)
            }else if (res.data.images[i].type == 2){
              this.contentList.push(res.data.images[i].url)
            }
          }
          this.$nextTick(function () { // 赋值swiper-wrapper高度（swiper的imagesReady事件貌似没有执行）
            let img = document.querySelector('.swiper-wrapper .swiper-slide:first-child img')
            img.onload = function () {
              document.querySelector('.swiper-wrapper').style.height = img.height + 'px'
            }
          })
        }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper-container {
  padding-bottom: 15px
  background-color: #fff
  .swiper-pagination {
    bottom: 0
  }
}
>>> .swiper-pagination-bullet-active {
  background-color: black-1c
}
.swiper-slide img {
  width: 100%
}
.goods-head {
  padding: .6em
  font-size 16rem
  text-align: center
  background-color: #fff
  .price {
    font-size 18rem
    font-weight: bold
    margin-bottom: .4em
  }
  .title {
    line2()
  }
}
.genuine img {
  width: 100%
}
.param {
  margin-top: .6em
  padding: .6em
  background-color: #fff
  li {
    line-height: 2
    line1()
    span {
      float: right
    }
  }
}
.content {
  background-color: #fff
  h3{
    line-height: 2
    padding-left: .6em
  }
  margin-top: .6em
  img{
    width: 100%
  }
}
</style>