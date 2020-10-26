<template>
  <div class="ct">
    <div class="sch">
      <div class="back" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div class="sch-ct">
        <input type="text" v-model="title" @keyup.enter="doSch" placeholder="请输入您要查找的内容" v-autoFocus>
        <span><i class="iconfont icon-search"></i></span>
      </div>
    </div>
    <article-list ref="articleList" :title="title" :getArticleListCreated="false" :token="userInfo.token"></article-list>
  </div>
</template>

<script>
import articleList from "@/components/articleList/articleList"

export default {
  name: 'articleSch',
  data() {
    return {
      userInfo:{
        token: ''
      },
      title: '',
      articleList: [],
      pageSize: 10,
      pageNumber: 1,
    }
  },
  components: {
    articleList,
  },
  created() {
    // 保存url中的token至vuex
    this.userInfo.token = this.$route.query.token
    if(this.userInfo.token) {
      this.$store.dispatch('updateUserInfo', this.userInfo)
    }
  },
  mounted () {
  },
  methods: {
    doSch() {
      this.$refs.articleList.getArticleList(1)
    },
    back() {
      this.$router.go(-1)
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
</style>