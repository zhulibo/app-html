<template>
  <div class="area-code-ct">
    <div class="area-code" @click="areaDialogVisible = true">{{areaCode}}</div>
    <div class="area-select" v-if="areaDialogVisible">
      <h2>选择国际电话区号</h2>
      <ul>
        <li v-for="item in areaCodeList" @click="selectAreaCode(item.code)" :class="{selected: areaCode == item.code}"><span>{{item.city}}</span><span>{{item.code}}</span></li>
      </ul>
    </div>
    <div class="area-select-bg" v-if="areaDialogVisible" @click="areaDialogVisible = false"></div>
  </div>
</template>

<script>
  import areaCodeList from '../../assets/data/areaCode.json'
  export default {
    name: 'areaSelect',
    data() {
      return {
        areaDialogVisible: false,
        areaCodeList: [],
      }
    },
    props: {
      areaCode: {
      },
    },
    created() {
      this.areaCodeList = areaCodeList
    },
    mounted() {
    },
    methods: {
      selectAreaCode(code) {
        this.$emit('changeAreaCode', code)
        this.areaDialogVisible = false
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .area-code{
    position: relative
    display: inline-block;
    padding-right: 1em
    padding-left: .3em
    min-width 2em
    height: 1.4em
    text-align: right
  }
  .area-code::after{
    content ""
    position: absolute
    top: 0.9em
    right: .2em
    width: 0
    height: 0
    border-top: .3em solid #666
    border-left: .3em solid transparent
    border-right: .3em solid transparent
  }
  .area-select-bg{
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 10;
    background-color: rgba(0,0,0,0.3)
    transition all .3s
  }
  .area-select{
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    z-index: 20;
    font-size 16rem
    background-color: #fff
    transition all .3s
    text-align: left;
    line-height: 1.4
  }
  .area-select h2{
    padding-left: 1em
    height: 3em
    line-height: 3
    box-shadow 0 .2em .5em rgba(0,0,0,.1)
  }
  .area-select ul{
    padding: 1em
    height: 40vh;
    overflow-y auto
  }
  .area-select ul li{
    position: relative
    padding: .8em 0
    border-bottom: 1px solid #ccc
  }
  .area-select ul li span{
    margin-right: 2em
  }
  .area-select ul li span:first-child{
    font-weight: bold
  }
  .area-select ul li.selected::before{
    content: "";
    position: absolute;
    top: 50%;
    right: 18px;
    width: 2px;
    height: 8px;
    background-color: #01c08e;
    transform: translateY(-3px) rotate(-45deg);
  }
  .area-select ul li.selected::after{
    content: "";
    position: absolute;
    top: 50%;
    right: 10px;
    width: 2px;
    height: 15px;
    background-color: #01c08e;
    transform: translateY(-8px) rotate(45deg);
  }
</style>
