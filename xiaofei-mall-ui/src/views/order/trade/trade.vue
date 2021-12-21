<!-- 填写购买信息页面，比如收货人信息等 -->
<template>
    <div>
        <!-- 正常显示部分 -->
        <div>

            <!-- 顶部logo区域和搜索区域 -->
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

            <!-- 订单信息主体部分 -->
            <div class="xiaofei-center order-info-main">
                <!-- 标题 -->
                <div class="tit-span">
                    <span>填写并核对订单信息</span>
                </div>

                <!-- 主要区域 -->
                <div class="all-item">

                    <!-- 用户信息 -->
                    <div class="item">
                        <div class="title">
                            <h3>收货人信息</h3>
                            <div class="right-add-or-other">
                                <a @click="addVisible=true">新增收获地址</a>
                            </div>
                        </div>
                        <div class="con">
                            <div class="step-con">
                                <!-- 收获地址列表 -->
                                <div class="user-info">
                                    <ul class="xiaofei-clear-level-ul">
                                        <li @mouseenter="showIndex=index" @mouseleave="showIndex=-1"
                                            v-for="(receiveAddress,index) in orderInfo.receiveAddress"
                                            v-if="defaultAddress.id==receiveAddress.id||addInfoShow"
                                            :key="receiveAddress.id">

                                            <div
                                                :class="{'default-div':receiveAddress.id==defaultAddress.id,'left':true}"
                                                v-text="receiveAddress.name"
                                                @click="defaultAddress=receiveAddress;addInfoShow=false"></div>
                                            <div class="address-info">
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
                                                <span v-if="receiveAddress.defaultStatus==1"
                                                      :class="{'default-span':receiveAddress.defaultStatus==1}">
                                                    默认地址
                                                </span>
                                            </div>
                                            <div v-show="showIndex==index">
                                                <a v-if="receiveAddress.defaultStatus!=1">设置默认地址</a>
                                                <a @click="getReceiveAddressById(receiveAddress.id)">编辑</a>
                                                <a @click="deleteAddress(receiveAddress.id)"
                                                   v-if="receiveAddress.defaultStatus!=1">删除</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <!-- 查看全部地址 -->
                                <div class="show-all-add">
                                    <div @click="addInfoShow=true" v-show="!addInfoShow"><span>更多地址 <i
                                        class="el-icon-arrow-down"></i></span>
                                    </div>
                                    <div @click="addInfoShow=false" v-show="addInfoShow"><span>收起地址 <i
                                        class="el-icon-arrow-up"></i></span></div>
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
                            <div class="right-add-or-other">
                                <el-tooltip class="item" effect="dark"
                                            content="因可能存在系统缓存、页面更新导致价格变动异常等不确定性情况出现，商品售价以本结算页商品价格为准。"
                                            placement="bottom">
                                    <a><i class="el-icon-warning"></i> 价格说明</a>
                                </el-tooltip>
                                <router-link :to="{path:'/cart'}" style="text-decoration: none">返回修改购物车</router-link>
                            </div>
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

            <!-- 订单信息汇总 -->
            <div class="xiaofei-center order-summary">
                <div style="float: right;width: 300px;margin-bottom: 10px;margin-right: 20px;">
                    <div class="list">
                        <span><em style="color: #e4393c;font-style: normal">{{ orderInfo.cartInfo.totalCount }}</em> 件商品，总商品金额：</span>
                        <span>￥ {{ orderInfo.cartInfo.totalPrice }}</span>
                    </div>
                </div>
            </div>

            <!-- 订单详细信息 -->
            <div class="xiaofei-center trade-foot-detail-com">
                <div class="total-price">应付总额：<span>￥ {{ orderInfo.cartInfo.totalPrice }}</span></div>
                <div class="buy-people-info">
                    <span>寄送至：{{ defaultAddress.province }} {{ defaultAddress.city }} {{
                            defaultAddress.region
                        }} {{ defaultAddress.detailAddress }}</span>
                    <span>收获人：{{ defaultAddress.name }}  {{ defaultAddress.phone }}</span>
                </div>
            </div>

            <!-- 提交订单按钮 -->
            <div class="xiaofei-center add-order-btn">
                <div>
                    <el-button type="danger" @click="submitOrder">提交订单</el-button>
                </div>
            </div>

        </div>

        <!-- 添加收获地址对话框 -->
        <el-dialog :title="memberAdd.id>0?'修改收货信息':'新增收货信息'" :show-close="false" :visible.sync="addVisible"
                   :close-on-click-modal="false">
            <el-form :model="memberAdd" label-width="150px" ref="memberAdd" :rules="memberAddRules">
                <el-form-item label="所在地区" prop="provincesPath">
                    <el-cascader filterable clearable placeholder="试试搜索：长沙"
                                 v-model="memberAdd.provincesPath" :options="provinces"
                                 :props="provincesSetting" @change="provincesChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="收货人姓名" prop="name">
                    <el-input v-model="memberAdd.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input v-model="memberAdd.phone"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="memberAdd.detailAddress"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addressClose">取 消</el-button>
                <el-button v-show="!memberAdd.id>0" type="primary" @click="addMemberAdd()">确 定</el-button>
                <el-button v-show="memberAdd.id>0" type="primary" @click="updateAddress()">确 定</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
import {queryOrderInfo, crateOrder} from "@/api/order/order";
import {queryAllProvinces} from "@/api/product/provinces";
import {
    addMemberAddress,
    deleteAddress,
    getReceiveAddressById,
    updateAddress
} from "@/api/member/member-receive-address";

export default {
    data() {
        return {
            addVisible: false,//添加收获地址对话框
            addInfoShow: false,//收货人信息是否显示
            showIndex: -1,
            defaultAddress: {},
            orderInfo: {receiveAddress: [], cartInfo: {}},
            memberAdd: {id: "", provincesPath: [], name: "", phone: "", provincesId: "", detailAddress: ""},//会员收获地址
            provincesPath: [],//地区选择的全路径
            provinces: [],//所有地区信息
            provincesSetting: {value: "id", label: "cityName", children: "children"},
            //地址信息验证规则
            memberAddRules: {
                name: [
                    {required: true, message: '请填写收货人姓名', trigger: 'blur'},
                ],
                provincesPath: [
                    {required: true, message: '请选择收获地址', trigger: 'blur'},
                ],
                phone: [
                    {required: true, message: '请填写手机号码', trigger: 'blur'},
                ],
                detailAddress: [
                    {required: true, message: '请填写详细地址', trigger: 'blur'},
                ]
            }
        }
    },
    created() {
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function () {
            history.pushState(null, null, document.URL);
        });
        this.getProvinces();
        this.queryOrderInfo();
    },
    methods: {
        //添加地址信息
        addMemberAdd() {
            this.$refs["memberAdd"].validate(valid => {
                console.log(valid)
                if (valid) {
                    addMemberAddress(this.memberAdd).then(response => {
                        if (response.code == 200) {
                            this.queryOrderInfo();
                            this.defaultAddress = this.memberAdd;
                            this.addVisible = false;
                            this.$refs["memberAdd"].resetFields();
                            this.memberAdd = {
                                provincesPath: [],
                                name: "",
                                phone: "",
                                provincesId: "",
                                detailAddress: ""
                            }
                        }
                    })
                }
            });
        },
        //获取所有地区信息
        getProvinces() {
            queryAllProvinces().then(response => {
                this.provinces = response.data
            })
        },
        //选择地区之后的操作
        provincesChange(value) {
            this.memberAdd.provincesId = value[value.length - 1]
        },
        //获取订单信息
        queryOrderInfo() {
            queryOrderInfo().then(response => {
                //判断商品是否有库存
                if (response.data.hasStock) {
                    this.$message.info("未进入结算页面的商品已经没有库存来了，已自动从订单中去除了");
                }
                this.orderInfo = response.data
                console.log(this.orderInfo)
                //获取默认地址信息
                response.data.receiveAddress.forEach(item => {
                    if (item.defaultStatus == 1) {
                        this.defaultAddress = item
                    }
                })
            })
        },
        //添加收获地址信息对话框
        addressClose() {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.memberAdd = {provincesPath: [], name: "", phone: "", provincesId: "", detailAddress: ""}
                    this.addVisible = false;
                    this.$refs["memberAdd"].resetFields();
                })
                .catch(_ => {
                });
        },
        //根据id删除收货地址
        deleteAddress(id) {
            deleteAddress(id).then(response => {
                if (response.code == 200) {
                    this.$message.success("删除成功")
                    this.queryOrderInfo()
                } else {
                    this.$message.error("删除失败")
                }
            })
        },
        //修改收获信息
        updateAddress() {
            console.log(this.memberAdd)
            updateAddress(this.memberAdd).then(response => {
                if (response.code == 200) {
                    this.$message.success("修改成功")
                    this.memberAdd = {provincesPath: [], name: "", phone: "", provincesId: "", detailAddress: ""}
                    this.addVisible = false;
                    this.$refs["memberAdd"].resetFields();
                    this.queryOrderInfo();
                } else {
                    this.$message.error("修改失败")
                }
            })
        },
        //根据id查询收货地址信息
        getReceiveAddressById(id) {
            getReceiveAddressById(id).then(response => {
                if (response.code == 200) {
                    this.memberAdd = response.data
                    this.addVisible = true
                }
            })
        },
        //提交订单，生成订单信息
        submitOrder() {
            //判断是否有收货人信息
            if (this.orderInfo.receiveAddress.length == 0) {
                this.$message.info("请先添加收获信息");
            } else if (this.defaultAddress == "{}") {
                this.$message.error(`请选择一个收获地址`)
            } else {
                //组合订单信息
                let order = {
                    totalAmount: this.orderInfo.cartInfo.totalPrice,//订单的总金额
                    orderItemInfos: [],
                    receivingInfo: {
                        receiverName: this.defaultAddress.name,
                        receiverPhone: this.defaultAddress.phone,
                        receiverPostCode: this.defaultAddress.postCode,
                        receiverProvince: this.defaultAddress.province,
                        receiverCity: this.defaultAddress.city,
                        receiverRegion: this.defaultAddress.region,
                        receiverDetailAddress: this.defaultAddress.detailAddress
                    }//收获地址信息
                }
                //遍历商品信息
                this.orderInfo.cartInfo.items.forEach(item => {
                    let orderItemInfo = {
                        skuId: item.skuId,
                        spuId: item.spuId,
                        skuName: item.skuName,
                        skuPic: item.defaultImage,
                        skuPrice: item.skuPrice,
                        skuQuantity: item.buyNum,
                        skuAttrsVals: item.saleAttr

                    }
                    order.orderItemInfos.push(orderItemInfo)
                })
                console.log("提交的订单信息为：", order)
                crateOrder(order).then(response => {
                    if (response.code == 200){
                        this.$router.push({path:`/pay/${response.data.orderId}/${response.data.orderSn}`})
                    } else {
                        this.$message.error("订单提交失败，请重新提交订单")
                    }
                })
            }
        }
    }
}

</script>

<style scoped lang="scss">
*{
    box-sizing:content-box
}
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
                position: relative;

                h3 {
                    margin: 0;
                    padding: 0;
                    font-size: 14px;
                    height: 40px;
                    line-height: 40px;
                    float: left;
                    color: #333;

                }

                .right-add-or-other {
                    position: absolute;
                    right: 0;

                    > a {
                        padding-left: 20px;
                        cursor: pointer;
                        color: #005ea7;
                        font-size: 12px;

                        &:hover {
                            color: $color;
                        }
                    }
                }
            }

            .con {
                .step-con {
                    font-size: 12px;
                    //收货人信息样式
                    .user-info {
                        margin-left: 25px;
                        //max-height: 170px;
                        //overflow-y: auto;

                        > ul {
                            width: 100%;
                            margin: 6px 0;
                            line-height: 30px;

                            > li {
                                width: 100%;
                                color: #666;
                                font-size: 12px;
                                margin: 5px 0;

                                .address-info {
                                    > span {
                                        margin-right: 15px;
                                    }

                                    .default-span {
                                        background-color: #999999;
                                        padding: 2px 5px;
                                        color: white;
                                    }
                                }

                                .left {
                                    width: 120px;
                                    height: 18px;
                                    text-align: center;
                                    line-height: 18px;
                                    padding: 4px 10px;
                                    background-color: white;
                                    float: left;
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
                                        margin-right: 10px;
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

                    //查看全部收货人样式
                    .show-all-add {
                        margin: 10px 0 0 25px;

                        > div {
                            cursor: pointer;
                        }

                        > span {
                            cursor: pointer;
                            color: #666;
                            font-size: 12px;
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

    .buy-people-info {
        > span:nth-child(1) {
            display: inline-block;
            margin-right: 30px;
        }
    }
}

.add-order-btn {
    width: $width;
    margin-top: 20px;
    margin-bottom: 30px;

    > div {
        float: right;
    }
}

</style>
