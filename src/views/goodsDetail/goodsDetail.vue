<template>
  <div>
    <open-app :extinfo="{page: 'socialDetail', id: 123}"></open-app>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in bannerList">
          <img :src="item">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="goods-head">
      <div class="price" v-if="goodDetail.sellPrice">￥{{goodDetail.sellPrice}}</div>
      <div class="price" v-else>￥---</div>
      <div class="title">{{goodDetail.title}}</div>
    </div>
    <div class="genuine">
      <img :src="goodDetail.qualityAssuranceImage" alt="">
    </div>
    <ul class="param">
      <li>品牌<span>{{goodDetail.brandName}}</span></li>
      <li>货号<span>{{goodDetail.cargoNo}}</span></li>
      <li>材质<span>{{goodDetail.material}}</span></li>
      <li>尺寸<span>{{goodDetail.size}}</span></li>
    </ul>
    <div class="content">
      <div v-html="goodDetail.content"></div>
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
      goodDetail: {
        sellPrice: ''
      },
      bannerList: null,
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
    this.getGoodsDetail()
  },
  mounted() {
  },
  methods: {
    getGoodsDetail() {
      let formData = new FormData();
      formData.append('id', this.goodId);
      this.$http({
        url: '/cartoonThinker/system/good/goodDetail/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.goodDetail = res.data
          this.bannerList = res.data.images.split(';')
          this.bannerList.pop()
          this.$nextTick(function () { // 赋值swiper-wrapper高度（swiper的imagesReady事件貌似没有执行）
            let img = document.querySelector('.swiper-wrapper .swiper-slide:first-child img')
            img.onload = function () {
              document.querySelector('.swiper-wrapper').style.height = img.height + 'px'
            }
          })
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
  margin-top: .6em
}
</style>