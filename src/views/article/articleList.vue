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
            <span>去看看</span>
          </div>
        </div>
      </div>
    </div>
    <article-list :token="userInfo.token"></article-list>
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
      userInfo:{
        token: ''
      },
      articleRecommendList: [],
      swiperOption: {
        effect: 'coverflow',
        centeredSlides: true,
        slidesPerView: 1.08,
        spaceBetween: 20,
        coverflowEffect: {
          rotate: 0, // slide做3d旋转时Y轴的旋转角度
          stretch: 0, // 每个slide之间的拉伸值，越大slide靠得越紧。5.3.6 后可使用%百分比
          depth: 80, // slide的位置深度。值越大z轴距离越远，看起来越小。
          modifier: 1, // depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。
          slideShadows: false, // 是否开启slide阴影
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
  created() {
    // 保存url中的token至vuex
    this.userInfo.token = this.$route.query.token
    if(this.userInfo.token) {
      this.$store.dispatch('updateUserInfo', this.userInfo)
    }

    this.getArticleRecommendList()
  },
  mounted() {
  },
  methods: {
    getArticleRecommendList() {
      this.$http({
        url: '/userorg/app/news/recommend/ls',
        method: 'GET',
      })
        .then(res => {
          this.articleRecommendList = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    goArticleSch() {
      this.$router.push({path: '/articleSch', query: {token: this.userInfo.token}})
    },
    goArticleDetail(articleId) {
      this.$router.push({path: '/articleDetail', query: {articleId: articleId, token: this.userInfo.token}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.ct{
  background-color: #fff
}
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
    background-color: #F5F5FA
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
      border-radius: 1em;
      overflow: hidden
      img{
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      }
      span{
        position: absolute
        bottom: 1em
        right: 1em
        z-index: 100
        btn1()
        color: purple
        background-color: #fff
        padding: 0 .8em
        height: 2em
        line-height: 2
        box-shadow 0 0 .5em rgba(0,0,0,.2)
      }
    }
  }
</style>