import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/home'

Vue.use(VueRouter)

const routes = [
    {path: '/', name: '', component: Index},
    {path: '/index', name: 'Index', component: Index},
    {path: '/search', name: 'Search', component: () => import('@/views/search/index.vue'),},
    {
        path: '/item/:skuId', name: 'Item', component: () => import('@/views/item/index'),
        children: [
            {path: 'itemdesc', name: 'ItemDesc', component: () => import("@/views/item/ItemDesc")},
            {path: 'itembaseattr', name: 'ItemBaseAttr', component: () => import("@/views/item/ItemBaseAttr")},
            //设置默认默认现实的页面，如果设置了多个默认显示的页面，会默认显示最新配置的路由
            {path: '/item', redirect: '/item/:skuId/itemDesc'}
        ]
    },
    {
        path: '/loginorregist/:flag',
        name: 'LoginOrRegister',
        component: () => import('@/views/member/loginorregist/index'),
    },
    {path: '/addtocart/:cartId', name: 'CartAdd', component: () => import('@/views/cart/add/index')},
    {path: '/cart', name: 'Cart', component: () => import('@/views/cart/cart/index')},
    {path: '/account', name: 'Account', component: () => import('@/views/member/account/home/index')},
    {path: '/trade', name: 'Trade', component: () => import('@/views/order/trade/index')},
    {path: '/pay/:orderId/:orderSn', name: 'Pay', component: () => import('@/views/order/pay/index')},
    {path: '/order', name: 'Order', component: () => import('@/views/order/order/index')},
    {path: '/member/info', name: 'MemberInfo', component: () => import('@/views/member/info/index')},
    //401页面
    {path: '/401', name: '401', component: () => import('@/views/error/401.vue')},
    /*404页面配置，一定要配置到最底下*/
    {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        name: '404',
        meta: {keepAlive: true, isTab: false, isAuth: false}
    },
    {path: '*', redirect: "/404"}
    /*{
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
    }*/
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
