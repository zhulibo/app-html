<template>
  <div class="text-ct">
    <h2>优惠券规则</h2>
    <h3>1. 优惠券应在券面标明有效期内使用，过期作废，优惠券不可兑换现金。</h3>
    <p>2. 优惠券仅可与包邮券叠加使用，不可与其他优惠券、红包、折扣满减活动等
      其他形式优惠叠加使用，部分商品不可使用优惠券。</p>
    <p>3. 鉴于互联网可能存在的技术故障、人为失误等原因，如平台发放优惠券时存
      在发券类别、券面额度配置错误等情况的，平台有权将错误配置的优惠券回收。
      如优惠券已生成订单，则订单将被取消，优惠券不予返还。</p>
    <p>4. 平台严禁利用平台 BUG 获取不正当利益的行为，一旦发现此类行为，平台有
      权回收所涉优惠券。如优惠券已生成订单，则订单将被取消，优惠券不予返
      还。</p>
    <p>您如对规则存在疑问，可联系我们。</p>
    <p>邮箱: service@mxjclub.com</p>
  </div>
</template>

<script>
export default {
  name: 'item',
  data() {
    return {}
  },
  computed: {},
  created() {
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.text-ct {
  padding: .6em
}
h2 {
  padding: .5em 0
  font-size 18rem
  text-align: center
  font-weight: bold
  color: #666
}
p {
  margin-top: .3em
  margin-bottom: .3em
  text-indent: 2em;
  text-align: justify;
}
</style>
