<template>
  <div class="ct">
    <div class="sch">
      <div class="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="sch-ct">
        <input type="text" @focus="goArticleSch" placeholder="请输入您要查找的内容">
        <span><i class="iconfont icon-search"></i></span>
      </div>
    </div>
    <div v-swiper:mySwiper="swiperOption" class="banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, index) in articleRecommendList">
          <div class="item-ct" @click="goArticleDetail(item.id)">
            <img :src="item.topImage">
          </div>
        </div>
      </div>
<!--      <div class="swiper-pagination"></div>-->
    </div>
    <article-list></article-list>
  </div>
</template>

<script>
import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import articleList from "@/components/articleList/articleList"

export default {
  name: 'article1',
  data() {
    return {
      articleRecommendList: [],
      swiperOption: {
        // pagination: {
        //   el: '.swiper-pagination',
        // },
        // autoplay: {
        //   delay: 5000,
        // },
        // loop : true,
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 1.1,
        spaceBetween: 30,
        coverflowEffect: {
          rotate: 0,
          // stretch: -20,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        },
      },
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    articleList,
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
    this.getArticleRecommendList()
  },
  mounted() {
  },
  methods: {
    getArticleRecommendList() {
      this.$http({
        url: '/userorg/app/news/recommend',
        method: 'GET',
      })
        .then(res => {
          this.articleRecommendList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    goArticleSch(id) {
      this.$router.push({path: '/articleSch', query: {}})
    },
    goArticleDetail(id) {
      this.$router.push({path: '/articleDetail', query: {id: id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.sch{
  display: flex
  padding: .6em
  background-color: #fff
  .back{
    width: 2.6em
    text-align: center
    line-height: 2.6em
    i{
      font-size 20rem
      color: #ccc
    }
  }
  .sch-ct{
    flex: 1
    display: flex
    margin-right: 2.6em
    border-radius: 1.3em
    background-color: #f5f5f5
    input{
      flex: 1
      padding-left: 1em
      height: 2.6em
      line-height: 2.6em
      background-color: transparent
      border: none
      &::-webkit-input-placeholder {
        font-size 13rem
        color: #999
      }
    }
    span{
      width: 2.6em
      line-height: 2.6em
      text-align: center
      i{
        font-size 20rem
        color: #ccc
      }
    }
  }
}
  .banner{
    margin-top: 1em
    .item-ct{
      position: relative
      padding-bottom: 50%
      width: 100%
      height: 0
      img{
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      }
    }
  }
</style>