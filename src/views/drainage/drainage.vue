<template>
  <div class="drainage-bg">
    <div class="drainage-head">
      <div class="l">
        <img src="../../assets/img/drainage13.png" alt="">
      </div>
      <div class="r">
        <img src="../../assets/img/drainage14.png" alt="">
        <p>为玩具而生 为玩家而来</p>
      </div>
    </div>
    <div class="drainage-main">
      <div class="title">
        <i></i>
        <i></i>
        <i></i>
        <h2>商城全部正版授权</h2>
      </div>
      <div class="ct">
        <div class="ct-title">
          <h2>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            Bearbrick
          </h2>
        </div>
        <ul class="clearfix">
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage12.png" alt="">
            </div>
            <p style="min-height: 7em">BE@RBRICK 积木熊 M/麦纳·尼娜川樱 Van Gogh Museum Sunflowers Sergio Rossi Sex Pistols Clear
              Ver.</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage11.png" alt="">
            </div>
            <p style="min-height: 7em">BE@RBRICK 积木熊 MY FIRST BABY WF FASHION 紫千秋 千秋黑金 迪拜塔&东京塔</p>
          </li>
        </ul>
      </div>
      <div class="ct">
        <div class="ct-title">
          <h2>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <b>手办</b>
          </h2>
        </div>
        <ul class="clearfix">
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage3.png" alt="">
            </div>
            <p>BANPRESTO 眼镜厂 一番赏 航海王 匠之系谱 路飞 艾斯 萨博 索隆 山治</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage4.png" alt="">
            </div>
            <p>BANPRESTO 眼镜厂 航海王 娜美 罗宾 女帝 卡洛特</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage5.png" alt="">
            </div>
            <p>BANPRESTO 眼镜厂 火影忍者疾风传鼬 漩涡鸣人 六道 卡卡西千鸟</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage6.png" alt="">
            </div>
            <p>BANPRESTO 眼镜厂 限定 龙珠 悟吉塔&自在极意功&贝吉塔&蒙面赛亚人</p>
          </li>
        </ul>
      </div>
      <div class="ct">
        <div class="ct-title">
          <h2>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <b>高达</b>
          </h2>
        </div>
        <ul class="clearfix">
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage7.png" alt="">
            </div>
            <p>BANDAI 万代 MG高达 异端敢达红色机&蓝色机</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage8.png" alt="">
            </div>
            <p>BANDAI 万代 RG-ZETA RG32牛高达 拼装模型</p>
          </li>
        </ul>
      </div>
      <div class="ct">
        <div class="ct-title">
          <h2>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <i class="circle"></i>
            <b>漫威</b>/DC
          </h2>
        </div>
        <ul class="clearfix">
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage9.png" alt="">
            </div>
            <p>Hot Toys 漫威 复仇者联盟钢铁侠 钢铁蜘蛛侠 美队 美国队长 雷神</p>
          </li>
          <li>
            <i class="circle"></i>
            <i class="circle"></i>
            <div class="img-ct">
              <img src="../../assets/img/drainage10.png" alt="">
            </div>
            <p>蚂蚁 MEZCO DC 蝙蝠侠黑暗骑士 JOKER 小丑 绿灯侠 小丑女 哈莉奎茵</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="drainage-bottom">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="downloadApp" @click="downloadApp">
      <div class="ct">
        <i class="circle"></i>
        <i class="circle"></i>
        <h3><span>“ 每日0元抽 ”</span></h3>
        <h4><span>点击下载</span></h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'drainage',
  data() {
    return {}
  },
  created() {
  },
  mounted() {
  },
  methods: {
    downloadApp() {

      let formData = new FormData();
      formData.append('name', this.global.getParams().name);
      this.$http({
        url: '/cartoonThinker/app/link/add/share/json',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(res => {
          this.global.downloadApp()
        })
      setTimeout(() => this.global.downloadApp(), 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.circle {
  display: inline-block
  width: 4px
  height: 4px
  background-color: #000
  border-radius: 50%;
  border: 2px solid #fff
  box-shadow 0 0 0 1px #000
}
.drainage-bg {
  padding: 1.5em
  background: #4e2aa8 url(../../assets/img/drainage1.png) center top / 100% auto no-repeat
}
.drainage-head {
  margin-top: 2em
  text-align: center
  .l {
    display: inline-block
    padding-left: 2em
    width: 4.5em
    img {
      margin-bottom: -.2em
      border-radius: .8em;
    }
  }
  .r {
    display: inline-block
    margin-left: .2em
    width: 12em
    text-align: left;
    color: #fff
    letter-spacing .1em
    img {
      height: 2.6em
    }
    p {
      padding-left: .3em
      filter: drop-shadow(0 0 .6em rgba(0, 0, 0, .8))
    }
  }
}
.drainage-main {
  position: relative
  z-index: 20
  .title {
    position: relative
    margin-top: 4em
    margin-bottom: 1em
    text-align: center
    background: url(../../assets/img/drainage2.png) center center / auto 120% no-repeat
    h2 {
      color: #fff
      font-size 26rem
      font-weight: bold
    }
    i {
      position: absolute
      top: 50%
      left: 10%
      display: inline-block
      width: .2em
      height: .2em
      border-radius: 50%;
      background-color: #fff
      box-shadow 0 0 2px rgba(255, 255, 255, .8)
      &:nth-child(2) {
        width: .1em
        height: .1em
        top: 0
        left: 45%
      }
      &:nth-child(3) {
        top: 95%
        left: 70%
      }
    }
  }
  .ct-title {
    position: relative
    z-index: 20
    text-align: center
    h2 {
      position: relative
      display: inline-block
      background-color: #fff
      padding-top: .1em
      width: 6em
      font-size 26rem
      border: 2px solid #000
      &:after {
        content ''
        position: absolute
        z-index -1
        top: .25em
        left: .25em
        width: 100%
        height: 100%
        background-color: #000
      }
      i {
        position: absolute
        font-size 14rem
        border-width: 1px;
      }
      i:nth-child(1) {
        top: .2em
        left: .2em
      }
      i:nth-child(2) {
        top: .2em
        right: .2em
      }
      i:nth-child(3) {
        bottom: .2em
        right: .2em
      }
      i:nth-child(4) {
        bottom: .2em
        left: .2em
      }
    }
  }
  ul {
    margin-top: -1em
    li {
      margin-bottom: 2em
      position: relative
      float: left
      width: 47%
      background-color: #fff
      i {
        position: absolute
        z-index: 10
        font-size 14rem
      }
      i:nth-child(1) {
        top: .5em
        left: .5em
      }
      i:nth-child(2) {
        top: .5em
        right: .5em
      }
      &:after {
        content ''
        position: absolute
        z-index -1
        top: .5em
        left: .5em
        width: 100%
        height: 100%
        background-color: #000
      }
      &:nth-child(2n) {
        margin-left: 6%
      }
      img {
        width: 100%
      }
      p {
        padding: .6em
        font-size 13rem
        min-height: 5.6em
      }
    }
  }
}
.drainage-bottom {
  margin-top: 3em
  margin-bottom: 8em
  text-align: center
  ul {
    li {
      display: inline-block
      position: relative
      margin-left: 1em
      width: 1em
      height: 1.1em
      background-color: #000
      transform skewX(-20deg)
      &:after {
        content ''
        position: absolute
        z-index: -1
        top: -.35em
        left: -.35em
        width: 100%
        height: 100%
        background-color: #fff
      }
      &:nth-child(4) {
        margin-left: 2em
      }
    }
  }
}
.downloadApp {
  position: fixed
  z-index: 100
  bottom: .5em
  left: 50%
  margin-left: -5em
  margin-top: 2em
  margin-bottom: 2em
  animation: pop 1s infinite;
  .ct {
    position: relative
    padding: .8em
    padding-bottom: 0
    display: inline-block
    background-color: #fff
    font-weight: bold
    text-align: center
    box-shadow 0 0 1em rgba(0, 0, 0, .4)
    &:after {
      content ''
      position: absolute
      z-index: -1
      top: .5em
      left: .5em
      width: 100%
      height: 100%
      background-color: #000
    }
    i {
      position: absolute
      font-size 14rem
      border-width: 1px
    }
    i:nth-child(1) {
      top: .25em
      left: .25em
    }
    i:nth-child(2) {
      top: .25em
      right: .25em
    }
    h3 {
      color: #fff
      background-color: purple
      span {
        display: inline-block
        padding: 0 .2em
        font-size 20rem
        transform skewX(-10deg)
      }
    }
    h4 {
      color: #000
      span {
        display: inline-block
        font-size 24rem
        transform skewX(-10deg)
      }
    }
  }
}
@keyframes pop {
  80% {
    transform: scale(1.1);
  }
}
</style>