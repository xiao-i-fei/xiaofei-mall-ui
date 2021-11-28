<template>
    <div>
        <top-nav :home-is-show="true"/>
        <top/>
        <sidebar/>
        <mall-footer/>
    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import Top from "@/views/member/account/home/top";
import Sidebar from "@/views/member/account/home/sidebar";
import MallFooter from "@/views/components/MallFooter";

export default {
    components: {
        MallFooter,
        Sidebar,
        Top,
        TopNav
    }
}
</script>

<style scoped>

</style>
