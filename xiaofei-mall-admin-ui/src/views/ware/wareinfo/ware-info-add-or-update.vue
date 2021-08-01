<template>
    <div>
        <el-dialog
            :title="!wareInfo.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
            <el-form :model="wareInfo" :rules="wareInfoRule" ref="wareInfo" @keyup.enter.native="dataFormSubmit()"
                     label-width="120px">
                <el-form-item label="仓库名" prop="name">
                    <el-input v-model="wareInfo.name" placeholder="仓库名"></el-input>
                </el-form-item>
                <el-form-item label="仓库地址" prop="address">
                    <el-input v-model="wareInfo.address" placeholder="仓库地址"></el-input>
                </el-form-item>
                <el-form-item label="区域编码" prop="areacode">
                    <el-input v-model="wareInfo.areacode" placeholder="区域编码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
        </el-dialog>
    </div>
</template>

<script>
import {addWareInfo, updateWareInfo, queryWareInfoByWareId} from "@/api/ware/ware-info";

export default {
    data() {
        return {
            visible: false,
            wareInfo: {id: 0, name: '', address: '', areacode: ''},
            wareInfoRule: {
                name: [{required: true, message: '仓库名不能为空', trigger: 'blur'}],
                address: [{required: true, message: '仓库地址不能为空', trigger: 'blur'}],
                areacode: [{required: true, message: '区域编码不能为空', trigger: 'blur'}]
            }
        }
    },
    methods: {
        init(id) {
            this.wareInfo.id = id || 0
            this.visible = true
            this.$nextTick(() => {
                this.$refs['wareInfo'].resetFields()
                if (this.wareInfo.id) {
                    queryWareInfoByWareId(this.wareInfo.id).then(response => {
                        if (response.data && response.code === 200) {
                            this.wareInfo = response.data
                        }
                    })
                }
            })
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['wareInfo'].validate((valid) => {
                if (valid) {
                    if (this.wareInfo.id === 0) {
                        //添加操作
                        addWareInfo(this.wareInfo).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '添加成功', type: 'success', duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                this.$message.error("添加失败")
                            }
                        })
                    } else if (this.wareInfo.id > 0) {
                        //修改操作
                        updateWareInfo(this.wareInfo).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '修改成功', type: 'success', duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
