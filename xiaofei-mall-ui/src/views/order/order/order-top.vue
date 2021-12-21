<template>
    <div>

        <div class="div-row xiaofei-center">
            <div class="div-col-6 left">
                <div class="logo">
                    <a href="/">
                        <img src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-08-15/logo.png" alt="图片加载失败">
                    </a>
                </div>
            </div>
            <div class="div-col-6 right">
                <div class="two">
                    <router-link style="text-decoration: none;color: rgb(243, 2, 19)"
                                     :to="{path:'/cart'}">
                    <i class="el-icon-shopping-cart-2"></i>
                    我的购物车
                </router-link>
                </div>

                <div class="one">
                    <input type="text" class="xiaofei-clear-input" @keyup.enter="btnSearch" v-model="key"/>
                    <button class="xiaofei-clear-button" @click="btnSearch">搜索</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getQuery} from "@/utils/mall";
export default {
    data(){
        return {
            key:""
        }
    },
    methods:{
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
        },
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width:1200px;
$height:80px;
$color: #df3028;

div{
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

.left{
    >div{
        float: left;
    }
    .logo{
        img{
            object-fit: contain;
            height: $height*1-10;
            margin-top: 5px;

        }
    }
}
.right{
    $inner-height: 34px;
    text-align: right;
    height: $height;
    line-height: $height;

    .one, .two {
        padding: 0 20px;
        float: right;
    }

    .one {
        position: relative;
        margin-right: 30px;
        margin-top: ($height*1-$inner-height)/2;
        height: $inner-height;
        line-height: $inner-height;
        border: 1px solid $color;
        width: 210px;

        > input {
            height: $inner-height*1-2;
            position: absolute;
            left: 5px;
            color: #666666;
            border: 0;
        }

        > button {
            position: absolute;
            height: $inner-height+1;
            right: 0;
            padding: 0 20px;
            color: white;
            font-weight: 700;
            background-color: $color;
            border: 1px solid $color;
        }
    }

    .two {
        margin-top: ($height*1-$inner-height)/2;
        height: $inner-height;
        line-height: $inner-height;
        background-color: #f9f9f9;
        color: #333333;
        font-size: 13px;
        border: 1px solid #dfdfdf;

        &:hover {
            cursor: pointer;
            color: $color;
        }

        i {
            color: $color
        }
    }
}
</style>
