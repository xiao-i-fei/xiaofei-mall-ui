<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">

                <!-- 搜索区域 -->
                <el-col :span="24">
                    <el-form :inline="true" :model="wareSearchVo" @keyup.enter.native="getWareInfo()">
                        <el-form-item>
                            <el-input v-model="wareSearchVo.searchValue" placeholder="参数名" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getWareInfo(false)">查询</el-button>
                            <el-button type="success" @click="getWareInfo(true)">查询全部</el-button>
                            <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
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
                        <el-table-column prop="name" header-align="center" align="center" label="仓库名"></el-table-column>
                        <el-table-column prop="address" header-align="center" align="center"
                                         label="仓库地址"></el-table-column>
                        <el-table-column prop="areacode" header-align="center" align="center"
                                         label="区域编码"></el-table-column>
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
        <ware-info-add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getWareInfo"/>

    </div>
</template>

<script>

import {deleteWareInfo, queryWareInfoByPage} from "@/api/ware/ware-info";
import WareInfoAddOrUpdate from '@/views/ware/wareinfo/ware-info-add-or-update'


export default {
    components: {
        WareInfoAddOrUpdate
    },
    data() {
        return {
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            wareSearchVo: {
                searchValue: "",
            },
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false
        }
    },
    methods: {
        // 获取数据列表
        getWareInfo(isAll) {
            if (isAll) {
                this.wareSearchVo = {searchValue: ""}
            }
            this.dataListLoading = true
            queryWareInfoByPage(this.page.pageNo, this.page.pageSize, this.wareSearchVo.searchValue).then(response => {
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
            this.getWareInfo()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getWareInfo()
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
                deleteWareInfo(ids.toString()).then(response => {
                    if (response.data && response.code === 200) {
                        this.$message({
                            message: '操作成功', type: 'success', duration: 1500,
                            onClose: () => {
                                this.getWareInfo()
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
        this.getWareInfo()
    }
}
</script>

<style scoped>

</style>
