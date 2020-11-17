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
      path: '/appDownload',
      name: '/appDownload',
      component: () => import (/* webpackChunkName: 'appDownload' */ '@/views/appDownload/appDownload'),
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
      path: '/toBeSeller',
      name: '/toBeSeller',
      component: () => import (/* webpackChunkName: 'toBeSeller' */ '@/views/link/toBeSeller'),
      meta: {
        title: '申请入驻'
      }
    },
    {
      path: '/agreementUserNew',
      name: '/agreementUserNew',
      component: () => import (/* webpackChunkName: 'agreementUserNew' */ '@/views/protocol/agreementUserNew'),
      meta: {
        title: '用户协议'
      }
    },
    {
      path: '/agreementPrivacyNew',
      name: '/agreementPrivacyNew',
      component: () => import (/* webpackChunkName: 'agreementPrivacyNew' */ '@/views/protocol/agreementPrivacyNew'),
      meta: {
        title: '隐私协议'
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
      path: '/agreementLottery',
      name: '/agreementLottery',
      component: () => import (/* webpackChunkName: 'agreementLottery' */ '@/views/protocol/agreementLottery'),
      meta: {
        title: 'APP抽奖规则'
      }
    },
    {
      path: '/agreementPresale',
      name: '/agreementPresale',
      component: () => import (/* webpackChunkName: 'agreementPresale' */ '@/views/protocol/agreementPresale'),
      meta: {
        title: '预售规则'
      }
    },
    {
      path: '/agreementCoupon',
      name: '/agreementCoupon',
      component: () => import (/* webpackChunkName: 'agreementCoupon' */ '@/views/protocol/agreementCoupon'),
      meta: {
        title: '优惠券规则'
      }
    },
    {
      path: '/agreementArticle',
      name: '/agreementArticle',
      component: () => import (/* webpackChunkName: 'agreementArticle' */ '@/views/protocol/agreementArticle'),
      meta: {
        title: '模玩文化版权协议'
      }
    },
    {
      path: '/agreementBuy',
      name: '/agreementBuy',
      component: () => import (/* webpackChunkName: 'agreementBuy' */ '@/views/protocol/agreementBuy'),
      meta: {
        title: '买家须知'
      }
    },
    {
      path: '/agreementShopSettle',
      name: '/agreementShopSettle',
      component: () => import (/* webpackChunkName: 'agreementShopSettle' */ '@/views/protocol/agreementShopSettle'),
      meta: {
        title: '商家入驻须知'
      }
    },
    {
      path: '/newPeopleRead',
      name: '/newPeopleRead',
      component: () => import (/* webpackChunkName: 'newPeopleRead' */ '@/views/protocol/newPeopleRead'),
      meta: {
        title: '新手必看'
      }
    },
    {
      path: '/repairRead',
      name: '/repairRead',
      component: () => import (/* webpackChunkName: 'repairRead' */ '@/views/protocol/repairRead'),
      meta: {
        title: '维修须知'
      }
    },
    {
      path: '/userCard',
      name: '/userCard',
      component: () => import (/* webpackChunkName: 'userCard' */ '@/views/user/userCard'),
      meta: {
        title: '用户卡片'
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
