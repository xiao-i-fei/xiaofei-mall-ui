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
                        <router-link style="text-decoration: none;" :to="{path:'/loginorregist/login'}">你好，请登录
                        </router-link>
                    </li>
                    <li>
                        <router-link style="text-decoration: none;" :to="{path:'/loginorregist/regist'}">免费注册</router-link>
                    </li>
                    <li><a>我的订单</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        homeIsShow: {
            type: Boolean,
            default: false,
        },
    },
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
