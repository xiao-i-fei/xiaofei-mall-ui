<template>
    <div>

        <top-nav :home-is-show="true"/>
        <trade/>
        <mall-footer/>
    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import Trade from "@/views/order/trade/trade";
import MallFooter from "@/views/components/MallFooter";

export default {
    components: {MallFooter, TopNav,Trade}
}
</script>

<style scoped>

</style>
