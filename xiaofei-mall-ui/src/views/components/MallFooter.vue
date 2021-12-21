<template>
    <div class="foot-main">
        <!-- 底部第一部分 -->
        <div class="one">
            <div class="xiaofei-row xiaofei-center">
                <!-- 多快好省部分 -->
                <div class="foot-one">
                    <div class="xiaofei-col-3">
                        <div class="foot-img">
                            <img :src="footImgs[0]" alt="加载失败" />
                        </div>
                        <div class="foot-title">
                            <p>品类齐全，轻松购物</p>
                        </div>
                    </div>
                    <div class="xiaofei-col-3">
                        <div class="foot-img">
                            <img :src="footImgs[1]" alt="加载失败" />
                        </div>
                        <div class="foot-title">
                            <p>多仓直发，极速配送</p>
                        </div>
                    </div>
                    <div class="xiaofei-col-3">
                        <div class="foot-img">
                            <img :src="footImgs[2]" alt="加载失败" />
                        </div>
                        <div class="foot-title">
                            <p>正品行货，精致服务</p>
                        </div>
                    </div>
                    <div class="xiaofei-col-3">
                        <div class="foot-img">
                            <img :src="footImgs[3]" alt="加载失败" />
                        </div>
                        <div class="foot-title">
                            <p>天天低价，畅选无忧</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部第二部分 -->
        <div class="xiaofei-row xiaofei-center two">
                <div class="foot-two">
                    <!-- 购物指南 -->
                    <div class="xiaofei-col-2">
                        <h5>购物指南</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>购物流程</li>
                            <li>会员介绍</li>
                            <li>生活旅行</li>
                            <li>常见问题</li>
                            <li>大家电</li>
                            <li>联系客服</li>
                        </ul>
                    </div>

                    <!-- 配送方式 -->
                    <div class="xiaofei-col-2">
                        <h5>配送方式</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>上门自提</li>
                            <li>211限时送达</li>
                            <li>配送服务查询</li>
                            <li>配送费收取标准</li>
                            <li>海外配送</li>
                        </ul>
                    </div>

                    <!-- 支付方式 -->
                    <div class="xiaofei-col-2">
                        <h5>支付方式</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>货到付款</li>
                            <li>在线支付</li>
                            <li>分期支付</li>
                            <li>公司转账</li>
                        </ul>
                    </div>

                    <!-- 售后服务 -->
                    <div class="xiaofei-col-2">
                        <h5>售后服务</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>售后政策</li>
                            <li>价格保护</li>
                            <li>退款说明</li>
                            <li>返修/退换货</li>
                            <li>取消订单</li>
                        </ul>
                    </div>

                    <!-- 特色服务 -->
                    <div class="xiaofei-col-2">
                        <h5>特色服务</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>夺宝岛</li>
                            <li>DIY装机</li>
                            <li>延保服务</li>
                            <li>E卡</li>
                            <li>小飞通信</li>
                        </ul>
                    </div>

                    <!-- 自营覆盖区县 -->
                    <div class="xiaofei-col-2">
                        <h5>自营覆盖区县</h5>
                        <ul class="xiaofei-clear-vertical-ul">
                            <li>小飞商城已向全国2661个区县提供自营配送服务，支持货到付款、POS机刷卡和售后上门服务。</li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import foot1 from "@/assets/images/2021-08-08_15-08-41.png";
import foot2 from "@/assets/images/2021-08-08_15-09-22.png";
import foot3 from "@/assets/images/2021-08-08_15-10-02.png";
import foot4 from "@/assets/images/2021-08-08_15-10-35.png";

export default {
    data() {
        return {
            footImgs: [foot1, foot2, foot3, foot4],
        };
    },
};
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
.foot-main {
    background-color: #eaeaea;
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}
.one {
    background-color: #eaeaea;
    border-bottom: 1px solid rgb(222, 222, 222);
}
.foot-one {
    background-color:#eaeaea;
    > div {
        height: 55px;
        margin: 20px 0;
        text-align: center;

        .foot-img {
            width: 20%;
            float: left;
            height: 55px;
        }

        .foot-title {
            height: 55px;
            line-height: 55px;
            text-align: left;
            width: 80%;
            float: left;
            font-size: 20px;
            font-weight: 800;
            p {
                padding: 0;
                margin: 0;
                border: 0;
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
.two {
    background-color:#eaeaea;
    padding-bottom: 30px;
}
.foot-two {
    div {
        h5 {
            font-size: 14px;
            color: rgb(102, 102, 102);
        }
        li {
            height: 22px;
            line-height: 22px;
            font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial,
                Hiragino Sans GB, "\5B8B\4F53", sans-serif;
            color: rgb(102, 102, 102);
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

