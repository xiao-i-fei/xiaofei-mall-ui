<template>
    <div>
        <div class="aaa">
            <div class="div-row xiaofei-center cart-item-main">

                <div  v-for="cartInfo in cartInfos" :key="cartInfo.id">
                    <div class="cart-item-left">

                        <div class="one">
                            <h3><i class="el-icon-circle-check"></i>商品已成功加入购物车！</h3>
                        </div>

                        <div class="two">
                            <div class="cart-item-img">
                                <el-image style="width: 60px; height: 60px"
                                        :src="cartInfo.defaultImage" fit="contain" lazy>
                                </el-image>
                            </div>
                            <div class="cart-item-title">
                                <div class="sku-title">
                                    <router-link style="text-decoration: none;"
                                                :to="{path:`/item/${cartInfo.skuId}/itemdesc`}">
                                        {{ cartInfo.skuName }}
                                    </router-link>
                                </div>
                                <div class="spu-sale-attr">
                                    <span v-for="(value,key) in JSON.parse(cartInfo.saleAttr)">
                                    {{ key }}: {{ value }}
                                    </span> / 数量{{ cartInfo.buyNum }}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="cart-item-right">
                        <div class="btn">
                            <router-link style="text-decoration: none;"
                                        :to="{path:`/item/${cartInfo.skuId}/itemdesc`}">
                                查看商品详情
                            </router-link>

                            <router-link style="text-decoration: none;"
                                        :to="{path:`/cart`}">
                                去购物车结算 >
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {queryCartById} from "@/api/cart/cart";

export default {
    created() {
        this.id = this.$route.params.cartId;
        this.queryCartById()
    },
    methods: {
        //根据id查询购物车商品信息
        queryCartById() {
            queryCartById(this.id).then(response => {
                this.cartInfos = response.data
                /* this.cartInfo = response.data
                this.cartInfo.saleAttr = JSON.parse(response.data.saleAttr) */
            })
        }
    },
    data() {
        return {
            id: "",
            cartInfos: [],
        }
    }
}
</script>

<style scoped lang="scss">
*{
    box-sizing:content-box
}
$width: 1200px;
$height: 145px;

div{
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

.aaa {
    //height: $height;
    background-color: #f5f5f5;
    margin-bottom: 20px;
}

.cart-item-main {
    //height: $height;
    background-color: #f5f5f5;

    .cart-item-left {
        width: 600px;
        float: left;

        .one {
            padding: 20px 0;

            h3 {
                color: #71b247;
                height: 25px;
                line-height: 25px;
                margin: 0;
                padding: 0;
                font-size: 18px;
                font-weight: 400;
            }
        }

        .two {

            .cart-item-img {
                float: left;

                .el-image {
                    padding: 0;
                    margin: 0;
                }
            }

            .cart-item-title {
                padding-left: 20px;
                float: left;

                .sku-title {
                    width: 500px;
                    line-height: 27px;
                    overflow: hidden; //不显示超过对象尺寸的内容
                    //  white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
                    text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)

                    a {
                        color: #333333;
                        font-size: 14px;

                        &:hover {
                            cursor: pointer;
                            color: #e2231a;
                        }
                    }
                }

                .spu-sale-attr {
                    color: #aaa;
                    font-size: 13px;
                    margin-right: 10px;
                    width: 500px;
                    line-height: 27px;
                    overflow: hidden; //不显示超过对象尺寸的内容
                    //  white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
                    text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)
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

    .cart-item-right {
        float: right;
        /*width: 600px;
        height: $height;*/
        text-align: right;

        .btn {
            margin-top: 89px;

            a {
                height: 34px;
                line-height: 34px;
                padding: 0 30px;
                font-size: 16px;
                display: inline-block;
            }

            > a:nth-child(1) {
                border: 1px solid #fff;
                margin-right: 10px;
                color: #e2231a;
                background-color: white;

                &:hover {
                    cursor: pointer;
                    border: 1px solid #e2231a;
                }
            }

            > a:nth-child(2) {
                border: 1px solid #e2231a;
                margin-right: 10px;
                color: white;
                background-color: #e2231a;

                &:hover {
                    background-color: #c91623;
                    border: 1px solid #e2231a;
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
</style>
