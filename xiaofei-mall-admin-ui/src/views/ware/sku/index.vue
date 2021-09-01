<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">

                <!-- 搜索区域 -->
                <el-col :span="24">
                    <el-form :inline="true" :model="wareSkuVo" @keyup.enter.native="getWareSku()">
                        <el-form-item label="仓库选择">
                            <el-select v-model="wareSkuVo.wareInfoId" filterable placeholder="请选择仓库">
                                <el-option v-for="wareInfo in wareInfos" :key="wareInfo.id" :label="wareInfo.name"
                                           :value="wareInfo.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品Id">
                            <el-input v-model.number="wareSkuVo.skuId" placeholder="skuId" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="商品名称">
                            <el-input v-model="wareSkuVo.skuName" placeholder="skuName" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getWareSku(false)">查询</el-button>
                            <el-button type="success" @click="getWareSku(true)">查询全部</el-button>
                            <el-button type="primary" @click="addOrUpdateHandle(0)">新增</el-button>
                            <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">
                                批量删除
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!-- 数据展示区域 -->
                <el-col :span="24">
                    <el-table :data="page.items" border v-loading="dataListLoading"
                              @selection-change="selectionChangeHandle" style="width: 100%;">
                        <el-table-column type="selection" header-align="center" align="center"
                                         width="50"></el-table-column>
                        <el-table-column prop="id" header-align="center" align="center" label="id"></el-table-column>
                        <el-table-column prop="skuId" header-align="center" align="center"
                                         label="sku_id"></el-table-column>
                        <el-table-column prop="wareId" header-align="center" align="center"
                                         label="仓库id"></el-table-column>
                        <el-table-column prop="stock" header-align="center" align="center"
                                         label="库存数"></el-table-column>
                        <el-table-column prop="skuName" header-align="center" align="center"
                                         label="sku_name"></el-table-column>
                        <el-table-column prop="stockLocked" header-align="center" align="center"
                                         label="锁定库存"></el-table-column>
                        <el-table-column header-align="center" align="center" width="150" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改
                                </el-button>
                                <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>

                <!-- 分页区域 -->
                <el-col style="text-align: center;margin-top: 20px" :span="24">
                    <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                                   :current-page="page.pageNo"
                                   :page-sizes="[8,12,16,20,24]" :page-size="page.pageSize" :total="page.itemCount"
                                   layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </el-col>

            </el-col>
        </el-row>

        <!-- 弹窗, 新增 / 修改 -->
        <ware-sku-add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getWareSku"/>

    </div>
</template>

<script>

import {queryWareSkuByPage, deleteWareSku} from "@/api/ware/ware-sku";
import {queryWareInfoByPage} from "@/api/ware/ware-info";
import WareSkuAddOrUpdate from '@/views/ware/sku/ware-sku-add-or-update'

export default {
    components: {
        WareSkuAddOrUpdate
    },
    data() {
        return {
            wareSkuVo: {
                wareInfoId: "",
                skuId: "",
                skuName: "",
            },
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            wareInfos: [],
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false
        }
    },
    methods: {
        //获取所有仓库信息
        getWareInfo() {
            queryWareInfoByPage(1, 500, "").then(response => {
                if (response.data && response.code === 200) {
                    this.wareInfos = response.data.items
                }
            })
        },
        // 获取数据列表
        getWareSku(isAll) {
            if (isAll) {
                this.wareSkuVo = {
                    wareInfoId: "",
                    skuId: ""
                }
            }
            this.dataListLoading = true
            queryWareSkuByPage(this.page.pageNo, this.page.pageSize, this.wareSkuVo).then(response => {
                if (response.data && response.code === 200) {
                    this.page = response.data
                } else {
                    this.page = {
                        pageNo: 1,
                        pageSize: 8,
                        pageTotal: 1,
                        itemCount: 0,
                        items: []
                    }
                }
                this.dataListLoading = false
            })
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getWareSku()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getWareSku()
        },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id)
            })
        },
        // 删除
        deleteHandle(id) {
            var ids = id ? [id] : this.dataListSelections.map(item => {
                return item.id
            })
            this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteWareSku(ids.toString()).then(response => {
                    if (response.data && response.code === 200) {
                        this.$message({
                            message: '操作成功', type: 'success', duration: 1500,
                            onClose: () => {
                                this.getWareSku()
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            })
        }
    },
    mounted() {
        this.getWareSku()
        this.getWareInfo()
    }
}
</script>

<style scoped>

</style>
