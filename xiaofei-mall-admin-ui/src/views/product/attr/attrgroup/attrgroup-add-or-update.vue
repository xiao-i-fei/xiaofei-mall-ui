<template>
    <div>
        <el-dialog :title="attrType" :close-on-click-modal="false"
                   :visible.sync="visible" @closed="dialogClose">
            <el-form :model="attrGroup" :rules="attrGroupRule" ref="attrGroup"
                     @keyup.enter.native="updateOrAddSubmit()" label-width="120px">
                <el-form-item label="组名" prop="attrGroupName">
                    <el-input v-model="attrGroup.attrGroupName" placeholder="组名"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="attrGroup.sort" placeholder="排序"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="descript">
                    <el-input v-model="attrGroup.descript" placeholder="描述"></el-input>
                </el-form-item>
                <el-form-item label="组图标" prop="icon">
                    <el-input v-model="attrGroup.icon" placeholder="组图标"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="catelogId">
                    <!-- <el-input v-model="data.catelogId" placeholder="所属分类id"></el-input> @change="handleChange" -->
                    <!-- <el-cascader filterable placeholder="试试搜索：手机" v-model="catelogPath" :options="categorys"  :props="props"></el-cascader> -->
                    <!-- :catelogPath="catelogPath"自定义绑定的属性，可以给子组件传值 -->
                    <el-cascader v-model="catelogPath" :options="categorys" :props="categoryProps"
                                 @change="categorySelect"></el-cascader>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="updateOrAddSubmit()">确 定</el-button>
    </span>
        </el-dialog>
    </div>
</template>

<script>
import {addAttrGroup, updateAttrGroup, queryAttrGroupById} from "@/api/product/attrgroup";
import {listTree} from "@/api/product/category";

export default {
    props: ["queryAttrGroup"],

    mounted() {

        this.$bus.$on('addOrUpdateAttrGroup', attrGroupId => {
            this.attrType = attrGroupId ? "修改" : "添加"
            this.visible = true
            if (attrGroupId) {
                this.selectById(attrGroupId)
            }
            this.queryCategoryTree()
        })
    },

    data() {
        return {
            //这里的props是给级联选择器配置
            categoryProps: {
                value: "catId",
                label: "name",
                children: "children",
                expandTrigger: 'hover'
            },
            visible: false,
            attrType: "",
            categorys: [],
            catelogPath: [],
            attrGroup: {
                attrGroupId: 0,
                attrGroupName: "",
                sort: "",
                descript: "",
                icon: "",
                catelogId: 0
            },
            attrGroupRule: {
                attrGroupName: [
                    {required: true, message: "组名不能为空", trigger: "blur"}
                ],
                sort: [{required: true, message: "排序不能为空", trigger: "blur"}],
                descript: [
                    {required: true, message: "描述不能为空", trigger: "blur"}
                ],
                icon: [{required: true, message: "组图标不能为空", trigger: "blur"}],
                catelogId: [
                    {required: true, message: "所属分类id不能为空", trigger: "blur"}
                ]
            }
        };
    },

    methods: {

        //获取级联选择器中的值
        queryCategoryTree() {
            listTree().then(response => {
                this.categorys = response.data
            })
        },
        //根据id查询信息
        selectById(attrGroupId) {
            queryAttrGroupById(attrGroupId).then(response => {
                this.attrGroup = response.data
                this.catelogPath = response.data.categoryPath
            })
        },

        //级联选择器选中之后触发的函数
        categorySelect(value) {
            if (value.length > 0) {
                this.attrGroup.catelogId = value[value.length - 1]
            }
        },

        //提交表单信息，执行添加或删除操作
        updateOrAddSubmit() {
            this.$refs['attrGroup'].validate(valid => {
                if (valid) {
                    if (this.attrType === "添加") {
                        addAttrGroup(this.attrGroup).then(response => {
                            if (response.data) {
                                this.$message.success("添加成功")
                                this.clearAttrGroup();
                                //刷新页面数据
                                this.queryAttrGroup()
                                this.visible = false
                            } else {
                                this.$message.info("添加失败")
                            }
                        })
                    } else {
                        updateAttrGroup(this.attrGroup).then(response => {
                            if (response.data) {
                                this.$message.success("修改成功")
                                this.clearAttrGroup();
                                //刷新页面数据
                                this.queryAttrGroup()
                                this.visible = false
                            } else {
                                this.$message.info("修改失败")
                            }
                        })
                    }
                }
            })
        },

        //清空表单信息
        clearAttrGroup() {
            //this.$refs["attrGroup"].resetFields()
            this.attrGroup = {
                attrGroupId: 0,
                attrGroupName: "",
                sort: "",
                descript: "",
                icon: "",
                catelogId: 0
            }
        },

        //关闭模态框
        dialogClose() {
            this.visible = false;
            this.clearAttrGroup();
            this.catelogPath = [];
        }
    },

}

</script>

<style scoped>

</style>
