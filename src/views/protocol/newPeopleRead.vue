<template>
  <div class="text-ct">
    <h2>新手必看</h2>
    <img src="../../assets/img/newPeopleRead1.jpg" alt="">
    <img src="../../assets/img/newPeopleRead2.jpg" alt="">
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
  img{
    width: 100%
  }
</style>
