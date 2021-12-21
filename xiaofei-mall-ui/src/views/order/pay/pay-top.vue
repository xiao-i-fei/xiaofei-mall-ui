<template>
    <div>
        <div class="pay-top xiaofei-center">
            <div class="left">
                <div class="logo">
                    <a href="/">
                        <img src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-08-15/logo.png" alt="图片加载失败">
                    </a>
                </div>
                <div class="title">
                    <h3>收银台</h3>
                </div>
            </div>
            <div class="right">
                <span><a>{{ userInfo.username }}</a></span>
                <span><a href="/order">我的订单</a></span>
                <span><a>使用帮助</a></span>
            </div>
        </div>
    </div>
</template>

<script>

import Cookie from "js-cookie";

export default {
    mounted() {
        this.getUserInfo()
    },
    methods: {
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
    }
};
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
div {
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

$width: 990px;
.pay-top {
    $height: 40px;
    margin-top: 15px;
    width: $width;
    height: $height;

    > div {
        height: $height;
        line-height: $height;
        width: 50%;
    }

    .left {
        float: left;

        .logo {
            float: left;

            > a {
                > img {
                    height: $height;
                    object-fit: contain;
                }
            }
        }

        .title {
            float: left;

            h3 {
                margin: 0;
                line-height: 40px;
                font-size: 15px;
                color: #666;
                font-weight: 700;
            }
        }
    }

    .right {
        float: right;
        text-align: right;

        > span {
            font-size: 12px;
            color: #666666;
            border-right: 1px solid #dddddd;

            > a {
                padding: 0 10px;
            }


        }

        > span:last-child {
            border: none;

            > a:last-child {
                padding-right: 0;
            }
        }
    }
}
</style>
