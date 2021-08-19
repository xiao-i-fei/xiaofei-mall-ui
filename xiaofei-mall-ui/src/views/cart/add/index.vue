<template>
    <div>
        <div>
            <top-nav :homeIsShow="true"/>
        </div>
        <div class="xiaofei-center div-row">
            <top-search/>
            <top-category/>
        </div>

        <add-item-main/>
        <mall-footer/>
    </div>
</template>

<script>
import TopSearch from "@/views/components/TopSearch";
import TopCategory from "@/views/search/TopCategory";
import TopNav from "@/views/components/TopNav";
import AddItemMain from '@/views/cart/add/add-item-main'
import MallFooter from "@/views/components/MallFooter";

export default {
    components: {MallFooter, TopSearch, TopNav, TopCategory, AddItemMain},

}
</script>

<style scoped>

</style>
