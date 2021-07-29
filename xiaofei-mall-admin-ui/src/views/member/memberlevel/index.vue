<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">

                <el-col :span="24">
                    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
                        <el-form-item>
                            <el-input v-model="dataForm.searchValue" placeholder="参数名" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getDataList()">查询</el-button>
                            <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                            <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">
                                批量删除
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-col :span="24">
                    <el-table :data="page.items" border v-loading="dataListLoading"
                              @selection-change="selectionChangeHandle" style="width: 100%;">
                        <el-table-column type="selection" header-align="center" align="center"
                                         width="50"></el-table-column>
                        <el-table-column prop="id" header-align="center" align="center" label="id"></el-table-column>
                        <el-table-column prop="name" header-align="center" align="center"
                                         label="等级名称"></el-table-column>
                        <el-table-column prop="growthPoint" header-align="center" align="center"
                                         label="所需成长值"></el-table-column>
                        <el-table-column prop="defaultStatus" header-align="center" align="center" label="默认等级">
                            <template slot-scope="scope">
                                <i class="el-icon-success" v-if="scope.row.defaultStatus===1"></i>
                                <i class="el-icon-error" v-else></i>
                            </template>
                        </el-table-column>
                        <el-table-column prop="freeFreightPoint" header-align="center" align="center"
                                         label="免运费标准"></el-table-column>
                        <el-table-column prop="commentGrowthPoint" header-align="center" align="center"
                                         label="每次评价获取的成长值"></el-table-column>
                        <el-table-column label="特权" style="text-align: center">
                            <el-table-column prop="priviledgeFreeFreight" header-align="center" align="center"
                                             label="免邮特权">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.priviledgeFreeFreight===1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="priviledgeMemberPrice" header-align="center" align="center"
                                             label="会员价格特权">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.priviledgeMemberPrice===1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                            <el-table-column prop="priviledgeBirthday" header-align="center" align="center"
                                             label="生日特权">
                                <template slot-scope="scope">
                                    <i class="el-icon-success" v-if="scope.row.priviledgeBirthday===1"></i>
                                    <i class="el-icon-error" v-else></i>
                                </template>
                            </el-table-column>
                        </el-table-column>
                        <el-table-column prop="note" header-align="center" align="center" label="备注"></el-table-column>
                        <el-table-column header-align="center" align="center" width="150" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改
                                </el-button>
                                <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>

                <el-col :span="24" style="margin-top: 20px;text-align: center">
                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                                   :current-page="page.pageNo" :total="page.itemCount"
                                   :page-sizes="[8,12,16,20,24,32,40,48,56]" :page-size="page.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </el-col>

                <!-- 弹窗, 新增 / 修改 -->
                <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate"
                               @refreshDataList="getDataList"></add-or-update>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import AddOrUpdate from "@/views/member/memberlevel/memberlevel-add-or-update";
import {queryMemberLevelByPage, deleteMemberLevelByIds} from "@/api/member/member-level";

export default {
    data() {
        return {
            dataForm: {
                searchValue: ""
            },
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false
        };
    },
    components: {
        AddOrUpdate
    },
    /*activated() {
        this.getDataList();
    },*/
    methods: {
        // 获取数据列表
        getDataList() {
            this.dataListLoading = true;
            queryMemberLevelByPage(this.page.pageNo, this.page.pageSize, this.dataForm.searchValue).then(response => {
                if (response.data && response.code === 200) {
                    this.page = response.data
                } else {
                    this.page.items = [];
                    this.page.pageTotal = 0;
                }
                this.dataListLoading = false;
            });
        },
        // 每页数
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.getDataList();
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageIndex = val;
            this.getDataList();
        },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val;
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
            this.addOrUpdateVisible = true;
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id);
            });
        },
        // 删除
        deleteHandle(id) {
            let ids = id ? [id] : this.dataListSelections.map(item => {
                return item.id;
            });
            this.$confirm(
                `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }
            ).then(() => {
                deleteMemberLevelByIds(ids).then(response => {
                    if (response.data && response.code === 200) {
                        this.$message({
                            message: "操作成功",
                            type: "success",
                            duration: 1500,
                            onClose: () => {
                                this.getDataList();
                            }
                        });
                    } else {
                        this.$message.error(response.msg);
                    }
                });
            });
        }
    },
    mounted() {
        this.getDataList()
    }
};
</script>

<style scoped>

</style>
