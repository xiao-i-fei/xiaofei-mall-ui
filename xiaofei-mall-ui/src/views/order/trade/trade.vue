<!-- 填写购买信息页面，比如收货人信息等 -->
<template>
    <div>

        <div>
            <div class="xiaofei-center trade-top">
                <div class="top-logo">
                    <div class="left">
                        <el-image src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-08-15/logo.png"
                                  lazy fit="contain" style="width: 181px;height: 100%;margin-top: 5px"/>
                        <el-image
                            src="https://misc.360buyimg.com/user/purchase/2.0.0/widget/header-2017/i/purchase-icon.png"
                            lazy fit="contain" style="width: 80px;height: 65px"/>

                    </div>
                    <div class="right">
                        <el-steps align-center style="margin-top: 10px" :active="1" finish-status="success">
                            <el-step title="1、我的购物车"></el-step>
                            <el-step title="2、填写核对订单信息"></el-step>
                            <el-step title="3、成功提交订单"></el-step>
                        </el-steps>
                    </div>
                </div>
            </div>

            <div class="xiaofei-center order-info-main">
                <div class="tit-span">
                    <span>填写并核对订单信息</span>
                </div>

                <div class="all-item">

                    <!-- 用户信息 -->
                    <div class="item">
                        <div class="title">
                            <h3>收货人信息</h3>
                        </div>
                        <div class="con">
                            <div class="step-con">
                                <div class="user-info">
                                    <ul class="xiaofei-clear-level-ul">
                                        <li @mouseenter="showIndex=index" @mouseleave="showIndex=-1" v-if=""
                                            v-for="(receiveAddress,index) in orderInfo.receiveAddress">
                                            <div :class="{'default-div':receiveAddress.defaultStatus==1,'left':true}"
                                                 v-text="receiveAddress.name"></div>
                                            <div>
                                                <span v-text="receiveAddress.name"></span>
                                                <span>
                                            {{ receiveAddress.province }} {{
                                                        receiveAddress.city
                                                    }} {{ receiveAddress.region }}
                                            {{ receiveAddress.detailAddress }}
                                        </span>
                                                <span>
                                            {{ receiveAddress.phone }}
                                        </span>
                                                <span :class="{'default-span':receiveAddress.defaultStatus==1}">
                                            默认地址
                                        </span>
                                            </div>
                                            <div v-show="showIndex==index">
                                                <a>设置默认地址</a>
                                                <a>编辑</a>
                                                <a>删除</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 支付方式 -->
                    <div class="item">
                        <div class="title">
                            <h3>支付方式</h3>
                        </div>
                        <div class="con">
                            <div class="step-con">
                                <div class="pay-switch">
                                    <ul class="xiaofei-clear-level-ul">
                                        <li>
                                            <div>在线支付</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 送货清单 -->
                    <div class="item">
                        <div class="title">
                            <h3>送货清单</h3>
                        </div>
                        <div class="con">
                            <div class="step-con">
                                <div class="shopping-list">
                                    <div class="goods-list">
                                        <h4>商家：商城自营</h4>
                                        <div v-for="(item,index) in orderInfo.cartInfo.items" :key="item.addTime">
                                            <div class="item-img">
                                                <el-image fit="contain" :src="item.defaultImage" lazy
                                                          style="width: 80px;height: 80px"/>
                                            </div>
                                            <div class="item-title"><a>{{ item.skuName }}</a></div>
                                            <div class="item-price"> ￥ {{ item.skuPrice }}</div>
                                            <div class="item-buy-num">x {{ item.buyNum }}</div>
                                            <div class="item-has-stock">有货</div>
                                            <div class="item-sale-attr"
                                                 v-for="(value,key) in JSON.parse(item.saleAttr) ">
                                                <div class="saleattr">
                                                    <strong>{{ key }}：</strong>
                                                    <span>{{ value }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dis-modes">
                                        <h4>配送方式</h4>
                                        <div class="get-methods">商城快递</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div class="xiaofei-center order-summary">
                <div style="float: right;width: 300px;margin-bottom: 10px;margin-right: 20px;">
                    <div class="list">
                        <span><em style="color: #e4393c;font-style: normal">{{ orderInfo.cartInfo.totalCount }}</em> 件商品，总商品金额：</span>
                        <span>￥ {{ orderInfo.cartInfo.totalPrice }}</span>
                    </div>
                </div>
            </div>

            <div class="xiaofei-center trade-foot-detail-com">
                <div class="total-price">应付总额：<span>￥ {{ orderInfo.cartInfo.totalPrice }}</span></div>
                <div class="buy-people-info">
                    <span>寄送至：{{defaultAddress.province}} {{defaultAddress.city}} {{defaultAddress.region}} {{defaultAddress.detailAddress}}</span>
                    <span>收获人：{{defaultAddress.name}}  {{defaultAddress.phone}}</span>
                </div>
            </div>


            <div class="xiaofei-center add-order-btn">
                <div>
                    <el-button type="danger">提交订单</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {queryOrderInfo} from "@/api/order/order";

export default {
    data() {
        return {
            showIndex: -1,
            defaultAddress:{},
            orderInfo: {receiveAddress: [], cartInfo: {}}
        }
    },
    created() {
        this.queryOrderInfo();
    },
    methods: {
        queryOrderInfo() {
            queryOrderInfo().then(response => {
                //判断商品是否有库存
                if (response.data.hasStock) {
                    this.$message.info("未进入结算页面的商品已经没有库存来了，已自动从订单中去除了");
                }
                this.orderInfo = response.data
                //获取默认地址信息
                response.data.receiveAddress.forEach(item=>{
                    if(item.defaultStatus==1){
                        this.defaultAddress = item
                    }
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
$width: 1000px;
$color: #e4393c;

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

.trade-top {

    width: $width;
    padding: 20px 0 10px 0;

    .left {
        width: $width/2;
        float: left;
    }

    .right {
        width: $width/2;
        float: right;
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

.order-info-main {
    width: $width;

    .tit-span {
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        overflow: hidden;
        color: #666;

        > span {
            float: left;
        }
    }

    .all-item {
        background-color: white;
        padding: 20px 20px;
        border: 1px solid #f0f0f0;

        .item {
            height: auto;
            background-color: white;
            padding: 20px;
            border-bottom: 1px solid rgb(230, 230, 230);

            .title {

                h3 {
                    margin: 0;
                    padding: 0;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                    float: left;
                    color: #333;

                }
            }

            .con {
                .step-con {
                    font-size: 12px;
                    //收货人信息样式
                    .user-info {
                        margin-left: 25px;

                        > ul {
                            width: 100%;
                            margin: 6px 0;
                            line-height: 30px;

                            li:nth-child(1) {
                                width: 100%;
                                color: #666;
                                font-size: 12px;

                                .left {
                                    background-color: white;
                                    float: left;
                                    padding: 0 80px;
                                    border: 2px solid #dddddd;
                                    margin-right: 20px;

                                    &:hover {
                                        cursor: pointer;
                                        border: 2px solid $color;
                                    }
                                }

                                > div:nth-child(2) {
                                    float: left;
                                }

                                > div:nth-child(3) {
                                    float: right;

                                    a {
                                        margin-left: 20px;
                                        color: #005ea7;

                                        &:hover {
                                            cursor: pointer;
                                            color: $color;
                                        }
                                    }
                                }

                                > span {
                                    margin-left: 15px;
                                }

                                .default-div {
                                    border: 2px solid $color;
                                }

                                &:hover {
                                    background-color: #fff3f3;
                                }
                            }
                        }
                    }

                    //支付方式
                    .pay-switch {
                        margin-left: 25px;

                        > ul {
                            width: 100%;
                            margin: 6px 0;
                            line-height: 30px;

                            > li {
                                > div {
                                    height: 18px;
                                    line-height: 18px;
                                    border: 2px solid #e4393c;
                                    padding: 4px 23px;
                                    cursor: pointer;
                                    color: #666;
                                }
                            }
                        }
                    }

                    //送货清单
                    .shopping-list {
                        color: #666666;
                        font-size: 12px;
                        background-color: #f7f7f7;

                        .goods-list {
                            padding: 10px 0 10px 20px;
                            width: 565px;
                            background-color: #f3fbfe;
                            float: right;

                            .item-img {
                                float: left;
                                margin-right: 10px;
                            }

                            .item-title {
                                float: left;
                                width: 240px;
                                height: 36px;
                                overflow: hidden;

                            }

                            .item-price, .item-buy-num, .item-has-stock {
                                height: 36px;
                                float: left;
                                text-align: center;
                                overflow: hidden;
                            }

                            .item-price {
                                width: 100px;
                            }

                            .item-buy-num {
                                width: 60px;
                            }

                            .item-has-stock {
                                width: 60px;
                            }

                            .item-sale-attr {
                                float: left;
                                margin-top: 10px;

                                .saleattr {
                                    min-width: 120px;
                                    max-width: 120px;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    margin-right: 20px;
                                }
                            }
                        }

                        .dis-modes {
                            width: 300px;
                            padding: 10px 10px 10px 20px;
                            float: left;

                            .get-methods {
                                height: 18px;
                                line-height: 18px;
                                text-align: center;
                                position: relative;
                                cursor: pointer;
                                border: 2px solid #e4393c;
                                padding: 4px 0;
                                width: 141px;;
                                color: #666;
                            }
                        }
                    }

                }
            }
        }

    }
}

.order-summary {
    margin-top: 30px;
    margin-bottom: 30px;
    width: $width;
    font-size: 12px;
    color: #333;

    .list {
        > span:nth-child(1) {
            width: 180px;
            margin-right: 10px;
        }

        > span:nth-child(2) {
            text-align: right;
            display: inline-block;
            width: 100px;
        }
    }
}

.trade-foot-detail-com {
    font-size: 12px;
    margin-bottom: 10px;
    padding: 15px 30px 15px 0;
    line-height: 20px;
    text-align: right;
    border-top: 1px solid #e6e6e6;
    width: 980px;
    color: #999;
    background-color: #f4f4f4;

    .total-price {
        margin-bottom: 10px;
        > span:nth-child(1) {
            display: inline-block;
            color: #e4393c;
            font-weight: 700;
            font-size: 18px;
            min-width: 122px;
        }
    }
    .buy-people-info{
        > span:nth-child(1) {
            display: inline-block;
            margin-right: 30px;
        }
    }
}

.add-order-btn{
    width: $width;
    margin-top: 20px;
    margin-bottom: 30px;
    >div{
        float: right;
    }
}

</style>
