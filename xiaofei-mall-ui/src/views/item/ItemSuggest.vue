<!-- 推荐商品 -->
<template>
    <div>

        <div>
            <div class="xiaofei-center div-row suggest-main">
                <div class="title"><h3>为你推荐</h3></div>
                <div class="item">
                    <ul class="xiaofei-clear-level-ul">
                        <li v-for="item in randSkuInfos">
                            <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}/itemdesc`}">
                                <el-image alt="加载失败" style="width: 100px;height: 100px" :src="item.skuDefaultImg"
                                          fit="contain"></el-image>
                                <div class="item-title">{{ item.skuName }}</div>
                                <div class="item-price">{{ item.price }}</div>
                            </router-link>
                        </li>
                    </ul>
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
$color2: #e4393c;
.suggest-main {
    background-color: #f7f7f7;
    margin-bottom: 20px;

    .title {
        height: 20px;
        padding: 10px;

        h3 {
            margin: 0;
            padding: 0;
            border: 0;
            color: #666666;
            font: 700 14px "microsoft yahei";
            height: 20px;
        }
    }

    .item {
        height: 210px;
        background-color: white;
        overflow: hidden;
        text-align: center;

        ul {
            height: 210px;
            overflow: hidden;
            margin-left: 40px;

            li {
                width: 100px;
                height: 165px;
                overflow: hidden;
                margin: 20px;

                .item-title {
                    width: 100px;
                    height: 35px;
                    margin: 0 auto;
                    overflow: hidden; //不显示超过对象尺寸的内容
                    //  white-space: nowrap; // 默认处理方式。文本自动处理换行。假如抵达容器边界内容会转到下一行
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
    }
}
</style>
