<template>
  <div>
    <div class="comment">
      <ul>
        <li v-for="item in commentList">
          <div class="l"><img src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11218.jpg" alt=""></div>
          <div class="r">
            <div class="t" @click="clickComment(1, item.id, item.itemId, item.userId, item.detail.nickName)">
              <h3>{{item.detail.nickName}} <span><i class="iconfont icon-shoucang"></i>{{item.supportNum}}</span></h3>
              <p>{{item.content}} <i>{{item.createTime | dateToCustomizeTime}}</i></p>
            </div>
            <div class="b">
              <dl>
                <dd v-for="item2 in item.children">
                  <template v-if="item2.level == 2">
                    <div class="l"><img src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11218.jpg" alt=""></div>
                    <div class="r" @click="clickComment(2, item2.id, item2.itemId, item2.userId, item2.detail.nickName, item2.rootId,)">
                      <h4><span>{{item2.detail.nickName}}</span><i>{{item2.createTime | dateToCustomizeTime}}</i></h4>
                      <p>{{item2.content}}</p>
                    </div>
                  </template>
                  <template v-if="item2.level == 3">
                    <div class="l"><img src="http://cartoonthinker-bucket.oss-cn-shanghai.aliyuncs.com/11218.jpg" alt=""></div>
                    <div class="r" @click="clickComment(3, item2.id, item2.itemId, item2.userId, item2.detail.nickName, item2.rootId, item2.secondId)">
                      <h4><span>{{item2.replyUserName}}</span> 回复 <span>{{item2.detail.nickName}}</span><i>{{item2.createTime | dateToCustomizeTime}}</i></h4>
                      <p>{{item2.content}}</p>
                    </div>
                  </template>
                </dd>
              </dl>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="head-bar">
      <div class="l" @click="back"><i class="iconfont icon-fanhui"></i></div>
      <div class="m"></div>
      <div class="r"><i class="iconfont icon-wujiaoxingkong" :class="{on: detail.isCollect}"></i></div>
    </div>
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
    <div class="article-recommend">
      <div class="title">
        <h2>文章推荐</h2>
      </div>
      <ul>
        <li v-for="(item, index) in articleRecommendList" @click="goArticleDetail(item.id)">
          <img :src="item.topImage">
        </li>
      </ul>
    </div>
    <div v-show="!commentFlag" class="fixed-icon">
      <div class="icon-ct" @click="clickComment(0)"><i class="iconfont icon-pinglun"></i></div>
      <div class="icon-ct" @click="invokeAppArticleShare"><i class="iconfont icon-fenxiang"></i></div>
      <div class="icon-ct" :class="{on: detail.isSupport}" @click="addSupportNumber"><i class="iconfont icon-shoucang"></i></div>
    </div>
    <div v-show="commentFlag" class="comment-input">
      <input ref="commentInput" type="text" v-model="content" :placeholder="commentPlaceholder">
      <button @click="addComment">发送</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'articleDetail',
  data() {
    return {
      id: this.$route.query.id,
      detail: {},
      articleRecommendList: [],
      commentList: [],
      pageSize: 10,
      pageNumber: 1,
      commentFlag: false,
      commentPlaceholder: '',
      content: '',
      level: null,
      itemId: null,
    }
  },
  created() {
    this.getArticleDetail()
    this.addBrowerNumber()
    this.getArticleRecommendList()
    this.getCommentList()
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
    addBrowerNumber() {
      this.$http({
        url: '/userorg/app/news',
        method: 'PUT',
        data: {
          id: this.id,
          browseNumber: 1
        }
      })
        .then(res => {
          this.detail.browseNumber ++
        }).catch(e => {
        console.log(e)
      })
    },
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
    getCommentList() {
      this.$http({
        url: '/userorg/app/news/comment',
        method: 'GET',
        params: {
          newsId: this.id,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        }
      })
        .then(res => {
          this.commentList = res.data.list
          this.pageNumber++
        }).catch(e => {
        console.log(e)
      })
    },
    addSupportNumber() {
      this.$http({
        url: '/userorg/app/news',
        method: 'PUT',
        data: {
          id: this.id,
          supportNumber: 1
        }
      })
        .then(res => {
          this.detail.supportNumber ++
        }).catch(e => {
        console.log(e)
      })
    },
    changeCollectStatus() {
      this.$http({
        url: '/userorg/app/news/collect',
        method: 'POST',
        data: {
          newsId: this.newsId,
          makeType: this.detail.isCollect == 1 ? 2 : 1,
        }
      })
        .then(res => {
          if(this.detail.isCollect == 1) {
            this.detail.supportNumber ++
          }else if(this.detail.isCollect == 2) {
            this.detail.supportNumber --
          }
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
    },
    goArticleDetail(id) {
      if (id == this.id) location.reload()
      this.$router.push({path: '/articleDetail', query: {id: id}})
    },
    back() {
      this.$router.go(-1)
    },
    clickComment(level, id, itemId, replyUserId, nickName, rootId, secondId) {
      for(let i=0;i<arguments.length;i++) {
        console.log(arguments[i])
      }
      this.commentFlag = true
      this.$nextTick(() => {
        this.$refs.commentInput.focus()

        if (level == 0) {
          this.commentPlaceholder = '说点什么...'
          this.level = 1
          this.rootId = ''
          this.secondId = ''
          this.itemId = this.id
          this.replyUserId = ''
          this.rootId = ''
        }else if(level == 1){
          this.level = 2
          this.commentPlaceholder = nickName
          this.rootId = id
          this.secondId = ''
          this.itemId = itemId
          this.replyUserId = replyUserId
        }else if(level == 2){
          this.level = 3
          this.commentPlaceholder = nickName
          this.rootId = rootId
          this.secondId = id
          this.itemId = itemId
          this.replyUserId = replyUserId
        }else if(level == 3){
          this.level = 3
          this.commentPlaceholder = nickName
          this.rootId = rootId
          this.secondId = secondId
          this.itemId = itemId
          this.replyUserId = replyUserId
        }
      })
    },
    addComment() {
      this.$http({
        url: '/userorg/app/news/comment',
        method: 'POST',
        data: {
          level: this.level,
          newsId: this.id,
          rootId: this.rootId,
          secondId: this.secondId,
          itemId: this.itemId,
          replyUserId: this.replyUserId,
          content: this.content,
        }
      })
        .then(res => {
          this.commentFlag = false
        }).catch(e => {
        console.log(e)
      })
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
.head-bar{
  position: fixed
  top: 0
  left: 0
  box-sizing border-box
  width: 100%
  display: flex
  padding: .6em
  color: #ccc
  .l{
    width: 2.6em
    height: 2.6em
    line-height: 2.6em
    text-align: center
    i{
      display: inline-block
      font-size 20rem
      text-shadow 0 0 10px rgba(0,0,0,.2)
    }
  }
  .m{
    flex: 1
  }
  .r{
    width: 2.6em
    height: 2.6em
    line-height: 2.6em
    text-align: center
    i{
      display: inline-block
      font-size 20rem
      text-shadow 0 0 10px rgba(0,0,0,.2)
    }
  }
}
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
      margin-top: .6em
      margin-bottom: .6em
      padding: 0 .6em
    }
    >>>img{
      display: block
      width: 100%
      margin-top: .6em
      margin-bottom: .6em
    }
  }
}
.article-recommend{
  background-color: #fff
  .title{
    padding: .6em
    h2{
      padding-top: .6em
      border-top: 1px solid #ddd
      font-size 18rem
    }
  }
  ul{
    overflow-x auto
    white-space nowrap
    padding: .6em
    li{
      display: inline-block
      margin-right: .6em
      position: relative
      width: 10em
      height: 10em
      overflow hidden
      img{
        position: absolute
        top: 50%
        left: 50%
        height: 100%
        max-width initial
        transform translate(-50%, -50%)
      }
    }
  }
}
.fixed-icon {
  position: fixed
  z-index 100
  box-sizing border-box
  padding: 0 20px
  width: 100%
  left: 0
  bottom: 20px
  .icon-ct{
    display: inline-block
    margin-right: 10px
    width: 3em
    height: 3em
    line-height: 3em
    border-radius: 50%
    box-shadow 0 0 10px rgba(0,0,0,.2)
    color: #ccc
    background-color: #fff
    text-align: center
    i{
      display: inline-block
      height: 100%
      font-size 20rem
    }
    &:last-child{
      transform all .3s
      &.on{
        background-color: #6624E2
      }
      float: right
      margin-right: 0
      color: #fff
      background-color: #ccc
    }
  }
}

.comment-input{
  position: fixed
  z-index 100
  box-sizing border-box
  padding: 5px 10px
  width: 100%
  left: 0
  bottom: 0
  background-color: #fff
  box-shadow 0 -5px 10px rgba(0,0,0,.2)
  display: flex
  input{
    flex: 1
    btn2()
    padding-left: 1em
    text-align: left;
    border-radius: 1.3em;
    background-color: transparent;
  }
  button{
    btn1()
    height: 2.6em
    line-height: 2.6
    border-color: transparent;
    background-color: transparent;
  }
}
.comment{
  padding: .6em
  li{
    display: flex
    margin-top: .6em
    margin-bottom: .6em
    .l{
      width: 2.6em
      height: 2.6em
      border-radius: 50%;
      overflow hidden
      img{
        width: 100%
        height: 100%
      }
    }
    .r{
      width: 0
      margin-left: 10px
      flex: 1
      h3{
        span{
          float: right
          color: #999
        }
      }
      p{
        i{
          font-style: normal
          color: #999
        }
      }
      .b{
        background-color: #f5f5f5
        dd{
          display: flex
          margin-top: .6em
          margin-bottom: .6em
          h4{
            i{
              float: right
              color: #999
              font-style: normal
            }
          }
        }
      }
    }
  }
}
</style>