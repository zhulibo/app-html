<template>
  <div style="background-color: #fff;">
    <open-app v-if="wechatState"></open-app>
    <water-mark :src.sync="waterMarkOptions.src" :dialogVisible.sync="waterMarkOptions.dialogVisible"></water-mark>
    <div class="head-bar" v-if="!wechatState">
      <div class="l" @click="back">
        <img src="../../assets/img/article2.png" alt="">
      </div>
      <div class="m"></div>
      <div class="r" @click="collect">
        <img v-if="detail.isCollect == 1" src="../../assets/img/article4.png" alt="">
        <img v-else src="../../assets/img/article3.png" alt="">
      </div>
    </div>
    <div class="article">
      <div class="topImg">
        <img :src="detail.topImage" alt="">
      </div>
      <div class="head">
        <h1>{{detail.title}}</h1>
      </div>
      <div class="info">
        <span><img src="../../assets/img/article5.png" alt="">{{detail.browseNumber}}</span>
        <span><img src="../../assets/img/article6.png" alt="">{{detail.supportNumber}}</span>
        <span>{{detail.createTime | timestampToDateDay}}</span>
      </div>
      <div class="content" v-html="detail.content" @click="previewImg($event)">
      </div>
      <div class="reship">
        <p v-if="detail.reship">文章转自 {{detail.reship}}</p>
        <p v-else>文章为原创作品</p>
      </div>
    </div>
    <div class="article-recommend">
      <div class="title">
        <h2>文章推荐</h2>
      </div>
      <ul>
        <li v-for="(item, index) in articleRecommendList" @click="goArticleDetail(item.id)" :style="{ background: 'url(' + item.topImage + ') center center/cover no-repeat',}">
        </li>
      </ul>
    </div>
    <div v-show="!commentFlag && !wechatState" class="fixed-icon">
      <div class="icon-ct" @click="clickComment(0)"><i class="iconfont icon-pinglun"></i></div>
      <div class="icon-ct" @click="invokeAppArticleShare"><i class="iconfont icon-fenxiang"></i></div>
      <div class="icon-ct" :class="{on: detail.isSupport}" @click="support"><i class="iconfont icon-shoucang"></i></div>
    </div>
    <div v-show="commentFlag" class="comment-input">
      <input ref="commentInput" type="text" v-model="content" :placeholder="commentPlaceholder">
      <button @click="addComment">发送</button>
    </div>
    <div v-show="commentFlag" class="comment-bg" @click="clickCommentBg"></div>
    <div class="comment">
      <div class="none-comment" v-if="commentList.length == 0">
        <img src="../../assets/img/article1.png" alt="">
        <h3>暂无评论哦~<br>
          来发表第一条评论吧~</h3>
      </div>
      <div class="comment-number" v-if="commentList.length > 0">共{{ detail.totalComment }}条评论</div>
      <ul>
        <li v-for="item in commentList">
          <div class="l">
            <img v-if="item.detail.header" :src="item.detail.header" alt="">
            <img v-else src="../../assets/img/c.png" alt="">
          </div>
          <div class="r">
            <div class="t" @click="clickComment(1, item.id, item.itemId, item.userId, item.detail.nickName)">
              <h3>{{item.detail.nickName}} <span @click.stop="supportComment(item.id,item.isSupport)" :class="item.isSupport == 1 ? 'on' : ''"><i class="iconfont icon-shoucang"></i> {{item.supportNum}}</span></h3>
              <p>{{item.content}} <i>{{item.createTime | dateToCustomizeTime}}</i></p>
            </div>
            <div class="b">
              <dl>
                <dd v-for="item2 in item.children">
                  <template v-if="item2.level == 2">
                    <div class="l">
                      <img v-if="item2.detail.header" :src="item2.detail.header" alt="">
                      <img v-else src="../../assets/img/c.png" alt="">
                    </div>
                    <div class="r" @click="clickComment(2, item2.id, item2.itemId, item2.userId, item2.detail.nickName, item2.rootId,)">
                      <h4><span>{{item2.detail.nickName}}</span><i>{{item2.createTime | dateToCustomizeTime}}</i></h4>
                      <p>{{item2.content}}</p>
                    </div>
                  </template>
                  <template v-if="item2.level == 3">
                    <div class="l">
                      <img v-if="item2.detail.header" :src="item2.detail.header" alt="">
                      <img v-else src="../../assets/img/c.png" alt="">
                    </div>
                    <div class="r" @click="clickComment(3, item2.id, item2.itemId, item2.userId, item2.detail.nickName, item2.rootId, item2.secondId)">
                      <h4><span>{{item2.detail.nickName}}</span> 回复 <span>{{item2.replyUserName}}</span><i>{{item2.createTime | dateToCustomizeTime}}</i></h4>
                      <p>{{item2.content}}</p>
                    </div>
                  </template>
                </dd>
              </dl>
              <div class="more-level-two" v-if="item.hasNextPage" :data-nextPageNum="2" @click="getCommentListMore(item.id)">展开</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="more-level-one" v-if="!levelOneCommentLoaded && commentList.length > 0" @click="getCommentList">加载更多</div>
      <div class="more-level-one" v-else-if="levelOneCommentLoaded && commentList.length > 0">没有更多</div>
    </div>
    <div class="h6em"></div>
  </div>
</template>

<script>
import waterMark from "@/components/imgMark/waterMark";
import openApp from "@/components/openApp/openApp";

export default {
  name: 'articleDetail',
  data() {
    return {
      wechatState: false,
      userInfo:{
        token: ''
      },
      articleId: '',
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
      levelOneCommentLoaded: false,
      waterMarkOptions: {
        src: '',
        dialogVisible: false,
      }
    }
  },
  components: {
    waterMark,
    openApp,
  },
  created() {
    this.invokeAppHiddenTab()
    // 保存url中的token至vuex
    this.userInfo.token = this.$route.query.token
    if(this.userInfo.token) {
      this.$store.dispatch('updateUserInfo', this.userInfo)
    }
    this.articleId = this.$route.query.articleId
    this.getArticleDetail()
    this.addNumber()
    this.getArticleRecommendList()
    this.getCommentList()
    try {
      let wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
      let judgewechat = wechat[1].split('.')
      if (judgewechat[0] >= 7) {
        if (judgewechat[1] >= 0) {
          if (judgewechat[2] >= 12) {
            this.wechatState = true
          }
        }
      }
    } catch (e) {
    }
  },
  mounted() {
  },
  methods: {
    previewImg(event){
      return
      let localName = event.target.localName
      if(localName != 'img') return
      this.waterMarkOptions.src = event.target.getAttribute("src")
      this.waterMarkOptions.dialogVisible = true
    },
    getArticleDetail() {
      this.$http({
        url: this.userInfo.token ? '/userorg/app/news/detail' : '/userorg/app/news/detail/ls',
        method: 'GET',
        params: {
          id: this.articleId
        }
      })
        .then(res => {
          this.detail = res.data
        }).catch(e => {
        console.log(e)
      })
    },
    addNumber() {
      this.$http({
        url: '/userorg/app/news/ls',
        method: 'PUT',
        data: {
          id: this.articleId,
          browseNumber: 1
        }
      })
        .then(res => {
          this.detail.browseNumber ++
        }).catch(e => {
        console.log(e)
      })
      this.$http({
        url: '/userorg/app/news/ls',
        method: 'PUT',
        data: {
          id: this.articleId,
          supportNumber: 1
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
        url: '/userorg/app/news/recommend/ls',
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
        url: this.userInfo.token ? '/userorg/app/news/comment' : '/userorg/app/news/comment/ls',
        method: 'GET',
        params: {
          newsId: this.articleId,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber,
        }
      })
        .then(res => {
          this.commentList = this.commentList.concat(res.data.list)
          this.pageNumber++
          if (!res.data.hasNextPage) {
            this.levelOneCommentLoaded = true
          }
        }).catch(e => {
        console.log(e)
      })
    },
    getCommentListMore(rootId) { // 二级加载更多评论
      let currentTarget = event.currentTarget
      let pageNum = currentTarget.getAttribute("data-nextPageNum") // 下一页数
      if (pageNum == -1) return
      let levelOneIndex // 一级评论index
      for (let i = 0; i < this.commentList.length; i++) {
        if (this.commentList[i].id == rootId){
          levelOneIndex = i
          break
        }
      }
      this.$http({
        url: '/userorg/app/news/comment/more/ls',
        method: 'GET',
        params: {
          rootId: rootId,
          pageSize: 6,
          pageNumber: pageNum,
        }
      })
        .then(res => {
          this.commentList[levelOneIndex].children = this.commentList[levelOneIndex].children.concat(res.data.list)
          if(res.data.hasNextPage){
            pageNum++
          }else{
            pageNum = -1
            currentTarget.innerHTML = '加载完了'
            currentTarget.style.color = '#999'
          }
          currentTarget.setAttribute("data-nextPageNum", pageNum)
        }).catch(e => {
        console.log(e)
      })
    },
    collect() {
      if (!this.userInfo.token){
        this.invokeAppLogin()
        return
      }
      this.$http({
        url: '/userorg/app/news/collect',
        method: 'POST',
        data: {
          newsId: this.articleId,
          makeType: this.detail.isCollect == 0 ? 1 : 2
        }
      })
        .then(res => {
          this.detail.isCollect = this.detail.isCollect == 0 ? 1 : 0
        }).catch(e => {
        console.log(e)
      })
    },
    support() {
      if (!this.userInfo.token){
        this.invokeAppLogin()
        return
      }
      this.$http({
        url: '/userorg/app/news/newSupport',
        method: 'POST',
        data: {
          newId: this.articleId,
          makeType: this.detail.isSupport == 0 ? 1 : 2
        }
      })
        .then(res => {
          if(this.detail.isSupport == 0) {
            this.detail.supportNumber ++
          }else{
            this.detail.supportNumber --
          }
          this.detail.isSupport = this.detail.isSupport == 0 ? 1 : 0

        }).catch(e => {
        console.log(e)
      })
    },
    goArticleDetail(articleId) {
      if (articleId == this.articleId) location.reload()
      this.$router.push({path: '/articleDetail', query: {articleId: articleId, token: this.userInfo.token}})
    },
    back() {
      this.invokeAppBack()
      this.$router.go(-1)
    },
    supportComment(id, isSupport){
      if (!this.userInfo.token){
        this.invokeAppLogin()
        return
      }

      console.log(id, isSupport)
      this.$http({
        url: '/userorg/app/news/support',
        method: 'POST',
        data: {
          commentId: id,
          level: 1,
          makerType: isSupport == 0 ? 1 : 2,
        }
      }).then(res => {
        let index
        for (let i = 0; i < this.commentList.length; i++) {
          if(this.commentList[i].id == id){
            index = i
            break
          }
        }
        if(isSupport == 0){
          this.commentList[index].supportNum ++
          this.commentList[index].isSupport = 1
        }else{
          this.commentList[index].supportNum --
          this.commentList[index].isSupport = 0
        }
      }).catch(e => {console.log(e)})
    },
    clickComment(level, id, itemId, replyUserId, nickName, rootId, secondId) {
      if (!this.userInfo.token){
        this.invokeAppLogin()
        return
      }
      if (level != 0 && !replyUserId) return // 不可以评论自己添加的评论

      // for(let i=0;i<arguments.length;i++) {
      //   console.log(arguments[i])
      // }
      this.commentFlag = true
      this.$nextTick(() => {
        this.$refs.commentInput.focus()

        if (level == 0) {
          this.commentPlaceholder = '说点什么...'
          this.level = 1
          this.rootId = ''
          this.secondId = ''
          this.itemId = this.articleId
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
          this.itemId = id
          this.replyUserId = replyUserId
        }else if(level == 3){
          this.level = 3
          this.commentPlaceholder = nickName
          this.rootId = rootId
          this.secondId = secondId
          this.itemId = id
          this.replyUserId = replyUserId
        }
      })
    },
    clickCommentBg() {
      this.commentFlag = false
      this.content = ''
    },
    addComment() {
      if(!this.content) {
        this.$toast('请输入评论内容')
        return
      }
      this.$http({
        url: '/userorg/app/news/comment',
        method: 'POST',
        data: {
          level: this.level,
          newsId: this.articleId,
          rootId: this.rootId,
          secondId: this.secondId,
          itemId: this.itemId,
          replyUserId: this.replyUserId,
          content: this.content,
        }
      })
        .then(res => {
          // this.commentFlag = false
          // this.pageNumber = 1
          // this.commentList = []
          // this.getCommentList()
          console.log(this.level)
          console.log(this.rootId)

          if (this.level == 1){ // 添加一级评论
            this.commentList.unshift({
              id: res.data.id,
              level: res.data.level,
              createTime: (new Date).getTime(),
              content: this.content,
              detail: {
                header: res.data.detail.header,
                nickName: res.data.detail.nickName,
              },
              hasNextPage: false,
              isSupport: 0,
              supportNum: 0,
            })
          }else if(this.level == 2){  // 评论一级评论
            for (let i = 0; i < this.commentList.length; i++) {
              if (this.commentList[i].id == this.rootId){
                console.log(2333)
                this.commentList[i].children.unshift({
                  id: res.data.id,
                  level: res.data.level,
                  createTime: (new Date).getTime(),
                  content: this.content,
                  detail: {
                    header: res.data.detail.header,
                    nickName: res.data.detail.nickName,
                  },
                  hasNextPage: false,
                  isSupport: 0,
                  supportNum: 0,
                })
              }
            }
          }else if(this.level == 3){ // 评论二三级级评论
            for (let i = 0; i < this.commentList.length; i++) {
              if (this.commentList[i].id == this.rootId){
                console.log(1)
                for (let j = 0; j < this.commentList[i].children.length; j++) {
                  if (this.commentList[i].children[j].id == this.itemId){
                    console.log(2)
                    this.commentList[i].children.splice(j+1, 0,
                      {
                        id: res.data.id,
                        level: res.data.level,
                        createTime: (new Date).getTime(),
                        content: this.content,
                        detail: {
                          header: res.data.detail.header,
                          nickName: res.data.detail.nickName,
                        },
                        hasNextPage: false,
                        isSupport: 0,
                        supportNum: 0,
                      }
                    )
                    break
                  }
                }
              }
            }
          }

          this.commentFlag = false
          this.content = ''

        }).catch(e => {
        console.log(e)
      })
    },
    invokeAppArticleShare() {
      if (!this.userInfo.token){
        this.invokeAppLogin()
        return
      }
      let params = {
        articleId: this.articleId,
        title: this.detail.title,
        img: this.detail.topImage,
      }
      try {
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppArticleShare.postMessage(params)
        } else {
          window.android.invokeAppArticleShare(JSON.stringify(params))
        }
      } catch (e){
        console.log(e)
      }
    },
    invokeAppBack() {
      let params = {
        url: location.href,
      }
      try {
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppBack.postMessage(params)
        } else {
          window.android.invokeAppBack(JSON.stringify(params))
        }
      } catch (e){
        console.log(e)
      }
    },
    invokeAppHiddenTab() {
      let params = {
        url: location.href,
      }
      try {
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppHiddenTab.postMessage(params)
        } else {
          window.android.invokeAppHiddenTab(JSON.stringify(params))
        }
      } catch (e){
        console.log(e)
      }
    },
    invokeAppShowTab() {
      let params = {
        url: location.href,
      }
      try {
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppShowTab.postMessage(params)
        } else {
          window.android.invokeAppShowTab(JSON.stringify(params))
        }
      } catch (e){
        console.log(e)
      }
    },
    invokeAppLogin() {
      let params = {
        url: location.href,
      }
      try {
        if (this.global.isIos) {
          window.webkit.messageHandlers.invokeAppLogin.postMessage(params)
        } else {
          window.android.invokeAppLogin(JSON.stringify(params))
        }
      } catch (e){
        console.log(e)
      }
    },
  },
  beforeRouteLeave(to, from, next){
    this.invokeAppShowTab()
    if(to.path == '/articleSch') {
      next({path: '/articleIndex'})
    }else {
      next() // 注意：这边next必须要写
    }
  },
}
</script>

<style lang="stylus" scoped>
.head-bar{
  position: fixed
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  left: 0
  box-sizing border-box
  width: 100%
  display: flex
  padding: .6em
  //padding-top: 0
  color: #ccc
  .l{
    width: 2.6em
    height: 2.6em
    line-height: 2.6em
    text-align: center
    img{
      height: 100%
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
      font-size 19rem
      font-weight: bold
      line3()
    }
  }
  .info{
    margin-top: .6em
    padding: 0 .6em
    color: #ccc
    span{
      display: inline-block
      margin-right: 1em
      img{
        height: 1.4em
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
      line-height: 1.6
    }
    >>>img{
      display: block
      width: 100%
      //pointer-events: none; // 禁止保存图片
    }
  }
  .reship{
    padding-left: .6em
    font-style italic
    color: #666
  }
}
.article-recommend{
  background-color: #fff
  .title{
    padding: .6em
    h2{
      padding-top: .6em
      font-size 18rem
    }
  }
  ul{
    overflow-x auto
    white-space nowrap
    padding: .6em
    &::-webkit-scrollbar {
       display: none; /* Chrome Safari */
     }
    li{
      display: inline-block
      margin-right: .6em
      position: relative
      width: 8em
      height: 8em
      border-radius: .6em;
      overflow hidden
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
  bottom: 40px
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
.comment-bg{
  position: fixed
  z-index 999
  box-sizing border-box
  left: 0
  right: 0
  bottom: 0
  top: 0
}
.comment-input{
  position: fixed
  z-index 1000
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
  .none-comment{
    text-align: center
    padding: 3em
    img{
      margin-bottom: .5em
      height: 7em
    }
  }
  .comment-number{
    color: #999
  }
  .more-level-one{
    text-align: center
  }
  .more-level-two{
    padding-top: .3em
    padding-bottom: .6em
    font-size 12rem
    text-align: right
    color: purple
  }
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
          &.on{
            color: purple;
          }
        }
      }
      p{
        i{
          font-style: normal
          color: #999
        }
      }
      .b{
        overflow: hidden
        padding: 0 .3em
        background-color: #fbfbfb
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