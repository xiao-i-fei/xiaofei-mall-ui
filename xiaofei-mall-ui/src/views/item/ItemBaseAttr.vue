<!-- 基本属性 -->
<template>
    <div>
        <!-- 基本属性展示区域 -->
        <div class="base-attr-main">
            <div class="attr-item" v-for="(attrs,index) in spuBaseAttr" :key="index">
                <h3>{{ attrs.groupName }}</h3>
                <dl v-for="(attr,index) in attrs.attrs" :key="index">
                    <dt>{{ attr.attrName }}</dt>
                    <dd>{{ attr.attrValue }}</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    //created只会在页面加载的时候执行一次，mounted会监测，只要数据一发生改变就会执行
    mounted() {
        //发布一个消息，用于接收基本属性
        this.$bus.$on('getSpuBaseAttr', this.getSpuBaseAttr)
    },
    methods: {
        //获取品牌信息和随机商品信息
        getSpuBaseAttr(spuBaseAttr) {
            console.log("基本属性为：", spuBaseAttr)
            this.spuBaseAttr = spuBaseAttr
        }

    },
    data() {
        return {
            spuBaseAttr: [],
        }
    },
    beforeDestroy() {
        //销毁订阅的消息
        this.$bus.$off('getSpuBaseAttr')
    },
}
</script>

<style lang="scss" scoped>
.base-attr-main {
    margin-top: 20px;

    .attr-item {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eeeeee;
        > h3 {
            margin: 0;
            bottom: 0;
            width: 110px;
            line-height: 220%;
            color: #999;
            font-size: 13px;
            font-weight: 400;
            float: left;
            text-align: right;
        }

        > dl {
            margin: 0 0 0 110px;

            dt {
                width: 160px;
                float: left;
                text-align: right;
                padding-right: 5px;
                line-height: 220%;
                color: #999;
                font-size: 13px;

            }

            dd {
                line-height: 220%;
                margin-left: 210px;
                color: #999;
                font-size: 13px;

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
