<template>
    <div>
        <div class="bottom">
            <div class="top">
                <div class="title wrapper">
                    <ul>
                        <li>
                            <p>
                                品类齐全，轻松购物
                            </p>
                        </li>
                        <li>
                            <p>
                                多仓直发，极速配送
                            </p>
                        </li>
                        <li>
                            <p>
                                正品行货，精致服务
                            </p>
                        </li>
                        <li>
                            <p>
                                天天低价，畅选无忧
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom-main">
                <div class="main wrapper">
                    <!-- 购物指南 -->
                    <div>
                        <h5>购物指南</h5>
                        <ul>
                            <li>购物流程</li>
                            <li>会员介绍</li>
                            <li>生活旅行</li>
                            <li>常见问题</li>
                            <li>大家电</li>
                            <li>联系客服</li>
                        </ul>
                    </div>

                    <!-- 配送方式 -->
                    <div>
                        <h5>配送方式</h5>
                        <ul>
                            <li>上门自提</li>
                            <li>211限时送达</li>
                            <li>配送服务查询</li>
                            <li>配送费收取标准</li>
                            <li>海外配送</li>
                        </ul>
                    </div>

                    <!-- 支付方式 -->
                    <div>
                        <h5>支付方式</h5>
                        <ul>
                            <li>货到付款</li>
                            <li>在线支付</li>
                            <li>分期支付</li>
                            <li>公司转账</li>
                        </ul>
                    </div>

                    <!-- 售后服务 -->
                    <div>
                        <h5>售后服务</h5>
                        <ul>
                            <li>售后政策</li>
                            <li>价格保护</li>
                            <li>退款说明</li>
                            <li>返修/退换货</li>
                            <li>取消订单</li>
                        </ul>
                    </div>

                    <!-- 特色服务 -->
                    <div>
                        <h5>特色服务</h5>
                        <ul>
                            <li>夺宝岛</li>
                            <li>DIY装机</li>
                            <li>延保服务</li>
                            <li>E卡</li>
                            <li>小飞通信</li>
                        </ul>
                    </div>

                    <!-- 自营覆盖区县 -->
                    <div>
                        <h5>自营覆盖区县</h5>
                        <ul>
                            <li>小飞商城已向全国2661个区县提<br/>供自营配送服务，支持货到付款<br/>、POS机刷卡和售后上门服务。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

.bottom {
    padding-bottom: 30px;
    background-color: #f4f4f4;

    .top {
        border-bottom: 1px solid #dedede;
        padding: 30px 0;
        margin-bottom: 20px;

        .title {
            height: 42px;

            ul {
                display: flex;
                justify-content: space-between;

                p {
                    overflow: hidden;
                    width: 100%;
                    height: 42px;
                    font-size: 18px;
                    font-weight: 700;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #444;

                }
            }
        }
    }

    .bottom-main {
        .main {
            display: flex;
            justify-content: space-between;
            align-items: center;

            div {
                height: 200px;

                h5 {
                    font-size: 14px;
                    color: rgb(102, 102, 102);
                }

                ul {
                    li {
                        height: 22px;
                        line-height: 22px;
                    }
                }
            }
        }

    }

}
</style>
