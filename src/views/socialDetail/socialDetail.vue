<template>
  <div>
    <open-app></open-app>
    <open-app-btn></open-app-btn>
    <div class="swiper-container gallery-top">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in socialDetail.articleImageList" :key="item.image">
          <img :src="item.image">
        </div>
      </div>
    </div>
    <div class="swiper-container gallery-thumbs" v-show="socialDetail.articleImageList.length>1">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in socialDetail.articleImageList" :key="item.image">
          <div :style="{backgroundImage: 'url(' + item.image +  ')'}"></div>
        </div>
      </div>
    </div>
    <div class="param">
      <h2>{{ socialDetail.title }}</h2>
      <h3>{{ socialDetail.content }}</h3>
      <p>{{ socialDetail.createTime | dateToCustomizeTime }}</p>
    </div>
    <div class="related-goods" v-if="socialDetail.good">
      <div class="related-goods-ct">
        <img :src="socialDetail.good.icon" mode="">
        <span>{{ socialDetail.good.title }}</span>
      </div>
    </div>
    <div class="like" v-if="likeList.length > 0">
      <div class="l">
        <img :src="item.header" v-for="item in likeList">
      </div>
      <div class="r">
        <span>已有{{ likeTotalCount }}位用户赞<i class="iconfont icon-youjiantou"></i></span>
      </div>
    </div>
    <div class="social-comment" v-if="socialCommentList.length>0">
      <dl>
        <dt>共{{ socialDetail.commentNum }}条评论</dt>
        <dd v-for="item in socialCommentList">
          <div class="l"><img :src="item.userHeader" alt=""></div>
          <div class="r">
            <h3>{{ item.userName }}</h3>
            <p>{{ item.content }}<span>{{ item.createTime | dateToCustomizeTime }}</span></p>
            <ul v-if="item.level2Comment">
              <li v-for="item2 in item.level2Comment">
                <div class="l"><img :src="item2.userHeader" alt=""></div>
                <div class="r">
                  <h3>{{ item2.userName }}</h3>
                  <p>{{ item2.content }}<span>{{ item2.createTime | dateToCustomizeTime }}</span></p>
                </div>
              </li>
            </ul>
          </div>
        </dd>
      </dl>
    </div>
    <div class="social-recommend">
      <h2>为您推荐</h2>
      <ul class="socialRecommendList1">
        <li v-if="item" v-for="item in socialRecommendList1">
          <img v-if="item.articleImageList" :src="item.articleImageList[0].image" alt="" @load="doSort()">
          <img v-else :src="item.videoImage" alt="" @load="doSort()">
          <div class="ct">
            <h3>{{ item.content }}</h3>
            <div class="auther clearfix">
              <img :src="item.issuerHeader" alt="">
              <span>{{ item.issuerName }}</span>
              <b><i class="iconfont icon-shoucang"></i> {{ item.supportNum }}</b>
            </div>
          </div>
        </li>
      </ul>
      <ul class="socialRecommendList2">
        <li v-if="item" v-for="item in socialRecommendList2">
          <img v-if="item.articleImageList" :src="item.articleImageList[0].image" alt="" @load="doSort()">
          <img v-else :src="item.videoImage" alt="" @load="doSort()">
          <div class="ct">
            <h3>{{ item.content }}</h3>
            <div class="auther clearfix">
              <img :src="item.issuerHeader" alt="">
              <span>{{ item.issuerName }}</span>
              <b><i class="iconfont icon-shoucang"></i> {{ item.supportNum }}</b>
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
      socialCommentList: [],
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
    this.getSocialCommentList()
    this.getSocialRecommendList()
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
    this.$on("hook:beforeDestroy", () => {
      window.removeEventListener('scroll', this.scroll)
    })
  },
  methods: {
    getSocialDetail() {
      let formData = new FormData()
      formData.append('id', this.shareId)
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
            })
            let galleryTop = new Swiper('.gallery-top', {
              autoHeight: true, // 高度随内容变化
              spaceBetween: 0,
              thumbs: {
                swiper: galleryThumbs
              }
            })
          })
          // 赋值swiper-wrapper高度（swiper的imagesReady事件貌似没有执行）
          this.$nextTick(() => {
            let img = document.querySelector('.swiper-wrapper .swiper-slide:first-child img')
            img.onload = function () {
              document.querySelector('.swiper-wrapper').style.height = img.height + 'px'
            }
          })
        }).catch(e => {
        console.log(e)
      })
    },
    getLikeList() {
      let formData = new FormData();
      formData.append('articleId', this.shareId)
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
        }).catch(e => {
        console.log(e)
      })
    },
    getSocialCommentList() {
      let formData = new FormData()
      formData.append('itemId', this.shareId)
      formData.append('type', 2)
      this.$http({
        url: '/cartoonThinker/system/articlecomment/articleList/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.socialCommentList = res.data
          for (let i = 0; i < this.socialCommentList.length; i++) {
            this.socialCommentList[i].level2Comment = []
            this.getSocialCommentList2(this.socialCommentList[i].id)
          }
        }).catch(e => {
        console.log(e)
      })
    },
    getSocialCommentList2(id) {
      let formData = new FormData()
      formData.append('itemId', id)
      formData.append('type', 2)
      this.$http({
        url: '/cartoonThinker/system/articlecomment/articlelevel2list/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          for (let i = 0; i < this.socialCommentList.length; i++) {
            if (this.socialCommentList[i].id == id && res.data[0] != null) {
              this.$set(this.socialCommentList[i], 'level2Comment', res.data)
            }
          }
        }).catch(e => {
        console.log(e)
      })
    },
    getSocialRecommendList() {
      this.waterfallLoading = true
      let formData = new FormData()
      formData.append('pageSize', this.pageSize)
      formData.append('pageIndex', this.pageNum)
      formData.append('position', '2')
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
        }).catch(e => {
        console.log(e)
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
  }
  p {
    padding: .2em 0
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
.social-comment {
  margin-top: .6em
  padding: 1em
  font-size 13rem
  background-color: #fff
  dd {
    margin-top: 1em
    display: flex
  }
  li {
    display: flex
    margin-top: .4em
    padding: .6em 0
    .l {
      display: inline-block
      img {
        width: 1.8em
        height: 1.8em
      }
    }
  }
  .l {
    margin-right: .6em
    display: inline-block
    img {
      width: 2em
      height: 2em
      border-radius: 50%;
    }
  }
  .r {
    flex: 1
    h3 {
      color: #999
      padding-bottom: .4em
    }
    span {
      display: inline-block
      padding-left: .5em
      font-size 10rem
      color: #999
    }
  }
}
.social-recommend {
  padding: .6em 0
  overflow: hidden
  h2 {
    padding: 0 .6em
  }
  ul {
    float: left
    display: inline-block
    margin-left: .3em
    width: calc((100vw - .9em) / 2)
  }
  li {
    margin-top: .3em
    background-color: #fff
    border-radius: .3em;
    overflow: hidden
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