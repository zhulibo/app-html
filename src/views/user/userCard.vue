<template>
  <div class="ct">
    <div class="ct-center">
      <div>
        <div class="info">
          <div class="pic"><img :src="detail.header" alt=""></div>
          <div class="name">
            <h3>{{detail.nickName}}</h3>
            <img v-if="detail.sex == '男'" src="../../assets/img/sex1.png" alt="">
            <img v-else-if="detail.sex == '女'" src="../../assets/img/sex2.png" alt="">
          </div>
          <div class="txt">
            <h4>漫想家id：{{detail.homesickId}}</h4>
            <p>{{detail.signature}}</p>
          </div>
        </div>
        <div class="code">
          <div class="pic"><img src="../../assets/img/downLoadApp.png" alt=""></div>
          <p>扫一扫下载漫想家APP<br>加我好友吧~</p>
        </div>
        <div class="logo">
          <img src="../../assets/img/logo-txt.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {
      userId: '',
      detail: {},
    }
  },
  computed: {},
  created() {
    this.userId = this.$route.query.userId
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    getDetail() {
      this.$http({
        url: '/userorg/app/user/userdetail/ls',
        method: 'GET',
        params: {
          id: this.userId,
        }
      })
        .then(res => {
          this.detail = res.data.tbAppUserDetail
        }).catch(e => {
        console.log(e)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.ct{
  position: relative
  height: 0
  padding-bottom: 120%
  background: #fff url(../../assets/img/userCard1.png) center center/cover no-repeat
  text-align: center
  .ct-center{
    position: absolute
    padding: 1em 2em
    top: 0
    left: 0
    right: 0
    bottom: 0
    display: flex
    align-items center
    justify-content center
  }
  .info{
    .pic{
      img{
        width: 5em
        height: 5em
        border-radius: 50%;
      }
    }
    .name{
      h3{
        font-size 18rem
        display: inline-block
      }
      img{
        margin-left: .5em
        height: 1em
      }
    }
    .txt{
      margin-top: .3em
      p{
        line2()
        color: #999
      }
    }
  }
  .code{
    margin-top: 1em
    img{
      height: 10em
    }
    p{
      margin-top: .2em
      color: #999
    }
  }
  .logo{
    margin-top: 1em
    img{
      height: 2em
    }
  }
}
</style>