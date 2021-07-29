<template>
    <el-dialog :title="!memberLevel.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
        <el-form :model="memberLevel" :rules="memberLevelRule" ref="memberLevel" @keyup.enter.native="dataFormSubmit()"
                 label-width="200px">
            <el-form-item label="等级名称" prop="name">
                <el-input v-model="memberLevel.name" placeholder="等级名称"></el-input>
            </el-form-item>
            <el-form-item label="所需成长值" prop="growthPoint">
                <el-input-number v-model="memberLevel.growthPoint" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="默认等级" prop="defaultStatus">
                <el-checkbox v-model="memberLevel.defaultStatus" :true-label="1" :false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="免运费标准" prop="freeFreightPoint">
                <el-input-number :min="0" v-model="memberLevel.freeFreightPoint"></el-input-number>
            </el-form-item>
            <el-form-item label="每次评价获取的成长值" prop="commentGrowthPoint">
                <el-input-number :min="0" v-model="memberLevel.commentGrowthPoint"></el-input-number>
            </el-form-item>
            <el-form-item label="是否有免邮特权" prop="priviledgeFreeFreight">
                <el-checkbox v-model="memberLevel.priviledgeFreeFreight" :true-label="1" :false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="是否有会员价格特权" prop="priviledgeMemberPrice">
                <el-checkbox v-model="memberLevel.priviledgeMemberPrice" :true-label="1" :false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="是否有生日特权" prop="priviledgeBirthday">
                <el-checkbox v-model="memberLevel.priviledgeBirthday" :true-label="1" :false-label="0"></el-checkbox>
            </el-form-item>
            <el-form-item label="备注" prop="note">
                <el-input v-model="memberLevel.note" placeholder="备注"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
import {addMemberLevel, queryMemberLevelById, updateMemberLevel} from "@/api/member/member-level";

export default {
    data() {
        return {
            visible: false,
            memberLevel: {
                id: 0,
                name: '',
                growthPoint: 0,
                defaultStatus: 0,
                freeFreightPoint: 0,
                commentGrowthPoint: 0,
                priviledgeFreeFreight: 0,
                priviledgeMemberPrice: 0,
                priviledgeBirthday: 0,
                note: ""
            },
            memberLevelRule: {
                name: [
                    {required: true, message: '等级名称不能为空', trigger: 'blur'}
                ],
                growthPoint: [
                    {required: true, message: '等级需要的成长值不能为空', trigger: 'blur'}
                ],
                defaultStatus: [
                    {required: true, message: '是否为默认等级[0->不是；1->是]不能为空', trigger: 'blur'}
                ],
                freeFreightPoint: [
                    {required: true, message: '免运费标准不能为空', trigger: 'blur'}
                ],
                commentGrowthPoint: [
                    {required: true, message: '每次评价获取的成长值不能为空', trigger: 'blur'}
                ],
                priviledgeFreeFreight: [
                    {required: true, message: '是否有免邮特权不能为空', trigger: 'blur'}
                ],
                priviledgeMemberPrice: [
                    {required: true, message: '是否有会员价格特权不能为空', trigger: 'blur'}
                ],
                priviledgeBirthday: [
                    {required: true, message: '是否有生日特权不能为空', trigger: 'blur'}
                ],
                note: [
                    {required: true, message: '备注不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        init(id) {
            this.memberLevel.id = id || 0
            this.visible = true
            this.$nextTick(() => {
                this.$refs['memberLevel'].resetFields()
                queryMemberLevelById(this.memberLevel.id).then(response => {
                    if (response.data && response.code === 200) {
                        this.memberLevel.name = response.data.name
                        this.memberLevel.growthPoint = response.data.growthPoint || 0
                        this.memberLevel.defaultStatus = response.data.defaultStatus || 0
                        this.memberLevel.freeFreightPoint = response.data.freeFreightPoint || 0
                        this.memberLevel.commentGrowthPoint = response.data.commentGrowthPoint || 0
                        this.memberLevel.priviledgeFreeFreight = response.data.priviledgeFreeFreight || 0
                        this.memberLevel.priviledgeMemberPrice = response.data.priviledgeMemberPrice || 0
                        this.memberLevel.priviledgeBirthday = response.data.priviledgeBirthday || 0
                        this.memberLevel.note = response.data.note
                    }
                })

            })
        },
        // 表单提交
        dataFormSubmit() {
            this.$refs['memberLevel'].validate((valid) => {
                if (valid) {
                    this.memberLevel.id = this.memberLevel.id || undefined;
                    //判断是修改还是添加
                    if (!this.memberLevel.id) {
                        addMemberLevel(this.memberLevel).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '操作成功', type: 'success', duration: 1500,
                                    onClose: () => {
                                        this.visible = false
                                        this.$emit('refreshDataList')
                                    }
                                })
                            } else {
                                this.$message.error(data.msg)
                            }
                        })
                    } else {
                        updateMemberLevel(this.memberLevel).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: '操作成功', type: 'success', duration: 1500,
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
