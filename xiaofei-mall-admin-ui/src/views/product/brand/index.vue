<template>
    <div>
        <el-row>
            <!-- 增删查功能区 -->
            <el-col :span="22" :offset="1">
                <el-form style="margin: 20px 0 20px 0" :inline="true" @keyup.enter.native="">
                    <el-form-item>
                        <el-input v-model="searchValue" placeholder="参数名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="queryBrand(false)">查询</el-button>
                        <el-button type="success" @click="queryBrand(true)">查询全部</el-button>
                        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                        <!-- 这里要调用方法，不能直接写方法名字，如果直接写方法名字，会默认传入一个参数，event事件 -->
                        <el-button type="danger" @click="deleteBrand()" :disabled="selectBrands.length<=0">批量删除
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <el-col :span="22" :offset="1">

                <!-- 商家信息展示区 -->
                <el-table :data="page.items" border v-loading="" @selection-change="selectionChangeHandle"
                          style="width: 100%;">
                    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
                    <el-table-column prop="brandId" header-align="center" align="center" label="品牌id"></el-table-column>
                    <el-table-column prop="name" header-align="center" align="center" label="品牌名"></el-table-column>
                    <el-table-column prop="logo" header-align="center" align="center" label="品牌logo">
                        <template slot-scope="scope"><img alt="" :src="scope.row.logo"/></template>
                    </el-table-column>
                    <el-table-column prop="descript" header-align="center" align="center" label="介绍"></el-table-column>
                    <el-table-column prop="showStatus" header-align="center" align="center" label="显示状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.showStatus" active-color="#13ce66" inactive-color="#ff4949"
                                       :active-value="1" :inactive-value="0" @change="updateBrandStatus(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="firstLetter" header-align="center" align="center"
                                     label="检索首字母"></el-table-column>
                    <el-table-column prop="sort" header-align="center" align="center" label="排序"></el-table-column>
                    <el-table-column header-align="center" align="center" width="250" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="updateBrandCategory(scope.row.brandId)">关联分类
                            </el-button>
                            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.brandId)">修改
                            </el-button>
                            <el-button type="text" size="small" @click="deleteBrand(scope.row.brandId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>

            <!-- 分页区域 -->
            <el-col style="margin-top: 20px;text-align: center" :span="22" :offset="1" te>
                <el-pagination @size-change="changePageSize" @current-change="changePageNo" :current-page="page.pageNo"
                               :page-sizes="[8,12,16,20,24]" :page-size="page.pageSize" :total="page.itemCount"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>


            <add-or-update :queryBrand="queryBrand"></add-or-update>

        </el-row>
    </div>
</template>

<script>

import {queryBrandByPage, deleteBrandById} from '@/api/product/brand'
import AddOrUpdate from '@/views/product/brand/brand-add-or-update.vue'

export default {
    components: {
        AddOrUpdate
    },
    data() {
        return {
            attrType: "",
            addOrUpdateVisible: false,//判断是否添加或删除
            searchValue: "",
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            selectBrands: []
        }
    },

    //加载数据
    mounted() {
        this.queryBrand()
    },

    methods: {
        // 新增 / 修改
        addOrUpdateHandle(id) {
            //发布消息
            this.$bus.$emit('addOrUpdateBrand', id)
        },
        //分页获取商家的信息
        queryBrand(isQueryAll) {
            this.searchValue = isQueryAll ? "" : this.searchValue;
            queryBrandByPage(this.page.pageNo, this.page.pageSize, this.searchValue).then(response => {
                this.page = response.data
            });
        },

        //修改商家的显示状态
        updateBrandStatus(data) {
            updateBrandById(data)
        },

        //复选框选中之后会执行的方法
        selectionChangeHandle(select) {
            this.selectBrands = select
        },

        //批量删除或单个删除商家信息
        deleteBrand(brandId) {
            //将所有id提取出来，判断是批量删除还是非批量删除
            let brandIds = brandId ? [brandId] : this.selectBrands.map(item => {
                return item.brandId
            })

            //确认框，确认之后请求后台接口
            this.$confirm(`是否删除id为【${brandIds}】的商家`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteBrandById(String(brandIds)).then(response => {
                    if (response.data) this.$message.success("删除成功")
                    else this.$message.error("删除失败")
                })
            }).catch(() => {
            })
        },

        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.queryBrand()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.queryBrand()
        }
    }

};
</script>

<style scoped>

</style>

