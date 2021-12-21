<template>
    <div>
        <div class="xiaofei-center xiaofei-row">
            <div class="top">
                <div class="left">
                    <a href="/">
                        <img :src="logo" alt="图片加载失败"/>
                    </a>
                </div>
                <div class="right">
                    <div class="search">
                        <input placeholder="输入搜索条件" @keyup.enter="btnSearch" type="text" v-model="key" class="xiaofei-clear-input"/>
                        <button class="xiaofei-clear-button" @click="btnSearch">搜 索</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logo from "@/assets/images/logo.png";
import {getQuery} from "@/utils/mall";

export default {
    data() {
        return {
            logo: logo,
            key: "",
        }
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
        },
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width: 1190px;
$height: 90px;
$color: rgb(201, 22, 35);
.top {
    margin-top: 10px;
    height: $height;
    line-height: $height;

    .left {
        width: $width/2;
        height: $height;
        float: left;

        img {
            width: 150px;
            height: auto;
            margin-top: 20px;
            object-fit: contain;
        }

        a {
            &:hover {
                cursor: pointer;
            }
        }
    }

    .right {
        width: $width/2;
        height: $height;
        line-height: $height;
        float: right;

        .search {
            margin-top: ($height*1-25)/2;
            position: relative;
            width: 400px;
            height: 25px;
            border: 2px solid $color;
            float: right;

            > input {
                position: absolute;
                left: 5px;
                height: 25px;
                width: 385px;
                border: 0;
                padding: 0;
                color: #000000;
                font-weight: bolder;
                font-size: 12px;
            }

            .xiaofei-clear-button {
                position: absolute;
                width: 80px;
                height: 29px;
                top: -2px;
                right: -2px;
                background-color: $color;
                border: 2px solid $color;
                color: white;
                font-weight: 700;

                &:hover {
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
