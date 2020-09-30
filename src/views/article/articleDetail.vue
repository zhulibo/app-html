<template>
  <div>
    <div class="article">
      <div class="topImg">
        <img :src="detail.topImage" alt="">
      </div>
      <div class="head">
        <h1>{{detail.title}}</h1>
      </div>
      <div class="info">
        <span><i class="iconfont icon-liulan"></i>{{detail.browseNumber}}</span>
        <span><i class="iconfont icon-shoucang"></i>{{detail.supportNumber}}</span>
        <span>{{detail.createTime | timestampToDate}}</span>
      </div>
      <div class="content" v-html="detail.content">
      </div>
    </div>
  </div>
</template>

<script>
import articleSch from "@/views/article/articleSch";

export default {
  name: 'articleDetail',
  data() {
    return {
      id: this.$route.query.id,
      detail: {},
    }
  },
  created() {
    this.getArticleDetail()
  },
  mounted() {
  },
  methods: {
    getArticleDetail() {
      this.$http({
        url: '/userorg/app/news/detail',
        method: 'GET',
        params: {
          id: this.id
        }
      })
        .then(res => {
          this.detail = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    invokeAppArticleShare() {
      let params = {
        articleId: this.articleId,
      }
      if (this.global.isIos) {
        window.webkit.messageHandlers.invokeAppArticleShare.postMessage(params)
      } else {
        window.android.invokeAppArticleShare(JSON.stringify(params))
      }
    }
  },
  beforeRouteLeave(to, from, next){
    if(to.path == '/articleSch') {
      next({path: '/article'})
    }else {
      next() // 注意：这边next必须要写
    }
  },
}
</script>

<style lang="stylus" scoped>
.article{
  padding-bottom: 1em
  background-color: #fff
  .topImg{
    img{
      width: 100%
    }
  }
  .head{
    margin-top: 1em
    padding: 0 .6em
    h1{
      font-size 16rem
      text-align: center
      line3()
    }
  }
  .info{
    margin-top: .6em
    padding: 0 .6em
    color: #999
    span{
      display: inline-block
      margin-right: 1em
      font-size 13rem
      i{
        display: inline-block
        margin-right: .2em
      }
      &:last-child{
        margin-right: 0
        float: right
      }
    }
  }
  .content{
    margin-top: 1em
    >>>p{
      margin-bottom: .6em
      padding: 0 .6em
    }
    >>>img{
      width: 100%
    }
  }
}
</style>