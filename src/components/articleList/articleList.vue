<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in articleList" @click="goArticleDetail(item.id)">
        <div class="l">
          <div class="img-ct">
            <img :src="item.topImage" alt="">
          </div>
        </div>
        <div class="r">
          <h3>{{item.title}}</h3>
          <div v-html="item.content"></div>
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
    getArticleListCreated: {
      default: true
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
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
        url: '/userorg/app/news',
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
          // 提取文章html的前一百个字符
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].content = res.data.list[i].content.substring(0,100);
          }
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
    goArticleDetail(id) {
      this.$router.push({path: '/articleDetail', query: {id: id}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.list{
  padding: .6em
  li{
    display: flex
    margin-top: .6em
    padding: .6em
    background-color: #fff
    .l{
      .img-ct{
        position: relative
        padding-bottom: 50%
        width: 10em
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
    .r{
      flex: 1
      width: 0
      padding-left: .6em
      h3{
        line1()
      }
      div{
        margin-top: .6em
        height: 2.8em
        line2()
        >>>img{
          display: none
        }
        >>>video{
          display: none
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