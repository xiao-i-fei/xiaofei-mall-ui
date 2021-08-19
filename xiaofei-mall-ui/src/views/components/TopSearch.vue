<template>
    <div>
        <!-- 搜索输入框和按钮区域 -->
        <div class="search-main xiaofei-row xiaofei-center">
            <!-- logo区域 -->
            <div class="xiaofei-col-3 logo">
                <a href="/">
                    <img :src="logo" alt="图片加载失败"/>
                </a>
            </div>
            <!-- 搜索区域 -->
            <div class="xiaofei-col-9 search">
                <div class="search-input">
                    <input placeholder="输入搜索条件" type="text" v-model="key" class="xiaofei-clear-input"/>
                    <button class="xiaofei-clear-button" @click="btnSearch">搜 索</button>
                </div>
                <div class="shopping-btn">
                    <router-link style="text-decoration: none;color: rgb(243, 2, 19)"
                                 :to="{path:'/cart'}">
                        <el-badge :value="12" class="item">
                            <i class="el-icon-shopping-cart-2"></i> 我的购物车
                        </el-badge>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
import {getQuery} from "@/utils/mall";

export default {
    props: ["searchValue"],
    created() {
        this.key = this.searchValue
    },
    data() {
        return {
            logo: logo,
            key: "",
        };
    },
    methods: {
        //搜索
        btnSearch() {
            let str = "?";
            let param = getQuery();
            if (param == null || param == undefined) {
                window.location.href = `/search${str}searchValue=${this.key}`;
            } else {
                Object.keys(param).forEach(key => {
                    if (key === "searchValue") {
                        str = `${str}${key}=${this.key}&`
                    } else {
                        str = `${str}${key}=${param[key]}&`
                    }
                })
                if (str.indexOf("searchValue") === -1) {
                    str = str + "searchValue=" + this.key
                }
                str = str.substr(0, str.length - 1).toString()

                window.location.href = "/search?" + str
            }

            //this.$bus.$emit('btnSearch', this.key)
        },
    }
}
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

</style>
