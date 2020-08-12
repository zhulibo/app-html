<template>
  <div>
    <img id="imgsrc" src="../../assets/img/coupon7.png" alt="">
    <img id="logo" src="../../assets/img/watermark.png" alt="">
    <!--    <img id="imgsrc" src="https://app.mxjclub.com/image/cartoonThinker/ueditor/1589734100913.jpg" alt="">-->
    <br>
    <br>
    <button @click="watermarkImg">生成水印图片</button>
    <br>
    <br>
    <img id="imgUploadUrl" :src="imgUploadUrl" alt="">
    <br>
    <br>
    <button @click="downLoad">下载图片</button>
  </div>
</template>

<script>
export default {
  name: 'test1',
  data() {
    return {
      text: 'ID:26545655',
      imgTextUrl: '',
      imgUploadUrl: '',
    }
  },
  created() {
  },
  mounted() {
    // this.textToImg()
  },
  methods: {
    watermarkImg() {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')

      let img1 = document.getElementById('imgsrc')
      let img2 = document.getElementById('logo')

      canvas.width = img1.width;
      canvas.height = img1.height;

      ctx.drawImage(img1, 0, 0, img1.width, img1.height);
      ctx.drawImage(img2, img1.width - 110, img1.height - 58, img2.width, img2.height);

      ctx.font = '12px 微软雅黑'
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.shadowColor = 'rgba(0,0,0,.9)';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 3;
      ctx.fillText(this.text, img1.width - 84, img1.height - 10)

      this.imgUploadUrl = canvas.toDataURL('image/png')
    },
    downLoad() {
      let a = document.createElement('a')
      a.href = this.imgUploadUrl
      a.download = '2333'
      console.log(a)
      a.click()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>