<template>
    <div>
    
        <el-row style="margin-top: 20px">

            <!-- 数据展示区域 -->
            <el-col :span="22" :offset="1">
                <el-col :span="12" style="margin:20px,0">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" >新增</el-button>
                </el-col>
                <!-- 数据展示 -->
                <el-table :data="page.items" border v-loading="false" style="width: 100%;">
                    <el-table-column prop="advId" header-align="center" align="center" label="广告id"></el-table-column>
                    <el-table-column prop="advName" header-align="center" align="center" label="广告名称"></el-table-column>
                    <el-table-column prop="advPic" header-align="center" align="center" label="广告图片">
                        <template slot-scope="scope">
                            <el-image v-if="scope.row.advPic!=''" style="height: 50px" fit="contain"
                                      :src="scope.row.advPic" :preview-src-list="getAdvList(scope.row)">
                                <div slot="placeholder" class="image-slot">
                                    加载中<span class="dot">...</span>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTime" header-align="center" align="center"
                                     label="开始时间"></el-table-column>
                    <el-table-column prop="endTime" header-align="center" align="center" label="结束时间"></el-table-column>
                    <el-table-column prop="status" header-align="center" align="center" label="状态">
                        <template scope="scope">
                            <span v-if="scope.row.status==1">启动</span>
                            <span v-if="scope.row.status==0">未启用</span>
                        </template>
                    </el-table-column>
                    <el-table-column header-align="center" align="center" width="250" label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
                            <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>

            <!-- 分页区域 -->
            <el-col style="margin-top: 20px;margin-bottom: 20px;text-align: center" :span="22" :offset="1">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo" :current-page="page.pageNo"
                               :page-sizes="[40,80,120,160]" :page-size="page.pageSize" :total="page.itemCount"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>

        </el-row>

        <!-- 添加或修改【请填写功能名称】对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="轮播图名字" prop="advName">
                <el-input v-model="form.advName" placeholder="请输入轮播图名字" />
                </el-form-item>
                <el-form-item label="图片地址" prop="advPic">
                    <single-upload v-model="form.advPic"></single-upload>
                    <!-- <el-input v-model="form.advPic" type="textarea" placeholder="请输入内容" /> -->
                </el-form-item>
                <el-form-item label="状态" prop="status" required>
                <el-switch v-model="form.status" active-color="#1EFF00" inactive-color="#FF0000"
                    :active-value='1' :inactive-value='0'></el-switch>
                </el-form-item>
                <el-form-item label="备注" prop="note">
                <el-input v-model="form.note" type="textarea" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                <el-input v-model.number="form.sort" placeholder="请输入排序" />
                </el-form-item>
                <el-form-item label="广告类别" prop="advType">
                    <el-select v-model="form.advType" placeholder="请选择广告类别" filterable clearable :style="{width: '100%'}">
                    <el-option v-for="(item, index) in advTypeOptions" :key="index" :label="item.label"
                    :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select> 
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="form.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import SingleUpload from '@/components/upload/singleUpload'
import {queryAdvByPage,getAdv,addAdv,delAdv,updateAdv} from "@/api/product/home-adv";

export default {
    data() {
        return {
            page: {
                pageNo: 1,
                pageSize: 40,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            adv: {
                advId: "",
                advName: "",
                advPic: "",
                status: "",
                note: "",
                sort: "",
                advType: "",
                startTime: "",
                endTime: ""
            },
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false, 
            // 表单参数
            form: {},
            //广告类别选择项
            advTypeOptions: [{
                "label": "PC首页轮播图",
                "value": 0
            }, {
                "label": "手机首页轮播图",
                "value": 1
            }, {
                "label": "PC首页头部广告",
                "value": 2
            }, {
                "label": "手机首页广告",
                "value": 3
            }, {
                "label": "PC左侧广告大",
                "value": 4
            }, {
                "label": "PC右侧小轮播图",
                "value": 5
            }, {
                "label": "PC左侧广告小",
                "value": 6
            }],
            // 表单校验
            rules: {
                advName: [{
                    required: true,
                    message: '请输入广告名字',
                    trigger: 'blur'
                }], 
                sort: [{
                    required: true,
                    message: '请输入排序，大于0的正整数',
                    trigger: 'blur'
                }],
                advPic: [{
                    required: true,
                    message: '请上传广告图片',
                    trigger: 'blur'
                }],
                advType: [{
                    required: true,
                    message: '请选择广告类别',
                    trigger: 'change'
                }],
                startTime: [{
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change'
                }],
                endTime: [{
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change'
                }],
            }
        }
    },
    methods: {
        // 表单重置
        reset() {
            this.form = {
                advId: null,
                advName: null,
                advPic: null,
                status: 0,
                note: null,
                sort: null,
                advType: null,
                startTime: null,
                endTime: null
            };
            this.resetForm("form");
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.title = "广告添加";
        },
        /** 修改按钮操作 */
        handleUpdate(row) { 
            this.reset();
            const advId = row.advId || this.ids
            getAdv(advId).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "广告修改";
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            const advIds = row.advId || this.ids;
            this.$modal.confirm('是否确认删除【请填写功能名称】编号为"' + advIds + '"的数据项？').then(function() {
                return delAdv(advIds);
            }).then(() => {
                this.getList();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => {});
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                if (this.form.advId != null) {
                    updateAdv(this.form).then(response => {
                    this.$modal.msgSuccess("修改成功");
                    this.open = false;
                    this.getList();
                    });
                } else {
                    addAdv(this.form).then(response => {
                    this.$modal.msgSuccess("新增成功");
                    this.open = false;
                    this.getList();
                    });
                }
                }
            });
        },
        // 获取数据
        getTableData() {
            this.advPicList = []
            queryAdvByPage(this.page.pageNo, this.page.pageSize).then(response => {
                //if (response.status == 200) {
                this.page = response.data
            })
        },
        //设置大图显示的图片
        getAdvList(row) {
            let advList = []
            advList.push(row.advPic)
            return advList
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getTableData()
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getTableData()
        },
    },
    mounted() {
        // 初始化数据
        this.getTableData()
    },
    components: {SingleUpload},
}
</script>

<style scoped>

</style>
