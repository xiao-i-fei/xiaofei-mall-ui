<template>
    <div style="margin-top: 20px">

        <el-row>
            <el-col :span="22" :offset="1">

                <!-- 侧边分类区域 -->
                <el-col :span="4" style="margin-top: 20px">
                    <category @tree-node-click="nodeClick"/>
                </el-col>

                <el-col :span="19" :offset="1">

                    <!-- 搜索区域 -->
                    <el-col>
                        <el-form style="margin: 20px 0 20px 0" :inline="true" @keyup.enter.native="">
                            <el-form-item>
                                <el-input v-model="searchValue" placeholder="参数名" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="search(false)">查询</el-button>
                                <el-button type="success" @click="search(true)">查询全部</el-button>
                                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                                <!-- 这里要调用方法，不能直接写方法名字，如果直接写方法名字，会默认传入一个参数，event事件 -->
                                <el-button type="danger" :disabled="selectAttrGroups.length<=0"
                                           @click="deleteAttrGroup()">批量删除
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <!-- 数据展示区域 -->
                    <el-col>

                        <!-- 属性分组信息展示区域 -->
                        <el-table :data="page.items" border v-loading="" @selection-change="selectionChangeHandle"
                                  style="width: 100%;">
                            <el-table-column type="selection" header-align="center" align="center"
                                             width="50"></el-table-column>
                            <el-table-column prop="attrGroupId" header-align="center" align="center"
                                             label="分组Id"></el-table-column>
                            <el-table-column prop="attrGroupName" header-align="center" align="center"
                                             label="组名"></el-table-column>
                            <el-table-column prop="sort" header-align="center" align="center"
                                             label="排序"></el-table-column>
                            <el-table-column prop="descript" header-align="center" align="center"
                                             label="描述"></el-table-column>
                            <el-table-column prop="icon" header-align="center" align="center"
                                             label="分组图标"></el-table-column>
                            <el-table-column prop="catelogId" header-align="center" align="center"
                                             label="类别Id"></el-table-column>


                            <el-table-column header-align="center" align="center" width="250" label="操作">
                                <template slot-scope="scope">

                                    <el-button type="primary" size="small"
                                               @click="addOrUpdateHandle(scope.row.attrGroupId)">修改
                                    </el-button>
                                    <el-button type="danger" size="small"
                                               @click="deleteAttrGroup(scope.row.attrGroupId)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-col>

                    <!-- 分页区域 -->
                    <el-col style="margin-top: 20px;text-align: center" :span="22" :offset="1" te>
                        <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                                       :current-page="page.pageNo"
                                       :page-sizes="[8,12,16,20,24]" :page-size="page.pageSize" :total="page.itemCount"
                                       layout="total, sizes, prev, pager, next, jumper">
                        </el-pagination>
                    </el-col>
                </el-col>

            </el-col>
        </el-row>

        <attrgroup-add-or-update :queryAttrGroup="queryAttrGroup"/>

    </div>
</template>

<script>
import category from "@/views/components/category/category";
import {deleteAttrGroupById, queryAttrGroupByPage} from "@/api/product/attrgroup";
import AttrgroupAddOrUpdate from "@/views/product/attr/attrgroup/attrgroup-add-or-update";

export default {
    components: {
        AttrgroupAddOrUpdate,
        category
    },
    mounted() {
        this.queryAttrGroup()
    },
    data() {
        return {
            searchValue: "",//搜索条件
            categoryId: 0,//用于左边的树形组件的搜索条件
            isUpdate: false,//用于判断是添加操作还是修改操作
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            selectAttrGroups: []
        }
    },
    methods: {

        //复选框选中的值
        selectionChangeHandle(value) {
            this.selectAttrGroups = value
        },

        addOrUpdateHandle(attrGroupId) {
            //发布消息
            this.$bus.$emit('addOrUpdateAttrGroup', attrGroupId)
        },

        //单个删除属性分组或批量删除属性分组
        deleteAttrGroup(attrGroupId) {
            //将所有id提取出来，判断是批量删除还是非批量删除
            let attrGroupIds = attrGroupId ? [attrGroupId] : this.selectAttrGroups.map(item => {
                return item.attrGroupId
            })
            //确认框，确认之后请求后台接口
            this.$confirm(`是否删除id为【${attrGroupIds}】的商家`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteAttrGroupById(String(attrGroupId)).then(response => {
                    if (response.data) {
                        this.$message.success("删除成功")
                        //刷新页面数据
                        this.queryAttrGroup()
                    } else this.$message.error("删除失败")
                })
            }).catch(() => {
            })
        },

        //搜索数据
        search(isAll) {
            if (isAll) {
                this.page.pageNo = 1;
                this.page.pageSize = 8;
                this.searchValue = ""
                this.categoryId = 0
            }

            this.queryAttrGroup()
        },

        //初始化数据
        queryAttrGroup() {
            queryAttrGroupByPage(this.page.pageNo, this.page.pageSize, this.searchValue, this.categoryId).then(response => {
                this.page = response.data
            })
        },

        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.queryAttrGroup()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.queryAttrGroup()
        },

        //树形类别选择
        nodeClick(value, node, component) {
            if (value.catLevel === 3) {
                console.log(value)
                this.categoryId = value.catId
                this.queryAttrGroup()//重新查询数据
            }
        }

    },
    beforeDestroy() {
    }

};
</script>

<style scoped>

</style>
