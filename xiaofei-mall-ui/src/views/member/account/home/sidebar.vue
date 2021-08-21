<template>
    <div>
        <div style="background-color:#f0f3ef;">
            <div class="xiaofei-row xiaofei-center" style="background-color:#f0f3ef;">

                <!-- 左边侧边连区域 -->
                <div class="sidebar-left">
                    <!-- 订单中心 -->
                    <dl>
                        <dt>订单中心</dt>
                        <dd><a>我的订单</a></dd>
                        <dd><a>评论晒单</a></dd>
                    </dl>
                    <!-- 我的钱包 -->
                    <dl>
                        <dt>我的钱包</dt>
                        <dd><a>优惠券</a></dd>
                        <dd><a>积分</a></dd>
                        <dd><a>红包</a></dd>
                        <dd><a>礼品卡</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 我的关注 -->
                    <dl>
                        <dt>我的关注</dt>
                        <dd><a>关注店铺</a></dd>
                        <dd><a>内容收藏</a></dd>
                    </dl>
                    <!-- 我的预约 -->
                    <dl>
                        <dt>我的预约</dt>
                        <dd><a>我的拍卖</a></dd>
                        <dd><a>我的回执单</a></dd>
                        <dd><a>我的必购码</a></dd>
                        <dd><a>我的口令</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 订单中心 -->
                    <dl>
                        <dt>订单中心</dt>
                        <dd><a>我的订单</a></dd>
                        <dd><a>评论晒单</a></dd>
                    </dl>
                    <!-- 客户服务 -->
                    <dl>
                        <dt>客户服务</dt>
                        <dd><a>返修，退换货</a></dd>
                        <dd><a>价格保护</a></dd>
                        <dd><a>我的发票</a></dd>
                        <dd><a>购买咨询</a></dd>
                        <dd><a>交易纠纷</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 特色服务 -->
                    <dl>
                        <dt>特色服务</dt>
                        <dd><a>我的营业厅</a></dd>
                        <dd><a>医疗服务</a></dd>
                        <dd><a>流量加油站</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                </div>

                <!-- 右面主要区域 -->
                <div class="right-main">
                    <!-- 用户账户和余额显示区域 -->
                    <div class="user-photo">
                        <div class="one">
                            <div class="img">
                                <el-image fit="contain" lazy :src="userInfo.header"
                                          style="width: 64px;height: 64px;border-radius: 50%"/>
                            </div>
                            <div class="nick-name"><a>{{ userInfo.username }}</a></div>
                            <div class="user-bound">
                                <a>成长值8888</a>
                                <a>普通会员</a>
                            </div>
                            <div class="user-member">
                                会员尊享10大权益 <a>去逛逛</a>
                            </div>
                        </div>
                        <div class="two">
                            <h3>我的钱包</h3>
                            <div class="discount">
                                <ul class="xiaofei-clear-level-ul">
                                    <li>
                                        <div><a>11</a></div>
                                        优惠券
                                    </li>
                                    <li>
                                        <div><a>665</a></div>
                                        积分
                                    </li>
                                    <li>
                                        <div><a>0.00</a></div>
                                        余额
                                    </li>
                                    <li>
                                        <div><a>0.00</a></div>
                                        本月待还
                                    </li>
                                    <li>
                                        <div><a>0.00</a></div>
                                        昨日收益
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 我的订单区域 -->
                <div class="order-main">
                    <div class="left">
                        <h3>我的订单</h3>
                    </div>
                    <div class="right">
                        <div class="item">
                            <h3>我的关注</h3>
                            <div></div>
                        </div>

                        <div class="item">
                            <h3>长购清单</h3>
                            <div></div>
                        </div>

                        <div class="item">
                            <h3>我的回答</h3>
                            <div></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Cookie from "js-cookie";

export default {
    created() {
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
}
</script>

<style lang="scss" scoped>
$width: 170px;
$color: #df3028;

.sidebar-left {
    float: left;
    width: $width;
    margin-right: 20px;
    background-color: white;

    dl {
        padding: 15px 20px;
        border-bottom: 1px solid #f3f3f3;

        dt {
            font-size: 16px;
            font-weight: 700;
            line-height: 32px;
            color: #333;
        }

        dd {
            margin: 0;

            a {
                position: relative;
                color: #333;
                text-decoration: none;
                font-size: 14px;
                line-height: 32px;

                &:hover {
                    cursor: pointer;
                    color: $color;
                }
            }

        }
    }
}

.right-main {
    $width: (1190-$width);
    float: right;
    width: $width*1-20;
    //用户账户和余额显示区域
    .user-photo {
        height: 243px;
        margin: 20px 0;
        background-color: white;

        .one, .two {
        }

        .one {
            float: left;
            width: 250px;
            height: 243px;
            $color: #f4ca3a;
            background-color: $color;

            .img {
                text-align: center;
                margin-top: 35px;
            }

            .nick-name {
                color: #232331;
                font: 700 18px/20px Arial;
                margin-top: 15px;
                text-align: center;
            }

            .user-bound {
                margin-top: 15px;
                text-align: center;

                a {
                    margin: 0 10px;
                    padding: 5px 10px;
                    font-size: 12px;
                    border-radius: 14px;
                    color: #232331;
                    border: 1px solid #232331;

                    &:hover {
                        cursor: pointer;
                        background-color: #ffffff;
                    }
                }
            }

            .user-member {
                text-align: center;
                margin-top: 13px;
                height: 36px;
                padding: 10px 20px;
                line-height: 36px;
                background-color: #232331;
                color: $color;
                font-size: 13px;
                font-weight: 700;

                > a {
                    margin-left: 5px;
                    padding: 5px 8px;
                    background-color: $color;
                    border-radius: 14px;
                    color: #232331;

                    &:hover {
                        cursor: pointer;
                        background-color: #ffffff;
                    }
                }
            }
        }

        .two {
            width: $width*1-270;
            float: left;

            > h3 {
                height: 62px;
                line-height: 62px;
                margin: 0 0 0 15px;
                padding: 0;
                border: 0;
                border-bottom: 1px solid aliceblue;
                font-size: 16px;
                color: #333;
                font-weight: 400;
            }

            .discount {
                height: 140px;
                margin-top: 40px;

                li {
                    text-align: center;
                    width: ($width*1-270)/5;
                    color: #333;
                    font-size: 12px;

                    > div {
                        text-align: center;
                        height: 24px;
                        margin-bottom: 10px;

                        a {
                            padding-top: 10px;
                            color: #333;
                            line-height: 24px;
                            font-size: 22px;
                            font-weight: 700;

                            &:hover {
                                cursor: pointer;
                                color: #c81623;
                            }
                        }
                    }

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

}

//订单区域
.order-main {
    .left {
        $width: 694px;
        width: $width;
        height: 200px;
        background-color: white;
        float: left;

        > h3 {
            height: 62px;
            line-height: 62px;
            margin: 0 0 0 15px;
            padding: 0;
            border: 0;
            border-bottom: 1px solid aliceblue;
            font-size: 16px;
            color: #333;
            font-weight: 400;
        }

    }

    .right {
        $width: 286px;

        width: $width;
        float: right;

        .item {
            background-color: white;
            margin-bottom: 20px;

            > h3 {
                height: 62px;
                line-height: 62px;
                margin: 0 0 0 15px;
                padding: 0;
                border: 0;
                border-bottom: 1px solid aliceblue;
                font-size: 16px;
                color: #333;
                font-weight: 400;
            }

            > div {
                padding: 20px;
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
