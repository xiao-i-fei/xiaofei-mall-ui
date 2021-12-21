<template>
    <div style="height: 100vh;background-color:#f4f4f4;">
        <!-- 头部广告 -->
        <div class="top-ad">
            <div class="wrapper">
                <img :src="topAd" alt="加载失败">
            </div>
        </div>

        <!-- 顶部导航 -->
        <top-nav/>

        <!-- 顶部检索区域 -->
        <div class="header">
            <div class="wrapper content">
                <!-- 左边logo -->
                <div class="logo">
                    <img src="../../assets/images/logo/logo.png" alt="加载失败">
                </div>
                <!-- 中间input框 -->
                <div class="search">
                    <!-- 搜索框-购物车按钮 -->
                    <div class="top">
                        <!-- 搜索框 -->
                        <div class="search-input">
                            <input placeholder="搜索商品"
                                   type="text" v-model="searchValue"
                                   class="xiaofei-clear-input"
                                   @keyup.enter="toSearchPage">
                            <div class="search-icon" @keyup.enter="toSearchPage">
                                搜索
                                <!--<i class="el-icon-search"></i>-->
                            </div>
                        </div>
                        <!-- 购物车按钮 -->
                        <div class="cart-btn">
                            <a href="/cart"><i class="el-icon-shopping-cart-2"></i></a>
                            <a href="/cart">我的购物车</a>
                        </div>
                    </div>
                    <!-- 搜索框下面一栏-->
                    <div class="middle">
                        <ul>
                            <li><a href="">建材遇季</a></li>
                            <li><a href="">套装钜惠</a></li>
                            <li><a href="">手机</a></li>
                            <li><a href="">买一赠一</a></li>
                            <li><a href="">品质好房</a></li>
                            <li><a href="">洗衣机爆款</a></li>
                            <li><a href="">电脑爆款</a></li>
                            <li><a href="">好书推荐</a></li>
                            <li><a href="">美妆圣诞</a></li>
                        </ul>
                    </div>
                    <!-- 底部 -->
                    <div class="bottom">
                        <ul>
                            <li><a href="">秒杀</a></li>
                            <li><a href="">优惠券</a></li>
                            <li><a href="">商城会员</a></li>
                            <li><a href="">品牌闪购</a></li>
                            <li><a href="">拍卖</a></li>
                            <li><a href="">超市家电</a></li>
                            <li><a href="">小飞超市</a></li>
                            <li><a href="">生鲜超市</a></li>
                            <li><a href="">小飞国际</a></li>
                            <li><a href="">小飞云</a></li>
                        </ul>
                    </div>
                </div>
                <!-- 右边广告区域 -->
                <div class="ad">
                    <img src="./images/search-right-ad.webp" alt="加载失败">
                </div>
            </div>
        </div>

        <!-- 商品信息主要展示区域 -->
        <div class="item-main">

            <!-- 类别、轮播图、登录区域 -->
            <div class="wrapper content">
                <!-- 侧边广告 -->
                <div class="side-ad">
                    <div
                        class="ad-one"
                        @mouseleave.stop="adShow = false"
                        @mouseenter.stop="adShow = true"
                    >
                        <a>
                            <img :src="sideAds.smallAds.advPic" alt=""/>
                        </a>
                    </div>
                    <transition name="el-zoom-in-center">
                        <div
                            v-show="adShow"
                            class="transition-box ad-two"
                            @mouseleave.stop="adShow = false"
                            @mouseenter.stop="adShow = true"
                        >
                            <a>
                                <img :src="sideAds.bigAds.advPic" alt="图片加载失败"/>
                            </a>
                        </div>
                    </transition>
                </div>
                <!-- 左边类别区域 -->
                <div class="category">
                    <!-- 显示类别 -->
                    <div class="category-menu">
                        <ul>
                            <li @mouseleave.stop="showCategory = -1" @mouseenter.stop="showCategory=index"
                                v-for="(category1,index) in categorys" :key="category1.catId">
                                <a href="" v-text="category1.name"></a>
                            </li>
                        </ul>
                    </div>
                    <!-- 未显示的二级类别和三级类别 -->
                    <div v-show="showCategory>-1" class="category2and3">
                        <div class="category2and3-main" @mouseleave.stop="showCategory = -1"
                             @mouseenter.stop="showCategory=index1" v-show="showCategory==index1"
                             v-for="(category,index1) in category2and3" :key="index1">
                            <dl v-for="(category2,index2) in category" :key="index2">
                                <dt>
                                    <a href="">{{ category2.name }} ></a>
                                </dt>
                                <dd>
                                    <a v-for="(category3,index3) in category2.children" :key="index3"
                                       :href="`/search?categoryId=${category3.catId}`">
                                        {{ category3.name }}
                                    </a>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <!-- 大轮播图 -->
                <div class="big-carousel">
                    <el-carousel trigger="click" height="470px">
                        <el-carousel-item v-for="(carousel, index) in homeAdv.carousels" :key="index">
                            <!--                            <el-image :src="carousel.advPic" fit="contain" lazy/>-->
                            <img alt="图片加载失败" :src="carousel.advPic"/>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 小轮播图 -->
                <div class="small-carousel">
                    <!-- 小轮播图 -->
                    <el-carousel trigger="click" height="470px" indicator-position="none">
                        <el-carousel-item v-for="( item, index ) in homeAdv.smallCarousels" :key="index">
                            <div class="small-carousel">
                                <a href="#" v-for="carousels in item" :key="carousels.advId">
                                    <img alt="图片加载失败" :src="carousels.advPic"/>
                                </a>
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 右边小功能区域和用户信息区域 -->
                <div class="right">
                    <!-- 用户登录和用户信息展示 -->
                    <div class="user">
                        <div class="top">
                            <!-- 用户头像展示 -->
                            <div class="left">
                                <img v-if="userInfo.id>0" :src="userInfo.header"
                                     alt="加载失败">
                                <img v-else src="https://img1.baidu.com/it/u=504609824,3604971623&fm=26&fmt=auto&gp=0.jpg"
                                     alt="加载失败">
                            </div>
                            <div class="right" v-if="userInfo.id>0">Hi~{{ userInfo.username }}</div>
                            <div class="right" v-else>Hi~欢迎逛商城</div>
                        </div>
                        <!-- 登录、注册/退出登录、用户信息，按钮 -->
                        <div class="bottom">
                            <!-- 已登录 -->
                            <div v-if="userInfo.id>0" class="is-login common">
                                <div class="login-out">
                                    <a @click="logout">login out</a>
                                    <a @click="logout">退出登录</a>
                                </div>
                                <div class="user-info">
                                    <a href="/account">user info</a>
                                    <a href="/account">用户信息</a>
                                </div>
                            </div>
                            <!-- 未登录 -->
                            <div v-else class="not-login common">
                                <div class="login">
                                    <a href="/loginorregist/login">login</a>
                                    <a href="/loginorregist/login">登录</a>
                                </div>
                                <div class="regist">
                                    <a href="/loginorregist/regist">regist</a>
                                    <a href="/loginorregist/regist">注册</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 新品上架 -->
                    <div class="new-goods new-hot-product-common">
                        <div class="title">
                            <h5>新品上架</h5>
                            <a :href="`/search?sort=-4`">更多 <i class="el-icon-caret-right"></i></a>
                        </div>
                        <!-- 轮播图展示商品-->
                        <div class="goods">
                            <el-carousel trigger="click" height="140px" indicator-position="none">
                                <el-carousel-item v-for="product in newProduct" :key="product.skuId">
                                    <a :href="`/item/${product.skuId}/itemdesc`">
                                        <div class="good-img">

                                            <el-image style="width: 120px;height: 120px" :src="product.skuImg"
                                                      fit="contain"></el-image>

                                        </div>
                                        <h6>{{ product.skuTitle }}</h6>
                                    </a>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!-- 热销榜单 -->
                    <div class="hot-goods new-hot-product-common">
                        <div class="title">
                            <h5>热销榜单</h5>
                            <a :href="`/search?sort=-2`">更多 <i class="el-icon-caret-right"></i></a>
                        </div>
                        <!-- 商品展示 -->
                        <div class="goods">
                            <el-carousel trigger="click" height="140px" indicator-position="none">
                                <el-carousel-item v-for="product in hotProduct" :key="product.skuId">
                                    <a :href="`/item/${product.skuId}/itemdesc`">
                                        <div class="good-img">
                                            <el-image style="width: 120px;height: 120px" :src="product.skuImg"
                                                      fit="contain"></el-image>
                                        </div>
                                        <h6>{{ product.skuTitle }}</h6>
                                    </a>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 发现好货 -->
            <div class="wrapper find-good-goods">
                <!-- 发现好货标题 -->
                <div class="left">
                    <!-- 设置背景图片 -->
                    <a href="">
                        <div class="left-title-logo">

                            <div class="left-title">
                                探索新生活 <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="right">
                    <ul>
                        <!-- 每一项好货商品 -->
                        <li v-for="(product,index) in findGoodGoods" :key="index">
                            <a :href="`/item/${product.skuId}/itemdesc`">
                                <div class="item">
                                    <div v-if="index%2===1" class="title">
                                        {{ product.skuTitle }}
                                    </div>
                                    <div class="pic">
                                        <img :src="product.skuImg" alt="">
                                    </div>
                                    <div v-if="index%2===0" class="title">
                                        {{ product.skuTitle }}
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 为你推荐 -->
            <div class="wrapper suggest-goods">
                <!-- 为你推荐图标 -->
                <h4>为你推荐</h4>

                <!-- 商品主要展示区域 -->
                <div class="goods-main">
                    <ul>
                        <li class="use-move-animation" v-for="(item,index) in suggestData" :key="index">
                            <!-- 商品信息 -->
                            <a :href="`/item/${item.skuId}/itemdesc`">
                                <!-- 商品图片，lazy，图片懒加载 -->
                                <el-image class="product-img" lazy :src="item.skuImg">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>

                                <div style="height: 80px" @mouseleave.stop="likeBtnShow = 0"
                                     @mouseenter.stop="likeBtnShow = item.skuId">
                                    <!-- 商品标题 -->
                                    <div class="product-title">
                                        <p style="height: 35px;overflow: hidden;">{{ item.skuTitle }}</p>
                                    </div>

                                    <!-- 商品价格 -->
                                    <div class="product-price">
                                        <span> ￥{{ item.skuPrice }}</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- 底部导航 -->
            <bottom/>
        </div>


    </div>
</template>

<script>
import TopNav from "@/views/components/NewTopNav";
import {queryAllCategory} from "@/api/product/category";
import {queryAdvByPage} from "@/api/product/home-adv";
import {getProductByOrder, scrollLoadingProducts} from "@/api/search/product";
import Bottom from "@/views/components/Bottom";
import topAd from './images/dhiahduaihduiahduhurewrh.webp'
import Cookie from 'js-cookie'
import {logout} from "@/api/auth/auth";

export default {
    components: {
        Bottom,
        TopNav
    },
    data() {
        return {
            searchValue: "", //搜索值
            topAd: topAd,//顶部广告
            adShow: false,//广告是否显示
            categorys: [],//所有类别
            category2and3: [],//二三级类别
            showCategory: -1,//指定显示哪个类别的子类别
            homeAdv: {carousels: [], smallCarousels: []},//后台查询的首页轮播图等广告信息
            sideAds: {smallAds: {}, bigAds: {}}, //侧边栏的广告栏
            hotProduct: [],//热门商品
            newProduct: [],//新上架商品
            findGoodGoods: [],//发现好货商品
            suggestData: [],//推荐商品数据
            scrollLoadFlag: 0,//滚动加载标志
            userInfo: {},//用户信息
        }
    },
    methods: {
        //去搜索页面
        toSearchPage() {
            if (this.searchValue) {
                this.$router.push({path: `/search`, query: {"searchValue": this.searchValue}});
            }
        },
        //获取所有类别
        getCategory() {
            queryAllCategory().then((response) => {
                if (response.data && response.code === 200) {
                    this.categorys = response.data;
                    //提取出来二三级类别
                    if (this.categorys.length > 0) {
                        this.categorys.forEach(category => {
                            this.category2and3.push(category.children)
                        })
                    }
                }
            });
        },
        // 加载轮播图资源
        getCarousel() {
            queryAdvByPage().then(response => {
                // 处理数据
                let items = [];
                let smallItems = [];
                items = response.data.items;
                items.forEach(item => {
                    if (item.advType == 0) {
                        this.homeAdv.carousels.push(item)
                    } else if (item.advType == 5) {
                        if (smallItems.length >= 3) {
                            this.homeAdv.smallCarousels.push(smallItems);
                            smallItems = []
                        }
                        smallItems.push(item)
                    } else if (item.advType == 4) {
                        this.sideAds.bigAds = item
                    } else if (item.advType == 6) {
                        this.sideAds.smallAds = item
                    }
                })
                //this.homeAdv.carousels =response.data.items
            })
        },
        //获取热销商品
        getHotProduct() {
            getProductByOrder(1, 5, "hotScore", 1).then(response => {
                this.hotProduct = response.data
            })
        },
        //获取新上架的商品
        getNewProduct() {
            getProductByOrder(1, 5, "saleCount", 1).then(response => {
                this.newProduct = response.data
            })
        },
        //发现好货
        getFindGoodProduct() {
            getProductByOrder(1, 20, "commentNum", 1).then(response => {
                this.findGoodGoods = response.data
                let index = this.findGoodGoods.length > 4 ? 5 : this.findGoodGoods
                for (let i = 0; i < index; i++) {
                    this.findGoodGoods.push(this.findGoodGoods[i])
                }
            })
        },
        //获取推荐的商品信息
        scrollLoadingProducts() {
            let pageSize = 10
            let pageNo = this.suggestData.length / pageSize + 1
            scrollLoadingProducts(pageNo, pageSize).then((response) => {
                response.data.forEach(item => {
                    this.suggestData.push(item)
                })
            });
        },
        //滚动监听事件
        scrollMethod() {
            //变量scrollTop是滚动条滚动时,距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight - scrollHeight < 20 && scrollTop + windowHeight - scrollHeight > -1) {
                if (this.suggestData.length < 100) {
                    //写后台加载数据的函数
                    this.scrollLoadingProducts()
                }
            }
        },
        //退出登录
        logout() {
            logout().then(response => {
                if (response.code == 200) {
                    Cookie.remove('User-Token');
                    Cookie.remove('username');
                    Cookie.remove('userInfo');
                    this.$message.success("退出成功")
                    window.location.href = "/"
                } else {
                    this.$message.success("退出失败")
                }
            })
        },
        //获取用户信息
        getUserInfo() {
            let userInfo = Cookie.get("userInfo")
            if (userInfo) this.userInfo = JSON.parse(userInfo)
        },
    },
    mounted() {
        // 挂载时，添加监听滚动事件，然后用 scrollMethod 方法进行处理
        //window.addEventListener('scroll', this.scrollMethod)
        this.getCategory()
        this.getCarousel()
        this.getHotProduct()
        this.getNewProduct()
        this.getFindGoodProduct()
        this.scrollLoadingProducts()
        this.getUserInfo()
    },
    created() {
        window.onscroll = throttle(onScroll)

        let _this = this

        function onScroll() {
            //变量scrollTop是滚动条滚动时,距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight - scrollHeight < 20 && scrollTop + windowHeight - scrollHeight > -1) {
                if (_this.suggestData.length < 100) {
                    //写后台加载数据的函数
                    _this.scrollLoadingProducts()
                }
            }

        }

        //函数节流
        function throttle(fn, interval = 300) {
            let canRun = true;
            return function () {
                if (!canRun) return;
                canRun = false;
                setTimeout(() => {
                    fn.apply(this, arguments);
                    canRun = true;
                }, interval);
            }
        }

    },
    destroyed() {
        // 销毁时，删除监听滚动事件，否则其他.vue文件也会受影响
        //   window.removeEventListener('scroll', this.scrollMethod)
    }
};
</script>

<style lang="scss" scoped>
$hover-color: #e1251b;

/*顶部广告*/
.top-ad {
    // background-color: rgb(198, 46, 36);
    background-color: #fae1e1;
    max-height: 80px;

    img {
        max-height: 80px;

        &:hover {
            cursor: pointer;
        }
    }
}

/* 顶部检索区域 */
.header {
    height: 140px;
    background-color: #ffffff;

    /*logo、检索框、我的购物车按钮、广告区域*/
    .content {
        display: flex;
        /*logo*/
        .logo {
            width: 190px;
            height: 140px;
            text-align: center;

            img {
                max-width: 190px;
                max-height: 120px;
                margin-top: 10px;
            }
        }

        /*检索区域*/
        .search {
            position: relative;
            flex: 1;
            margin-left: 10px;
            margin-top: 25px;

            /*检索按钮和购物车按钮*/
            .top {
                display: flex;
                /*顶部搜索框*/
                .search-input {
                    position: relative;
                    width: 546px;
                    height: 32px;
                    border: 2px solid #e2231a;
                    background: #fff;

                    > input {
                        border: 0;
                        padding: 0;
                        margin-left: 1%;
                        width: 85%;
                        height: 100%;
                    }

                    > .search-icon {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        position: absolute;
                        right: -1px;
                        top: -1px;
                        height: 31px;
                        width: 58px;
                        background-color: $hover-color;
                        color: #fff;
                        font-weight: 800;
                        font-size: 14px;

                        i {
                            font-size: 13px;
                            font-weight: 800;
                            color: #fff;
                        }

                        &:hover {
                            cursor: pointer;
                            background-color: #c81623;
                        }
                    }
                }

                /*购物车按钮*/
                .cart-btn {
                    $cart-btn-height: 35px;
                    margin-left: 50px;
                    position: relative;
                    width: 130px;
                    height: $cart-btn-height;
                    line-height: $cart-btn-height;
                    text-align: center;
                    transition: all .5s;
                    transform-style: preserve-3d;

                    > a {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 100%;
                        border: 1px solid #eeeeee;
                        position: absolute;

                        i {
                            font-size: 20px;
                            font-weight: 800;
                        }
                    }

                    > a:first-child {
                        transform: translateZ($cart-btn-height/2);
                    }

                    > a:last-child {
                        /* 躺平x轴旋转  立方体的顶部,位移z(确保看到这个盒子) */
                        transform: rotateX(90deg) translateZ($cart-btn-height/2);
                    }

                    /* 立方体旋转 */
                    &:hover {
                        transform: rotateX(-90deg);
                    }
                }
            }

            /*减速区域中间字体*/
            .middle {
                margin-top: 15px;

                > ul {
                    display: flex;

                    > li {
                        margin-right: 15px;

                        > a {
                            font-size: 12px;
                            color: #666;

                            &:hover {
                                color: $hover-color;
                            }
                        }
                    }
                }
            }

            /*检索最底下一栏*/
            .bottom {
                position: absolute;
                left: 0;
                bottom: 0;

                > ul {
                    display: flex;

                    > li {
                        margin-right: 15px;

                        > a {
                            font-size: 16px;
                            color: #666;

                            &:hover {
                                font-weight: 700;
                                color: $hover-color;
                            }
                        }
                    }
                }
            }
        }

        /*广告*/
        .ad {
            width: 190px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                max-width: 190px;
                max-height: 120px;
                margin-top: 10px;
            }
        }
    }
}


.item-main {
    background-color: #f4f4f4;
    margin-bottom: 20px;
    /* 类别、轮播图、登录区域 */
    .content {
        position: relative;
        $height: 470px;
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        background-color: #f4f4f4;
        margin-bottom: 20px;

        /*广告区域*/
        .side-ad {
            position: absolute;
            left: 0;
            top: 10px;
            /*>div {
                position: absolute;
                height: 470px;
            }*/

            //第一个广告
            .ad-one {
                position: absolute;
                left: -272px;
                width: 272px;

                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }

            //第二个广告
            .ad-two {
                position: absolute;
                left: 0;
                top: 0;
                width: 790px;
                z-index: 100;

                img {
                    max-width: 1190px;
                    max-height: 470px;
                    object-fit: contain;
                }
            }
        }

        /*类别区域*/
        .category {
            position: relative;
            width: 190px;
            background-color: #fff;

            /*显示的以及类别信息*/
            .category-menu {
                height: $height;
                overflow: hidden;

                > ul {
                    > li {
                        height: 25px;
                        line-height: 25px;
                        overflow: hidden;
                        padding-left: 18px;

                        a {
                            font-size: 13px;
                        }
                    }
                }
            }

            /*未显示的二级类别信息*/
            .category2and3 {
                box-shadow: 5px 5px 5px #888888;
                width: 1000px;
                min-height: $height;
                z-index: 999;
                position: absolute;
                left: 190px;
                top: 0;
                background-color: #fff;

                /*二三级类别*/
                > .category2and3-main {
                    min-height: $height;
                    padding: 20px 0 20px;
                    /*二三级类别*/
                    dl {
                        position: relative;
                        padding-left: 80px;
                        /*二级类别*/
                        dt {
                            overflow: hidden;
                            position: absolute;
                            left: 0;
                            top: 6px;
                            text-align: right;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                            a {
                                display: inline-block;
                                width: 70px;
                                float: left;
                                margin-right: 10px;
                                padding: 0 10px;
                                height: 24px;
                                background-color: #333;
                                line-height: 24px;
                                color: #fff;

                                &:hover {
                                    background-color: $hover-color;
                                    color: #fff;
                                }
                            }
                        }

                        /*三级类别*/
                        dd {
                            padding: 5px 0;
                            overflow: hidden;

                            a {
                                float: left;
                                margin: 3px 0;
                                padding: 0 7px;
                                height: 16px;
                                line-height: 16px;
                                white-space: nowrap;
                                color: #666;

                                &:hover {
                                    color: $hover-color;
                                }
                            }
                        }
                    }
                }
            }
        }

        /*大轮播图区域*/
        .big-carousel {
            width: 590px;

            img {
                width: 590px;
                height: $height;
                object-fit: contain;
            }
        }

        /*小轮播图区域*/
        .small-carousel {
            width: 190px;
            height: $height;
            overflow: hidden;

            img {
                margin-bottom: 10px;
                width: 190px;
                height: 150px;
            }
        }

        /*用户信息区域*/
        .right {
            background-color: #fff;
            width: 190px;

            .user {
                height: 102px;
                border-bottom: 1px solid #eee;
                /*用户头像和用户名展示*/
                .top {
                    height: 67px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    /*用户头像*/
                    .left {
                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }

                    /*欢迎用户字体*/
                    .right {
                        margin-left: 10px;
                        width: 106px;
                    }
                }

                /*登录、注册/退出登录、用户信息，按钮*/
                .bottom {

                    > .common {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        /*按钮的公共样式*/
                        > div {
                            height: 35px;
                            position: relative;
                            /*     height: 35px;*/
                            flex: 1;
                            margin: 0 12.5px;

                            transition: all .5s;
                            transform-style: preserve-3d;

                            /*当鼠标进入的时候，旋转*/
                            &:hover {
                                transform: rotateX(-90deg);
                            }

                            > a {
                                font-size: 13px;
                                position: absolute;
                                left: 0;
                                top: 0;

                                display: inline-block;
                                width: 70px;
                                height: 30px;
                                text-align: center;
                                line-height: 30px;

                                border-radius: 5px;


                                &:hover {
                                    transform: rotateX(-90deg);
                                }
                            }

                            a:first-child {
                                transform: rotateX(90deg) translateZ(15px);
                            }

                            a:last-child {
                                transform: translateZ(15px);
                            }
                        }

                        /*第一个按钮的样式*/
                        div:first-child {
                            text-align: right;

                            a:first-child {
                                background-color: #363634;
                                color: #e5d790;
                            }

                            a:last-child {
                                background-color: #e1251b;
                                color: white;
                            }
                        }

                        /*第二个按钮的样式*/
                        div:last-child {
                            a:first-child {
                                background-color: #e1251b;
                                color: #fff;
                            }

                            a:last-child {
                                background-color: #363634;
                                color: #e5d790;
                            }
                        }
                    }
                }
            }

            /*新品上架和热门商品*/
            .new-hot-product-common {
                margin-top: 2px;
                margin-bottom: 1px;
                height: 181px;
                border-bottom: 1px solid #eee;

                .title {
                    height: 20px;
                    display: flex;
                    justify-content: space-between;

                    h5 {
                        font-size: 14px;
                        color: #333;
                        font-weight: 600;
                        margin-left: 15px;
                    }

                    a {
                        font-size: 12px;
                        color: #999;
                        margin-right: 10px;

                        &:hover {
                            color: $hover-color;
                        }
                    }
                }

                .goods {
                    margin-top: 5px;
                    text-align: center;
                    height: 160px;

                    h6 {
                        width: 150px;
                        text-align: center;
                        margin: 0 20px;
                        font-size: 12px;
                        height: 15px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }

            /*热门商品榜单*/
            .hot-goods {
                border-bottom: 0;
            }
        }
    }

    /*发现好货*/
    .find-good-goods {
        height: 260px;
        overflow: hidden;
        display: flex;
        margin-bottom: 20px;
        justify-content: space-between;
        background-color: #f4f4f4;

        /*左边标题部分*/
        .left {
            position: relative;
            width: 190px;

            a {
                color: #fff;
                position: absolute;
                left: 0;
                top: 0;
                width: 190px;
                height: 100%;
                background: url("./images/b5d11fd6f7627b04f9713c995b75af78.png") no-repeat center 0;

                .left-title-logo {
                    width: 160px;
                    height: 90px;
                    margin: 15px auto 0 auto;
                    background-size: contain;
                    background: url(./images/download.png) no-repeat center 0;
                }

                .left-title {
                    color: rgba(255, 255, 255, .8);
                    font-size: 16px;
                    padding: 55px 0 20px 10px;
                    display: block;

                }

                &:hover {
                    color: #fff;
                }

                &:hover i {
                    color: $hover-color;
                }
            }
        }

        /*右边内容部分*/
        .right {
            width: 990px;
            height: 260px;
            overflow: hidden;

            ul {
                display: flex;
                width: 5000px;
                background-color: #fff;


                animation: move 50s linear infinite;

                li {
                    height: 260px;

                    > a {
                        display: inline-block;

                        .item {
                            .pic {
                                img {
                                    width: 150px;
                                    height: 150px;
                                }
                            }

                            .title {
                                width: 150px;
                                height: 21px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                color: #333;
                                text-align: center;
                                font-size: 14px;
                            }
                        }
                    }
                }

                /*选中偶数标签*/
                li:nth-child(odd) {
                    > a {

                        margin: 20px 50px 0 0;

                        .title {
                            margin-top: 15px;
                        }
                    }
                }

                /*选中奇数标签*/
                li:nth-child(even) {
                    a {
                        margin: 50px 50px 0 0;

                        .title {
                            margin-bottom: 15px;
                        }
                    }
                }
            }

            /*当鼠标进入的时候停止*/
            &:hover ul {
                animation-play-state: paused;
            }
        }
    }

    /*首页推荐商品*/
    .suggest-goods {
        h4 {
            position: relative;
            width: 180px;
            height: 45px;
            font-size: 28px;
            font-weight: 700;
            text-align: center;
            line-height: 45px;
            padding: 0 30px;
            margin: 0 auto 20px;
            overflow: hidden;
            color: #333;
        }

        background-color: #f4f4f4;

        .goods-main {
            > ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;

                li {
                    width: 230px;
                    height: 320px;
                    background-color: #fff;
                    margin-bottom: 20px;

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

                    &:hover {
                        box-shadow: 0 0 20px #807d7dd6;
                    }
                }
            }
        }
    }
}

//使用动画
.use-move-animation {
    animation: aaa 2s;
}

//发现好货移动动画
@keyframes move {
    to {
        transform: translateX(-4000px);
    }
}

/*为你推荐动画*/
@keyframes aaa {
    0% {
        margin-top: 500px;
    }
    100% {
        margin-top: 0;
    }
}


</style>
