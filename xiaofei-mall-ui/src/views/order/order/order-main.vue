<template>
    <div>
        <div style="background-color: #f5f5f5;">
            <div class="order-main xiaofei-center">
                <div class="title">
                    <h3>我的订单</h3>
                </div>

                <!-- 商品项 -->
                <div class="order-item-title">

                    <!-- 检索条件部分 -->
                    <div class="one">
                        <div class="left">
                            <ul class="xiaofei-clear-level-ul">
                                <li>
                                    <a href="/order?orderStatus=-1" :class="{'no-height-light':orderItemQuery.orderStatus!=-1
                                    ,'height-light':orderItemQuery.orderStatus==-1}">
                                        全部订单
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=0" :class="{'no-height-light':orderItemQuery.orderStatus!=0
                                    ,'height-light':orderItemQuery.orderStatus==0}">
                                        待付款
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=1" :class="{'no-height-light':orderItemQuery.orderStatus!=1
                                    ,'height-light':orderItemQuery.orderStatus==1}">
                                        待发货
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=2" :class="{'no-height-light':orderItemQuery.orderStatus!=2
                                    ,'height-light':orderItemQuery.orderStatus==2}">
                                        已发货
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=3" :class="{'no-height-light':orderItemQuery.orderStatus!=3
                                    ,'height-light':orderItemQuery.orderStatus==3}">
                                        已完成
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=4" :class="{'no-height-light':orderItemQuery.orderStatus!=4
                                    ,'height-light':orderItemQuery.orderStatus==4}">
                                        已关闭
                                    </a>
                                </li>
                                <li>
                                    <a href="/order?orderStatus=5" :class="{'no-height-light':orderItemQuery.orderStatus!=5
                                    ,'height-light':orderItemQuery.orderStatus==5}">
                                        无效订单
                                    </a>
                                </li>
                                <li><a :class="{'no-height-light':true}">我的常购商品</a></li>
                                <li><a :class="{'no-height-light':true}">订单回收站</a></li>
                            </ul>
                        </div>
                        <div class="right">
                            <input type="text" class="xiaofei-clear-input" v-model="orderItemQuery.orderSn"
                                            @keyup.enter="queryOrderItem" pr>
                            <button type="button" @click="queryOrderItem">搜索</button>
                        </div>
                    </div>

                    <!-- 订单信息头 -->
                    <div class="two">
                        <div class="item-header">
                            <ul class="xiaofei-clear-level-ul">
                                <li>订单详情</li>
                                <li>收货人</li>
                                <li>金额</li>
                                <li>全部状态</li>
                                <li>操作</li>
                            </ul>
                        </div>
                    </div>

                    <!-- 订单项 -->
                    <div class="order-item" v-for="(item,index) in page.items" :key="index">

                        <!-- 每一项的头，填写订单号和订单添加的时间 -->
                        <div class="one">
                            <ul class="xiaofei-clear-level-ul">
                                <li>
                                    <span>{{ item.orderEntity.createTime.replace("T"," ") }}</span>
                                    <span style="margin-left: 50px;">订单号：{{ item.orderEntity.orderSn }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- 订单项的主要信息 -->
                        <div class="two">

                            <table class="xiaofei-clear-table">
                                <tr>
                                    <td style=" border: 1px solid #e5e5e5;border-top: none">
                                        <!-- 订单项的详细信息 -->
                                        <div class="item-detail">
                                            <div v-for="orderItem in item.orderItemEntitys" :key="orderItem.id">
                                                <div class="sku-pic">
                                                    <router-link style="text-decoration: none;color:#333" :to="{path:`/item/${orderItem.skuId}`}">
                                                        <el-image :src="orderItem.skuPic" lazy fit="contain"
                                                                style="width: 60px;height: 60px"/>
                                                    </router-link>
                                                </div>
                                                <div class="sku-title">
                                                    <router-link style="text-decoration: none;color:#333" :to="{path:`/item/${orderItem.skuId}`}">
                                                        {{ orderItem.skuName }}
                                                    </router-link>
                                                </div>
                                                <div class="sku-buy-num"> x {{ orderItem.skuQuantity }}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="border:1px solid #e5e5e5;border-left:0;border-top:0">
                                        <!-- 订单项的详细信息 -->
                                        <div class="item-address-info">
                                            <el-tooltip class="item" effect="dark" placement="left">
                                                <div slot="content">
                                                    <span style="color: white;font-weight: 800">{{
                                                            item.orderEntity.receiverName
                                                        }}</span><br/>
                                                    <span
                                                        style="padding: 10px 0;color: white">{{
                                                            item.orderEntity.receiverProvince
                                                        }}{{
                                                            item.orderEntity.receiverCity
                                                        }}{{
                                                            item.orderEntity.receiverRegion
                                                        }}{{ item.orderEntity.receiverDetailAddress }}</span><br/>
                                                    <span
                                                        style="padding: 10px 0;color: white">{{
                                                            item.orderEntity.receiverPhone
                                                        }}</span>
                                                </div>
                                                <span>{{ item.orderEntity.receiverName }}<i
                                                    class="el-icon-s-custom"></i></span>
                                            </el-tooltip>
                                        </div>
                                    </td>
                                    <td style="border:1px solid #e5e5e5;border-left:0;border-top:0"> <!-- 订单项的价格信息 -->
                                        <div class="item-price">
                                            <strong>应付</strong><br/>
                                            <strong>￥{{ item.orderEntity.payAmount }}</strong><br/>
                                            <span
                                                style="display: inline-block;margin-top: 10px;border-top:1px solid #e5e5e5;color: #aaaaaa;padding-top: 5px">在线支付</span>
                                        </div>
                                    </td>

                                   <!-- 订单项的状态 -->
                                    <td style="border:1px solid #e5e5e5;border-left:0;border-top:0">
                                        <div class="item-status">
                                            <span v-if="item.orderEntity.status===0" style="color: #ff6c00">待付款</span>
                                            <span v-if="item.orderEntity.status===1" style="color: #ff6c00">正在出库</span>
                                            <span v-if="item.orderEntity.status===2">已发货</span>
                                            <span v-if="item.orderEntity.status===3">已完成</span>
                                            <span v-if="item.orderEntity.status===4">已取消</span>
                                            <span v-if="item.orderEntity.status===5">订单无效</span>
                                        </div>
                                    </td>
                                    <td style="border:1px solid #e5e5e5;border-left:0;border-top:0">
                                        <div class="item-operating">
                                            <div v-if="item.orderEntity.status===0">
                                                <div style="color: #e4393c" class="a">
                                                    <i class="el-icon-time"></i> <span>剩余无限时长</span>
                                                </div>
                                                <div class="b" @click="toPay(item.orderEntity.id,item.orderEntity.orderSn)">付款</div>
                                                <div class="c" style="margin-top: 5px">
                                                <a @click="updateOrder(item.orderEntity.id,item.orderEntity.orderSn,4)">取消订单</a></div>

                                            </div>
                                            <div v-if="item.orderEntity.status===1">
                                                待发货
                                                <div class="c" style="margin-top: 5px">
                                                    <a @click="updateOrder(item.orderEntity.id,item.orderEntity.orderSn,4)">取消订单</a>
                                                </div>
                                            </div>
                                            <div v-if="item.orderEntity.status===2">
                                                <div class="c" style="margin-top: 5px">
                                                    <el-button @click="updateOrder(item.orderEntity.id,item.orderEntity.orderSn,3)" size="mini" type="success">确认收货</el-button>
                                                </div>
                                                <div class="c" style="margin-top: 5px">
                                                    <a @click="updateOrder(item.orderEntity.id,item.orderEntity.orderSn,4)">取消订单</a>
                                                </div>
                                            </div>
                                            <div v-if="item.orderEntity.status===3||item.orderEntity.status===4||item.orderEntity.status===5">
                                                <el-button type="mini" @click.prevent="addShopCart(item.orderItemEntitys)">立即购买</el-button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>


                        </div>
                    </div>

                </div>
            </div>

            <!-- 分页区域 -->
            <div class=" xiaofei-center" style="text-align: center;background-color: #f5f5f5;padding:50px 0">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                               :current-page="page.pageNo" :total="page.itemCount" background
                               :page-sizes="[10,20,30,40,50]" :page-size="page.pageSize"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>


    </div>
</template>

<script>
import {queryOrderItem} from "@/api/order/order-item";
import {updateOrder} from "@/api/order/order";
import {formatDate} from "@/utils";
import {getToken} from '@/utils/auth'
import {addCart} from "@/api/cart/cart";
export default {
    created() {
        let orderStatus = this.$route.query.orderStatus
        if(orderStatus>-1&&orderStatus<6){
            this.orderItemQuery.orderStatus = parseInt(orderStatus)
        }
        this.queryOrderItem();

    },
    data() {
        return {
            orderItemQuery: {orderSn: "", orderStatus: -1, addTime: null},
            page: {pageNo: 1, pageSize: 10, pageTotal: 1, itemCount: 0, items: []}
        }
    },
    methods: {
        //加入购物车
        addShopCart(skus){
            let cartReqVos = [];
            //遍历出来购物信息
            skus.forEach(sku=>{
                let cartReqVo = {
                        skuId:sku.skuId,spuId:sku.spuId,check:true,
                        buyNum:1,defaultImage:sku.skuPic,

                    }
                    cartReqVos.push(cartReqVo);
            })
            this.$confirm('是否重新购买此商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                addCart(cartReqVos).then(response => {
                    if (response.data && response.code == 200) {
                        this.$router.push(`/addtocart/${response.data}`)
                    } else {
                        this.$message.error("购物车添加失败，请重新添加");
                    }
                })
            }).catch(() => {
            });
        },
        //订单修改 ---- 取消订单
        updateOrder(orderId,orderSn,status){
            //封装数据
            let orderUpdateInfo={id:orderId,orderSn:orderSn,status:status};

            updateOrder(orderUpdateInfo).then(response=>{
                if(response.code==200){
                    this.$message.success("操作成功");
                    //重新请求数据
                    this.queryOrderItem();
                }else{
                    this.$message.error("订单操作失败，请重试");
                }
            })
        },
        //去付款页面
        toPay(orderId,orderSn){
            this.$router.push({path:`/pay/${orderId}/${orderSn}`})
        },
        //查询订单详细信息
        queryOrderItem() {
            queryOrderItem(this.orderItemQuery, this.page.pageNo, this.page.pageSize).then(response => {
                this.page = response.data
            })
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.queryOrderItem()
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.queryOrderItem()
        },
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width: 1080px;
$font-color: #333333;
$color: #e4393c;
div {
    color: #666;
    font-size: 12px;
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

.order-main {
    width: $width;

    .title {
        width: $width*1-40;
        margin-top: 20px;
        background-color: white;
        padding: 20px;

        > h3 {
            margin: 0;
        }
    }

    .order-item-title {
        margin-top: 20px;
        background-color: white;
        padding: 20px;

        .one {
            .left {
                float: left;

                > ul {
                    li {
                        .no-height-light {
                            margin-right: 20px;
                            font-size: 12px;
                            color: $font-color;

                            &:hover {
                                color: $color;
                            }
                        }
                        .height-light {
                                color: #e4393c;
                                font-weight: 800;
                                border-bottom: 2px solid #e4393c;
                                margin-right: 20px;
                                font-size: 12px;

                            &:hover {
                                color: $color;
                            }
                        }
                    }
                }
            }

            .right {
                float: right;
                position: relative;

                > input, > button {
                    position: absolute;
                    border: 1px solid #ccc;
                    padding: 5px;
                    /*height: 25px;
                    line-height: 25px;*/
                    margin-right: 10px;
                }

                > input {
                    color: #333333;
                    right: 55px;
                    top: -5px;
                    height: 15px;
                }

                > button {
                    right: -10px;
                    padding: 0 15px;
                    width: 60px;
                    height: 27px;
                    top: -5px;
                }
            }

        }

        .two {
            .item-header {
                text-align: center;
                margin-top: 20px;
                height: 34px;
                line-height: 34px;
                background-color: #f5f5f5;

                > ul {
                    width: 100%;

                    li:nth-child(1) {
                        padding-left: 20px;
                        width: 540px;
                    }

                    li:nth-child(2) {
                        width: 120px;
                    }

                    li:nth-child(3) {
                        width: 120px;
                    }

                    li:nth-child(4) {
                        width: 120px;
                    }

                    li:nth-child(5) {
                        width: 120px;
                    }
                }
            }
        }

        .order-item {
            margin-top: 20px;

            .one {
                > ul {
                    background-color: #f5f5f5;
                    width: 100%;
                    height: 31px;
                    line-height: 31px;

                    li:nth-child(1) {
                        padding-left: 20px;
                        width: 540px;
                    }

                    li:nth-child(2) {
                        width: 120px;
                    }

                    li:nth-child(3) {
                        width: 120px;
                    }

                    li:nth-child(4) {
                        width: 120px;
                    }

                    li:nth-child(5) {
                        width: 120px;
                    }
                }
            }

            .two {
                tr, td {
                    border: 0;
                    padding: 0;
                }

                .item-detail {
                    width: 554px;
                    float: left;
                    //padding: 14px 0;

                    border-top: none;

                    .sku-pic {
                        float: left;
                        margin: 0 10px;
                        border: 1px solid #efefef;
                        width: 60px;
                        height: 60px;
                    }

                    .sku-title {
                        float: left;
                        width: 240px;
                        height: 36px;
                        line-height: 18px;
                        overflow: hidden;
                        color: #333;
                        margin-top: 10px;
                    }

                    .sku-buy-num {
                        margin-left: 70px;
                        margin-top: 10px;
                        float: left;
                    }

                    > div {
                        padding: 15px 0;
                        border-bottom: 1px solid #e5e5e5
                    }

                    > div:last-child {
                        border-bottom: 0;
                    }
                }

                .item-address-info {
                    text-align: center;
                    width: 120px;
                }

                .item-price {
                    text-align: center;
                    width: 120px;
                }

                .item-status {
                    text-align: center;
                    width: 120px;

                    > span {
                        color: $font-color;
                        font-size: 12px;
                    }
                }

                .item-operating {
                    text-align: center;
                    width: 120px;
                    font-size: 12px;
                    color: #333333;

                    > div:nth-child(1) {
                        .b {
                            background-color: white;
                            border: 1px solid #e4393c;
                            color: #e4393c;
                            width: 85px;
                            height: 18px;
                            line-height: 18px;
                            padding: 2px 0;
                            text-align: center;
                            font-weight: 700;
                            cursor: pointer;
                            margin: 5px auto 0;

                            &:hover {
                                background-color: #e4393c;
                                color: white;
                            }
                        }

                        .c {
                            &:hover {
                                color: $color;
                            }
                        }
                    }
                }
            }
        }
    }


}
</style>
