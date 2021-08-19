<!-- 图片查看，版本选择 -->
<template>
    <div>

        <div class="main xiaofei-center">
            <!-- 图片展示区域 -->
            <div class="left">
                <!-- 大图展示区域 -->
                <div class="default-img">
                    <el-image class="item-default-img" lazy :src="skuDefaultImg.imgUrl">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>

                <!-- 小图展示区域 -->
                <div class="item-images-carousel">
                    <el-carousel trigger="click" height="80px" indicator-position="outside"
                                 :loop="false" arrow="never" :autoplay="false">
                        <el-carousel-item v-for="(skuImg,index) in skuImages" :key="index">
                            <ul class="xiaofei-clear-level-ul item-images-ul">
                                <li v-for="skuImgItem in skuImg" @mouseenter="updateSkuDefaultImg(skuImgItem)">
                                    <img v-if="skuImgItem.id==skuDefaultImg.id" style="border:2px solid #e53e41;"
                                         alt="加载失败" :src="skuImgItem.imgUrl">

                                    <img v-else="skuImgItem.id==skuDefaultImg.id" alt="加载失败" :src="skuImgItem.imgUrl">
                                </li>
                            </ul>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>

            <!-- 版本选择区域 -->
            <div class="right">

                <!-- 基本参数部分 -->
                <div class="item-info">
                    <div class="item-title" v-text="skuDetailInfo.skuInfo.skuName"></div>
                    <div class="item-subtitle">
                        {{ skuDetailInfo.skuInfo.skuSubtitle }} <a>查看 ></a>
                    </div>
                    <div class="item-price">
                        <div class="item-price-left">商城价</div>
                        <div class="item-price-middle">{{ skuDetailInfo.skuInfo.price }}</div>
                        <!-- TODO 评价数量，以后再做 -->
                        <!-- <div class="item-price-right"><p>累计评价</p><a>2222</a></div> -->
                    </div>
                    <div class="item-service">
                        <div class="dt">增值服务</div>
                        <div class="dd">
                            <ul class="xiaofei-clear-level-ul">
                                <li><a>高价回收，急速到账</a></li>
                                <li><a>以旧换新，回收旧机</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-area">
                        <div class="dt">配送至</div>
                        <div class="dd">
                            <!--                            <div class="item-region">湖南省 长沙市 岳麓区</div>-->
                            <div class="item-region">
                                <el-cascader filterable clearable placeholder="试试搜索：长沙"
                                             v-model="provincesPath" :options="provinces"
                                             :props="provincesSetting" @change="provincesChange">
                                </el-cascader>
                            </div>
                            <div class="item-stock">
                                <span v-if="skuDetailInfo.hasStock"><strong>有货</strong></span>
                                <span v-else><strong>无货</strong>，此商品暂时售完</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 销售属性区域 -->
                <div class="item-sale-attrs">
                    <div class="item-sale-attr" v-for="(saleAttr,saleAttrIndex) in skuDetailInfo.saleAttr"
                         :key="saleAttr.attrId">
                        <div class="dt">
                            选择{{ saleAttr.attrName }}
                        </div>
                        <div @click="getSkuIds(attr.skuIds,saleAttrIndex)"
                             :class="[{dd:true},{saleAttrLight:attr.skuIds.toString().split(',').indexOf(skuId)>-1}]"
                             v-for="(attr,index) in saleAttr.attrValues" :key="getUUID()" :aaa="attr.skuIds">
                            <a v-if="attr.skuIds.toString().split(',').indexOf(skuId)>-1">{{ attr.attrValue }}</a>
                            <a v-else>{{ attr.attrValue }}</a>
                        </div>
                    </div>
                </div>

                <!-- 添加购物车或立即购买 -->
                <div class="item-add">
                    <div class="item-add-num">
                        <el-input max="999" min="1" v-model.number="cartReq.buyNum" placeholder="购买数量"></el-input>
                        <i class="el-icon-plus" @click="cartReq.buyNum++" :disabled="true"></i>
                        <i class="el-icon-minus" @click="cartReq.buyNum--"></i>
                    </div>
                    <div class="item-add-shopping">
                        <el-button type="primary" @click="addShopOrBuy(true)">加入购物</el-button>
                        <el-button type="danger" @click="addShopOrBuy(false)">立即购买</el-button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import {querySkuItemInfo} from "@/api/product/sku-info";
import {queryAllProvinces} from "@/api/product/provinces";
import {getUUID} from "@/utils";
import {addCart} from "@/api/cart/cart";
import Cookie from 'js-cookie'
import {getToken} from "@/utils/auth";

export default {
    props: {},
    data() {
        return {
            skuId: 0,//获取页面传入过来的skuId
            skuDetailInfo: {
                skuInfo: [],
                skuImages: [],
                saleAttr: [],
                spuInfoDesc: [],
                groupAttrs: [],
                brand: {},
                randSkuInfos: [],
                hasStock: true
            },//整个商城的页面详细信息
            skuDefaultImg: {},//默认展示图片
            skuImages: [],//商品图片合集，每五张为一组
            provinces: [],//所有地区信息
            provincesPath: [],//地区信息值
            provincesSetting: {
                value: "id",
                label: "cityName",
                children: "children"
            },
            cartReq: {id: "", skuId: "", spuId: "", buyNum: 1, check: true, defaultImage: "", userId: ""},//购买或加入购物车商品的信息
            skuIds: [],//所有销售属性中包含的skuId，再根据选择的skuIds集合来取交集，判断最终的skuId
        }
    },
    methods: {
        //获取销售属性中的skuIds
        getSkuIds(skuIds, index) {
            let strSkuIds = ""
            for (let i = 0; i < this.skuIds.length; i++) {
                if (i != index) {
                    strSkuIds = strSkuIds + this.skuIds[i].toString()
                }
            }
            let intersection = strSkuIds.toString().split(",").filter(function (val) {
                return skuIds.toString().split(",").indexOf(val) > -1
            })
            if (intersection > 0) {
                this.skuIds = intersection
                window.location.href = `/item/${intersection}/itemdesc`;
            } else {
                this.$message.info("该商品没有货，请重新选择")
            }
        },
        //获取UUID
        getUUID() {
            return getUUID();
        },
        //修改默认图片
        updateSkuDefaultImg(skuDefaultImg) {
            this.skuDefaultImg = skuDefaultImg
        },
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
        //获取详情页面的商品信息
        querySkuDetailsInfo(skuId) {
            querySkuItemInfo(skuId).then(response => {
                this.skuDetailInfo = response.data
                console.log(this.skuDetailInfo.saleAttr[0].attrValues)
                //设置图片合集
                let flag = 1;
                let skuImages = []

                //订阅消息
                this.$bus.$emit('getBrandAndSkuInfo', response.data.brand, response.data.randSkuInfos)

                //订阅发送商品介绍图片合集信息
                this.$bus.$emit('getSkuDescImg', response.data.spuInfoDesc)

                //订阅消息，发送基本属性参数
                this.$bus.$emit('getSpuBaseAttr', response.data.groupAttrs)

                //分析选中销售属性中的skuId
                response.data.saleAttr.forEach(saleAttr => {
                    saleAttr.attrValues.forEach(attrValue => {
                        if (attrValue.skuIds.toString().indexOf(skuId) > -1) {
                            this.skuIds.push(attrValue.skuIds.toString())
                        }
                    })
                })


                response.data.skuImages.forEach(item => {
                    //设置默认图片
                    if (item.defaultImg == 1) {
                        this.skuDefaultImg = item;
                    }
                    skuImages.push(item)
                    //到了五个一组，清空数组，将数组中的内容添加到图片合集中
                    if (flag % 5 == 0) {
                        this.skuImages.push(skuImages)
                        skuImages = []
                    }
                    flag++;
                })
            })
        },
        //添加购物车或购买
        addShopOrBuy(isAdd = true) {
            if (isAdd) {
                //获取用户信息
                let token = getToken();
                let userInfo = Cookie.get("userInfo");
                if (token && userInfo) {
                    //设置购物信息
                    userInfo = JSON.parse(userInfo);
                    this.cartReq.skuId = this.skuDetailInfo.skuInfo.skuId
                    this.cartReq.spuId = this.skuDetailInfo.spuInfoDesc.spuId
                    this.cartReq.defaultImage = this.skuDetailInfo.skuInfo.skuDefaultImg
                    this.cartReq.userId = userInfo.id
                    if (userInfo.id > 0) {
                        addCart(this.cartReq).then(response => {
                            if (response.data && response.code == 200) {
                                this.$router.push(`/addtocart/${response.data}`)
                            } else {
                                this.$message.error("购物车添加失败，请重新添加");
                            }
                        })
                    } else {
                        this.$confirm('该操作需要登录，是否前往登录', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$router.push({path: `/loginorregist/login`})
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                    }

                } else {
                    this.$confirm('该操作需要登录，是否前往登录', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$router.push({path: `/loginorregist/login`})
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }

            } else {
                //购买
                this.$message.info("立即购买")
            }
        }
    },
    watch: {
        'cartReq.buyNum'(newValue, oldValue) {
            if (newValue > 0 && newValue < 100) {
            } else {
                this.$message.success("最少一件，最多99件")
                this.cartReq.buyNum = oldValue
            }
        }
    },
    created() {
        this.skuId = this.$route.params.skuId
        this.querySkuDetailsInfo(this.skuId)
        this.getProvinces()
    },
}
</script>

<style lang="scss" scoped>
$width: 1200px;
$min-width: 100px;
$color1: #666666;
$color2: #e4393c;
$color3: #999999;
$color4: #5e69ad;

.main {
    width: $width;

    margin-bottom: 20px;
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

//左边图片区域
.left {
    float: left;
    width: $min-width*4;

    //background-color: lightskyblue;

    .default-img {
        width: $min-width*4-2;
        height: 398px;
        margin-bottom: 20px;
        border: 1px solid #eeeeee;


        .item-default-img {
            width: 100%;
            height: 100%;
        }
    }

    .item-images-carousel {
        .item-images-ul {

            li {
                padding: 0 8px;
                width: 60px;
                height: 60px;

                &:hover {
                    cursor: pointer;
                }


                img {
                    border: 2px solid white;
                    width: 60px;
                    height: 60px;
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

//右边版本选择区域
.right {
    float: right;
    width: $min-width*8-20;
    margin-left: 20px;


    .item-info {
        padding-bottom: 10px;
        border-bottom: 1px dotted #dfdfdf;

        .item-title {
            height: 28px;
            line-height: 28px;
            padding-top: 10px;
            margin-bottom: 5px;
            color: $color1;
            font: 700 16px Arial, "microsoft yahei";
        }

        .item-subtitle {
            height: 18px;
            line-height: 18px;
            color: $color2;
            font-size: 12px;
            margin-bottom: 5px;

            a {
                color: $color1;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .item-price {
            height: 42px;
            line-height: 42px;
            background-color: #f3f3f3;
            margin-bottom: 5px;

            .item-price-left {
                width: 85px;
                text-align: left;
                padding-left: 10px;
                float: left;
                font-size: 12px;
                color: $color3;
                letter-spacing: 10px;
            }

            .item-price-middle {
                float: left;
                color: $color2;
                font-size: 22px;
                font-weight: 500;

                &:before {
                    content: "￥";
                }
            }

            .item-price-right {
                text-align: center;
                float: right;

                p {
                    padding: 0 10px;
                    border: 0;
                    color: $color3;
                    font-size: 12px;
                    height: 10px;
                    margin: -10px 0 0;
                }

                a {
                    color: #005ea7;
                    font-size: 14px;
                    margin-top: 10px;
                    display: inline-block;
                    height: 30px;

                    &:hover {
                        cursor: pointer;
                        color: $color2;
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

        .item-service {
            height: 32px;
            line-height: 32px;
            margin-bottom: 5px;

            .dt {
                width: 85px;
                text-align: left;
                padding-left: 10px;
                float: left;
                font-size: 12px;
                color: $color3;
                letter-spacing: 3px;
            }

            .dd {
                float: left;

                li {
                    margin-right: 10px;
                }

                a {
                    font-size: 12px;
                    color: $color4;
                    letter-spacing: 1px;
                    padding: 0 5px;
                    border-radius: 10px;
                    border: 1px solid;
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

        .item-area {
            height: 45px;
            line-height: 45px;
            //background-color: lightskyblue;

            .dt {
                width: 85px;
                text-align: left;
                padding-left: 10px;
                float: left;
                font-size: 12px;
                color: $color3;
                letter-spacing: 10px;
            }

            .dd {
                .item-region {
                    float: left;
                    width: 222px;
                    overflow: hidden;
                    text-align: center;
                    color: #666666;
                    font-size: 12px;
                    padding: 0 5px;
                    //border: 1px solid #cecbce;
                    position: relative;
                    margin-right: 5px;
                }

                .item-stock {
                    float: left;
                    color: #999;
                    font-size: 14px;

                    strong {
                        font-weight: 600;
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

    .item-sale-attrs {
        margin-top: 10px;
        line-height: 34px;
        margin-bottom: 10px;

        .item-sale-attr {
            margin: 10px 0;

            .dt {
                width: 85px;
                text-align: left;
                padding-left: 10px;
                float: left;
                font-size: 12px;
                color: $color3;
                letter-spacing: 3px;
            }

            .dd {
                float: left;
                border: 1px solid #cccccc;
                margin: 0 10px;
                padding: 0 13px;
                color: #666666;
                font-size: 12px;

                &:hover {
                    color: $color2;
                    cursor: pointer;
                    border: 1px solid $color2;
                }
            }

            .saleAttrLight {
                border: 1px solid $color2;
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

        //解决边框塌陷
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    .item-add {
        padding: 10px 0;
        margin-top: 10px;

        .item-add-num {
            float: left;
            margin-right: 40px;
            width: 150px;
            position: relative;

            i {
                position: absolute;
                background-color: #f1f1f1;
                padding: 3px;
                border: 1px solid #c3c7cf;
                font-size: 12px;
                right: 0;

                &:hover {
                    cursor: pointer;
                }
            }

            .el-icon-minus {
                top: 20px;
            }
        }

        .item-add-shopping {
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
