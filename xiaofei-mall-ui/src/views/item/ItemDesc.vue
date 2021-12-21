<template>
    <div>
        <div class="desc-main">
            <!-- TODO 快速显示参数，等把数据库中的数据修改之后再来完善 -->
            <!-- <div class="quick-show-attr">
            <ul class="xiaofei-clear-level-ul">
                <li>商品名称：荣耀X20 SE 5G</li>
                <li>CPU型号：天玑700</li>
                <li>摄像头数量：后置三摄</li>
                <li>屏幕比例：19.6~20:9</li>
                <li>支持IPv6：支持IPv6</li>
                <li>商品编号：100012142839</li>
                <li>运行内存：6GB</li>
                <li>后摄主摄像素：6400万像素</li>
            </ul>
            <p style="text-align: right">
                <router-link style="text-decoration: none;color: #005aa0;font-size: 13px"
                             :to="{path:`/`}">更多参数 >>
                </router-link>
            </p>
        </div>-->

            <!-- 商品介绍图片展示部分 -->
            <div class="spu-desc-img">
                <div v-for="(item,index) in skuDescImg.descImg" :key="index">
                    <el-image style="width: 750px;" lazy :src="item" fit="contain"></el-image>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    //created只会在页面加载的时候执行一次，mounted会监测，只要数据一发生改变就会执行
    mounted() {
        //发布一个消息，用于接收商品介绍图片集合
        this.$bus.$on('getSkuDescImg', this.getSkuDescImg)
    },
    methods: {
        //获取品牌信息和随机商品信息
        getSkuDescImg(skuDescImg) {
            this.skuDescImg.spuId = skuDescImg.spuId
            this.skuDescImg.descImg = skuDescImg.decript.toString().split(",")
        }

    },
    data() {
        return {
            skuDescImg: {spuId: "", descImg: []},//介绍信息的图片合集
        }
    },
    beforeDestroy() {
        //销毁订阅的消息
        this.$bus.$off('getSkuDescImg')
    },
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
.desc-main {
    //解决边框塌陷
    &:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    border-bottom: 1px solid #eeeeee;
}

//快速展示
.quick-show-attr {
    width: 900px;
    margin: 30px auto 0;

    ul {
        margin: 20px 0 15px 0;

        li {
            width: 225px;
            margin-bottom: 5px;
            color: #666666;
            font-size: 13px;
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

//spu商品介绍图片展示部分
.spu-desc-img {
    margin-top: 50px;

    > div {
        width: 750px;
        margin: 0 auto;
    }
}
</style>
