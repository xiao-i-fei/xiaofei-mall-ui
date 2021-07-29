<template>
    <div>
        <el-dialog :close-on-click-modal="false" :visible.sync="visible" @closed="dialogClose">

            <el-dialog width="40%" title="选择属性" :visible.sync="innerVisible" append-to-body>
                <div>
                    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
                        <el-form-item>
                            <el-input v-model="dataForm.searchValue" placeholder="参数名" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="getDataList()">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-table :data="page.items" border v-loading="dataListLoading"
                              @selection-change="innerSelectionChangeHandle" style="width: 100%;">
                        <el-table-column type="selection" header-align="center" align="center"></el-table-column>
                        <el-table-column prop="attrId" header-align="center" align="center"
                                         label="属性id"></el-table-column>
                        <el-table-column prop="attrName" header-align="center" align="center"
                                         label="属性名"></el-table-column>
                        <el-table-column prop="icon" header-align="center" align="center"
                                         label="属性图标"></el-table-column>
                        <el-table-column prop="valueSelect" header-align="center" align="center"
                                         label="可选值列表"></el-table-column>
                    </el-table>
                    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle"
                                   :current-page="page.pageNo" :page-sizes="[8,12,16,20,24,32,40,48]"
                                   :page-size="page.pageSize" :total="page.itemCount"
                                   layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="innerVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddRelation">确认新增</el-button>
                </div>
            </el-dialog>

            <el-row>
                <el-col :span="24">
                    <el-button type="primary" @click="addRelation">新建关联</el-button>
                    <el-button type="danger" @click="batchDeleteRelation" :disabled="dataListSelections.length <= 0">
                        批量删除
                    </el-button>
                    <!--  -->
                    <el-table :data="relationAttrs" style="width: 100%" @selection-change="selectionChangeHandle"
                              border>
                        <el-table-column type="selection" header-align="center" align="center"
                                         width="50"></el-table-column>
                        <el-table-column prop="attrId" label="id"></el-table-column>
                        <el-table-column prop="attrName" label="属性名"></el-table-column>
                        <el-table-column prop="valueSelect" label="可选值">
                            <template slot-scope="scope">
                                <el-tooltip placement="top">
                                    <div slot="content">
                                        <span v-for="(i,index) in scope.row.valueSelect.split(';')" :key="index">{{ i }}<br/></span>
                                    </div>
                                    <el-tag>{{ scope.row.valueSelect.split(";")[0] + " ..." }}</el-tag>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" header-align="center" align="center" label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="relationRemove(scope.row.attrId)">移除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

        </el-dialog>
    </div>
</template>

<script>
import {
    addAttrAttrGroupRelation,
    deleteAttrAttrGroupRelation,
    queryAttrAttrGroupRelationByAttrGroupId,
    queryNoRelationAttr
} from "@/api/product/attr-attrgroup-relation";

export default {
    components: {},
    props: {},
    data() {
        //这里存放数据
        return {
            attrGroupId: 0,
            visible: false,
            innerVisible: false,
            relationAttrs: [],
            dataListSelections: [],
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
            innerdataListSelections: [],

        };
    },
    //计算属性类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        selectionChangeHandle(value) {
            console.log(value)
            this.dataListSelections = value;
        },
        innerSelectionChangeHandle(value) {
            console.log(value)
            this.innerdataListSelections = value;
        },
        addRelation() {
            this.innerVisible = true;
            this.getDataList();

        },
        batchDeleteRelation(val) {
            let postData = [];
            this.dataListSelections.forEach(item => {
                postData.push({attrId: item.attrId, attrGroupId: this.attrGroupId});
            });
            deleteAttrAttrGroupRelation(postData).then(response => {
                if (response.code === 200) {
                    this.$message({type: "success", message: "删除成功"});
                    this.init(this.attrGroupId);
                } else {
                    this.$message({type: "error", message: data.msg});
                }
            });
        },
        //移除关联
        relationRemove(attrId) {
            let data = [];
            data.push({attrId, attrGroupId: this.attrGroupId});
            deleteAttrAttrGroupRelation(data).then(response => {
                if (response.code === 200) {
                    this.$message({type: "success", message: "删除成功"});
                    this.init(this.attrGroupId);
                } else {
                    this.$message({type: "error", message: data.msg});
                }
            });
        },
        submitAddRelation() {
            this.innerVisible = false;
            //准备数据
            console.log("准备新增的数据", this.innerdataListSelections);
            if (this.innerdataListSelections.length > 0) {
                let postData = [];
                this.innerdataListSelections.forEach(item => {
                    postData.push({attrId: item.attrId, attrGroupId: this.attrGroupId});
                });
                console.log(postData)
                addAttrAttrGroupRelation(postData).then(response => {
                    if (response.code === 200) {
                        this.$message({type: "success", message: "新增关联成功"});
                    }
                    this.$emit("refreshData");
                    this.init(this.attrGroupId);
                });
            } else {
            }
        },
        init(id) {
            this.attrGroupId = id || 0;
            this.visible = true;
            queryAttrAttrGroupRelationByAttrGroupId(this.attrGroupId).then(response => {
                this.relationAttrs = response.data;
            });
        },
        dialogClose() {
        },

        //========
        // 获取数据列表
        getDataList() {
            queryNoRelationAttr(this.pageNo, this.pageSize, this.dataForm.searchValue).then(response => {
                if (response.data && response.code === 200) {
                    this.page = response.data
                } else {
                    this.dataList = [];
                    this.totalPage = 0;
                }
            });
        },
        // 每页数
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageNo = 1;
            this.getDataList();
        },
        // 当前页
        currentChangeHandle(val) {
            this.pageNo = val;
            this.getDataList();
        }
    }
};
</script>
<style scoped>
</style>
