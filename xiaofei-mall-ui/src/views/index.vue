<template>
    <div>
        <top-ad/>
        <top-nav/>
        <top-search/>
        <div style="background-color: #f4f4f4">
            <sidebar/>
            <spike/>
        </div>
    </div>
</template>

<script>
import TopAd from "@/views/home/TopAd";
 import TopNav from "@/views/components/TopNav";
import TopSearch from "@/views/home/TopSearch";
import Sidebar from "@/views/home/Sidebar";
import Spike from "@/views/home/Spike";

export default {
    components: {
        Spike,
        Sidebar,
       TopSearch,
        TopNav,
        TopAd,
    },
};
</script>
