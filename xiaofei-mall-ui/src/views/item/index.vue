<template>
    <div>
        <top-nav/>
        <top-search/>
        <item-brand/>
        <item-main/>
        <item-suggest/>
        <item-desc/>
        <mall-footer/>

    </div>
</template>

<script>
import TopNav from "@/views/components/TopNav";
import TopSearch from "@/views/components/TopSearch";
import ItemMain from "@/views/item/ItemMain";
import ItemBrand from "@/views/item/ItemBrand";
import MallFooter from "@/views/components/MallFooter";
import ItemSuggest from "@/views/item/ItemSuggest";
import ItemDesc from "@/views/item/Item";
export default {
    components: {ItemDesc, ItemSuggest, MallFooter, ItemBrand, TopSearch, TopNav,ItemMain},
}
</script>

<style scoped>
*{
    box-sizing:content-box
}
</style>
