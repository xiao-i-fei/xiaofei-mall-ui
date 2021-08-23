import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'
import Cookie from 'js-cookie'
import {getMemberByToken} from "@/api/member/member";
import Cookies from "js-cookie";

//白名单
const whiteList = ['/', '/search']

const TokenKey = 'User-Token'//token的键

router.beforeEach((to, from, next) => {
    NProgress.start()//请求进度条，样式
    //判断token是否存在
    if (getToken()) {

        //判断用户信息是否为空
        let userInfo = Cookie.get("userInfo")
        if (userInfo === undefined) {
            //获取用户信息
            getMemberByToken().then(response => {
                if (response.data.id > 0) {
                    Cookies.set("userInfo", response.data, {domain: 'localhost'})
                }
            })
        }

        // 如果有token，判断当前路径是否是去登录页面或注册页的路径，如果是，就重定向到首页去，避免已经登录的还还能进登录页面
        if (to.path === '/loginorregist/regist' || to.path === '/loginorregist/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            next()
        }

    } else {
        // 没有token，判断当前访问路径是否在白名单里面，如果没有在白名单里面，直接重定向到登录页面去，删除cookie中的用户信息
        Cookie.remove("username")
        Cookie.remove("userInfo")
        Cookie.remove(TokenKey)
        //动态白名单
        let dynamicWhiteList = [`/loginorregist/${to.params.flag}`, `/item/${to.params.skuId}/itemdesc`, `/item/${to.params.skuId}/itembaseattr`]
        if (whiteList.indexOf(to.path) > -1 || dynamicWhiteList.indexOf(to.path) > -1) {
            // 在免登录白名单，直接进入
            next()//往下执行
        } else {
            //不在白名单里面，直接重定向到登录页面，to.fullPath：真正的路径
            next(`/loginorregist/login`) // 否则全部重定向到登录页
            NProgress.done()//进度条显示结束
        }
    }

})

router.afterEach(() => {
    NProgress.done()//进度条显示结束
})
