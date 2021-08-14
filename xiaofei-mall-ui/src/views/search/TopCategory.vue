<template>
    <div>
        <!-- 商品分类区域 -->
        <div class="category-region">
            <div class="xiaofei-row xiaofei-center">
                <div class="search-category-one">
                    <!-- 全部分类标题 -->
                    <div class="xiaofei-col-2 category-title" @mouseleave.stop="categoryShow1 = true"
                         @mouseenter.stop="categoryShow1=true">
                        <a>全部商品分类</a>
                    </div>
                    <!-- 商品类别 -->
                    <div class="xiaofei-col-10 category-other">
                        <ul class="xiaofei-clear-level-ul">
                            <li><a>时尚</a></li>
                            <li><a>美妆馆</a></li>
                            <li><a>超市</a></li>
                            <li><a>生鲜</a></li>
                            <li><a>商城国际</a></li>
                            <li><a>闪购</a></li>
                            <li><a>拍卖</a></li>
                            <li><a>金融</a></li>
                        </ul>
                    </div>

                    <!-- 商品类别区域 -->
                    <div class="category-check xiaofei-row xiaofei-center" v-show="categoryShow1">
                        <div class="category-one">
                            <ul class="show-ul xiaofei-clear-vertical-ul">
                                <!--
                                    两者具体区别上网查询
                                    mouseover 和 mouseout
                                    mouseenter 和 mouseleave
                                 -->
                                <li v-for="(category, index) in categorys" :key="category.catId"
                                    @mouseleave.stop="categoryShow1 = false"
                                    @mouseenter.stop="getCategoryLevel2(index)">
                                    <a>{{ category.name }} > </a>
                                </li>
                            </ul>
                        </div>
                        <div class="category-two" v-show="categoryShow2"
                             @mouseleave.stop="categoryShow2 = false;categoryShow1 = false"
                             @mouseenter.stop="categoryShow2 = true;categoryShow1 = true">
                            <dl v-for="(categoryLevel2, index) in categoryLevels" :key="categoryLevel2.catId">
                                <dt>
                                    <a>{{ categoryLevel2.name }}></a>
                                </dt>
                                <dd>
                                    <a style="text-decoration: none;"
                                       v-for="(categoryLevel3, categoryLevel3Index) in categoryLevel2.children"
                                       :key="categoryLevel3.catId"
                                       @click="categoryLocation(categoryLevel3.catId)">
                                        {{ categoryLevel3.name }}
                                    </a>
                                </dd>
                            </dl>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TopSearch from "@/views/components/TopSearch";
import logo from "@/assets/images/logo.png";
import {queryAllCategory} from "@/api/product/category";

export default {
    props: ["searchValue"],
    components:{
      TopSearch
    },
    created() {
        this.getCategory()
        this.key = this.searchValue
        //TODO JSON.stringify(this.$route.query) === "{}" 用于判断是否携带有参数，如果没有携带参数，则跳转到需要搜索框的页面，必须要有搜索条件才能进行搜索
    },
    methods: {
        //点击类别重新加载
        categoryLocation(categoryId) {
            window.location.href = `/search?categoryId=${categoryId}`
        },
        //获取所有类别
        getCategory() {
            queryAllCategory().then((response) => {
                if (response.data && response.code === 200) {
                    this.categorys = response.data;
                }
            });
        },
        //获取所有二级类别的数据
        getCategoryLevel2(index) {
            this.categoryShow1 = true
            this.categoryShow2 = true
            this.categoryLevels = this.categorys[index].children;
        },
    },
    data() {
        return {
            categoryShow1: false,
            categoryShow2: false,
            categorys: [], //全部的数据
            categoryLevels: [], //二三级类别的数据，需要根据选中的一级类获取二级类别
            logo: logo,
            key: this.searchValue
        };
    },
};
</script>

<style lang="scss" scoped>

$color: rgb(243, 2, 19);

//搜索区域
.search-main {
    $height: 90px;

    div {
        height: $height;
    }

    // 左边logo区域
    .logo {
        img {
            width: 200px;
            height: auto;
            margin-top: 20px;
        }

        a {
            &:hover {
                cursor: pointer;
            }
        }
    }

    // 右边搜索区域
    .search {
        margin-top: 26px;
        //搜索框
        .search-input {
            $height: 32px;
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
            border: 1px solid rgb(223, 223, 223);
            color: $color;
            margin-left: 40px;
            background-color: rgb(249, 249, 249);

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
}

//商品类别区域
.category-region {
    $color: #f30213;
    $height: 33px;
    height: $height;

    .search-category-one {
        position: relative;
        //共同特点

        //左边全部商品分类区域
        .category-title {
            height: $height * 1-1;
            line-height: $height * 1-1;
            border-bottom: 2px solid $color;
            text-align: center;
            color: white;
            font-size: 16px;
            //font-weight: 700;
            background-color: $color;

            &:hover {
                cursor: pointer;
            }
        }

        //右边分类区域
        .category-other {
            height: $height * 1-1;
            line-height: $height * 1-1;
            border-bottom: 2px solid $color;

            ul {
                padding-left: 20px;
            }

            li {
                padding-right: 50px;
                font-size: 17px;
                font-weight: 700;

                a {
                    &:hover {
                        color: $color;
                        cursor: pointer;
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
}

//隐藏的侧边栏区域
.category-check {
    $width1: 200px;
    $font-color: #626262;
    $color: #f30213;
    $height: 475px;
    $width: 1200px;
    $side-bar-width: 190px;
    $side-bar-height: 470px;

    overflow: hidden;

    position: absolute;
    top: 34px;
    z-index: 99;

    .category-one {
        float: left;
        text-align: left;
        color: $font-color;
        width: $width1;
        height: $height;
        background-color: white;

        ul {
            width: $width1;
        }

        li {
            width: $width1*1-20px;
            height: 25px;
            line-height: 25px;
            padding: 0 10px;

            &:hover {
                background-color: #d9d9d9;
            }

            a {
                font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial,
                Hiragino Sans GB, "\5B8B\4F53", sans-serif;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .category-two {

        height: $height;
        position: absolute;
        left: 200px;
        border: 1px solid #eaeaea;
        z-index: 5;
        width: $width*1-$width1*1;
        background-color: #f7f7f7;
        float: right;

        &:after {
            content: ".";
            display: BLOCK;
            height: 0;
            clear: BOTH;
            visibility: HIDDEN;
        }

        > dl {
            dt {
                float: left;
                //background-color: #707070;
                width: ($width * 1 - $side-bar-width) * 0.1;
                text-align: right;

                > a {
                    font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial,
                    Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                    font-weight: 900;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            dd {
                width: ($width * 1 - $side-bar-width) * 0.8;
                float: left;

                > a {
                    font: 12px Microsoft YaHei, Heiti SC, tahoma, arial,
                    Hiragino Sans GB, "宋体", sans-serif;
                    color: #666666;
                    padding-right: 6px;

                    &:hover {
                        color: red;
                        cursor: pointer;
                    }
                }
            }

            //解决边框塌陷
            &:after {
                margin-top: 10px;
                content: ".";
                display: BLOCK;
                height: 0;
                clear: BOTH;
                visibility: HIDDEN;
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
