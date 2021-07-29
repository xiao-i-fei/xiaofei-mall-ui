<template>
    <div>
        <el-row>
            <el-col :span="22" :offset="1">

                <!-- 侧边分类区域 -->
                <el-col :span="4" style="margin-top: 20px">
                    <category @tree-node-click="nodeClick"/>
                </el-col>

                <!-- 右边主分区 -->
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
                                <el-button type="primary" @click="addOrUpdate(0)">新增</el-button>
                                <!-- 这里要调用方法，不能直接写方法名字，如果直接写方法名字，会默认传入一个参数，event事件 -->
                                <el-button type="danger" :disabled="selectGroups.length<=0"
                                           @click="deleteAttr()">批量删除
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>

                    <!-- 数据展示区域 -->
                    <el-col>

                        <!-- 属性分组信息展示区域 -->
                        <el-table :data="page.items" border v-loading="dataListLoading"
                                  @selection-change="selectionChange" style="width: 100%;">
                            <el-table-column type="selection" header-align="center" align="center"
                                             width="50"></el-table-column>
                            <el-table-column prop="attrId" header-align="center" align="center"
                                             label="id"></el-table-column>
                            <el-table-column prop="attrName" header-align="center" align="center"
                                             label="属性名"></el-table-column>
                            <el-table-column v-if="attrType === 1" prop="searchType" header-align="center"
                                             align="center" label="可检索">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.searchType === 1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="valueType" header-align="center" align="center" label="值类型">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.valueType===0">单选</el-tag>
                                    <el-tag v-else>多选</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="icon" header-align="center" align="center"
                                             label="图标"></el-table-column>
                            <el-table-column prop="valueSelect" header-align="center" align="center" label="可选值">
                                <template slot-scope="scope">
                                    <el-tooltip placement="top">
                                        <div slot="content">
                                            <!-- 将结果切割，存入的时候，每个结果都是使用；隔开的 -->
                                            <span v-for="(i,index) in scope.row.valueSelect.split(';')"
                                                  :key="index">{{ i }}<br/></span>
                                        </div>
                                        <el-tag>{{ scope.row.valueSelect.split(';')[0] + ' ...' }}</el-tag>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                            <el-table-column prop="enable" header-align="center" align="center" label="启用">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.enable===1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="categoryName" header-align="center" align="center"
                                             label="所属分类"></el-table-column>
                            <el-table-column v-if="attrType === 1" prop="groupName" header-align="center" align="center"
                                             label="所属分组">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.attrGroupId">{{ scope.row.attrGroupName }}</span>
                                    <span v-else>暂未分组</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="attrType === 1" prop="showDesc" header-align="center" align="center"
                                             label="快速展示">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.showDesc===1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column header-align="center" align="center" width="150" label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="addOrUpdate(scope.row.attrId)">修改
                                    </el-button>
                                    <el-button type="text" size="small" @click="deleteAttr(scope.row.attrId)">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                    </el-col>

                    <!-- 分页区域 -->
                    <el-col style="margin-top: 20px;text-align: center" :span="22" :offset="1" te>
                        <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                                       :current-page="page.pageNo" :total="page.itemCount"
                                       :page-sizes="[8,12,16,20,24,32,40,48,56]" :page-size="page.pageSize"
                                       layout="total, sizes, prev, pager, next, jumper">
                        </el-pagination>
                    </el-col>

                </el-col>


            </el-col>
        </el-row>

        <add-or-update :type="attrType" v-if="addOrUpdateVisible" ref="addOrUpdate" @getBaseAttr="getBaseAttr"/>
    </div>
</template>

<script>

import category from "@/views/components/category/category";
import AddOrUpdate from "@/views/product/attr/attr/attr-add-or-update";
import {queryAttrByPage, deleteAttrById, queryAttrById} from "@/api/product/attr";
import AttrgroupAddOrUpdate from "@/views/product/attr/attrgroup/attrgroup-add-or-update";

export default {
    components: {
        AttrgroupAddOrUpdate,
        category,
        AddOrUpdate
    },
    props: {
        attrType: {
            type: Number,
            default: 1,
            require: true
        }
    },
    data() {
        return {
            addOrUpdateVisible: false,
            dataListLoading: false,
            searchValue: "",
            categoryId: 0,
            selectGroups: [],
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
        }
    },
    mounted() {
        this.getBaseAttr()
    },
    methods: {
        //初始化
        getBaseAttr() {
            queryAttrByPage(this.page.pageNo, this.page.pageSize, this.searchValue, this.categoryId, this.attrType).then(response => {
                this.page = response.data
            })
        },
        //批量删除【单个删除和批量删除】
        deleteAttr(attrId) {
            //单个删除属性分组或批量删除属性分组
            //将所有id提取出来，判断是批量删除还是非批量删除
            let attrIds = attrId ? [attrId] : this.selectGroups.map(item => {
                return item.attrId
            })
            //确认框，确认之后请求后台接口
            this.$confirm(`是否删除id为【${attrIds}】的商家`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteAttrById(String(attrIds)).then(response => {
                    if (response.data) {
                        this.$message.success("删除成功")
                        //刷新页面数据
                        this.getBaseAttr()
                    } else this.$message.error("删除失败")
                })
            }).catch(() => {
            })
        },
        //添加或删除
        addOrUpdate(attrId) {
            this.addOrUpdateVisible = true
            //执行一个异步方法
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(attrId)
            })

        },
        //根据id查询基本属性
        queryAttrById(attrId) {
            queryAttrById(attrId).then(response => {

            })
        },
        //条件是搜索
        search(isAll) {
            if (isAll) {
                //查询全部，清空搜索的相关信息
                this.page.pageNo = 1
                this.searchValue = ""
                this.categoryId = 0;
            }
            this.getBaseAttr()
        },
        //树形类别选择
        //树形类别选择
        nodeClick(value, node, component) {
            console.log(value)
            if (value.catLevel === 3) {
                this.categoryId = value.catId
                this.getBaseAttr()//重新查询数据
            }
        },
        //多选框选中的值
        selectionChange(value) {
            this.selectGroups = value
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getBaseAttr()
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getBaseAttr()
        },


    }
}

</script>

<style scoped>

</style>
