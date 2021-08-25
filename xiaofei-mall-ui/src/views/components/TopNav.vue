<!-- 顶部导航栏区域 -->
<template>
    <div class="main">
        <div class="top-nav-main xiaofei-row xiaofei-center">
            <div class="left-div xiaofei-col-6">
                <a v-if="homeIsShow" href="/">
                    <i class="el-icon-s-home"></i>
                    <span>商城首页</span>
                </a>
                <a class="location">
                    <i class="el-icon-location"></i>
                    <span>湖南</span>
                </a>
            </div>
            <div class="right-div xiaofei-col-6">
                <ul class="xiaofei-clear-level-ul">
                    <li>
<!--                        <el-dropdown trigger="click">-->
                            <router-link v-if="userInfo.id>0" style="text-decoration: none;"
                                         :to="{path:'/loginorregist/login'}">
                                {{ userInfo.username }} 欢迎登录<i class="el-icon-arrow-down el-icon--right"></i>
                            </router-link>
<!--                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>个人中心</el-dropdown-item>
                                <el-dropdown-item>退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>-->

                        <!-- 没有登录的时候显示 -->
                        <router-link v-if="!userInfo.id>0" style="text-decoration: none;"
                                     :to="{path:'/loginorregist/login'}">
                            你好，请登录
                        </router-link>
                    </li>
                    <li>
                        <router-link v-if="!userInfo.id>0" style="text-decoration: none;"
                                     :to="{path:'/loginorregist/regist'}">
                            免费注册
                        </router-link>
                    </li>
                    <li><router-link :to="{path:`/order`}" style="text-decoration: none">我的订单</router-link></li>
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
            logout().then(response => {
                if (response.code == 200) {
                    Cookie.remove('User-Token');
                    Cookie.remove('username');
                    Cookie.remove('userInfo');
                    this.$message.success("退出成功")
                    this.$router.push({path: "/"})
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
    props: {
        homeIsShow: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            userInfo: {},//用户信息
        }
    }
};
</script>

<style lang="scss" scoped>
$height: 30px;
.main {
    background-color: rgb(227, 228, 229);
}

.top-nav-main {
    height: $height;
    background-color: rgb(227, 228, 229);
}

.left-div {
    padding-left: 0;
    height: $height;
    line-height: $height;

    span {
        display: inline-block;
        color: rgb(153, 153, 153);
        font-size: 13px;
    }

    i {
        color: rgb(92, 84, 82);
    }

    .location {
        padding: 0 20px;
        position: relative;

        &:hover {
            background-color: white;
        }
    }

    a {
        height: $height;
        line-height: $height;
        display: inline-block;

        &:hover {
            cursor: pointer;

            i,
            span {
                color: rgb(241, 2, 21);
            }
        }
    }
}

.right-div {
    padding-right: 0;
    height: $height;
    line-height: $height;

    ul {
        float: right;
    }

    li {
        padding: 0 10px;

        a {
            color: rgb(153, 153, 153);
            font-size: 13px;

            &:hover {
                color: rgb(241, 2, 21);
                cursor: pointer;
            }
        }
    }

    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
</style>
