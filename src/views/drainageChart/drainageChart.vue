<template>
  <div class="vue-echarts-wrap">
    <h1>激活人数统计</h1>
    <v-chart :options="eChartsOptions"/>
    <div class="text">
      <div>昨天激活人数：<span>{{todayNumber}}</span>人</div>
      <div>共激活人数: <span>{{allNumber}}</span>人</div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/dataZoom'

export default {
  name: 'vueEcharts',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      numberArr: [
        {date: '8.24', number: null,},
        {date: '8.25', number: null,},
        {date: '8.26', number: 161,},
        {date: '8.27', number: 75,},
        {date: '8.28', number: 43,},
        {date: '8.29', number: 28,},
        {date: '8.30', number: 359,},
        {date: '8.31', number: 197,},
        {date: '9.1', number: 80,},
        {date: '9.2', number: 22,},
        {date: '9.3', number: 17,},
      ],
      eChartsOptions: {
        dataZoom: [
          {
            show: true,
            startValue: '',
            endValue: '',
          },
        ],
        xAxis: {
          name: '日期',
          type: 'category',
          data: []
        },
        yAxis: {
          name: '人数',
          type: 'value'
        },
        series: [
          {
            data: [],
            type: 'bar',
            color: 'rgba(64,158,255,.6)',
          },
          {
            data: [],
            type: 'line',
            color: 'rgba(64,158,255,1)',
            itemStyle : { normal: {label : {show: true}}}
          },
        ]
      }
    }
  },
  computed: {
    allNumber() { // 总人数
      let sum = 0
      for (let i = 0; i < this.numberArr.length; i++) {
        sum = sum + this.numberArr[i].number
      }
      return sum
    },
    todayNumber() { // 今日人数
      return this.numberArr[this.numberArr.length - 1].number
    }
  },
  created() {
    let echartArr = this.numberArr
    // 默认日期区域
    this.eChartsOptions.dataZoom[0].startValue = echartArr[echartArr.length - 5 - 1].date
    this.eChartsOptions.dataZoom[0].endValue = echartArr[echartArr.length - 1].date
    // 赋值时间和人数
    for (let i = 0; i < echartArr.length; i++) {
      this.eChartsOptions.xAxis.data.push(echartArr[i].date)
      this.eChartsOptions.series[0].data.push(echartArr[i].number)
      this.eChartsOptions.series[1].data.push(echartArr[i].number)
    }
  },
  mounted() {
  },
  methods: {},
}
</script>

<style lang="stylus" scoped>
.vue-echarts-wrap {
  padding: 1em
  background-color: #fff;
  h1{
    padding-top: 1em
    font-size 18rem
    text-align: center
  }
  .text{
    padding-bottom: 1em
    font-size 16rem
    padding-left: 2em
    span{
      color: #409eff
    }
  }
}
.echarts {
  width: 100%;
}
</style>