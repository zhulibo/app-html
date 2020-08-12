import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {path: '/home'},
    },
    {
      path: '/home',
      name: '/home',
      component: () => import (/* webpackChunkName: 'home' */ '@/views/home/home'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/coupon',
      name: '/coupon',
      component: () => import (/* webpackChunkName: 'coupon' */ '@/views/coupon/coupon'),
      meta: {
        title: '分享优惠券'
      }
    },
    {
      path: '/couponInvite',
      name: '/couponInvite',
      component: () => import (/* webpackChunkName: 'couponInvite' */ '@/views/couponInvite/couponInvite'),
      meta: {
        title: '送你漫想家APP优惠券'
      }
    },
    {
      path: '/activityRule',
      name: '/activityRule',
      component: () => import (/* webpackChunkName: 'activityRule' */ '@/views/activityRule/activityRule'),
      meta: {
        title: '活动规则'
      }
    },
    {
      path: '/couponNewUser',
      name: '/couponNewUser',
      component: () => import (/* webpackChunkName: 'couponNewUser' */ '@/views/couponNewUser/couponNewUser'),
      meta: {
        title: '送你漫想家APP优惠券'
      }
    },
    {
      path: '/couponNewUserHasCode',
      name: '/couponNewUserHasCode',
      component: () => import (/* webpackChunkName: 'couponNewUserHasCode' */ '@/views/couponNewUserHasCode/couponNewUserHasCode'),
      meta: {
        title: '新人大礼包'
      }
    },
    {
      path: '/test1',
      name: '/test1',
      component: () => import (/* webpackChunkName: 'test1' */ '@/views/test1/test1'),
      meta: {
        title: 'test1'
      }
    },
    {
      path: '/test2',
      name: '/test2',
      component: () => import (/* webpackChunkName: 'test2' */ '@/views/test2/test2'),
      meta: {
        title: 'test2'
      }
    },
    {
      path: '/goodsDetail',
      name: '/goodsDetail',
      component: () => import (/* webpackChunkName: 'goodsDetail' */ '@/views/goodsDetail/goodsDetail'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/socialDetail',
      name: '/socialDetail',
      component: () => import (/* webpackChunkName: 'socialDetail' */ '@/views/socialDetail/socialDetail'),
      meta: {
        title: '社区详情'
      }
    },
    {
      path: '/socialDetailVideo',
      name: '/socialDetailVideo',
      component: () => import (/* webpackChunkName: 'socialDetailVideo' */ '@/views/socialDetailVideo/socialDetailVideo'),
      meta: {
        title: '社区详情视频'
      }
    },
    {
      path: '/lotteryDetail',
      name: '/lotteryDetail',
      component: () => import (/* webpackChunkName: 'lotteryDetail' */ '@/views/lotteryDetail/lotteryDetail'),
      meta: {
        title: '抽奖详情'
      }
    },
    {
      path: '/downloadApp',
      name: '/downloadApp',
      component: () => import (/* webpackChunkName: 'downloadApp' */ '@/views/downloadApp/downloadApp'),
      meta: {
        title: '下载漫想家APP'
      }
    },
    {
      path: '/drainage',
      name: '/drainage',
      component: () => import (/* webpackChunkName: 'drainage' */ '@/views/drainage/drainage'),
      meta: {
        title: '全部正版授权的模玩、潮玩的平台'
      }
    },
    {
      path: '/drainageChart',
      name: '/drainageChart',
      component: () => import (/* webpackChunkName: 'drainageChart' */ '@/views/drainageChart/drainageChart'),
      meta: {
        title: '全部正版授权的模玩、潮玩的平台'
      }
    },
  ]
})
