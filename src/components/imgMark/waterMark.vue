<template>
  <div class="ct" v-if="dialogVisible">
    <img class="img-source" id="imgSource" :src="src" >
    <img class="img-source" id="logo" src="../../assets/img/watermark.png" alt="">
    <img class="saveImg" :src="saveImgUrl" alt="">
    <div class="saveBtn" @click="downLoad">保存图片</div>
    <div class="bg" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      saveImgUrl: '',
    }
  },
  props: {
    src: {},
    dialogVisible: {},
  },
  created() {
  },
  mounted() {
  },
  methods: {
    watermarkImg() {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let img1 = document.getElementById('imgSource')
      let img2 = document.getElementById('logo')
      img1.setAttribute('crossOrigin', 'anonymous') // 设置img标签跨域，同时图片存放的服务器也要设置允许跨域
      img2.setAttribute('crossOrigin', 'anonymous')
      img1.src =img1.src+'?v='+Math.random() // 避免读取缓存中的图片
      img2.src =img2.src+'?v='+Math.random() // 避免读取缓存中的图片
      canvas.width = img1.width
      canvas.height = img1.height
      img1.onload = () => {
        ctx.drawImage(img1, 0, 0, img1.width, img1.height)
        ctx.drawImage(img2, img1.width - 100, 10, img2.width, img2.height)
        this.saveImgUrl = canvas.toDataURL('image/png')
      }
    },
    downLoad() {
      let a = document.createElement('a')
      a.href = this.saveImgUrl
      a.download = (new Date()).getTime() // 保存图片名字
      a.click()
    },
    close(){
      this.saveImgUrl = ''
      this.$emit('update:dialogVisible', false)
    },
    loadImg1() {
      return new Promise(resolve => {
        let img1 = document.getElementById('imgSource')
        img1.src =img1.src+'?v='+Math.random() // 避免读取缓存中的图片
        img1.onload = () => {
          resolve()
        }
      })
    },
    loadImg2() {
      return new Promise(resolve => {
        let img2 = document.getElementById('logo')
        img2.src =img2.src+'?v='+Math.random()
        img2.onload = () => {
          resolve()
        }
      })
    },
  },
  watch: {
    'dialogVisible': {
      handler: function (val){
        if(!val) return
        this.$nextTick(() => {
          (async () => {
            await this.loadImg1()
            await this.loadImg2()
            this.watermarkImg()
          })()

        })
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.ct{
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 1000
}
.img-source{
  opacity 0
}
#imgSource{
  width: 100%
}
.saveBtn{
  position: absolute
  right: 20px
  bottom: 20px
  z-index: 30
  font-weight: bold
  color: #fff
  font-size 16rem
  border: 1px solid #fff
  padding: 5px 10px
  border-radius: 5px;
}
.saveImg{
  position: absolute
  top: 50%
  left: 50%
  transform translate(-50%, -50%)
  max-height: 80vh;
  max-width 100vw
  z-index: 20
}
.bg{
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 10
  background-color: rgba(0,0,0,.8)
}
</style>