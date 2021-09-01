<template>
    <div>
        <!-- 添加商品类别的box -->
        <el-dialog :title="dialogTitle" width="20%" :visible.sync="isShow" center :close-on-click-modal="false">

            <el-form :model="category" :rules="categoryRule" ref="categoryForm">
                <el-form-item label="商品类别名称" prop="name">
                    <el-input v-model.trim="category.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input :min="0" :max="999" v-model.number="category.sort" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import pubsub from 'pubsub-js'
import {addCategory, queryById, updateCategory} from '@/api/product/category'


export default {

    //接收参数
    props: ["getAll"],

    data() {
        return {
            isUpdate: true,//判断是修改还是添加，true为修改，false为添加
            isShow: false,
            dialogTitle: "",//模态框的标题
            category: {
                name: "",
                parentCid: "",
                catLevel: "",
                sort: 0,
            },
            //表单的验证规则
            categoryRule: {
                name: [
                    {required: true, message: '请输入商品类别名称', trigger: 'blur'},
                    {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
                ],
                sort: [
                    {required: true, message: '输入排序等级', trigger: 'blur'},
                ],
            }
        }
    },

    methods: {
        //添加商品信息
        update() {
            this.$refs["categoryForm"].validate((valid) => {

                if (valid) {
                    if (this.isUpdate) {
                        //修改操作
                        updateCategory(this.category).then(response => {
                            if (response.data) {
                                this.$message.success("修改成功")
                            } else {
                                this.$message.error("修改失败")
                            }
                        })
                    } else {
                        //添加操作
                        addCategory(this.category).then(response => {
                            if (response.data) {
                                this.$message.success("添加成功")
                            } else {
                                this.$message.error("添加失败")
                            }
                        })
                    }
                    this.isShow = false
                    //清空输入框中的数据
                    this.clearCategory()
                    //刷新数据
                    this.getAll()
                } else {
                    return false;
                }
            });

        },

        //根据类别id查询信息
        getById(categoryId) {
            queryById(categoryId).then(response => {
                this.category = response.data
            })
        },

        //清空category的数据，修改完成之后调用该方法
        clearCategory() {
            this.category = {
                name: "",
                parentCid: "",
                catLevel: "",
                sort: 0,
            }
        }
    },

    //监视属性
    watch: {
        //监视对象中的某个属性：【格式：'对象名称.属性名称'】
        'category.sort'(newValue, oldValue) {
            if (newValue < 0 || newValue === "") this.category.sort = 0
            if (newValue > 999) this.category.sort = 999
        }
    },

    //在页面加载之前执行。这里用于订阅消息，可以发送Ajax请求，从后台获取数据
    mounted() {
        //订阅添加商品的消息
        this.updateCategory = pubsub.subscribe("updateCategory", (msgName, data) => {

            //清空表单
            this.clearCategory()

            this.isShow = true//显示添加的模态框

            if (data.update === "add") {
                this.isUpdate = false
                this.dialogTitle = "添加商品类别"
                this.category.catLevel = data.category.catLevel + 1
                this.category.parentCid = data.category.catId
            }
            if (data.update === "update") {
                this.isUpdate = true
                this.dialogTitle = "修改商品类别"
                //获取需要修改的id修改查询商品的信息
                this.getById(data.category.catId)
            }
        })
    },

    //做一些收尾工作，如果销毁订阅，清空表单信息
    beforeDestroy() {
        //销毁订阅
        pubsub.unsubscribe(this.updateCategory)
    },

}
</script>

<style scoped>

</style>
