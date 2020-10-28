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
      path: '/articleSch',
      name: '/articleSch',
      component: () => import (/* webpackChunkName: 'articleSch' */ '@/views/article/articleSch'),
      meta: {
        title: '搜索文章'
      }
    },
    {
      path: '/articleIndex',
      name: '/articleIndex',
      component: () => import (/* webpackChunkName: 'articleIndex' */ '@/views/article/articleIndex'),
      meta: {
        title: '文章列表'
      }
    },
    {
      path: '/articleDetail',
      name: '/articleDetail',
      component: () => import (/* webpackChunkName: 'articleDetail' */ '@/views/article/articleDetail'),
      meta: {
        title: '文章详情'
      }
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
      path: '/couponShare',
      name: '/couponShare',
      component: () => import (/* webpackChunkName: 'coupon' */ '@/views/coupon/couponShare'),
      meta: {
        title: '分享优惠券'
      }
    },
    {
      path: '/couponInvite',
      name: '/couponInvite',
      component: () => import (/* webpackChunkName: 'couponInvite' */ '@/views/coupon/couponInvite'),
      meta: {
        title: '送你漫想家APP优惠券'
      }
    },
    {
      path: '/couponInviteResult',
      name: '/couponInviteResult',
      component: () => import (/* webpackChunkName: 'couponInviteResult' */ '@/views/coupon/couponInviteResult'),
      meta: {
        title: '送你漫想家APP优惠券'
      }
    },
    {
      path: '/couponNewUser',
      name: '/couponNewUser',
      component: () => import (/* webpackChunkName: 'couponNewUser' */ '@/views/coupon/couponNewUser'),
      meta: {
        title: '新人大礼包'
      }
    },
    {
      path: '/goodsDetail',
      name: '/goodsDetail',
      component: () => import (/* webpackChunkName: 'goodsDetail' */ '@/views/goods/goodsDetail'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/socialDetail',
      name: '/socialDetail',
      component: () => import (/* webpackChunkName: 'socialDetail' */ '@/views/social/socialDetail'),
      meta: {
        title: '社区详情'
      }
    },
    {
      path: '/socialDetailVideo',
      name: '/socialDetailVideo',
      component: () => import (/* webpackChunkName: 'socialDetailVideo' */ '@/views/social/socialDetailVideo'),
      meta: {
        title: '社区详情视频'
      }
    },
    {
      path: '/lotteryDetail',
      name: '/lotteryDetail',
      component: () => import (/* webpackChunkName: 'lotteryDetail' */ '@/views/lottery/lotteryDetail'),
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
      path: '/drainageChart',
      name: '/drainageChart',
      component: () => import (/* webpackChunkName: 'drainageChart' */ '@/views/chart/drainageChart'),
      meta: {
        title: '全部正版授权的模玩、潮玩的平台'
      }
    },
    {
      path: '/agreementUser',
      name: '/agreementUser',
      component: () => import (/* webpackChunkName: 'agreementUser' */ '@/views/protocol/agreementUser'),
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/agreementPrivacy',
      name: '/agreementPrivacy',
      component: () => import (/* webpackChunkName: 'agreementPrivacy' */ '@/views/protocol/agreementPrivacy'),
      meta: {
        title: '隐私协议'
      }
    },
    {
      path: '/couponActivityRule',
      name: '/couponActivityRule',
      component: () => import (/* webpackChunkName: 'couponActivityRule' */ '@/views/protocol/couponActivityRule'),
      meta: {
        title: '抽奖活动规则'
      }
    },
    {
      path: '/test',
      name: '/test',
      component: () => import (/* webpackChunkName: 'test' */ '@/views/test/test'),
      meta: {
        title: 'test'
      }
    },
  ]
})
