<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in articleList" @click="goArticleDetail(item.id)">
        <div class="l">
          <div class="img-ct" :style="{backgroundImage: 'url(' + item.topImage +  ')'}">
          </div>
        </div>
        <div class="r">
          <h3>{{item.title}}</h3>
          <div>
            <span>{{item.browseNumber}}浏览</span><b>·</b>
            <span>{{item.supportNumber}}点赞</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="load-status">
      <p v-if="articleLoading">加载中...</p>
      <p v-if="articleLoaded">没有更多了~</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'articleList',
  data() {
    return {
      articleList: [],
      pageSize: 10,
      pageNumber: 1,
      articleLoading: false,
      articleLoaded: false,
    }
  },
  props: {
    title: '',
    token: '',
    getArticleListCreated: {
      default: true
    },
  },
  components: {
  },
  created() {
    if(this.getArticleListCreated) this.getArticleList()
  },
  mounted() {
    window.addEventListener('scroll', this.scroll)
    this.$on("hook:beforeDestroy", () => {
      window.removeEventListener('scroll', this.scroll)
    })
  },
  methods: {
    getArticleList(e) {
      if(e == 1) {
        this.pageNumber = 1
        this.articleList = []
      }
      this.articleLoading = true
      this.$http({
        url: '/userorg/app/news/ls',
        method: 'GET',
        params: {
          title: this.title,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        }
      })
        .then(res => {
          if(this.pageNumber == res.data.lastPage) {
            this.articleLoaded = true
          }
          this.pageNumber++
          this.articleList = this.articleList.concat(res.data.list)
          this.articleLoading = false
        }).catch(e => {
        this.articleLoading = false
        console.log(e)
      })
    },
    scroll() {
      if (this.articleLoading || this.articleLoaded) {
        return
      }
      if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight - 100) {
        this.getArticleList()
      }
    },
    goArticleDetail(articleId) {
      this.$router.push({path: '/articleDetail', query: {articleId: articleId, token: this.token}})
    },
  }
}
</script>

<style lang="stylus" scoped>
.list{
  margin-top: .6em
  padding: .6em
  li{
    display: flex
    //margin-top: .6em
    padding: .6em
    background-color: #fff
    .l{
      .img-ct{
        position: relative
        padding-bottom: 75%
        width: 8em
        height: 0
        background-position: center center;
        background-size: cover;
        border-radius: .4em;
      }
    }
    .r{
      flex: 1
      width: 0
      padding-left: .6em
      h3{
        margin-top: .3em
        line2()
        font-size 16rem
        height: 2.8em
      }
      div{
        margin-top: .3em
        color: #999
        span{
          display: inline-block
        }
        b{
          display: inline-block
          padding: 0 5px
        }
      }
    }
  }
}
  .load-status{
    padding: 1em 0
    text-align: center
    color: #666
  }
</style>