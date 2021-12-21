<template>
    <div>
        <div v-if="errorIsShow">
            <div class="error-info xiaofei-center">
                {{ errorInfo }}<br>
                <a href="/" style="margin-top: 20px;display: inline-block;font-size: 17px;color: #69a5ff">首页</a>
            </div>
        </div>
        <div v-else>
            <div class="xiaofei-center aaa">
                <!-- 订单信息 -->
                <div class="pay-order-info">
                    <div class="left">
                        <div class="img">
                            <img
                                src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-08-14/IMG_20210823_140229.png"
                                alt="图片加载失败">
                        </div>
                        <div class="order-info">
                            <div>订单提交成功，请尽快付款！<span>订单号：{{ orderItemInfo.orderEntity.orderSn }}</span></div>
                            <div>
                                <span>千万别扫码，</span>
                                <span>请您在 <span style="color: #e31613">30分钟内</span> 内完成支付，否则订单会被自动取消</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="one" style="margin-top: 20px;margin-bottom: 5px">
                            <span style="color: #666666;margin-right: 5px;font-size: 12px">应付金额</span>
                            <strong
                                style="padding: 0 5px;color: #e31613;font-weight: 700;font-size: 16px">{{
                                    orderItemInfo.orderEntity.payAmount
                                }}</strong>
                            <span style="color: #666666;margin-right: 5px;font-size: 12px">元</span>
                        </div>
                        <div class="two">
                            <a style="" class="order-detail-info-a" @click="orderInfoShow=!orderInfoShow">
                                订单详情
                                <i v-if="!orderInfoShow" class="el-icon-caret-bottom"></i>
                                <i v-else class="el-icon-caret-top"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bbb xiaofei-center">
                <div class="xiaofei-center" style="width: 990px">
                    <div>
                        <el-collapse-transition>
                            <div v-show="orderInfoShow"
                                 style="padding-top: 5px;margin-bottom: 20px;border-top: 1px solid rgb(208, 208, 208);font-size: 12px;color: #666666">
                                <div>
                            <span>
                                收货地址：{{ orderItemInfo.orderEntity.receiverProvince }} -
                                        {{ orderItemInfo.orderEntity.receiverCity }} -
                                        {{ orderItemInfo.orderEntity.receiverRegion }} -
                                        {{ orderItemInfo.orderEntity.receiverDetailAddress }}
                             </span>
                                    <span
                                        v-if="orderItemInfo.orderEntity.receiverName&&orderItemInfo.orderEntity.receiverPhone">
                                        收货人：【 *{{ orderItemInfo.orderEntity.receiverName.substring(1) }}
                                         ， ****{{ orderItemInfo.orderEntity.receiverPhone.substring(4) }}】
                                    </span>
                                </div>
                                <div>
                                    商品名称：
                                    <div v-for="(item,index) in orderItemInfo.orderItemEntitys">
                                        {{ item.spuName }}
                                    </div>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                    <!-- 支付方式选择 -->
                    <div class="pay-switch-main">
                        <div class="pay-switch" style="margin-bottom: 15px">
                            <div>
                            <span
                                style="display: inline-block;color:#db262f;background-color: #ffeeed;font-size: 15px;padding: 10px;font-weight: 800">
                                商城支付
                            </span>
                            </div>
                            <div style="padding: 20px">
                                <!-- 每一项支付方式 -->
                                <div class="pay-switch-item" style="padding: 15px">
                                    <div class="pay-check">
                                        <input type="checkbox" v-model="paymentMethod"/>
                                    </div>
                                    <div class="pay-logo">
                                        <div style="float: left">
                                            <img src="https://storage.360buyimg.com/payment-assets/sdk/bank/ICBC.png"
                                                 alt="">
                                        </div>
                                        <div style="float: left;line-height: 28px">
                                            <strong>工商银行</strong>
                                        </div>
                                    </div>
                                    <div class="pay-channel">
                                        <span>储蓄卡（6666）</span>
                                    </div>
                                    <div class="pay-money">
                                        支付 <strong>{{ orderItemInfo.orderEntity.payAmount }}</strong>元
                                    </div>
                                </div>
                                <div class="pay-switch-item" style="padding: 15px">
                                    <div class="pay-check">
                                        <input type="checkbox" style="cursor: not-allowed" disabled/>
                                    </div>
                                    <div class="pay-logo">
                                        <div style="float: left">
                                            <img
                                                src="https://storage.360buyimg.com/payment-assets/sdk/icon/BAITIAO_2.0.png"
                                                alt="">
                                        </div>
                                        <div style="float: left;line-height: 28px">
                                            <strong>白条</strong>
                                        </div>
                                    </div>
                                    <div class="pay-channel">
                                        <span>可用额度 0 元</span>
                                    </div>
                                    <div class="pay-money" v-if="false">
                                        支付 <strong>{{ orderItemInfo.orderEntity.payAmount }}</strong>元
                                    </div>
                                </div>
                                <div class="pay-switch-item" style="padding: 15px">
                                    <div class="pay-check">
                                        <input type="checkbox" style="cursor: not-allowed" disabled/>
                                    </div>
                                    <div class="pay-logo">
                                        <div style="float: left">
                                            <img src="https://storage.360buyimg.com/payment-assets/sdk/icon/JDGB.png"
                                                 alt="">
                                        </div>
                                        <div style="float: left;line-height: 28px">
                                            <strong>钢镚</strong>
                                        </div>
                                    </div>
                                    <div class="pay-channel">
                                        <span>本次可消费 0 元</span>
                                    </div>
                                    <div class="pay-money" v-if="false">
                                        支付 <strong>{{ orderItemInfo.orderEntity.payAmount }}</strong>元
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="other-pay">
                            <div style="margin-left: 50px">
                                <a>其他支付方式</a>
                            </div>
                        </div>
                        <div class="pay-btn">
                            <div @click="orderPay">立即支付</div>
                        </div>
                    </div>

                    <!-- 第三方支付方式 -->
                    <div class="third-pay-switch">
                        <div class="third-pay-switch-main">
                            <div class="third-pay-switch-item">
                                <div class="third-pay-switch-image">
                                    <img src="https://storage.360buyimg.com/payment-assets/sdk/bank/PAY-UNION.png"
                                         alt=""/>
                                </div>
                                <div class="third-pay-switch-name">
                                    <span>中国银联</span>
                                </div>
                            </div>
                            <div class="third-pay-switch-item">
                                <div class="third-pay-switch-image">
                                    <img src="https://storage.360buyimg.com/payment-assets/sdk/bank/PAY-WEIXIN.png"
                                         alt=""/>
                                </div>
                                <div class="third-pay-switch-name">
                                    <span>微信支付</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {payOrderInfo, orderPay} from "@/api/order/order";

export default {
    data() {
        return {
            errorInfo: "",
            errorIsShow: false,
            orderInfoShow: false,
            orderReqVo: {
                orderId: "", orderSn: "", skuInfos: []
            },
            orderItemInfo: {orderEntity: {}, orderItemEntitys: []},
            paymentMethod: true,//支付方式
        }
    },
    methods: {
        //订单支付
        orderPay() {
            if (this.paymentMethod) {
                this.$confirm('是否执行支付操作', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let skuInfos = [];
                    this.orderItemInfo.orderItemEntitys.forEach(item => {
                        let skuInfo = {skuId: "", spuId: "", skuQuantity: 1}
                        skuInfo.skuId = item.skuId
                        skuInfo.spuId = item.spuId
                        skuInfo.skuQuantity = item.skuQuantity;
                        skuInfos.push(skuInfo)
                    })
                    this.orderReqVo.skuInfos = skuInfos;
                    orderPay(this.orderReqVo).then(response => {
                        if (response.code==200) {
                            this.$router.push({path:`/order`})
                        } else {
                            this.message.err("支付失败。请重新支付")
                        }
                    })
                }).catch(() => {
                });
            } else {
                this.$message.info("请选择支付方式")
            }
        },
        //获取订单详信息
        getOrderItemInfo() {
            payOrderInfo(this.orderReqVo).then(response => {
                if (response.code == 200) {
                    this.orderItemInfo = response.data
                } else {
                    this.errorInfo = response.msg
                    this.errorIsShow = true
                }
            })
        }
    },
    created() {
        //接收订单号和订单id
        this.orderReqVo.orderId = this.$route.params.orderId;
        this.orderReqVo.orderSn = this.$route.params.orderSn;
        this.getOrderItemInfo();
    },
}
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

.aaa {
    width: $width;

    > div {
        width: $width;
    }
}

.bbb {
    position: relative;
    background-size: cover;
    display: grid;
    background: url("../../../assets/images/order-pay-bgc.jpg") no-repeat;
    background-size: cover;
    width: 1390px;
    margin: 0 auto;
}

.pay-order-info {
    $height: 110px;
    height: $height;

    > div {
        float: left;
    }

    .left {
        width: 60%;

        .img {
            float: left;

            > img {
                object-fit: contain;
                width: 88px;
                height: 88px;
                margin-top: 11px;
            }
        }

        .order-info {
            height: 88px;
            line-height: 20px;
            margin-top: 10px;

            > div {
                height: 15px;
                color: #333;
                font-size: 12px;
            }

            > div:nth-child(1) {
                font-size: 14px;
                height: 20px;
                line-height: 20px;
                margin-top: 25px;
            }

            > div:nth-child(2) {
                > span:nth-child(1) {
                    padding-right: 10px;
                    border-right: 1px solid #dddddd;
                }

                > span:nth-child(2) {
                    margin-left: 20px;
                }
            }

            margin-left: 10px;
            float: left;
            background-color: white;
        }
    }

    .right {
        margin-top: 11px;
        text-align: right;
        width: 40%;

        .order-detail-info-a {
            font-size: 12px;
            color: #67a4ff;

            &:hover {
                color: #e31629;
            }
        }
    }
}

.error-info {
    border-top: 10px solid #4b5b78;
    margin-top: 60px;
    text-align: center;
    padding: 50px 100px;
    width: $width*1-200px;
    color: #666;
    font-size: 24px;
}

.bbb {
    .pay-switch-main {
        width: 930px;
        padding: 12px 30px;
        background: #fff;
        box-shadow: 0 6px 32px rgb(0 0 0 / 13%);
        z-index: 1;

        .pay-switch {
            margin-top: 30px;
            box-shadow: 0 0 6px rgb(10 22 57 / 13%);
            border-radius: 3px;

            .pay-switch-item {
                border-bottom: 1px solid #eeeeee;

                > div {
                    height: 32px;
                    line-height: 32px;
                    float: left;
                }

                .pay-logo {
                    width: 170px;

                    > div {
                        padding: 0 5px;
                        float: left;
                        height: 32px;
                        line-height: 28px;
                    }

                    > div > :nth-child(2) {
                    }

                    img {
                        width: 26px;
                        height: 26px;
                        object-fit: contain;
                    }
                }

                .pay-check {
                    margin-right: 50px;

                    input[type='checkbox'] {
                        width: 20px;
                        height: 20px;
                        background-color: #fff;
                        -webkit-appearance: none;
                        border: 1px solid #c9c9c9;
                        border-radius: 2px;
                        outline: none;
                    }

                    input[type=checkbox]:checked {
                        border: 1px solid white;
                        background-color: deepskyblue;
                    }
                }

                .pay-channel {
                    color: #666;
                    font-size: 12px;
                }

                .pay-money {
                    font-size: 12px;
                    color: #666;
                    float: right;

                    > strong {
                        color: #e31613;
                        font-size: 17px;
                        font-weight: 800;
                    }
                }

                padding-top: 10px;
            }
        }

        .other-pay {
            padding: 10px 0 10px 0;

            a {
                border: 1px solid #e0e0e0;
                font-size: 12px;
                padding: 10px;
                color: #67a4ff;
                cursor: pointer;
                background: white;
                text-decoration: none;

                &:hover {
                    color: #e31613;
                }
            }
        }

        .pay-btn {
            padding: 5px 0 0 0;

            > div {
                cursor: pointer;
                float: right;
                display: inline-block;
                width: 222px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                background: #e31613;
                border: 1px solid #e31613;
                border-radius: 2px;
                font-size: 18px;
                font-weight: 700;
                color: #fff;

                &:hover {
                    background-color: #e94542;
                }
            }
        }
    }

    .third-pay-switch {
        margin-top: 25px;
        margin-bottom: 25px;

        .third-pay-switch-main {
            width: 100%;
            background: #fff;
            box-shadow: 0 6px 32px rgb(0 0 0 / 13%);
            padding: 30px 30px 30px 10px;
            box-sizing: border-box;

            > div {
                float: left;
            }

            .third-pay-switch-item {
                padding: 0 40px;
                border-right: 1px solid #dddddd;

                > div {
                    float: left;
                    height: 30px;
                    line-height: 30px;
                }

                .third-pay-switch-image {
                    margin-right: 10px;

                    img {
                        width: 26px;
                        height: 26px;
                    }
                }

                .third-pay-switch-name {
                    span {
                        font-size: 16px;
                        color: #666;

                        &:hover {
                            cursor: pointer;
                            color: #e4393c;
                        }
                    }
                }
            }

            .third-pay-switch-item:last-child {
                border: 0;
            }
        }
    }
}

</style>
