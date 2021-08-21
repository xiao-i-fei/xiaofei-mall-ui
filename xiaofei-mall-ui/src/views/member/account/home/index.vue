<template>
    <div>
        <top-nav :home-is-show="true"/>
        <top/>
        <sidebar/>
    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import Top from "@/views/member/account/home/top";
import Sidebar from "@/views/member/account/home/sidebar";
export default {
    components:{
        Sidebar,
        Top,
        TopNav
    }
}
</script>

<style scoped>

</style>
