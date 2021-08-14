<template>
    <div class="top-search-main">
        <div class="xiaofei-row xiaofei-center">
            <!-- 左侧logo区域 -->
            <div class="xiaofei-col-2 top-search-left">
                <a href="/">
                    <img :src="logo" alt="图片加载失败"/>
                </a>
            </div>
            <!-- 搜索按钮和购物车按钮 -->
            <div class="xiaofei-col-8 top-search-middle">
                <div class="search-main">
                    <div class="search-input">
                        <input
                            placeholder="输入搜索条件"
                            type="text" v-model="searchValue"
                            class="xiaofei-clear-input"
                        />
                        <button
                            class="xiaofei-clear-button"
                            @click="toSearchPage"
                        >
                            搜 索
                        </button>
                    </div>
                    <div class="shopping-btn">
                        <i class="el-icon-shopping-cart-2"></i> 我的购物车
                    </div>
                </div>
                <!-- 搜索下面的第一个导航栏 -->
                <div class="search-one-nav">
                    <ul class="xiaofei-clear-level-ul">
                        <li><a>品牌宠粉日</a></li>
                        <li><a>洗衣机</a></li>
                        <li><a class="height-light">AMD首发</a></li>
                        <li><a>百货节</a></li>
                        <li><a>智能数码</a></li>
                        <li><a>潮店趋势</a></li>
                        <li><a>品类风暴</a></li>
                    </ul>
                </div>

                <!-- 搜索下面的第二个导航栏 -->
                <div class="search-two-nav">
                    <ul class="xiaofei-clear-level-ul">
                        <li><a class="height-light">秒杀</a></li>
                        <li><a class="height-light">优惠券</a></li>
                        <li><a>商城会员</a></li>
                        <li><a>品牌闪购</a></li>
                        <li><a>拍卖</a></li>
                        <li><a>家电</a></li>
                        <li><a>生鲜</a></li>
                        <li><a>全球购</a></li>
                        <li><a>拍卖</a></li>
                    </ul>
                </div>
            </div>

            <!-- 右侧广告区域 -->
            <div class="xiaofei-col-2 top-search-right">
                <a>
                    <img :src="rightAd" alt="图片加载失败"/>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
//import rightAd from '@/views/home/img/ad/search-right-ad.webp'
import rightAd from "@/views/home/img/ad/0f9394ebde8292d1.png.webp";

export default {
    data() {
        return {
            logo: logo,//logo图片
            rightAd: rightAd,//右侧广告图片
            searchValue: "",
        };
    },
    methods: {
        //去搜索页面
        toSearchPage() {
            if (this.searchValue) {
                this.$router.push({path: `/search?searchValue=${this.searchValue}`});
            }
        },
    },
};
</script>

<style lang="scss" scoped>
$color: #e1251b;
$height: 140px;
.top-search-main {
    background-color: white;
    height: $height;
}

//左边logo区域
.top-search-left {
    height: $height;
    text-align: center;

    img {
        margin-top: 35px;
        max-width: 100%;
        max-height: 100%;
    }

    a {
        &:hover {
            cursor: pointer;
        }
    }
}

//中间搜索区域
.top-search-middle {
    margin-top: 30px;

    //搜索的主部分
    .search-main {
        $height: 32px;
        //搜索框
        .search-input {
            float: left;
            width: 546px;
            padding: 1px;
            height: $height;
            border: 2px solid;
            color: $color;

            input {
                width: 420px;
                height: 28px;
                line-height: 28px;
                padding: 2px;
                border: 0;
                margin-left: 20px;
            }

            //设置placeholder字体颜色
            input::-webkit-input-placeholder {
                color: #c8c8c8;
            }

            //搜索按钮
            button {
                width: 58px;
                height: 32px;
                background-color: #e1251b;
                float: right;
                color: white;
                font-weight: 900;
                font-size: 14px;

                &:hover {
                    cursor: pointer;
                    background-color: #c81623;
                }
            }
        }

        //购物车按钮
        .shopping-btn {
            padding: 0 10px;
            height: $height + 4;
            line-height: $height;
            float: left;
            border: 1px solid #eeeeee;
            color: $color;
            margin-left: 40px;

            &:hover {
                border: 1px solid $color;
                cursor: pointer;
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

    //搜索下面的第一个导航栏
    .search-one-nav {
        .height-light {
            color: $color;
        }

        a {
            color: #999999;
            font-size: 13px;

            &:hover {
                color: $color;
                cursor: pointer;
            }
        }

        li {
            padding-right: 15px;
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

    //搜索下面的第二个导航栏
    .search-two-nav {
        margin-top: 20px;

        .height-light {
            color: $color;
            font-weight: 800;
        }

        a {
            color: #333333;
            font: 16px Microsoft YaHei, Heiti SC, tahoma, arial,
            Hiragino Sans GB, "\5B8B\4F53", sans-serif;

            &:hover {
                color: $color;
                cursor: pointer;
            }
        }

        li {
            padding-right: 37px;
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

//右边广告区域
.top-search-right {
    height: $height;
    text-align: center;
    line-height: $height;

    img {
        margin-top: 10px;
        max-width: 100%;
        max-height: 100%;
        /*width: 171px;
        height: 126px;*/
    }

    a {
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
