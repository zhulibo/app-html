<template>
  <div class="vue-echarts-wrap">
    <v-chart :options="eChartsOptions"/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'

export default {
  name: 'vueEcharts',
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      eChartsOptions: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.vue-echarts-wrap {
  padding: 20px;
  background-color: #fff;
}
</style>