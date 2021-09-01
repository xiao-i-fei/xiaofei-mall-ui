<!-- 相关推荐 -->
<template>
    <div class="main">
        <h3>为 你 推 荐</h3>
        <!-- 商品数据 -->
        <div class="product-suggest-main xiaofei-center xiaofei-row">
            <ul class="xiaofei-clear-level-ul main-data">
                <li v-for="(item, index) in suggestData" :key="item.skuId">
                    <!-- 商品信息 -->
                    <router-link style="text-decoration: none;" :to="{path:`/item/${item.skuId}/itemdesc`}">
                        <!-- 商品图片，lazy，图片懒加载 -->
                        <el-image class="product-img" lazy :src="item.skuImg">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>

                        <div
                            style="height: 80px"
                            @mouseleave.stop="likeBtnShow = 0"
                            @mouseenter.stop="likeBtnShow = item.skuId"
                        >
                            <!-- 商品标题 -->
                            <div class="product-title">
                                <p  style="height: 35px;overflow: hidden;">{{ item.skuTitle }}</p>
                            </div>

                            <!-- 商品价格 -->
                            <div class="product-price">
                                <span>￥ {{ item.skuPrice }}</span>
                            </div>
                        </div>
                    </router-link>

                    <!-- 查找商品相似 -->
                    <div
                        class="product-like"
                        @mouseleave.stop="likeBtnShow = 0"
                        @mouseenter.stop="likeBtnShow = item.skuId"
                        v-show="likeBtnShow == item.skuId"
                    >
                        <transition name="el-zoom-in-bottom">
                            <!-- 找相似按钮 -->
                            <div class="like-btn">
                                <span>找相似</span>
                            </div>
                        </transition>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getProductRandom} from "@/api/search/product";

export default {
    data() {
        return {
            likeBtnShow: 0, //找相似按钮是否显示
            suggestData: [], //推荐商品信息
        };
    },
    methods: {
        //获取推荐的商品信息
        getProductRandom() {
            getProductRandom().then((response) => {
                this.suggestData = response.data;
            });
        },
    },
    created() {
        //初始化推荐的商品信息
        this.getProductRandom();
    },
};
</script>

<style lang="scss" scoped>
.main {
    margin-top: 50px;

    h3 {
        width: 150px;
        height: 45px;
        line-height: 45px;
        font-size: 28px;
        font-weight: 800;
        text-align: center;
        padding: 0 30px;
        margin: 0 auto 20px;
        overflow: hidden;
        color: #333;
    }
}

//数据主要区域
.main-data {
    width: 1200px;

    li {
        position: relative;
        width: 230px;
        height: 320px;
        margin: 0 5px 20px 5px;
        background-color: #fff;
        text-align: center;
        //商品信息
        a {
            //商品图片
            .product-img {
                width: 150px;
                height: 150px;
                margin: 30px 40px 40px 40px;
            }

            //商品标题
            .product-title {
                padding: 0 20px;
                text-align: left;

                p {
                    font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial,
                    Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                    color: rgb(102, 102, 102);
                }
            }

            //商品价格
            .product-price {
                padding: 0 20px;
                text-align: left;

                span {
                    color: rgb(225, 37, 27);
                    font-weight: 800;
                    font-size: 17px;
                }
            }

            &:hover {
                cursor: pointer;
            }
        }

        //商品相似按钮
        .product-like {
            background-color: #fff;
            background: linear-gradient(
                    180deg,
                    rgba(255, 255, 255, 0.8) 0,
                    white 35%,
                    white
            );
            z-index: 10;
            position: absolute;
            width: 100%;
            height: 60px;
            top: 240px;

            //找相似按钮
            .like-btn {
                margin: 0 auto;
                background-color: #333333;
                width: 120px;
                height: 28px;
                line-height: 28px;
                margin-top: 18px;
                border: 1px solid #353131;
                border-radius: 20px;
                color: white;
                font-size: 12px;

                &:hover {
                    cursor: pointer;
                    background-color: rgb(200, 22, 35);
                    border: 1px solid rgb(200, 22, 35);
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

