<template>
    <div>
        <!-- 全部商品数量和配置地方 -->
        <div class="cart-item-num xiaofei-row xiaofei-center">
            <div class="nav xiaofei-row">
                <div class="xiaofei-col-6">
                    <span>全部商品 {{ cartInfo.totalCount }}</span>
                </div>
                <div class="xiaofei-col-6 area-wrap">
                    配送至：
                    <el-cascader style="height: 30px" filterable clearable placeholder="试试搜索：长沙"
                                 v-model="provincesPath" :options="provinces"
                                 :props="provincesSetting" @change="provincesChange">
                    </el-cascader>
                </div>
            </div>
        </div>

        <!-- 购物车中没有商品显示部分 -->
        <div v-if="!cartInfo.totalCount>0" style="background-color:#f7f7f7;margin-top: 20px">
            <div class="xiaofei-center xiaofei-row cart-empty" style="background-color:#f7f7f7;">
                <div class="xiaofei-col-6" style="text-align: right">
                    <el-image fit="contain" style="width: 359px;height: 273px;" lazy :src="cartEmpty"/>
                </div>
                <div class="xiaofei-col-6">
                    <h2>您的购物车还是空的！</h2>
                    <a href="/">去购物</a>
                </div>
            </div>
        </div>

        <!-- 购物车中有商品显示部分 -->
        <div v-if="cartInfo.totalCount>0">
            <!-- 商品项的主要区域--标题栏 -->
            <div class="xiaofei-row xiaofei-center cart-item-nav">
                <ul class="xiaofei-clear-level-ul">
                    <li>
                        <el-checkbox v-model="cartInfo.checkAll" @change="checkAll">全选</el-checkbox>
                    </li>
                    <li>商品</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
            </div>

            <!-- 每一项商品 -->
            <div :class="{'xiaofei-center':true, 'xiaofei-row':true}">
                <div :class="{'cart-item':true,'check-bgc':item.check}" v-for="item in cartInfo.items" :key="item.id">
                    <ul class="xiaofei-clear-level-ul">
                        <li>
                            <el-checkbox v-model="item.check" @change="updateCart(item)"></el-checkbox>
                        </li>
                        <li>
                            <div class="item-img">
                                <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}/itemdesc`}">
                                    <el-image style="width: 80px; height: 80px" :src="item.defaultImage" lazy
                                              fit="contain"></el-image>
                                </router-link>
                            </div>
                            <div class="item-title">
                                <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}/itemdesc`}">
                                    {{ item.skuName }}
                                </router-link>
                                <br/>
                                <i class="el-icon-s-tools"></i>
                                <span>选服务</span>
                            </div>
                            <div class="item-sale-attr">
                                <ul class="xiaofei-clear-vertical-ul">
                                    <li :key="index" v-for="(saleattr,index) in JSON.parse(item.saleAttr)">{{
                                            saleattr
                                        }}
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>￥ {{ item.skuPrice }}</li>
                        <li>
                            <i :class="{'el-icon-minus':true,'not-allow':item.buyNum<=1}"
                               @click="updateBuyNum(item,false)"></i>
                            <input @change="updateCart(item)" style="text-align: center"
                                   v-model.number="item.buyNum"
                                   class="xiaofei-clear-input"/>
                            <i :class="{'el-icon-plus':true,'not-allow':item.buyNum>=99}"
                               @click="updateBuyNum(item,true)"></i><br/>
                            <span>有货</span>
                        </li>
                        <li><strong>￥ {{ item.totalSkuPrice }}</strong></li>
                        <li>
                            <el-button type="info" icon="el-icon-delete" circle size="mini"
                                       @click="deleteCart(item.id)"></el-button>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 结算部分 -->
            <div class="pay-money xiaofei-row xiaofei-center">
                <ul class="xiaofei-clear-level-ul">
                    <li>
                        <el-checkbox v-model="cartInfo.checkAll" @change="checkAll">全选</el-checkbox>
                    </li>
                    <li><a @click="deleteCart()">删除选中的商品</a></li>
                    <li><a>移入关注</a></li>
                    <li><a @click="clearCart">清空购物车</a></li>
                    <li>
                        <router-link :to="{path:'/trade'}">去结算</router-link>
                    </li>
                    <li>已选<em class="total-check-em">{{ cartInfo.totalCheck }}</em>商品，
                        总价<em class="total-price-em">￥ {{ cartInfo.totalPrice }}</em></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import {queryAllProvinces} from "@/api/product/provinces";
import {queryCartByUserId, deleteCart, cartCheckAll, updateCart} from "@/api/cart/cart";
import cartEmpty from '@/assets/images/cart-empty.5c2f498.png'
import Cookie from 'js-cookie'

export default {
    mounted() {
        this.queryCartByUserId()
    },
    data() {
        return {
            cartEmpty: cartEmpty,
            provincesPath: [],//地区信息值
            provincesSetting: {
                value: "id",
                label: "cityName",
                children: "children"
            },
            provinces: [],//所有地区信息
            cartInfo: {items: [], totalCheck: "", totalCount: "", totalPrice: "", checkAll: false},
        }
    },
    created() {
        this.getProvinces()
    },
    methods: {
        //地区选择
        provincesChange(value,) {
            this.provincesPath = value
        },
        //获取所有地区信息
        getProvinces() {
            queryAllProvinces().then(response => {
                this.provinces = response.data
            })
        },
        //查询购物车信息
        queryCartByUserId() {
            queryCartByUserId().then(response => {
                this.cartInfo = response.data;
                //将购物车中的数量保存到Cookie中
                Cookie.set('cartTotalCount', response.data.totalCount)
            })
        },
        //购物车信息删除
        deleteCart(id) {
            this.$confirm('此操作将删除选中的商品, 是否继续?', '提示', {
                confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
                let ids = [];
                if (id) {
                    ids.push(id)
                } else {
                    //多个删除，遍历集合抽取出来所有
                    this.cartInfo.items.forEach(item => {
                        if (item.check) ids.push(item.id)
                    })
                }
                //单个删除
                if (ids.length > 0) {
                    deleteCart(ids.toString()).then(response => {
                        if (response.code == 200) {
                            this.$message.success("删除成功")
                            this.queryCartByUserId()
                        } else {
                            this.$message.error("删除失败")
                        }
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        //清空购物车
        clearCart() {
            let ids = [];
            //多个删除，遍历集合抽取出来所有
            this.cartInfo.items.forEach(item => {
                ids.push(item.id)
            })
            this.deleteCart(ids.toString())
        },
        //购物车信息修改
        updateCart(item) {
            if (item.buyNum > 99 || typeof item.buyNum != 'number') {
                item.buyNum = 99
            }

            if (item.buyNum < 1 || typeof item.buyNum != 'number') {
                item.buyNum = 1
            }

            updateCart(item).then(response => {
                if (response.code == 200) {
                    this.queryCartByUserId()
                }
            })
        },
        //全选和全不选
        checkAll(checkAll) {
            cartCheckAll(checkAll).then(response => {
                if (response.code == 200) {
                    this.queryCartByUserId()
                }
            })
        },
        //修改购买的数量
        updateBuyNum(item, isAdd = true) {
            if (item < 100 || item.buyNum > 0) {
                let flag = false;
                //监视购买数量
                if (isAdd && item.buyNum < 99) {
                    flag = true;
                    item.buyNum++;
                } else if (isAdd === false && item.buyNum > 1) {
                    flag = true;
                    item.buyNum--;
                }
                if (flag) {
                    this.updateCart(item)
                }
            }

        }
    },
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width: 1190px;
$height: 90px;
$color: #e2231a;

.cart-item-num {
    .nav {
        height: 42px;
        line-height: 42px;
        margin-top: 20px;

        > div:nth-child(1) {
            > span {
                font-weight: 700;
                font-size: 16px;
                color: $color;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        > div:nth-child(2) {
            text-align: right;

            .el-input__inner {
                height: 30px;
            }
        }
    }
}

//去购物车项导航栏
.cart-item-nav {
    background-color: #f3f3f3;
    margin-top: 20px;
    height: 32px;
    line-height: 32px;
    padding: 5px 0;
    border: 1px solid #e9e9e9;
    border-top: 0;

    > ul {
        li {
            color: #434343;
            font-size: 12px;
        }

        li:nth-child(1) {
            padding-left: 11px;
            width: 122px;
        }

        li:nth-child(2) {
            padding: 0 10px 0 20px;
            width: 520px;
        }

        li:nth-child(3) {
            text-align: center;
            width: 120px;
            padding-right: 50px;
        }

        li:nth-child(4) {
            text-align: center;
            width: 100px;
            padding-right: 40px;
        }

        li:nth-child(5) {
            text-align: center;
            width: 100px;
        }

        li:nth-child(6) {
            text-align: center;
            width: 75px;
        }
    }
}

//每一项购物车信息
.cart-item {
    width: $width;
    border: 1px solid #f1f1f1;
    border-top: 2px solid #aaa;
    margin-top: 10px;
    padding: 20px 0;

    > ul {
        li {
            color: #434343;
            font-size: 12px;
        }

        li:nth-child(1) {
            padding-left: 11px;
            width: 122px;
        }

        li:nth-child(2) {
            padding: 0 10px 0 20px;
            width: 520px;

            .item-img {
                margin-right: 10px;
                float: left;
            }

            .item-title {
                overflow: hidden; //不显示超过对象尺寸的内容
                white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
                text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)
                width: 240px;
                margin-right: 15px;
                float: left;
                font-size: 13px;
                color: #333;
                line-height: 20px;

                > a, span {
                    &:hover {
                        cursor: pointer;
                        color: $color;
                    }
                }

                > i {
                    padding: 2px;
                    color: white;
                    background-color: #e6373b;
                    font-size: 12px;
                    margin-right: 5px;
                }

                > span {
                    font-size: 13px;
                    color: #aaa;
                }

                &:hover {
                    color: $color;
                    cursor: pointer;
                }
            }

            .item-sale-attr {
                > ul {
                    width: 100px;

                    li {
                        color: #333;
                        height: 20px;
                        font-size: 12px;
                        line-height: 20px;
                        text-align: left;
                        padding: 0;
                    }
                }

                float: left;
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

        li:nth-child(3) {
            text-align: center;
            width: 120px;
            padding-right: 50px;
        }

        li:nth-child(4) {
            position: relative;
            width: 100px;
            padding-right: 40px;
            text-align: center;

            > span {
                font-size: 12px;
                margin-top: 5px;
                color: #aaaaaa;
                display: inline-block;
            }

            > input {
                padding: 0;
                width: 46px;
                border: 1px solid #cbcbcb;
                border-left: 0;
                border-right: 0;
                background: #fff;
                height: 18px;
            }

            > i {
                position: absolute;
                top: 0;
                left: 0;
                border: 1px solid #cbcbcb;
                background-color: #f1f1f1;
                width: 12px;
                height: 12px;
                padding: 3px;

            }

            .el-icon-minus {
                left: 7px;
                cursor: pointer;
            }

            .el-icon-plus {
                left: 73px;
                cursor: pointer;
            }

            //不允许鼠标的样式
            .not-allow {
                cursor: not-allowed;
            }
        }

        li:nth-child(5) {
            text-align: center;
            width: 100px;
        }

        li:nth-child(6) {
            text-align: center;
            width: 75px;
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

//付钱部分
.pay-money {
    border: 1px solid #f0f0f0;
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
    margin-bottom: 20px;

    > ul {
        width: 100%;

        li {
            color: #434343;
            font-size: 12px;
        }

        li:nth-child(1) {
            padding-left: 11px;
            width: 55px;
        }

        li:nth-child(2) {
            padding: 0 20px 0 20px;

            a {
                color: #666666;

                &:hover {
                    cursor: pointer;
                    color: $color;
                }
            }
        }

        li:nth-child(3) {
            text-align: center;
            padding: 0 20px 0 20px;

            a {
                color: #666666;

                &:hover {
                    cursor: pointer;
                    color: $color;
                }
            }
        }

        li:nth-child(4) {
            text-align: center;
            padding: 0 20px 0 20px;

            a {
                font-weight: 900;
                color: #666666;

                &:hover {
                    cursor: pointer;
                    color: $color;
                }
            }
        }

        li:nth-child(5) {
            text-align: center;
            width: 90px;
            height: 100%;
            float: right;

            a {
                background-color: #e64347;
                color: white;
                font-size: 17px;
                font-weight: 700;
                width: 90px;
                display: inline-block;
                margin: 0 auto;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        li:nth-child(6) {
            float: right;
            text-align: center;
            padding: 0 30px 0 30px;
            color: #999;
            cursor: pointer;

            .total-check-em {
                color: #e2231a;
                font-weight: 700;
                font-style: normal;
                font-size: 13px;
                margin: 0 3px;
            }

            .total-price-em {
                font-weight: 700;
                font-style: normal;
                margin: 0 3px;
                font-size: 16px;
                color: #e2231a;
            }
        }
    }

}

//选中之后，购物车的背景图片
.check-bgc {
    background-color: #fff4e8;
}

//购物车为空
.cart-empty {
    > div:nth-child(1) {

    }

    > div:nth-child(2) {
        > h2 {
            margin: 70px 0 0;
            font-size: 36px;
            color: #b0b0b0;
        }

        > a {
            text-decoration: none;
            color: #fff;
            background-color: #ff6700;
            display: inline-block;
            margin: 30px;
            padding: 20px;
            width: 130px;
            text-align: center;
            border-radius: 20px;
            font-size: 20px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}

</style>
