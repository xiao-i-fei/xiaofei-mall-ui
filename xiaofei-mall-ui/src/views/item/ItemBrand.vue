<!-- 品牌详情页面 -->
<template>
    <div>

        <!-- 商品推荐部分 -->
        <div class="xiaofei-center start">
            <div class="xiaofei-center item-brand-main">
                <div class="left">
                    <el-image alt="加载失败" style="width:150px;height: 100%" :src="brand.logo" fit="contain"></el-image>
                </div>
                <div class="right">
                    <ul class="xiaofei-clear-level-ul">
                        <li v-for="item in randSkuInfos">
                            <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}/itemdesc`}">
                                <el-image alt="加载失败" style="width: 90px;height: 90px" :src="item.skuDefaultImg"
                                          fit="contain"></el-image>
                                <div class="rand-sku-item-title">{{ item.skuName }}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 品牌导航栏部分 -->
        <div class="brand-nav">
            <div class="brand-nav-main xiaofei-center xiaofei-row">
                <ul class="xiaofei-clear-level-ul">
                    <li><a>查看所有商品</a><i class="el-icon-s-fold"></i></li>
                    <li><a>首页</a></li>
                    <li><a>P系列</a></li>
                    <li><a>Mate系列</a></li>
                    <li><a>nova系列</a></li>
                    <li><a>畅想系列</a></li>
                    <li><a>智慧屏</a></li>
                    <li><a>显示器</a></li>
                    <li><a>笔记本</a></li>
                    <li><a>平板</a></li>
                    <li><a>路由器</a></li>
                    <li><a>穿戴</a></li>
                    <li><a>音频配件</a></li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    //created只会在页面加载的时候执行一次，mounted会监测，只要数据一发生改变就会执行
    mounted() {
        //发布一个消息，用于接收品牌信息和接收的随机的商品信息
        this.$bus.$on('getBrandAndSkuInfo', this.getBrandAndSkuInfo)
    },
    methods: {
        //获取品牌信息和随机商品信息
        getBrandAndSkuInfo(brand, randSkuInfo) {
            this.brand = brand;
            this.randSkuInfos = randSkuInfo;
        }

    },
    data() {
        return {
            brand: {},//品牌信息
            randSkuInfos: [],//随机的品牌信息
        }
    },
    beforeDestroy() {
        //销毁订阅的消息
        this.$bus.$off('getBrandAndSkuInfo')
    },
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width: 1200px;
$height: 110px;
$min-width: 100px;
$color1: #666666;
$color2: #d11e35;
$color3: #999999;
$color4: #5e69ad;

.start {
    height: $height;
    background-color: #fbfbfb;
}

//商品推荐部分
.item-brand-main {
    width: $width;
    height: $height;
    //background-color: red;

    .left {
        float: left;
        width: 200px;
        height: $height;
    }

    .right {
        float: left;
        width: 900px;
        height: $height;
        text-align: center;
        overflow: hidden;

        li {
            width: 110px;
            height: $height;
            overflow: hidden;
            padding: 0 10px;

            .rand-sku-item-title {
                width: 90px;
                height: 15px;
                margin: 0 auto;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                font-weight: 700;
                color: #050505;
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

//品牌导航栏部分
.brand-nav {
    margin-top: 5px;
    margin-bottom: 20px;
    height: 40px;
    background-color: #333333;

    .brand-nav-main {
        width: $width;
        background-color: #333333;

        ul {
            height: 40px;
            line-height: 40px;

            li {
                padding: 0 15px;

                a {
                    color: white;
                    font-size: 17px;
                }

                &:hover {
                    cursor: pointer;
                    background-color: $color2;
                }
            }

            li:nth-child(1) {
                padding: 0;

                a {
                    padding-left: 30px;
                    padding-right: 40px;
                }

                i {
                    padding-right: 10px;
                }

                color: white;

                background-color: $color2;
            }
        }
    }
}
</style>
