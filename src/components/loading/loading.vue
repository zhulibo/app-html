<template>
  <div class="loading">
    <p>加载中...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.loading{
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 99998
  background-color: rgba(255,255,255,1);
  p{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999;
    width: 5em;
    height: 5em;
    line-height: 5
    border-radius: 1em;
    text-align: center;
    background-color: rgba(0,0,0,.6);
    color: #fff;
  }
}
</style>