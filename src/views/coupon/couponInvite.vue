<template>
  <div class="couponInvite">
    <div class="coupon-head">
      <img src="../../assets/img/coupon1.png" alt="">
    </div>
    <div class="couponInvite-ct">
      <div class="couponInvite-form">
        <div class="phone-ct">
<!--          <area-select :areaCode="areaCode" @changeAreaCode="changeAreaCode"></area-select>-->
          <input class="phone" type="text" v-model="phone" placeholder="请输入手机号">
          <span @click="getCode">{{content}}</span>
        </div>
        <div class="phone-ct">
          <input class="phone" type="text" v-model="verificationCode" placeholder="请输入验证码">
        </div>
        <input class="submit" type="button" value="立刻领取" @click="submitForm">
        <div class="protocol-ct">
          <span :class="{on:checked}" v-model="checked" @click="checkboxChange"></span>我已阅读并同意漫想家的
          <router-link :to="{path: '/couponActivityRule'}">活动规则</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import areaSelect from "@/components/areaSelect/areaSelect";

export default {
  name: 'couponInvite',
  data() {
    return {
      phone: '',
      verificationCode: '',
      inviteUserId: '',
      pageId: '',
      checked: true,
      areaCode: '+86',
      content: '发送验证码',
      time: 60,
      canClick: true
    }
  },
  components: {
    areaSelect
  },
  created() {
    this.inviteUserId = this.$route.query.userId
  },
  mounted() {
  },
  methods: {
    getCode() {
      let phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!phone.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.canClick) return

      this.$http({
        url: '/userorg/app/login/captcha',
        method: 'GET',
        params: {
          phone: this.phone,
        }
      })
        .then(res => {
          // 60s验证码倒计时
          this.canClick = false
          this.content = this.time + ' s'
          this.timer = setInterval(() => {
            if (this.time <= 1) {
              this.canClick = true
              clearInterval(this.timer)
              this.time = 60
              this.content = '获取验证码'
              return false
            }
            this.time--
            this.content = this.time + ' s'
          }, 1000)

        }).catch(e => {console.log(e)})
    },
    submitForm() {
      let phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!phone.test(this.phone)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.verificationCode) {
        this.$toast('请输入验证码')
        return false
      }
      if (!this.checked) {
        this.$toast('请同意活动规则')
        return false
      }
      this.$http({
        url: '/userorg/app/login',
        method: 'POST',
        data: {
          phone: this.phone,
          loginType: 2,
          code: this.verificationCode,
        }
      })
        .then(res => {
          let userInfo ={
            token: res.data.token,
          }
          this.$store.dispatch('updateUserInfo', userInfo)
          this.getPageId()
        }).catch(e => {console.log(e)})
    },
    getPageId() {
      this.$http({
        url: '/order/app/discount/sharePage',
        method: 'GET',
      })
        .then(res => {
          this.pageId = res.data.id
          this.getSharePage()
        }).catch(e => {console.log(e)})
    },
    getSharePage() {
      this.$http({
        url: '/order/app/discount/sharePage',
        method: 'POST',
        data: {
          id: this.pageId,
          inviteId: this.inviteUserId,
        }
      })
        .then(res => {
          this.$toast(res.msg)
          this.$router.push({path: '/couponInviteResult', query: {phone: this.phone}});
        }).catch(e => {console.log(e)})
    },
    checkboxChange() {
      this.checked = !this.checked
    },
    changeAreaCode(code) {
      this.areaCode = code
    },
  },
}
</script>

<style lang="stylus" scoped>
.couponInvite {
  position: relative
  min-height 100vh
  overflow: hidden
  background: #792feb url(../../assets/img/coupon23.png) center top / 100% auto no-repeat
}
.coupon-head{
  padding: 3em 0 5em
  text-align: center
  img{
    height: 4em
  }
}
.couponInvite-ct{
  padding-top: 18em
  padding-bottom: 7em;
  background: url(../../assets/img/coupon17.png) center bottom / 100% 100% no-repeat
}
.couponInvite-form {
  position: relative
  z-index: 100
  margin-left: auto
  margin-right: auto
  width: 70%;
  font-size 16rem
}
.couponInvite-form .phone-ct {
  btn2()
  border-radius: 1.3em;
  overflow: hidden
  display: flex
  box-sizing border-box
  margin-top: 1.5em
  padding: .2em 0
  line-height: 2.2
  background-color: #fff
  box-shadow 0 0 1em rgba(0, 0, 0, .2)
}
.couponInvite-form .phone-ct .phone {
  flex: 1
  padding-left: 1em
  width: 0
  border-width: 0
}
.couponInvite-form .phone-ct span {
  display: inline-block
  width: 6em
  text-align: center
  color: purple
}
.couponInvite-form .submit {
  margin-top: 3em
  btn2()
  color: purple
  font-weight: bold
  border-radius: 1.3em;
  border-width: 0;
  background-color: #fff
  box-shadow 0 0 1em rgba(0, 0, 0, .2), 0 -5px .2em rgba(128,0,128,.2) inset;
}
.couponInvite-form .protocol-ct {
  margin-top: 1em
  font-size 12rem
  text-align: center
  color: #fff
}
.couponInvite-form .protocol-ct a {
  color: #88bdff
}
.couponInvite-form .protocol-ct span {
  display: inline-block
  margin-right: .2em
  width: 1.3em
  height: 1.3em
  vertical-align: top;
  background: url(../../assets/img/coupon21.png) center center / 100% auto no-repeat
}
.couponInvite-form .protocol-ct span.on {
  background: url(../../assets/img/coupon20.png) center center / 100% auto no-repeat
}
</style>
