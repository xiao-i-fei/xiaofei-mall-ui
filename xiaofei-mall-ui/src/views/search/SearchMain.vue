<template>
    <div>
        <div class="aaa">
            <!-- 搜索条件区域 -->
            <div class="search-condition xiaofei-row xiaofei-center">
                <div class="xiaofei-col-6 condition-left">
                    <div>
                        <a @click="getSort(0)" :class="{highlight:searchVo.sort===0,
                        searchTit:searchVo.sort!==0}">综合</a>
                        <a @click="getSort(searchVo.sort===2?-2:2)"
                           :class="{highlight:searchVo.sort===2||searchVo.sort===-2,
                           searchTit:searchVo.sort!==2&&searchVo.sort!==-2}">销量
                        </a>
                        <a @click="getSort(searchVo.sort===3?-3:3)"
                           :class="{highlight:searchVo.sort===3||searchVo.sort===-3,
                           searchTit:searchVo.sort!==3&&searchVo.sort!==-3}">评论数
                        </a>
                        <a @click="getSort(searchVo.sort===4?-4:4)"
                           :class="{highlight:searchVo.sort===4||searchVo.sort===-4,
                           searchTit:searchVo.sort!==4&&searchVo.sort!==-4}">新品
                        </a>
                        <a @click="getSort(searchVo.sort===1?-1:1)"
                           :class="{highlight:searchVo.sort===1||searchVo.sort===-1,
                           searchTit:searchVo.sort!==1&&searchVo.sort!==-1}">价格
                        </a>
                    </div>
                    <div>
                        <input type="number" v-model.number="searchVo.minPrice" class="xiaofei-clear-input"/> -
                        <input type="number" v-model.number="searchVo.maxPrice" class="xiaofei-clear-input"/>
                        <el-button @click="getPrice" icon="el-icon-search" class="price-search-btn"
                                   circle></el-button>
                    </div>
                    <!--                    <ul class="xiaofei-clear-level-ul">
                                            <li @click="getSort(0)" :class="{highlight:searchVo.sort===0}">综合</li>
                                            <li @click="getSort(searchVo.sort===2?-2:2)"
                                                :class="{highlight:searchVo.sort===2||searchVo.sort===-2}">销量
                                            </li>
                                            <li @click="getSort(searchVo.sort===3?-3:3)"
                                                :class="{highlight:searchVo.sort===3||searchVo.sort===-3}">评论数
                                            </li>
                                            <li @click="getSort(searchVo.sort===4?-4:4)"
                                                :class="{highlight:searchVo.sort===4||searchVo.sort===-4}">新品
                                            </li>
                                            <li @click="getSort(searchVo.sort===1?-1:1)"
                                                :class="{highlight:searchVo.sort===1||searchVo.sort===-1}">价格
                                            </li>
                                            <li>
                                                <input v-model.number="searchVo.minPrice" class="xiaofei-clear-input">
                                            </li>
                                            <li>
                                                <input v-model.number="searchVo.maxPrice" class="xiaofei-clear-input">
                                            </li>
                                        </ul>-->
                </div>
                <!-- 一个小的分页区域 -->
                <div class="xiaofei-col-6 condition-right"></div>
            </div>

            <!-- 数据的主要区域 -->
            <div class="search-items-main xiaofei-center">
                <ul class="xiaofei-clear-level-ul">
                    <li v-for="item in page.items" :key="item.skuId">
                        <div class="item-img">
                            <el-image lazy :src="item.skuImg"></el-image>
                        </div>
                        <div class="item-price">￥ {{ item.skuPrice }}</div>
                        <div class="item-title" v-show="item.highlightFields!==''" v-html="item.highlightFields">
                            {{ item.highlightFields }}
                        </div>
                        <div class="item-title" v-show="item.highlightFields===''" v-text="item.skuTitle"></div>
                        <div class="item-common"><a>{{ item.commentNum }}</a> 条评论</div>
                        <div class="item-brand">{{ item.brandName }}</div>
                        <div class="item-add-shop-cart">
                            <button class="xiaofei-clear-button add-btn"><i class="el-icon-shopping-cart-full"></i>加入购物车
                            </button>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- 分页区域 -->
            <div class="xiaofei-row xiaofei-center search-page">
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
import {getProductBySearch} from "@/api/search/product";
import {getQuery} from "@/utils/mall";

export default {
    props: {
        searchCondition: {
            type: Object
        }
    },
    created() {
        console.log(this.searchCondition)
        //发布消息
        this.$bus.$on('btnSearch', this.btnSearch)

        this.searchVo = this.searchCondition
        //初始化数据
        this.getData()
    },
    data() {
        return {
            searchVo: {
                searchValue: "",//搜索条件
                categoryId: 0,//三级分类id
                sort: 0,//排序条件
                minPrice: "",//最低价格
                maxPrice: "",//最高价格
            },
            page: {
                pageNo: 1,
                pageSize: 40,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
        }
    },
    methods: {
        //按钮搜索
        btnSearch(searchValue) {
            this.searchVo.searchValue = searchValue
            this.getData()
        },
        //排序选择
        getSort(sort) {
            this.$message.info(sort)
            this.searchVo.sort = sort
            let str = "?";
            let param = getQuery();
            Object.keys(param).forEach(key => {
                if (key !== "sort") {
                    str = `${str}${key}=${param[key]}&`
                }
            })
            str = str + "sort=" + this.searchVo.sort

            window.location.href = "/search?" + str
            /*this.searchVo.sort = sort
            //查询数据
            this.getData()*/
        },
        getPrice() {
            if (this.searchVo.minPrice !== undefined && this.searchVo.maxPrice !== undefined) {
                let str = "?";
                let param = getQuery();
                Object.keys(param).forEach(key => {
                    if (key !== "minPrice" && key !== "maxPrice") {
                        str = `${str}${key}=${param[key]}&`
                    }
                })
                str = str + "minPrice=" + this.searchVo.minPrice + "&" + "maxPrice=" + this.searchVo.maxPrice

                window.location.href = "/search?" + str
            }
        },
        //获取数据
        getData() {
            getProductBySearch(this.searchVo, this.page.pageNo, this.page.pageSize).then(response => {
                this.page = response.data
            })
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
    },
    beforeDestroy() {
        //销毁消息队列
        this.$bus.$off('btnSearch')
    },
}
</script>

<style scoped lang="scss">
$color: #e4393c;
$width: 1200px;

//高亮设置
.highlight {
    color: white;
    background-color: $color;
}

.aaa {
    background-color: white;
    margin-top: 10px;
    margin-bottom: 20px;
}

//搜索条件选择区域
.search-condition {
    $height: 38px;
    height: $height;
    background-color: #f1f1f1;

    //搜索区域左边
    .condition-left {
        $height: 25px;
        padding: 6px 8px;

        div:nth-child(1) {
            $height: 23px;
            float: left;

            a {
                border: 1px solid #CCC;
                line-height: 23px;
                height: $height;
                font-size: 12px;
                text-align: center;
                display: inline-block;
                padding: 0 10px;

                &:hover {
                    cursor: pointer;
                }
            }

            .searchTit {
                background-color: #ffffff;
                color: #333333;

                &:hover {
                    border: 1px solid $color;
                    cursor: pointer;
                    color: $color;
                }
            }
        }

        div:nth-child(2) {
            float: left;
            margin-left: 20px;
            position: relative;

            color: black;

            .price-search-btn {
                width: 25px;
                height: 25px;
                line-height: 25px;
                padding: 0;
                margin: 0 0 0 10px;
                border: 0;
                background-color: white;

                &:hover, &:focus {
                    color: #606266;
                    cursor: pointer;
                }
            }

            input {
                line-height: 23px;
                height: $height;
                background-color: white;
                width: 50px;

                &:focus {
                    border: 1px solid white;
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
}

//商品的主要区域
.search-items-main {
    width: $width;

    ul {
        margin-top: 20px;
        width: $width;

        li {
            //  background-color: red;
            $width: 238px;
            $height: 385px;
            height: $height;
            border: 1px solid white;
            width: $width;
            overflow: hidden;
            //图片设置
            .item-img {
                text-align: center;
                width: 220px;
                height: 220px;
                padding: 30px 10px 0 10px;
            }

            .item-price {
                margin: 5px 0;
                color: #e4393c;
                font-size: 17px;
                font-weight: 800;
                padding-left: 10px;
            }

            .item-title {
                margin: 5px 0;
                color: #666666;
                font-size: 12px;
                padding: 0 5px;

                &:hover {
                    cursor: pointer;
                    color: #e4393c;
                }
            }

            .item-common {
                margin: 5px 0;
                padding: 0 5px;
                font-size: 12px;
                color: #a7a7a7;

                a {
                    color: #646fb0;
                    font-weight: 800;
                    font-size: 12px;
                }

            }

            .item-brand {
                padding: 0 5px;
                margin: 0 5px;
                color: #999999;
                font-size: 12px;
            }

            .item-add-shop-cart {
                padding: 0 5px;
                margin: 0 5px;
                text-align: right;

                .add-btn {
                    color: #e4393c;
                    height: 35px;
                    width: 100px;
                    border-radius: 10px;
                    border: 1px solid #dddddd;
                    background-color: white;

                    &:hover {
                        cursor: pointer;
                        border: 1px solid #e4393c;
                    }
                }
            }

            &:hover {
                border: 1px solid #e9e9e9;
                cursor: pointer;
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

//分页区域
.search-page {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: right;
}

</style>
