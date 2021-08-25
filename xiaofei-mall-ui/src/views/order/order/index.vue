<template>
    <div>
        <top-nav :home-is-show="true"/>
        <order-top/>
        <div style="background-color:#f5f5f5;">
            <div class="div-row xiaofei-center" style="background-color: #f5f5f5;">
                <div class="div-col-1">
                    <order-left/>
                </div>
                <div class="div-col-11">
                    <div style="padding-left:10px ">
                        <order-main/>
                    </div>
                </div>
            </div>
        </div>
        <mall-footer/>
    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import OrderTop from "@/views/order/order/order-top";
import OrderLeft from "@/views/order/order/order-left";
import OrderMain from "@/views/order/order/order-main";
import MallFooter from "@/views/components/MallFooter";

export default {components: {MallFooter, OrderMain, OrderLeft, OrderTop, TopNav}}
</script>

<style scoped>

</style>
