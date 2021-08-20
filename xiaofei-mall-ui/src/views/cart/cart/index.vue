<template>
    <div>
        <top-nav :home-is-show="true"/>
        <cart-top/>
        <cart-item-main/>
        <mall-footer/>
    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import CartTop from "@/views/cart/cart/cart-top/";
import CartItemMain from "@/views/cart/cart/cart-item-main";
import MallFooter from "@/views/components/MallFooter";

export default {
    components: {MallFooter, CartItemMain, TopNav, CartTop}
}
</script>

<style scoped>

</style>
