<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">
                <!-- 搜索部分 -->
                <el-col :span="24">
                    <el-form :inline="true" :model="spuInfoSearch">
                        <el-form-item label="分类">
                            <category-cascader :catelogPath.sync="catelogPath"></category-cascader>
                        </el-form-item>
                        <el-form-item label="品牌">
                            <brand-select style="width:160px"></brand-select>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select style="width:160px" v-model="spuInfoSearch.publishStatus" clearable>
                                <!-- 此处的状态码需要和数据库中的一致 -->
                                <el-option label="下架" :value="0"></el-option>
                                <el-option label="上架" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="检索">
                            <el-input style="width:160px" v-model="spuInfoSearch.searchValue" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchSpuInfo(false)">查询</el-button>
                            <el-button type="primary" @click="searchSpuInfo(true)">查询全部</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!-- 数据展示部分 -->
                <el-col :span="24">
                    <spu-info/>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import BrandSelect from '@/views/components/brand/brand-select'
import CategoryCascader from '@/views/components/category/category-cascader'
import SpuInfo from '@/views/product/spu/spu/spu-info'
import PubSub from 'pubsub-js'

export default {
    components: {
        BrandSelect,
        CategoryCascader,
        SpuInfo
    },
    data() {
        //这里存放数据
        return {
            catelogPath: [],
            spuInfoSearch: {
                publishStatus: '',
                searchValue: '',
                brandId: 0,
                catelogId: 0
            },
            catPathSub: null,
            brandIdSub: null

        }
    },
    methods: {
        searchSpuInfo(isAll) {
            if (isAll) {
                this.spuInfoSearch = {publishStatus: '', searchValue: '', brandId: 0, catelogId: 0}
                this.catelogPath = [0]
            }
            PubSub.publish('spuInfoSearch', this.spuInfoSearch)
        }
    },
    mounted() {
        //接收三级分类级联选择器的路径
        this.catPathSub = PubSub.subscribe('catPath', (msg, val) => {
            this.spuInfoSearch.catelogId = val[val.length - 1]
        })
        //接收选择三级分类之后，选择品牌的信息
        this.brandIdSub = PubSub.subscribe('brandId', (msg, val) => {
            this.spuInfoSearch.brandId = val
        })
    },
    beforeDestroy() {
        PubSub.unsubscribe(this.catPathSub)
        PubSub.unsubscribe(this.brandIdSub)
    },
}
</script>

<style scoped>

</style>
