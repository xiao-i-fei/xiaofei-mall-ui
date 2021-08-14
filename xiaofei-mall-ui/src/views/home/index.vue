<template>
    <div class="home-main">
        <top-ad/>
        <top-nav/>
        <top-search/>
        <sidebar/>
        <spike/>
        <related-suggest/>
        <mall-footer/>
    </div>
</template>
<script>
import TopAd from "@/views/home/TopAd";
import TopNav from "@/views/components/TopNav";
import TopSearch from "@/views/home/TopSearch";
import Sidebar from "@/views/home/Sidebar";
import Spike from "@/views/home/Spike";
import MallFooter from "@/views/components/MallFooter";
import RelatedSuggest from "@/views/components/RelatedSuggest";

export default {
    components: {
        MallFooter,
        Spike,
        Sidebar,
        TopSearch,
        TopNav,
        TopAd,
        RelatedSuggest,
    },
};
</script>

<style lang="scss" scoped>
.home-main {
    background-color: rgb(244, 244, 244);
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
