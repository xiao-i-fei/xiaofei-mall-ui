<!-- 商品描述 -->
<template>
    <div>

        <div class="xiaofei-center div-row item-desc-main">
            <!-- 左侧商品推荐区域 -->
            <div class="left">
                <div class="left-title">
                    <h3>达人选购</h3>
                </div>
                <div class="left-suggest-item">
                    <ul class="xiaofei-clear-vertical-ul">
                        <li v-for="item in randSkuInfos">
                            <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}`}">
                                <el-image alt="加载失败" style="width: 150px;height: 150px" :src="item.skuDefaultImg"
                                          fit="contain" lazy></el-image>
                                <div class="item-title">{{ item.skuName }}</div>
                                <div class="item-price">{{ item.price }}</div>
                            </router-link>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- 右侧商品介绍区域 -->
            <div class="right">
                <!-- 商品功能区域导航栏 -->
                <div class="item-desc-nav">
                    <ul class="xiaofei-clear-level-ul">
                        <li :class="{no_highlight:highlight!='itemdesc',highlight:highlight=='itemdesc'}">
                            <router-link style="text-decoration: none;" :to="{path:`/item/${skuId}/itemdesc`}">商品介绍
                            </router-link>
                        </li>
                        <li :class="{no_highlight:highlight!='itembaseattr',highlight:highlight=='itembaseattr'}">
                            <router-link style="text-decoration: none;"
                                         :to="{path:`/item/${skuId}/itembaseattr`}">规格与包装
                            </router-link>
                        </li>
                        <!-- <li>
                            <router-link style="text-decoration: none;" :to="{path:`/item/${skuId}/itemdesc`}">售后保障
                            </router-link>
                        </li>
                        <li>
                            <router-link style="text-decoration: none;" :to="{path:`/item/${skuId}/itemdesc`}">商品评价
                            </router-link>
                        </li>
                        <li>
                            <router-link style="text-decoration: none;" :to="{path:`/item/${skuId}/itemdesc`}">手机社区
                            </router-link>
                        </li> -->
                    </ul>
                </div>
                <div>
                    <router-view/>
                </div>
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
        this.getChildrenRoute();
    },
    methods: {
        //获取品牌信息和随机商品信息
        getBrandAndSkuInfo(brand, randSkuInfo) {
            this.randSkuInfos = randSkuInfo;
        },
        //判断当前路由是哪一个子路由了
        getChildrenRoute() {
            let add = window.location.href
            if (add.indexOf("itemdesc") > -1) {
                this.highlight = "itemdesc"
            }
            if (add.indexOf("itembaseattr") > -1) {
                this.highlight = "itembaseattr"
            }
        }
    },
    data() {
        return {
            randSkuInfos: [],//随机的sku信息
            skuId: this.$route.params.skuId,
            highlight: "",
        }
    },
    beforeDestroy() {
        //销毁订阅的消息
        this.$bus.$off('getBrandAndSkuInfo')
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
.item-desc-main {
    margin-top: 10px;
    margin-bottom: 20px;

    .left {
        border: 1px solid #eeeeee;
        float: left;
        width: $min-width*2-12px;
        margin-right: 10px;

        .left-title {
            padding: 10px;
            margin-bottom: 10px;
            background-color: #f7f7f7;

            h3 {
                margin: 0;
                padding: 0;
                border: 0;
                color: #666;
                font: 700 14px "microsoft yahei";
            }
        }

        .left-suggest-item {
            padding: 10px;

            ul {
                text-align: center;

                li {
                    position: relative;
                    margin-bottom: 10px;
                    overflow: hidden;

                    .item-title {
                        width: 100px;
                        height: 35px;
                        margin: 0 auto;
                        overflow: hidden; //不显示超过对象尺寸的内容
                        //white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
                        text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)
                        font-size: 12px;
                        color: #666666;

                        &:hover {
                            color: $color2;
                        }
                    }

                    .item-price {
                        text-align: center;
                        width: 100px;
                        height: 25px;
                        line-height: 25px;
                        margin: 0 auto;
                        overflow: hidden; //不显示超过对象尺寸的内容
                        white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
                        text-overflow: ellipsis; //当对象内文本溢出时显示省略标记(...)
                        font-size: 14px;
                        font-weight: 800;
                        color: $color2;

                        &:before {
                            content: "￥";
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

        //解决边框塌陷
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    .right {
        float: right;
        width: $min-width*10-15px;
        margin-left: 10px;
        // background-color: lightskyblue;

        .item-desc-nav {
            $color: #e4393c;
            height: 40px;
            background-color: #f7f7f7;
            border-bottom: 1px solid $color;

            ul {
                height: 40px;
                line-height: 40px;

                li {
                    margin-right: 1px;
                    //background-color: $color;
                    padding: 0 20px;
                }

                .highlight {
                    background-color: $color;

                    a {
                        color: white;
                        font: 17px tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                .no_highlight {
                    a {
                        color: #666666;
                        font: 17px tahoma, arial, Microsoft YaHei, Hiragino Sans GB, "\u5b8b\u4f53", sans-serif;

                        &:hover {
                            color: $color;
                            cursor: pointer;
                        }
                    }
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
