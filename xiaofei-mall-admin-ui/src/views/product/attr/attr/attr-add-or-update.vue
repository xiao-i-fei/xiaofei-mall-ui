<template>
    <div>
        <el-dialog :title="dialogTitle" :close-on-click-modal="false" :visible.sync="visible"
                   @closed="dialogClose">
            <el-form :model="attr" :rules="dataRule" ref="attr" label-width="120px">
                <el-form-item label="属性名" prop="attrName">
                    <el-input v-model="attr.attrName" placeholder="属性名"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" prop="attrType">
                    <el-select v-model="attr.attrType" placeholder="请选择">
                        <el-option label="规格参数" :value="1"></el-option>
                        <el-option label="销售属性" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="值类型" prop="valueType">
                    <el-switch v-model="attr.valueType" active-text="允许多个值" inactive-text="只能单个值"
                               active-color="#13ce66" inactive-color="#ff4949" :inactive-value="0"
                               :active-value="1"></el-switch>
                </el-form-item>
                <el-form-item label="可选值" prop="valueSelect">
                    <!-- <el-input v-model="attr.valueSelect"></el-input> -->
                    <el-select v-model="attr.valueSelect" multiple filterable allow-create
                               placeholder="请输入内容"></el-select>
                </el-form-item>
                <el-form-item label="属性图标" prop="icon">
                    <el-input v-model="attr.icon" placeholder="属性图标"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" prop="catelogId">
                    <category-cascader :catelogPath.sync="catelogPath"></category-cascader>
                </el-form-item>
                <el-form-item label="所属分组" prop="attrGroupId" v-if="type === 1">
                    <el-select ref="groupSelect" v-model="attr.attrGroupId" placeholder="请选择">
                        <el-option v-for="item in attrGroups" :key="item.attrGroupId" :label="item.attrGroupName"
                                   :value="item.attrGroupId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="可检索" prop="searchType" v-if="type === 1">
                    <el-switch v-model="attr.searchType" active-color="#13ce66" inactive-color="#ff4949"
                               :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="快速展示" prop="showDesc" v-if="type === 1">
                    <el-switch v-model="attr.showDesc" active-color="#13ce66" inactive-color="#ff4949"
                               :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="启用状态" prop="enable">
                    <el-switch v-model="attr.enable" active-color="#13ce66" inactive-color="#ff4949"
                               :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取消</el-button>
                    <el-button type="primary" @click="attrSubmit()">确定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import CategoryCascader from '@/views/components/category/category-cascader'
import {queryAttrById, updateAttr, addAttr} from "@/api/product/attr";
import {queryAttrGroupByCategoryId} from "@/api/product/attrgroup";

export default {

    data() {
        return {
            dialogTitle: "",
            visible: false,
            attr: {
                attrId: 0,
                attrName: '',
                searchType: 0,
                valueType: 1,
                icon: '',
                valueSelect: '',
                attrType: 1,
                enable: 1,
                catelogId: '',
                attrGroupId: "",
                showDesc: 0,
            },
            catelogPath: [],
            attrGroups: [],
            dataRule: {
                attrName: [
                    {required: true, message: '属性名不能为空', trigger: 'blur'}
                ],
                searchType: [
                    {
                        required: true,
                        message: '是否需要检索不能为空',
                        trigger: 'blur'
                    }
                ],
                valueType: [
                    {
                        required: true,
                        message: '值类型不能为空',
                        trigger: 'blur'
                    }
                ],
                icon: [
                    {required: true, message: '属性图标不能为空', trigger: 'blur'}
                ],
                attrType: [
                    {
                        required: true,
                        message: '属性类型不能为空',
                        trigger: 'blur'
                    }
                ],
                enable: [
                    {
                        required: true,
                        message: '启用状态不能为空',
                        trigger: 'blur'
                    }
                ],
                catelogId: [
                    {
                        required: true,
                        message: '需要选择正确的三级分类数据',
                        trigger: 'blur'
                    }
                ],
                showDesc: [
                    {
                        required: true,
                        message: '快速展示不能为空',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },

    methods: {
        //初始化方法
        init(attrId) {
            console.log(1)
            this.dialogTitle = attrId === 0 ? "新增" : "修改";
            this.attr.attrId = attrId
            this.attr.attrType = this.type
            this.visible = true

            //nextTick()：当数据更新了，在dom中渲染后，自动执行该函数，
            this.$nextTick(() => {
                //重置表单
                this.$refs['attr'].resetFields()

                if (this.attr.attrId) {
                    queryAttrById(attrId).then(response => {
                        if (response.data && response.code === 200) {
                            console.log(response.data)
                            this.attr = response.data
                            this.catelogPath = response.data.catelogPath
                            this.attr.valueSelect = response.data.valueSelect.split(';')
                            this.$nextTick(() => {
                                this.attr.attrGroupId = response.data.attrGroupId
                            })
                        }
                    })
                }
            })
        },
        // 表单提交
        attrSubmit() {
            this.$refs['attr'].validate(valid => {
                if (valid) {
                    this.attr.valueSelect = this.attr.valueSelect.join(';')
                    //判断是添加还是修改
                    let addOrUpdate
                    debugger
                    if (this.attrId === 0) {
                        updateAttr(this.attr).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('getBaseAttr')
                                    }
                                })
                            } else {
                                this.$message.error(response.msg)
                            }
                        })
                    } else {
                        addAttr(this.attr).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success',
                                    duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('getBaseAttr')
                                    }
                                })
                            } else {
                                this.$message.error(response.msg)
                            }
                        })
                    }

                }
            })
        },

        //关闭添加或关闭的模态框
        dialogClose() {
            this.catelogPath = []
        }
    },
    components: {
        CategoryCascader
    },
    props: {
        type: {
            type: Number,
            default: 1
        }
    },
    watch: {
        //当所属分类变了，对应的属性分组信息也要改变，所以使用监听来改变
        catelogPath(path) {
            //监听到路径变化需要查出这个三级分类的分组信息
            this.attrGroups = []
            this.attr.catelogId = path[path.length - 1]
            if (path && path.length === 3) {
                queryAttrGroupByCategoryId(path[path.length - 1]).then(response => {

                    if (response.data && response.code === 200) {
                        this.attrGroups = response.data
                    } else {
                        this.$message.error(response.msg)
                    }
                })
            } else if (path.length === 0) {
                this.attr.catelogId = ''
            } else {
                this.$message.error('请选择正确的分类')
                this.attr.catelogId = ''
            }
        }
    },

}
</script>

<style scoped>

</style>
