<template>
    <div>
        <top-nav :homeIsShow="true"/>
        <top-search/>
        <top-category :search-value="searchVo.searchValue"/>
        <search-main :searchCondition="searchVo"/>
        <mall-footer/>
    </div>
</template>

<script>

import TopCategory from "@/views/search/TopCategory";
import SearchMain from "@/views/search/SearchMain";
import MallFooter from "@/views/components/MallFooter";
import TopNav from "@/views/components/TopNav";
import TopSearch from "@/views/components/TopSearch";

export default {
    created() {
        //判断是否携带查询参数
        if (JSON.stringify(this.$route.query) === "{}") {
            this.$router.push(`/`);
        }
        this.searchVo.searchValue = this.$route.query.searchValue
        this.searchVo.categoryId = this.$route.query.categoryId === undefined ? 0 : this.$route.query.categoryId
        this.searchVo.minPrice = this.$route.query.minPrice
        this.searchVo.maxPrice = this.$route.query.maxPrice
        this.searchVo.sort = this.$route.query.sort === undefined ? 0 : this.$route.query.sort
    },
    components: {
        TopSearch,
        TopCategory,
        MallFooter,
        SearchMain,
        TopNav
    },
    data() {
        return {
            searchVo: {
                searchValue: "",//搜索条件
                categoryId: 0,//三级分类id
                sort: 0,//排序条件
                minPrice: "",//最低价格
                maxPrice: "",//最高价格
            }
        };
    },
};
</script>
