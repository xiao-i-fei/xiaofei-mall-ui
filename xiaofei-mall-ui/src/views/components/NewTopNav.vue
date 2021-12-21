<template>
    <div class="top">
        <div :class="{'big-wrapper':bigWrapper,'wrapper':!bigWrapper, 'main':true}">
            <div class="left">
                <a href="">
                    <i class="el-icon-location-outline"></i>
                    <span>湖南</span>
                </a>
            </div>
            <div class="right">
                <ul>
                    <li v-if="userInfo.id>0">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                              <a href="/account">
                                {{ userInfo.username }} 欢迎登录<i class="el-icon-arrow-down el-icon--right"></i>
                              </a>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <ul class="xiaofei-clear-vertical-ul" style="padding: 0 20px;text-align: center">
                                    <li style="padding: 5px 0"><a style="font-size: 12px;color: #666;" @click="logout">退出登录</a>
                                    </li>
                                    <li style="padding: 5px 0">
                                        <router-link to="/account"
                                                     style="text-decoration: none;font-size: 12px;color: #666">个人信息中心
                                        </router-link>
                                    </li>
                                </ul>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li>
                    <li v-if="!userInfo.id>0"><a href="/loginorregist/login">你好，请登录</a></li>
                    <li v-if="!userInfo.id>0"><a href="/loginorregist/regist">免费注册</a></li>
                    <li><a href="/order">我的订单</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import {logout} from "@/api/auth/auth";

export default {
    mounted() {
        this.getUserInfo()
    },
    methods: {
        //退出登录
        logout() {
            console.log(13132)
            logout().then(response => {
                if (response.code == 200) {
                    Cookie.remove('User-Token');
                    Cookie.remove('username');
                    Cookie.remove('userInfo');
                    this.$message.success("退出成功")
                    window.location.href = "/";
                } else {
                    this.$message.success("退出失败")
                }
            })
        },
        //获取用户信息
        getUserInfo() {
            let userInfo = Cookie.get("userInfo")
            if (userInfo) this.userInfo = JSON.parse(userInfo)
        }
    },
    data() {
        return {
            userInfo: {},//用户信息
        }
    },
    props: {
        //版心设置-是否是大版心
        bigWrapper: {
            type: Boolean,
            default: false,
        },
    }
}
</script>

<style lang="scss" scoped>
.top {
    $top-nav-color: #999;
    $top-nav-hover-color: #e33333;
    $top-nav-bgc: #e3e4e5;
    color: $top-nav-color;
    font-size: 12px;
    background-color: $top-nav-bgc;

    .main {
        height: 30px;
        background-color: $top-nav-bgc;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            a {
                span {

                }

                &:hover {
                    color: $top-nav-hover-color;
                }
            }
        }

        .right {
            ul {
                display: flex;

                li {
                    color: #999999;
                    font-size: 13px;
                    padding: 0 15px;
                    border-left: 1px solid $top-nav-color;

                    a {
                        color: #999999;
                        font-size: 13px;

                        &:hover {
                            color: $top-nav-hover-color;
                        }
                    }
                }

                li:last-child {
                    padding-right: 0;
                }

                li:first-child {
                    border-left: 0;
                }
            }
        }
    }
}
</style>
