<template>
  <div class="couponInvite">
    <div class="couponInvite-top">
      <div class="couponInvite-top-text1">
        <h2>邀请函</h2>
        <p>我在漫想家努力精进<br>忍不住把它推荐给你</p>
      </div>
      <div class="couponInvite-top-text2">
        <p>送你365元新人专享优惠券<br>和我一起玩乐</p>
      </div>
    </div>
    <div class="couponInvite-form">
      <div class="phone-ct">
        <area-select :areaCode="areaCode" @changeAreaCode="changeAreaCode"></area-select>
        <input class="phone" type="text" v-model="phone" placeholder="请输入手机号领取新人优惠券">
      </div>
      <input class="submit" type="button" value="立刻领取" @click="submitForm">
      <div class="protocol-ct">
        <span :class="{on:checked}" v-model="checked" @click="checkboxChange"></span>我已阅读并同意漫想家的
        <router-link :to="{path: '/activityRule'}">活动规则</router-link>
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
      userId: '',
      pageId: '',
      checked: true,
      areaCode: '+86'
    }
  },
  components: {
    areaSelect
  },
  created() {
    this.userId = this.$route.query.userId
    this.pageId = this.$route.query.pageId
  },
  mounted() {
  },
  methods: {
    submitForm() {
      let _this = this
      let phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!phone.test(_this.phone)) {
        _this.$toast('请输入正确的手机号');
        return false
      }
      if (!this.checked) {
        _this.$toast('请同意活动规则');
        return false
      }
      // _this.$http({
      //   url: '/cartoonThinker/app/appuser/getdiscount/json',
      //   method: 'POST',
      //   params: {
      //     phone: _this.phone,
      //     userId: _this.userId,
      //     pageId: _this.pageId
      //   }
      // })
      //   .then(function (res) {
      //     console.log(res)
      //     _this.$toast(res.msg);
      //   })
      let formData = new FormData();
      formData.append('phone', _this.phone);
      formData.append('userId', _this.userId);
      formData.append('pageId', _this.pageId);
      _this.$http({
        url: '/cartoonThinker/app/appuser/getdiscount/json', // 邀请新用户注册
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        data: formData,
      })
        .then(function (res) {
          if (res.statusCode == 200) {
            _this.$toast(res.message);
            _this.$router.push({path: '/couponNewUser', query: {phone: _this.phone}});
          } else {
            _this.$toast(res.message);
          }
        })
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
  min-height 100vh;
  overflow: hidden
  background: url(../../assets/img/coupon18.png) center 5em / 100% auto no-repeat,
    url(../../assets/img/coupon19.png) center bottom / 100% auto no-repeat;
}
.couponInvite::after {
  content ""
  position: absolute
  z-index: -1;
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-image: linear-gradient(#1C9EAA, #000)
}
.couponInvite-top {
  margin-top: 3.5em
  margin-left: auto;
  margin-right: auto;
  width: 20em
  height: 25em
  text-align: center
  filter: drop-shadow(0 0 1em rgba(0, 0, 0, .5));
  background: url(../../assets/img/coupon17.png) center top / 20em auto no-repeat
}
.couponInvite-top-text1 {
  padding-top: 3.4em
  color: #666
  font-size 16rem
  h2 {
    margin-bottom: .5em
    font-size 22rem
    font-weight: bold
  }
}
.couponInvite-top-text2 {
  font-size 16rem
  padding-top: 6em
  color: #fff
}
.couponInvite-form {
  margin-left: auto
  margin-right: auto
  padding-bottom: 5em;
  width: 75%;
  font-size 16rem
}
.couponInvite-form .phone-ct {
  btn2()
  overflow: hidden
  display: flex
  box-sizing border-box
  margin-top: 1.5em
  padding: .2em 0
  line-height: 2.2
  background-color: #fff
  box-shadow 0 0 1em rgba(133, 255, 237, .5)
}
.couponInvite-form .phone-ct .phone {
  flex: 1
  border-width: 0;
}
.couponInvite-form .submit {
  btn2()
  margin-top: 1em
  color: #fff
  border-radius: 1.3em;
  border-width: 0;
  background-image: linear-gradient(90deg, #44FFDB, #0AA8AD);
  box-shadow 0 0 1em rgba(149, 255, 240, .5), 0 0 1em rgba(128, 255, 220, 1) inset;
}
.couponInvite-form .protocol-ct {
  margin-top: 1em
  font-size 12rem
  text-align: center
  color: #fff
}
.couponInvite-form .protocol-ct a {
  color: #00806f
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
