<template>
    <div>
        <div class="start">
            <div style="margin-top: 10px">
                <div class="xiaofei-row xiaofei-center main">
                    <!-- 侧边栏 -->
                    <div class="side">
                        <div class="side-bar">
                            <ul class="show-ul xiaofei-clear-level-ul">
                                <!--
                                    两者具体区别上网查询
                                    mouseover 和 mouseout
                                    mouseenter 和 mouseleave
                                 -->
                                <li
                                    v-for="(category, index) in categorys"
                                    :key="category.catId"
                                    @mouseleave.stop="categoryShow=false"
                                    @mouseenter.stop="getCategoryLevel2(index)"
                                >
                                    <a>{{ category.name }} > </a>
                                </li>
                            </ul>
                        </div>

                        <!-- 鼠标选中类别之后的子类别 -->
                        <div class="no-show-side-bar" v-if="categoryShow" @mouseleave.stop="categoryShow=false"
                             @mouseenter.stop="categoryShow=true">
                            <dl v-for="(categoryLevel2, index) in categoryLevels" :key="categoryLevel2.catId">
                                <dt><a>{{ categoryLevel2.name }}></a></dt>
                                <dd>
                                    <a v-for="(categoryLevel3,categoryLevel3Index) in categoryLevel2.children"
                                       :key="categoryLevel3.catId">
                                        {{ categoryLevel3.name }}</a>
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <!-- 轮播图 -->
                    <div class="carousel">
                        <!-- 大轮播图 -->
                        <div class="big-carousel">
                            <el-carousel trigger="click" height="470px">
                                <el-carousel-item v-for="(carousel,index) in carousels" :key="index">
                                    <img alt="图片加载失败" :src="carousel"/>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                        <!-- 小轮播图 -->
                        <div class="small-carousel">
                            <a href="#"> <img alt="图片加载失败" :src="smallCarousels[0]"/></a>
                            <a href="#"> <img style="margin-top: 5.5px;margin-bottom: 5.5px" alt="图片加载失败"
                                              :src="smallCarousels[1]"/></a>
                            <a href="#"> <img alt="图片加载失败" :src="smallCarousels[2]"/></a>
                        </div>
                    </div>

                    <!-- 登录区域 -->
                    <div class="login">
                        <!-- 登录部分 -->
                        <div class="login-main">
                            <div class="login-logo">
                                <div class="img-div">
                                    <img alt="加载失败"
                                         src="https://img1.baidu.com/it/u=504609824,3604971623&fm=26&fmt=auto&gp=0.jpg"/>
                                </div>

                                <div class="login-div">
                                    <a>Hi~欢迎逛商城</a><br/>
                                    <a>登录</a> | <a>注册</a>
                                </div>

                            </div>
                            <div class="other">
                                <a class="new-people">新人福利</a>
                                <a class="member">商城会员</a>
                            </div>
                        </div>

                        <!-- 热门部分 -->
                        <div class="login-hot">
                            <div class="one">
                                <div class="new-h5">
                                    <h5>商城快报</h5>
                                </div>
                                <div class="new-a">
                                    <a>更多 <i class="el-icon-caret-right"></i></a>
                                </div>
                            </div>
                            <div class="two">
                                <ul class="xiaofei-clear-vertical-ul new-main">
                                    <li><a><span class="high-light">HOT</span>高级显卡遇上高级处理器，这才是电竞游戏本该有的样子</a></li>
                                    <li><a><span class="high-light">热评</span>强劲电竞装备，联想让你成为游戏达人！</a></li>
                                    <li><a><span class="high-light">热门</span>低调的性能先锋！iQOO Z系列新机或将回归骁龙阵营</a></li>
                                    <li><a><span class="high-light">热门</span>无惧挑战，轻松搞定移动办公需求的小新搭配</a></li>
                                </ul>
                            </div>
                        </div>

                        <!-- 小功能部分 -->
                        <div class="applets">
                            <div>
                                <ul class="xiaofei-clear-level-ul app-ul">
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/30057/19/14881/720/5cbf064aE187b8361/eed6f6cbf1de3aaa.png"/><br/>
                                        <span>话费</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/36478/38/5384/2901/5cbf065aEb0c60a12/afb4399323fe3b76.png"/><br/>
                                        <span>机票</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/31069/34/14642/979/5cbf0665Ec7dc8223/5fee386254dd2ebc.png"/><br/>
                                        <span>酒店</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/32403/22/14829/3699/5cbf0674E04723693/caa83ce9b881cd24.png"/><br/>
                                        <span>游戏</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/71890/14/9897/3048/5d7739ddE93eb94f8/f1f6dc5c207329f9.png"/><br/>
                                        <span>加油卡</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/45761/32/10307/1581/5d7739e2Ece4b6671/0004c1b85fbf7bde.png"/><br/>
                                        <span>火车票</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/51584/31/10221/1685/5d7739e7E1adb25cd/1d0957d7f2ae01a2.png"/><br/>
                                        <span>众筹</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/52683/35/10394/3447/5d7739edE270aa7b3/d4d1151b09b5553b.png"/><br/>
                                        <span>理财</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/56296/3/10260/1443/5d7739f3E233abc53/e6976f3cb30c9a8a.png"/><br/>
                                        <span>借条</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/41106/15/4551/3300/5cd4f1c7E507148c7/90a218f053e903d2.png"/><br/>
                                        <span>电影票</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/40738/20/14562/826/5d773a01E09eb8121/d6f3909618c6307a.png"/><br/>
                                        <span>企业购</span></a></li>
                                    <li><a><img alt="加载失败"
                                                src="https://m.360buyimg.com/babel/jfs/t1/57014/6/10297/815/5d773a07Ec7a61fc9/97917a2daa34be0f.png"/><br/>
                                        <span>礼品卡</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {queryAllCategory} from "@/api/product/category.js";
import carousel1 from "@/assets/images/carousel/1.webp"
import carousel2 from "@/assets/images/carousel/2.jpg"
import carousel3 from "@/assets/images/carousel/3.jpg"
import carousel4 from "@/assets/images/carousel/4.jpg"
import carousel5 from "@/assets/images/carousel/5.webp"
import carousel6 from "@/assets/images/carousel/6.jpg"
import carousel7 from "@/assets/images/carousel/7.webp"
import carousel8 from "@/assets/images/carousel/8.webp"
import small1 from "@/assets/images/carousel/3e4e717eeac051b2.jpg.webp"
import small2 from "@/assets/images/carousel/af281d0ccd75bd89.png.webp"
import small3 from "@/assets/images/carousel/c647b3826c472d03.png.webp"

export default {
    created() {
        this.getCategory();
    },
    methods: {
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
            this.categoryShow = true;
            this.categoryLevels = this.categorys[index].children;
            console.log(this.categorys[index].children);
        },
    },
    data() {
        return {
            categoryShow: false, //是否显示类别的子节点，需要选中的时候，计算出数据才显示
            categorys: [], //全部的数据
            categoryLevels: [], //二三级类别的数据，需要根据选中的一级类获取二级类别
            carousels: [carousel1, carousel2, carousel3, carousel4, carousel5, carousel6, carousel7, carousel8],//大的轮播图、
            smallCarousels: [small1, small2, small3]//小轮播图
        };
    },
};
</script>

<style lang="scss" scoped>
$height: 480px;
$width: 1190px;
$side-bar-width: 190px;
$side-bar-height: 470px;
.start {
    height: 480px;

    //侧边栏
    .side {
        float: left;
        position: relative;
        width: $side-bar-width;
        height: 480px;
        //类别部分
        .side-bar {
            position: absolute;
            z-index: 10;
            margin-top: 10px;
            //margin-right: 10px;
            width: $side-bar-width;
            height: $side-bar-height;
            background-color: #fefefe;
            float: left;
            overflow: hidden; //如果类别过多的话，超过的部分隐藏

            .show-ul {
                li {
                    width: $side-bar-width * 1-20px;
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

                //解决边框塌陷
                &:after {
                    content: ".";
                    display: BLOCK;
                    height: 0;
                    clear: BOTH;
                    visibility: HIDDEN;
                }
            }

            //解决边框塌陷
            &:after {
                content: ".";
                display: BLOCK;
                height: 0;
                clear: BOTH;
                visibility: HIDDEN;
            }
        }

        //选中指定商品类别之后出现的数据
        .no-show-side-bar {
            position: absolute;
            left: 185px;
            border: 1px solid #eaeaea;
            z-index: 5;
            width: ($width * 1 - $side-bar-width)+3;
            height: $side-bar-height*1-2;
            margin-top: 10px;
            background-color: white;
            float: right;
            //position: relative;
            //解决边框塌陷
            &:after {
                margin-top: 10px;
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
                    width: ($width * 1 - $side-bar-width)*0.1;
                    text-align: right;

                    > a {
                        font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                        font-weight: 900;

                        &:hover {
                            cursor: pointer;
                        }
                    }
                }

                dd {
                    width: ($width * 1 - $side-bar-width)*0.8;
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
    }


    //轮播图区域
    .carousel {
        float: left;
        width: 800px;
        height: $height;
        margin-right: 10px;

        //大轮播图
        .big-carousel {
            margin: 10px 10px 0 10px;
            width: 590px;
            height: $side-bar-height;
            float: left;

            img {
                width: 590px;
                height: 470px;
            }
        }

        //小的轮播图
        .small-carousel {
            margin-top: 10px;
            width: 190px;
            height: $side-bar-height;
            float: right;

            img {
                width: 190px;
                height: 150px;
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

    //登录热点区域
    .login {
        height: $side-bar-height;
        margin-top: 10px;
        width: 190px;
        background-color: white;
        float: left;

        //登录部分
        .login-main {
            width: 190px;
            height: 102px;
            border-bottom: 1px solid #eeeeee;

            .login-logo {
                height: 67px;
                text-align: center;
                color: #666666;

                .img-div {
                    float: left;
                    width: 65px;
                    text-align: right;

                    img {
                        margin-top: 10px;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                    }
                }

                .login-div {
                    width: 95px;
                    text-align: left;
                    float: left;
                    margin-top: 6px;
                    margin-left: 8px;

                    a {
                        font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
                        color: #666666;

                        &:hover {
                            cursor: pointer;
                            color: #e1251b;
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

            .other {
                text-align: center;

                a {
                    &:hover {
                        cursor: pointer;
                        background-color: #c81623;
                        color: white;
                    }
                }

                .new-people {
                    display: inline-block;
                    margin: 0 5px;
                    width: 70px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 12px;
                    text-align: center;
                    color: #fff;
                    border-radius: 13px;
                    background: #e1251b;
                    transition: background .3s ease, color .3s ease;
                }

                .member {
                    display: inline-block;
                    margin: 0 5px;
                    width: 70px;
                    height: 25px;
                    line-height: 25px;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 13px;
                    -webkit-transition: background .3s ease, color .3s ease;
                    transition: background .3s ease, color .3s ease;
                    background: #363634;
                    color: #e5d790;
                }
            }
        }

        //热点部分
        .login-hot {
            width: 190px;
            height: 130px;
            border-bottom: 1px solid #eeeeee;

            .one {
                display: inline-block;
                height: 20px;
                margin-top: 8px;
                line-height: 20px;

                .new-h5 {
                    text-align: left;
                    float: left;
                    width: 95px;

                    h5 {
                        display: inline-block;
                        font-size: 14px;
                        margin: 0 0 0 15px;
                        color: #333;
                    }
                }

                .new-a {
                    float: left;
                    text-align: right;
                    width: 95px;

                    a {
                        font-size: 12px;
                        color: #999;
                        margin-right: 10px;

                        &:hover {
                            cursor: pointer;
                            color: #c81623;
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

            .two {
                margin-top: -10px;
                margin-left: 10px;
                text-align: center;

                .new-main {
                    .high-light {
                        display: inline-block;
                        position: relative;
                        font-size: 12px;
                        height: 16px;
                        width: 35px;
                        line-height: 16px;
                        text-align: center;
                        vertical-align: 0;
                        color: #e1251b;
                        background-color: rgba(225, 37, 27, .08);
                        margin-right: 6px;
                    }

                    li {
                        max-width: 160px;
                        width: 160px;
                        height: 16px;
                        line-height: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #999;
                        margin-bottom: 6px;
                    }

                    a {
                        font-size: 14px;
                        max-width: 160px;
                        height: 16px;
                        line-height: 16px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        color: #999;
                        margin-bottom: 6px;

                        &:hover {
                            cursor: pointer;
                            color: #e1251b;
                        }
                    }
                }
            }
        }

        //小程序部分
        .applets {
            width: 190px;
            height: 238px;


            .app-ul {
                margin: 5px 10px 0 10px;

                li {
                    width: 50px;
                    margin: 2px;
                    text-align: center;

                    a {
                        span {
                            color: #333333;
                            font-size: 12px;
                        }

                        &:hover {
                            cursor: pointer;
                            color: #e1251b;
                        }
                    }

                    img {
                        width: 28px;
                        height: 28px;
                    }
                }
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
</style>
