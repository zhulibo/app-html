<template>
  <div>
    <open-app :extinfo="{page: 'socialDetail', id: 123}"></open-app>
    <open-app-btn :extinfo="{page: 'socialDetailVideo', id: 123}"></open-app-btn>
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in socialDetail.articleImageList" :key="item.image">
          <img :src="item.image">
        </div>
      </div>
    </div>
    <div class="swiper-container gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in socialDetail.articleImageList" :key="item.image">
          <div :style="{backgroundImage: 'url(' + item.image +  ')'}"></div>
        </div>
      </div>
    </div>
    <div class="param">
      <h2>{{socialDetail.content}}</h2>
      <p>{{socialDetail.createTime | dateToCustomizeTime}}</p>
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
        <span>已有{{likeTotalCount}}位用户赞<i class="iconfont icon-youjiantou"></i></span>
      </div>
    </div>
    <div class="social-recommend">
      <h2>为您推荐</h2>
      <ul class="socialRecommendList1">
        <li v-if="item" v-for="item in socialRecommendList1">
          <img v-if="item.articleImageList" :src="item.articleImageList[0].image" alt="" @load="doSort()">
          <img v-else :src="item.videoImage" alt="" @load="doSort()">
          <div class="ct">
            <h3>{{item.content}}</h3>
            <div class="auther clearfix">
              <img :src="item.issuerHeader" alt="">
              <span>{{item.issuerName}}</span>
              <b><i class="iconfont icon-shoucang"></i> {{item.supportNum}}</b>
            </div>
          </div>
        </li>
      </ul>
      <ul class="socialRecommendList2">
        <li v-if="item" v-for="item in socialRecommendList2">
          <img v-if="item.articleImageList" :src="item.articleImageList[0].image" alt="" @load="doSort()">
          <img v-else :src="item.videoImage" alt="" @load="doSort()">
          <div class="ct">
            <h3>{{item.content}}</h3>
            <div class="auther clearfix">
              <img :src="item.issuerHeader" alt="">
              <span>{{item.issuerName}}</span>
              <b><i class="iconfont icon-shoucang"></i> {{item.supportNum}}</b>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p class="loading">加载中...</p>
  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/css/swiper.css'
import openApp from "@/components/openApp/openApp";
import openAppBtn from "@/components/openAppBtn/openAppBtn";

export default {
  name: 'socialDetail',
  data() {
    return {
      shareId: '',
      socialDetail: {
        articleImageList: []
      },
      likeList: [],
      likeTotalCount: null,
      socialRecommendList: [],
      socialRecommendList1: [],
      socialRecommendList2: [],
      waterfallLoading: false,
      waterfallIndex: 0,
      pageSize: 10,
      pageNum: 1,
    }
  },
  components: {
    openApp,
    openAppBtn,
  },
  created() {
    this.shareId = this.$route.query.shareId
    this.getSocialDetail()
    this.getLikeList()
    this.getSocialRecommendList()
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
    this.$on("hook:beforeDestroy", () => {
      window.removeEventListener('scroll', this.scroll);
    })
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
          // 初始化轮播图并关联缩略图
          this.$nextTick(() => {
            let galleryThumbs = new Swiper('.gallery-thumbs', {
              spaceBetween: 5,
              slidesPerView: 5,
              freeMode: true,
              watchSlidesVisibility: true,
              watchSlidesProgress: true,
            });
            let galleryTop = new Swiper('.gallery-top', {
              autoHeight: true, // 高度随内容变化
              spaceBetween: 0,
              thumbs: {
                swiper: galleryThumbs
              }
            });
          })
          // 赋值swiper-wrapper高度（swiper的imagesReady事件貌似没有执行）
          this.$nextTick(() => {
            let img = document.querySelector('.swiper-wrapper .swiper-slide:first-child img')
            img.onload = function () {
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
          this.likeTotalCount = res.page.totalCount
        })
    },
    getSocialRecommendList() {
      this.waterfallLoading = true
      let formData = new FormData();
      formData.append('pageSize', this.pageSize);
      formData.append('pageIndex', this.pageNum);
      formData.append('position', '2');
      this.$http({
        url: '/cartoonThinker/app/articleOther/list/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.socialRecommendList = res.data
          this.pageNum++
          this.doSort()
        })
    },
    doSort() {
      let socialRecommendList1 = document.querySelector('.socialRecommendList1')
      let socialRecommendList2 = document.querySelector('.socialRecommendList2')

      if (this.waterfallIndex >= this.socialRecommendList.length) {
        this.waterfallIndex = 0
        this.waterfallLoading = false
        return false
      }

      // console.log(socialRecommendList1.offsetHeight)
      // console.log(socialRecommendList2.offsetHeight)
      // console.log('----')

      if (socialRecommendList1.offsetHeight <= socialRecommendList2.offsetHeight) {
        this.socialRecommendList1.push(this.socialRecommendList[this.waterfallIndex])
      } else {
        this.socialRecommendList2.push(this.socialRecommendList[this.waterfallIndex])
      }

      this.waterfallIndex++

    },
    scroll() {
      if (this.waterfallLoading) {
        return
      }
      if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight - 400) {
        this.getSocialRecommendList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper-container {
  background-color: #fff
}
.swiper-slide img {
  width: 100%
  transition all 1s
}
.gallery-thumbs .swiper-slide {
  position: relative
  margin-top: 7px
  padding-bottom: 19%
  div {
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-position: center center;
    background-repeat no-repeat
    background-size: cover;
    border: 2px solid #fff
    box-sizing border-box
  }
  &.swiper-slide-thumb-active div {
    border: 2px solid purple
  }
}
.param {
  padding: .8em .6em 1em
  background-color: #fff
  h2 {
    font-size 16rem
    margin-bottom: .3em
  }
  p {
    font-size 12rem
    color: #999
  }
}
.related-goods {
  padding: 0 .6em 1em .6em
  background-color: #fff
  .related-goods-ct {
    padding: .6em
    display: flex
    background-color: bg-f5
    img {
      margin-right: .6em
      height: 4em
    }
    span {
      flex: 1
      align-items: center;
      line2()
      display: flex
    }
  }
}
.like {
  display: flex
  justify-content: space-between;
  padding: 0 .6em 1em .6em
  padding-top: 0
  background-color: #fff
  .l {
    img {
      box-sizing border-box
      width: 2em
      height: 2em
      border-radius: 50%;
      border: 2px solid #fff
      &:not(:nth-child(1)) {
        margin-left: -.4em
      }
    }
  }
  .r {
    line-height: 2
    text-align: right
    span {
      font-size 12rem
      color: #999
    }
  }
}
.social-recommend {
  padding: 1em 0
  overflow: hidden
  h2 {
    padding: 0 .6em
    font-size 18rem
    font-weight: bold
  }
  ul {
    float: left
    display: inline-block
    margin-left: .6em
    width: calc((100vw - 1.8em) / 2)
  }
  li {
    margin-top: .6em
    background-color: #fff
    > img {
      width: 100%
    }
    h3 {
      display: flex
      margin-bottom: .6em
      line2()
    }
    .ct {
      padding: .6em
    }
    .auther {
      font-size 12rem
      img {
        width: 1.5em
        height: 1.5em
        border-radius: 50%;
        vertical-align baseline
      }
      span {
        display: inline-block
        height: 1.5em
        line-height: 1.5
        padding-left: .2em
        width: 8em
        overflow: hidden
        vertical-align top
      }
      b {
        font-weight: normal
        color: #999
        float: right
      }
    }
  }
}
.loading {
  padding: 1em
  text-align: center
}
</style>