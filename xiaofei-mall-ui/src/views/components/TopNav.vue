<!-- 顶部导航栏区域 -->
<template>
    <div class="main">
        <div class="top-nav-main xiaofei-row xiaofei-center">
            <div class="left-div xiaofei-col-6">
                <a>
                    <i class="el-icon-location"></i>
                    <span>湖南</span>
                </a>
            </div>
            <div class="right-div xiaofei-col-6">
                <ul class="xiaofei-clear-level-ul">
                    <li><a>你好，请登录</a></li>
                    <li><a>免费注册</a></li>
                    <li><a>我的订单</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$height: 30px;
.main {
    background-color: rgb(227, 228, 229);
}

.top-nav-main {
    height: $height;
    background-color: rgb(227, 228, 229);
}

.left-div {
    height: $height;
    line-height: $height;

    i {
        color: rgb(241, 2, 21);
    }

    span {
        display: inline-block;
        color: rgb(153, 153, 153);
        margin-left: 10px;
        font-size: 14px;
    }

    a {
        &:hover {
            cursor: pointer;

            i, span {
                color: rgb(241, 2, 21);
            }
        }
    }
}

.right-div {
    height: $height;
    line-height: $height;

    ul {
        float: right;
    }

    li {
        padding: 0 10px;


        a {
            color: rgb(153, 153, 153);
            font-size: 13px;

            &:hover {
                color: rgb(241, 2, 21);
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

</style>
