<template>
  <div>
    <open-app :extinfo="{page: 'socialDetail', id: 123}"></open-app>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in socialDetail.articleImageList">
          <img :src="item.image">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="param">
      <h2>{{socialDetail.content}}</h2>
      <p>{{socialDetail.createTime}}</p>
    </div>
    <div class="related-goods" v-if="socialDetail.good">
      <div class="related-goods-ct">
        <img :src="socialDetail.good.icon" mode=""></img>
        <span>{{socialDetail.good.title}}</span>
      </div>
    </div>
    <div class="like" v-if="likeList.length > 0">
      <div class="l">
        <img :src="item.header" v-for="item in likeList">
      </div>
      <div class="r">
        <span>已有{{socialDetail.supportNum}}位用户赞<i class="iconfont icon-youjiantou"></i></span>
      </div>
    </div>
    <div class="social-recommend">
      <h2>为您推荐</h2>
      <ul>
        <li v-for="item in socialRecommendList">
          <img :src="item.articleImageList[0].image" alt="">
          <div class="ct">
            <h3>{{item.content}}</h3>
            <div class="auther clearfix">
              <img :src="item.issuerHeader" alt="">
              <span>{{item.issuerName}}</span>
              <b v-if="item.commentList"><i class="iconfont icon-shoucang"></i> {{item.commentList.length}}</b>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="h6em"></div>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import openApp from "../../components/openApp/openApp";
  import openAppBtn from "../../components/openAppBtn/openAppBtn";

  export default {
    name: 'socialDetail',
    data() {
      return {
        shareId: '',
        socialDetail: {
        },
        likeList: [],
        socialRecommendList: [],
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
      this.shareId = this.$route.query.shareId
      this.getSocialDetail()
      this.getLikeList()
      this.getSocialRecommendList()
    },
    mounted() {
    },
    methods: {
      getSocialDetail() {
        let formData = new FormData();
        formData.append('id', this.shareId);
        this.$http({
          url: '/cartoonThinker/system/article/look/json',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          data: formData,
        })
          .then(res => {
            this.socialDetail = res.data
            this.$nextTick(function(){ // 赋值swiper-wrapper高度（swiper的imagesReady事件貌似没有执行）
              let img = document.querySelector('.swiper-wrapper .swiper-slide:first-child img')
              img.onload = function() {
                document.querySelector('.swiper-wrapper').style.height = img.height + 'px'
              }
            })
          })
      },
      getLikeList() {
        let formData = new FormData();
        formData.append('articleId', this.shareId);
        this.$http({
          url: '/cartoonThinker/system/userinfo/supportList/json',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          data: formData,
        })
          .then(res => {
            if (res.data.length > 5) {
              this.likeList = res.data.slice(0, 5)
            } else {
              this.likeList = res.data
            }
          })
      },
      getSocialRecommendList() {
        let formData = new FormData();
        // formData.append('id', this.shareId);
        this.$http({
          url: '/cartoonThinker/app/articleOther/topPlayer/json',
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          data: formData,
        })
          .then(res => {
            this.socialRecommendList = res.data
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .swiper-container{
    padding-bottom: 15px
    background-color: #fff
    .swiper-pagination{
      bottom: 0
    }
  }
  >>> .swiper-pagination-bullet-active{
    background-color: black-1c
  }
  .swiper-slide img{
    width: 100%
    transition all 1s
  }
  .param{
    padding: .8em .6em 1em
    background-color: #fff
    h2{
      font-size 16rem
      margin-bottom: .3em
    }
    p{
      font-size 12rem
      color: #999
    }
  }
  .related-goods{
    padding: 0 .6em 1em .6em
    background-color: #fff
    .related-goods-ct{
      padding: .4em
      display: flex
      background-color: bg-f5
      img{
        margin-right: .6em
        height: 3em
      }
      span{
        display: flex
        align-items: center;
        flex: 1
        line2()
      }
    }
  }
  .like{
    display: flex
    justify-content: space-between;
    padding: 0 .6em 1em .6em
    padding-top: 0
    background-color: #fff
    .l{
      img{
        box-sizing border-box
        width: 2em
        height: 2em
        border-radius: 50%;
        border: 2px solid #fff
        &:not(:nth-child(1)){
          margin-left: -.4em
        }
      }
    }
    .r{
      line-height: 2
      text-align: right
      span{
        font-size 12rem
        color: #999
      }
    }
  }
  .social-recommend{
    padding: 1em .8em
    h2{
      font-size 18rem
      font-weight: bold
    }
    ul{
      column-count: 2;
      column-gap .8em
    }
    li{
      display: inline-block
      margin-top: .4em
      background-color: #fff
      >img{
        width: 100%
      }
      h3{
        display: flex
        margin-bottom: .6em
        line2()
      }
      .ct{
        padding: .6em
      }
      .auther{
        font-size 12rem
        img{
          width: 1.5em
          height: 1.5em
          border-radius: 50%;
          vertical-align baseline
        }
        span{
          display: inline-block
          height: 1.5em
          line-height: 1.5
          padding-left: .2em
          width: 8em
          overflow: hidden
          vertical-align top
        }
        b{
          font-weight: normal
          color: #999
          float: right
        }
      }
    }
  }
</style>
