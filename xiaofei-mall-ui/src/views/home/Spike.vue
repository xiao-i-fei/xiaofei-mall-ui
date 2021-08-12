<!-- 秒杀区域 -->
<template>
    <div class="spike">
        <div class="spike-main">
            <div class="spike-time">
                <div class="one">
                    <div class="spike-title">商城秒杀</div>
                    <div class="spike-end">
                        <strong>14:00</strong>点场 距结束
                    </div>
                    <div class="spike-start">
                        <span class="show-colon">{{ endHour }}</span>
                        <span class="show-colon">{{ endMinute }}</span>
                        <span>{{ endSecond }}</span>
                    </div>
                </div>
                <div class="two">
                    <a v-for="(spike,index) in spikes" :key="index">
                        <div>
                            <img alt="加载失败" :src="spike">
                            <h6>商品标题</h6>
                        </div>
                        <div class="mall-price">
                            <span class="price-miaosha">￥98.00</span>
                            <span class="price-origin">￥145.00</span>
                        </div>
                    </a>
                </div>
                <div class="three">
                    <div class="item-image">
                        <img :src="spikeRight" alt="加载失败">
                    </div>
                    <div class="item-info">
                        <span>医疗器械专场</span><br/>
                        <strong style="font-size: 14px">低至9.9元</strong><br/>
                        <div class="mast-to">品牌秒杀</div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import spike1 from '@/views/home/img/spike/4a15d8883775742e3efbb850ae14def7.png'
import spike2 from '@/views/home/img/spike/18fa914620bdda38.jpg.webp'
import spike3 from '@/views/home/img/spike/56c28054a8f82554.jpg.webp'
import spike4 from '@/views/home/img/spike/99dff873b1fb5dd3.png.webp'
import spike5 from '@/views/home/img/spike/b88c0485ca234e0d.jpg.webp'
import spike6 from '@/views/home/img/spike/32abd87bf43ea14e.jpg.webp'

export default {
    data() {
        return {
            endHour: 0,
            endMinute: 0,
            endSecond: 60,
            spikeRight: spike6,
            spikes: [spike2, spike3, spike4, spike5]
        }
    },
    created() {
        this.timing();
    },
    methods: {
        //定时功能
        timing() {

            setTimeout(() => {
                this.endSecond = this.endSecond - 1
            }, 100)
            //设置初始时间
            /*this.endHour = 0;
            this.endMinute = 0;
            this.endSecond = 60;
            setTimeout(() => {
                this.endTime()
            }, 1000)*/
        },

        //计算定时时间
        endTime() {
            this.endSecond--;
            /*if (this.endSecond === 0 && this.endMinute === 0 && this.endSecond === 0) {
                clearTimeout(this.timing)
            } else {
                if (this.endSecond === 0 && this.endMinute === 0 && this.endSecond > 0 && this.endSecond <= 60) {
                    this.endSecond--;
                }
            }*/
        }
    },
    beforeDestroy() {
        //销毁定时器
        //clearTimeout(this.timing)
    }
};
</script>

<style lang="scss" scoped>

$width: 1190px;
.spike {
    margin: 20px 0 20px 0;
}

.spike-main {
    width: $width;
    height: 260px;
    margin: 0 auto;
    background-color: white;
}

//秒杀时间区域
.spike-time {
    //左边定时区域
    .one {
        width: 190px;
        height: 260px;
        display: block;
        background-image: url(./img/spike/4a15d8883775742e3efbb850ae14def7.png);
        float: left;

        .spike-title {
            width: 190px;
            height: 45px;
            line-height: 45px;
            color: white;
            font-size: 30px;
            font-weight: 800;
            text-align: center;
            margin-top: 30px;
        }

        .spike-end {
            color: white;
            font-size: 17px;
            margin-top: 90px;
            text-align: center;
        }

        .spike-start {
            text-align: center;

            span {
                position: relative;
                margin: 15px 10px 10px 10px;
                padding: 2px;
                background-color: #2f3430;
                display: inline-block;
                width: 30px;
                height: 30px;
                line-height: 30px;
                color: white;
                font-weight: 800;
            }

            .show-colon {
                &:after {
                    content: ":";
                    display: block;
                    position: absolute;
                    right: -20px;
                    font-weight: bolder;
                    font-size: 18px;
                    width: 20px;
                    height: 100%;
                    top: 0;
                }
            }
        }
    }

    //中间轮播区域
    .two {
        float: left;
        width: 800px;

        a {
            width: 196px;
            height: 260px;
            text-align: center;
            display: inline-block;
            color: #333333;
            border-right: 1px solid #efefef;
            //秒杀图片区域
            div {
                margin: 30px 30px 0 30px;

                img {
                    width: 140px;
                    height: 140px;
                    margin-bottom: 10px;
                }

                h6 {
                    margin: 10px 0 0 0;
                }
            }


            //秒杀价格区域
            .mall-price {
                margin: 0 auto;
                padding: 0;
                width: 160px;
                border: 1px solid #e1251b;
                position: relative;
                box-sizing: border-box;
                line-height: 24px;
                overflow: hidden;
                background-color: #e1251b;

                .price-miaosha {
                    width: 90px;
                    height: 100%;
                    text-align: center;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 22px;
                    float: left;
                }

                .price-origin {
                    height: 100%;
                    width: 66px;
                    float: right;
                    background: #fff;
                    text-align: center;
                    color: #999;
                    font-size: 12px;
                    line-height: 21px;
                    text-decoration: line-through;
                    border: 1px solid #e1251b;
                    position: relative;
                    overflow: hidden;
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

            &:hover {
                color: #e1251b;
                cursor: pointer;
            }
        }
    }

    //最右边秒杀区域
    .three {
        padding: 10px;
        width: 180px;
        height: 240px;
        float: left;
        background-color: #ffffff;
        background-image: linear-gradient(180deg, #ffffff 65%, #dddddd 99%);

        .item-image {
            width: 120px;
            height: 120px;
            margin: 20px 30px 0 30px;

            img {
                width: 120px;
                height: 120px;
            }

        }

        //秒杀商品信息
        .item-info {
            text-align: center;
            color: #666;

            span {
                margin-top: 10px;
                display: inline-block;
                font-size: 14px;
            }

            .mast-to {
                width: 80px;
                height: 24px;
                font-size: 13px;
                line-height: 24px;
                color: #e1251b;
                margin: 5px auto 0 auto;
                border-radius: 10px;
                border: 1px solid #e1251b;

                &:hover {
                    background-color: #c81623;
                    color: white;
                    cursor: pointer;
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
