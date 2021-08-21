<template>
    <div>
        <div>
            <div class="xiaofei-row xiaofei-center aaa">
                <div class="left xiaofei-col-6">
                    <a href="/">
                        <el-image src="https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-08-15/logo.png"
                                  lazy fit="contain" style="width: 181px;height: 100%;margin-top: 9px"/>
                    </a>
                </div>
                <div class="right xiaofei-col-6">

                    <div class="two">
                        <i class="el-icon-shopping-cart-2"></i>
                        我的购物车
                    </div>

                    <div class="one">
                        <input type="text" class="xiaofei-clear-input">
                        <button class="xiaofei-clear-button">搜索</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$height: 82px;
$color: #df3028;

.aaa {
    height: $height;
}

.right {
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
