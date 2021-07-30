<template>
    <el-dialog :title="attrType" :close-on-click-modal="false" :visible.sync="visible">

        <el-form :model="brand" :rules="brandRule" ref="brand" @keyup.enter.native="brandSubmit()"
                 label-width="140px">

            <el-form-item label="品牌名" prop="name">
                <el-input v-model="brand.name" placeholder="品牌名"></el-input>
            </el-form-item>

            <el-form-item label="品牌logo地址" prop="logo">
                <single-upload v-model="brand.logo"></single-upload>
            </el-form-item>

            <el-form-item label="介绍" prop="descript">
                <el-input v-model="brand.descript" placeholder="介绍"></el-input>
            </el-form-item>

            <el-form-item label="显示状态" prop="showStatus">
                <el-switch v-model="brand.showStatus" active-color="#13ce66"
                           inactive-color="#ff4949" :active-value="1" :inactive-value="0">
                </el-switch>
            </el-form-item>

            <el-form-item label="检索首字母" prop="firstLetter">
                <el-input v-model="brand.firstLetter" placeholder="检索首字母"></el-input>
            </el-form-item>

            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="brand.sort" placeholder="排序"></el-input>
            </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
              <el-button @click="visible = false">取消</el-button>
              <el-button type="primary" @click="brandSubmit()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import SingleUpload from '@/components/upload/singleUpload'
import {addBrand, queryBrandById, updateBrand} from "@/api/product/brand";

export default {
    props: ["queryBrand"],
    data() {
        return {
            attrType: "",
            visible: false,
            brand: {
                brandId: 0,
                name: '',
                logo: '',
                descript: '',
                showStatus: 1,
                firstLetter: '',
                sort: 0
            },
            brandRule: {
                name: [{required: true, message: '品牌名不能为空', trigger: 'blur'}],
                logo: [
                    {required: true, message: '品牌logo地址不能为空', trigger: 'blur'}
                ],
                descript: [
                    {required: true, message: '介绍不能为空', trigger: 'blur'}
                ],
                showStatus: [
                    {
                        required: true,
                        message: '显示状态[0-不显示；1-显示]不能为空',
                        trigger: 'blur'
                    }
                ],
                firstLetter: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('首字母必须填写'))
                            } else if (!/^[a-zA-Z]$/.test(value)) {
                                callback(new Error('首字母必须a-z或者A-Z之间'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                sort: [
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('排序字段必须填写'))
                            } else if (!Number.isInteger(value) || value < 0) {
                                callback(new Error('排序必须是一个大于等于0的整数'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        //根据id查询数据
        selectById(brandId) {
            queryBrandById(brandId).then(response => {
                this.brand = response.data
            })
        },

        //清除表单中的数据
        clearBrand() {
            this.brand = {
                brandId: 0,
                name: '',
                logo: '',
                descript: '',
                showStatus: 1,
                firstLetter: '',
                sort: 0
            }
        },

        //表单提交
        brandSubmit() {
            this.$refs['brand'].validate(valid => {
                if (valid) {
                    if (this.attrType === "添加") {
                        addBrand(this.brand).then(response => {
                            if (response.data) {
                                this.$message.success("添加成功")
                                this.queryBrand()
                                this.visible = false;
                                this.clearBrand()
                            } else {
                                this.$message.error("添加失败")
                            }
                        })
                    } else {
                        updateBrand(this.brand).then(response => {
                            if (response.data) {
                                this.$message.success("修改成功")
                                this.queryBrand()
                                this.visible = false;
                                this.clearBrand()
                            } else {
                                this.$message.error("修改失败")
                            }
                        })
                    }
                }
            })
        }

    },
    mounted() {
        this.$bus.$on('addOrUpdateBrand', brandId => {
            if(brandId){
                this.clearBrand()
            }
            this.attrType = brandId ? "修改" : "添加"
            this.visible = true
            if (brandId) {
                this.selectById(brandId)
            }
            this.brand.brandId = brandId
        })
    },
    beforeDestroy() {
        this.$bus.$off('addOrUpdateBrand')
        this.clearBrand()
    },
    components: {SingleUpload},
}
</script>

<style scoped>
.el-dialog__header {
    text-align: center;
}
</style>
