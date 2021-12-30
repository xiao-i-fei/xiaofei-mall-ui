<template>
    <div>
        <top-nav :big-wrapper="true"/>
        <!-- 顶部搜索区域 -->
        <div class="header">
            <!-- logo、搜索框、购物车按钮区域 -->
            <div class="big-wrapper content">
                <!-- 左边logo -->
                <div class="logo">
                    <a href="/">
                        <img src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-12-24/logo.png" alt="加载失败">
                    </a>
                </div>
                <!-- 中间input框 -->
                <div class="search">
                    <!-- 搜索框-购物车按钮 -->
                    <div class="top">
                        <!-- 搜索框 -->
                        <div class="search-input">
                            <input placeholder="搜索商品"
                                   type="text" v-model="searchVo.searchValue"
                                   class="xiaofei-clear-input"
                                   @keyup.enter="search">
                            <div class="search-icon" @click="search">
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
                </div>
            </div>
        </div>
        <!-- 商品全部类别区域 -->
        <div class="category-nav">
            <div class="big-wrapper">
                <!-- 全部商品分类列表 -->
                <div class="category-btn" @mouseleave.stop="category1Show =false" @mouseenter.stop="getCategory">
                    全部商品分类
                </div>
                <!-- 商品类别区域 -->
                <div class="category">
                    <!-- 显示类别 -->
                    <div v-show="category1Show" class="category-menu">
                        <ul>
                            <li @mouseleave.stop="category2Show = -1;category1Show=false"
                                @mouseenter.stop="category2Show=index;category1Show=true"
                                v-for="(category1,index) in categorys" :key="category1.catId">
                                <a href="" v-text="category1.name"></a>
                            </li>
                        </ul>
                    </div>
                    <!-- 未显示的二级类别和三级类别 -->
                    <div v-show="category2Show>-1" class="category2and3">
                        <div class="category2and3-main" @mouseleave.stop="category2Show = -1;category1Show=false"
                             @mouseenter.stop="category2Show=index1;category1Show=true" v-show="category2Show==index1"
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
                <!-- 其他类别 -->
                <div class=" other-category">
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
        </div>
        <!-- 聚合搜索区域 -->
        <div class="mall-search-wrap">
            <div class="big-wrapper">
                <!-- 已选条件展示区域 -->
                <div class="already-select">
                    <!-- 全部结果a标签部分 -->
                    <div class="all-result">
                        <a :href="`/search?searchValue=${searchVo.searchValue}`">全部结果：</a>
                    </div>
                    <!-- 已选查询的属性显示 -->
                    <div class="check-nav-item">

                        <!-- 选择的品牌信息、类别信息 -->
                        <div class="check-attr">
                            <!-- 选中的每一项 -->
                            <div v-for="(item,index) in selectAttr" @click="removeSelectAttr(index)"
                                 class="check-attr-item">
                                <b>{{ item.attrName }}：</b>
                                <em>{{ item.key }}</em>
                                <i class="el-icon-close"></i>
                            </div>
                        </div>
                        <!-- 搜索关键字 -->
                        <div class="search-value">{{ searchVo.searchValue }}</div>

                    </div>

                </div>
                <!-- 没有找到商品信息 -->
                <div v-show="page.item.products.length==0" class="search-empty">
                    汪~没有找到 <span> {{ searchVo.searchValue }}</span>
                    相关的商品，请重新搜索
                </div>
                <!-- 可选属性列表展示 -->
                <div v-show="page.item.products.length>0" class="can-select">
                    <!-- 品牌属性 -->
                    <div v-if="searchVo.brandId==null||searchVo.brandId.length<1" class="can-select-item">
                        <!-- 每一项商品属性的名称 -->
                        <div class="select-key">
                            <span>品牌</span>
                            <!-- 商品属性的值 -->
                            <div class="brand-select-values common">
                                <!-- 属性选择区域 -->
                                <div class="brandImg">
                                    <ul>
                                        <li @click="checkAttr(key,value,1)"
                                            v-for="(value,key,index) in  page.item.productAgg.brandAgg" :key="index">
                                            {{ key }}
                                        </li>
                                    </ul>
                                </div>
                                <!-- 更多和多选区域 -->
                                <div class="more">
                                    <a href="">
                                        <span>更多</span>
                                        <i class="el-icon-arrow-down"></i>
                                    </a>
                                    <a href="">
                                        <span>多选</span>
                                        <i class="el-icon-plus"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 类别属性 -->
                    <div v-if="searchVo.categoryId==null||searchVo.categoryId<1" class="can-select-item">
                        <!-- 每一项商品属性的名称 -->
                        <div class="select-key">
                            <span>类别</span>
                            <!-- 商品属性的值 -->
                            <div class="category-select-values common">
                                <!-- 属性选择区域 -->
                                <div class="attr-items">
                                    <ul>
                                        <li @click="checkAttr(key,value,2)"
                                            v-for="(value,key,index) in  page.item.productAgg.categoryAgg" :key="index">
                                            {{ key }}
                                        </li>
                                    </ul>
                                </div>
                                <!-- 更多和多选区域 -->
                                <div class="more">
                                    <a href="">
                                        <span>更多</span>
                                        <i class="el-icon-arrow-down"></i>
                                    </a>
                                    <a href="">
                                        <span>多选</span>
                                        <i class="el-icon-plus"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 基本属性 -->
                    <div v-show="JSON.stringify(this.page.item.productAgg.baseAttrAgg)!='{}'" class="can-select-item">
                        <!-- 每一项商品属性的名称 -->
                        <div class="select-key">
                            <span>高级选项</span>
                            <!-- 商品属性的值 -->
                            <div class="base-attr-select-values common">
                                <!-- 属性选择区域 -->
                                <div class="attr-items">
                                    <ul>
                                        <li @mouseleave.stop="baseAttrValueShow =-1"
                                            @mouseenter.stop="baseAttrValueShow=index"
                                            v-for="(value,key,index) in  page.item.productAgg.baseAttrAgg">
                                            <a>
                                                <span>{{ key }}</span>
                                                <i class="el-icon-arrow-down"></i>
                                            </a>
                                            <!-- 指定的全部数据 -->
                                            <div v-if="index==baseAttrValueShow" class="all-base-attr">
                                                <ul>
                                                    <li v-for="(value1,key1,index1) in value">
                                                        {{ key1 }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 综合、销量、评论、新品、价格等检索区域 -->
        <div v-show="page.item.products.length>0" class="search-condition">
            <div class="big-wrapper">
                <div class="search-status">
                    <ul>
                        <li :class="{highlight:searchVo.sort==0}" @click="getSort(0)"> 综合</li>
                        <li :class="{highlight:searchVo.sort==2||searchVo.sort==-2}"
                            @click="getSort(searchVo.sort==2?-2:2)"> 销量
                        </li>
                        <li :class="{highlight:searchVo.sort==3||searchVo.sort==-3}"
                            @click="getSort(searchVo.sort==3?-3:3)"> 评论数
                        </li>
                        <li :class="{highlight:searchVo.sort==4||searchVo.sort==-4}"
                            @click="getSort(searchVo.sort==4?-4:4)"> 新品
                        </li>
                        <li :class="{highlight:searchVo.sort==1||searchVo.sort==-1}"
                            @click="getSort(searchVo.sort==1?-1:1)"> 价格
                        </li>
                    </ul>
                </div>
                <div class="select-price">

                </div>

            </div>
        </div>
        <!-- 商品展示 -->
        <div v-show="page.item.products.length>0" class="products">
            <div class="big-wrapper product-main">
                <ul>
                    <li v-for="(product,index) in page.item.products " :key="product.skuId">
                        <a :href="`/item/${product.skuId}/itemdesc`">
                            <div class="pic">
                                <el-image style="width: 200px;height: 200px" lazy fit="contain" :src="product.skuImg"/>
                            </div>
                            <div class="price">
                                <em>￥</em>
                                <i>{{ product.skuPrice }}</i>
                            </div>
                            <div class="sku-title">
                                {{ product.skuTitle }}
                            </div>
                            <div class="common">
                                <em>{{ product.commentNum }}</em>
                                <i>条评论</i>
                            </div>
                            <div class="brand">
                                {{ product.brandName }}
                            </div>

                        </a>
                        <div class="add-cart cart-btn">
                            <a @click="addCart(product)" v-if="product.hasStock" style="color:  #e1251b">加入购物车</a>
                            <a @click="addCart(product)" v-if="product.hasStock" style="color:  #e1251b"><i
                                class="el-icon-shopping-cart-2"></i></a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 分页区域 -->
        <div v-show="page.item.products.length>0" style="margin: 20px 0">
            <div class="big-wrapper" style="text-align: center">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                               :current-page="page.pageNo" :total="page.itemCount" background
                               :page-sizes="[10,20,30,40,50]" :page-size="page.pageSize"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
        <!-- 底部信息 -->
        <bottom/>
    </div>
</template>

<script>
import TopNav from "@/views/components/NewTopNav";
import {queryAllCategory} from "@/api/product/category";
import {getProductBySearch} from "@/api/search/product";
import Bottom from "@/views/components/Bottom";
import {parseJsonToQuery} from "@/utils/mall";
import {addCart} from "@/api/cart/cart";
import {getToken} from "@/utils/auth";
import Cookie from "js-cookie";

export default {
    data() {
        return {
            selectAttr: [],//已选属性
            checkBaseAttrId: [],//已选基本属性
            //搜索条件
            searchVo: {
                searchValue: "",//搜索条件
                categoryId: 0,//三级分类id
                brandId: [],//品牌id
                attrId: [],//属性id
                baseAttrId: [],//属性集合id
                sort: 0,//排序条件
                minPrice: null,//最低价格
                maxPrice: null,//最高价格
            },
            //返回的搜索信息
            page: {
                pageNo: 1,
                pageSize: 40,
                pageTotal: 1,
                itemCount: 0,
                item: {products: [], productAgg: {}}
            },
            baseAttrValueShow: -1,//基本属性值是否显示
            categorys: [],//所有类别
            category2and3: [],//二三级类别
            category1Show: false,//一级类别显示
            category2Show: -1,//二三级类别显示
            cartReq: {id: "", skuId: "", spuId: "", buyNum: 1, check: true, defaultImage: "", userId: ""},//购买或加入购物车商品的信息
        }
    },
    methods: {
        //搜索功能
        search() {
            this.$router.push(`/search${parseJsonToQuery(this.searchVo)}`)
        },
        //获取所有类别
        getCategory() {
            this.category1Show = true
            if (this.categorys.length < 1) {
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
            }
        },
        //属性选择方法
        checkAttr(key, value, flag) {
            if (flag == 1) {
                this.searchVo.brandId = value
            } else if (flag == 2) {
                this.searchVo.categoryId = value
            } else if (flag == 3) {
                let attrId = this.searchVo.attrId
                if (typeof this.searchVo.attrId == "string") {
                    attrId = this.searchVo.attrId.split(",")
                    value = String(value)
                }
                if (!this.arrayContains(attrId, value)) {
                    attrId.push(value)
                    this.searchVo.attrId = attrId
                }
            }
            this.search()
        },
        //获取数据
        getData() {
            getProductBySearch(this.searchVo, this.page.pageNo, this.page.pageSize).then(response => {
                this.page = response.data
                //判断类别是否选中
                if (this.searchVo.brandId > 0) {
                    for (let item in this.page.item.productAgg.brandAgg) {
                        this.addSelectAttr("品牌", "", item, this.searchVo.brandId, 1)
                    }
                }
                if (this.searchVo.categoryId > 0) {
                    for (let item in this.page.item.productAgg.categoryAgg) {
                        this.addSelectAttr("类别", "", item, this.searchVo.categoryId, 2)
                    }
                }
            })
        },
        //添加购物车
        addCart(item) {
            //获取用户信息
            let token = getToken();
            let userInfo = Cookie.get("userInfo");
            if (token && userInfo) {
                //设置购物信息
                userInfo = JSON.parse(userInfo);
                this.cartReq.skuId = item.skuId
                this.cartReq.spuId = item.spuId
                this.cartReq.defaultImage = item.skuImg
                this.cartReq.userId = userInfo.id
                if (userInfo.id > 0) {
                    let cartReqs = [];
                    cartReqs.push(this.cartReq);
                    addCart(cartReqs).then(response => {
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
                });
            }
        },
        //排序选择
        getSort(sort) {
            this.searchVo.sort = sort
            this.search()
        },
        //往选中的属性中添加值【例：传值：品牌,"","华为",1,1】
        addSelectAttr(attrName, searchName, key, value, flag) {
            let attr = {
                attrName: attrName,
                key: key,
                value: value,
                flag: flag,
            }
            this.selectAttr.push(attr)
        },
        //移除选中属性的方法
        removeSelectAttr(index) {
            if (this.selectAttr[index].flag == 1) {
                this.searchVo.brandId = null
            } else if (this.selectAttr[index].flag == 2) {
                this.searchVo.categoryId = null
            } else if (this.selectAttr[index].flag == 3) {

            }
            //i为删除元素的索引。n为要删除的数量
            this.selectAttr.splice(index, 1)
            this.search()
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getData()
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getData()
        },
        //判断数组中是否包含某个值
        arrayContains(arr, str) {
            let i = arr.length - 1;
            while (i-- && i > 0) {
                if (arr[i] == str) {
                    return true;
                }
            }
            return false;
        },
    },
    mounted() {
        let query = this.$route.query
        for (let key in query) {
            if (query[key] && String(query[key]).length > 0) {
                this.searchVo[key] = query[key]
            }
        }

        //获取数据
        this.getData()
    },
    components: {Bottom, TopNav},
}
</script>

<style lang="scss" scoped>
$hover-color: #e1251b;
/* 顶部检索区域 */
.header {
    height: 90px;
    //background-color: deepskyblue;

    /*logo、检索框、我的购物车按钮、广告区域*/
    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        /*logo*/
        .logo {
            max-width: 90px;
            max-height: 90px;

            img {
                max-width: 90px;
                max-height: 90px;
            }
        }

        /*检索区域*/
        .search {
            position: relative;
            margin-right: 20px;

            /*检索按钮和购物车按钮*/
            .top {
                display: flex;
                justify-content: space-between;
                /*顶部搜索框*/
                .search-input {
                    position: relative;
                    width: 546px;
                    height: 35px;
                    border: 2px solid #e2231a;
                    background: #fff;
                    margin-right: 25px;

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

                        height: 33px;
                        width: 60px;

                        background-color: $hover-color;
                        color: #fff;

                        font-weight: 800;
                        font-size: 14px;

                        &:hover {
                            cursor: pointer;
                            background-color: #c81623;
                        }
                    }
                }

                /*购物车按钮*/
                .cart-btn {
                    $cart-btn-height: 35px;
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
                margin-top: 5px;

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
        }
    }

}

//顶部类别导航
.category-nav {
    border-bottom: 2px solid $hover-color;

    .big-wrapper {
        position: relative;
        display: flex;
    }

    /*商品全部类别样式*/
    .category-btn {
        width: 190px;
        position: relative;
        font-size: 14px;
        bottom: 0;
        color: #fff;
        display: block;
        height: 33px;
        line-height: 33px;
        background: #f30213;
        text-align: center;
        cursor: pointer;

        &:hover {
        }
    }

    /*类别区域*/
    .category {
        $height: 470px;
        left: 0;
        top: 35px;
        position: absolute;
        z-index: 999;
        width: 190px;
        background-color: #fff;

        /*显示的以及类别信息*/
        .category-menu {
            height: $height;
            overflow: hidden;
            box-shadow: -1px 3px 12px -1px rgb(0 0 0 / 30%);

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
            background-color: #f7f7f7;

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

    /*未显示的二级类别信息*/
    .category2and3 {
        $height: 470px;
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

    /*其他类别*/
    .other-category {
        ul {
            display: flex;

            li {
                a {
                    font-weight: 700;
                    height: 33px;
                    padding: 0 22px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 14px;
                    line-height: 33px;
                    color: #333;
                }
            }
        }
    }
}

//聚合查询部分
.mall-search-wrap {
    //选中的结果
    .already-select {
        display: flex;
        align-items: center;
        position: relative;
        margin-top: 15px;
        margin-bottom: 5px;
        height: 30px;
        z-index: 6;
    }

    /*全部结果a标签样式*/
    .all-result {
        margin-right: 10px;

        a {

        }
    }

    /*展示选择属性的导航*/
    .check-nav-item {
        display: flex;
        align-items: center;

        .check-attr {
            display: flex;

            .check-attr-item {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                margin-right: 10px;
                background-color: #f3f3f3;
                padding: 2px 35px 2px 5px;
                border: 1px solid #dddddd;

                em {
                    color: $hover-color;
                }

                i {
                    position: absolute;
                    right: 0;
                    top: -1px;
                    width: 22px;
                    height: 23px;
                    color: $hover-color;
                    line-height: 23px;
                    text-align: center;
                    margin-left: 5px;
                }

                &:hover {
                    background-color: white;
                    border: 1px solid $hover-color;
                }

                &:hover i {
                    color: white;
                    background-color: $hover-color;
                }

            }
        }

        .search-value {
            color: #666;
            font-weight: 700;
            width: 125px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    /*查询为空*/
    .search-empty {
        background-color: #fffdee;
        border: 1px solid #edd28b;
        padding: 15px 10px;
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 700;

        span {
            color: $hover-color;
        }
    }

    /*可选商品属性的列表*/
    .can-select {
        .can-select-item {
            padding-left: 10px;
            min-height: 35px;
            line-height: 35px;
            background-color: #f3f3f3;
            border-bottom: 1px solid #DDD;

            .select-key {
                display: flex;

                > span {
                    width: 100px;
                }

                /*品牌属性选择value*/
                .brand-select-values {

                    .brandImg {
                        flex: 1;

                        li {
                            width: 115px;
                            height: 35px;
                            overflow: hidden;
                            line-height: 35px;
                            border: 1px solid #DDD;
                            text-align: center;
                            cursor: pointer;

                            &:hover {
                                color: $hover-color;
                                border: 1px solid $hover-color;
                            }
                        }
                    }
                }

                /*类别选择value*/
                .category-select-values {

                    li {
                        cursor: pointer;
                        color: #005aa0;

                        &:hover {
                            color: $hover-color;
                        }

                        a {
                            color: #005aa0;

                            &:hover {
                                color: $hover-color;
                            }
                        }
                    }
                }

                /*基本属性值*/
                .base-attr-select-values {
                    .attr-items {
                        ul {
                            height: 35px;
                            overflow: hidden;

                            li {
                                .all-base-attr {
                                    position: absolute;
                                    padding: 10px 5px;
                                    border: 1px solid;
                                    top: 40px;
                                    left: 0;
                                    width: 1390px;
                                    background: #fff;
                                    z-index: 999;

                                    li {
                                        cursor: pointer;
                                        color: #005aa0;

                                        &:hover {
                                            color: $hover-color;
                                        }
                                    }
                                }

                                a {
                                    height: 23px;
                                    line-height: 23px;
                                    padding: 5px 3px 5px 6px;
                                    border: 1px solid #ddd;
                                    background: #fff;
                                    margin-right: 15px;
                                    color: #005aa0;

                                    &:hover {
                                        border: 1px solid #999999;
                                        border-bottom: 1px solid #fff;
                                        z-index: 99999;
                                    }
                                }
                            }
                        }
                    }

                }

                /*通用属性*/
                .common {
                    display: flex;
                    padding: 10px;
                    flex: 1;
                    background-color: #fff;

                    .attr-items {
                        flex: 1;
                    }

                    ul {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;

                        li {
                            margin-right: 10px;
                            cursor: pointer;
                        }

                    }

                    .more {
                        width: 130px;
                        display: flex;
                        justify-content: space-around;

                        a {
                            position: relative;
                            color: #005aa0;
                            height: 23px;
                            line-height: 23px;
                            padding: 0 3px 0 6px;
                            border: 1px solid #ddd;
                            background: #fff;
                            margin-right: 15px;
                        }
                    }
                }
            }
        }

        .can-select-item:first-child {
            border-top: 1px solid #DDD;
        }

        .can-select-item:last-child {
            position: relative;
        }
    }
}

/*综合、销量、评论、新品、价格等检索区域*/
.search-condition {
    margin-top: 10px;

    > .big-wrapper {

        padding: 10px;
        background-color: #f1f1f1;

        .search-status {
            ul {
                display: flex;

                li {
                    cursor: pointer;
                    color: #333;
                    padding: 2px 9px;
                    margin-right: 3px;
                    border: 1px solid #cccccc;
                    background-color: #fff;

                    &:hover {
                        color: $hover-color;
                        border: 1px solid $hover-color;
                    }
                }

                .highlight {
                    background-color: $hover-color;
                    border: 1px solid $hover-color;
                    color: white;

                    &:hover {
                        color: white;
                    }
                }
            }
        }
    }
}

/*商品展示区域*/
.products {
    margin-top: 10px;

    .product-main {
        ul {
            margin: 0 auto;
            width: 1190px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;

            li {
                $font-color: #666;
                color: $font-color;
                width: 225px;
                padding: 12px 9px;
                margin-bottom: 10px;

                .pic {
                    text-align: center;
                    margin-bottom: 5px;
                }

                .price {
                    margin-bottom: 5px;

                    em {
                        font-size: 16px;
                        color: #e4393c;
                    }

                    i {
                        color: #e4393c;
                        font-size: 20px;
                    }
                }

                .sku-title {
                    height: 40px;
                    overflow: hidden;
                    margin-bottom: 5px;

                    &:hover {
                        color: $hover-color;
                    }
                }

                .common {
                    font-size: 12px;
                    margin-bottom: 5px;

                    em {
                        color: #646fb0;
                        font-weight: 700;
                    }

                    i {
                        margin-left: 4px;
                        color: #999999;
                    }
                }

                .brand {
                    margin-bottom: 5px;
                    color: $font-color;
                }

                &:hover {
                    box-shadow: 0 0 2px 2px #f8f8f8;
                }

                a:hover {
                    color: #333;
                }

            }
        }
    }

    /*购物车按钮*/
    .cart-btn {
        $cart-btn-height: 35px;
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
</style>
