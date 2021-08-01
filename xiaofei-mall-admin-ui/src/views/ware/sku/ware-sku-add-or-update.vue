<template>
    <div>
        <el-dialog :title="wareSku.id===0 ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
            <el-form :model="wareSku" :rules="wareSkuRule" ref="wareSku" @keyup.enter.native="dataFormSubmit()"
                     label-width="120px">
                <el-form-item v-if="wareSku.id===0" label="sku_id" prop="skuId">
                    <el-input v-model="wareSku.skuId" placeholder="sku_id"></el-input>
                </el-form-item>

                <el-form-item label="仓库选择" prop="wareId">
                    <el-select v-model="wareSku.wareId" filterable placeholder="请选择仓库" clearable>
                        <el-option v-for="wareInfo in wareInfos" :key="wareInfo.id" :label="wareInfo.name"
                                   :value="wareInfo.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="库存数" prop="stock">
                    <el-input v-model="wareSku.stock" placeholder="库存数"></el-input>
                </el-form-item>

                <el-form-item label="锁定库存" prop="stockLocked">
                    <el-input v-model="wareSku.stockLocked" placeholder="锁定库存"></el-input>
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

import {queryWareInfoByPage} from "@/api/ware/ware-info";
import {addWareSku, updateWareSku, queryWareSkuByWareSkuId} from "@/api/ware/ware-sku";

export default {
    data() {
        return {
            visible: false,
            wareInfos: [],
            wareSku: {
                id: 0,
                skuId: "",
                wareId: "",
                stock: 1,
                stockLocked: 0
            },
            wareSkuRule: {
                skuId: [{required: true, message: "sku_id不能为空", trigger: "blur"}],
                wareId: [{required: true, message: "仓库id不能为空", trigger: "blur"}],
                stock: [{required: true, message: "库存数不能为空", trigger: "blur"}],
            }
        };
    },
    watch: {
        'wareSku.stock'() {
            this.wareSku.stock = this.wareSku.stock < 1 ? 1 : this.wareSku.stock
        },
        'wareSku.stockLocked'() {
            this.wareSku.stockLocked = this.wareSku.stockLocked < 0 ? 0 : this.wareSku.stockLocked
        }
    },
    created() {
        //查询仓库信息
        this.getWareInfo()
    },
    methods: {
        //获取所有仓库信息
        getWareInfo() {
            queryWareInfoByPage(1, 500, "").then(response => {
                if (response.data && response.code === 200) {
                    this.wareInfos = response.data.items
                }
            })
        },
        init(id) {
            debugger
            this.wareSku.id = id || 0;
            this.visible = true;
            this.$nextTick(() => {
                this.$refs["wareSku"].resetFields();
                if (this.wareSku.id > 0) {
                    queryWareSkuByWareSkuId(this.wareSku.id).then(response => {
                        if (response.data && response.code === 200) {
                            this.wareSku = response.data
                        }
                    });
                }
            });
        },
        // 表单提交
        dataFormSubmit() {
            console.log(this.wareSku.id)
            this.$refs["wareSku"].validate(valid => {
                if (valid) {
                    //判断是添加还是修改
                    if (this.wareSku.id <= 0) {
                        addWareSku(this.wareSku).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: response.msg, type: "success", duration: 1500,
                                    onClose: () => {
                                        this.visible = false;
                                        this.$emit("refreshDataList");
                                    }
                                });
                            } else {
                                this.$message.error(response.msg);
                            }
                        });
                    } else if (this.wareSku.id > 0) {
                        updateWareSku(this.wareSku).then(response => {
                            if (response.data && response.code === 200) {
                                this.$message({
                                    message: response.msg, type: "success", duration: 1500,
                                    onClose: () => {
                                        this.visible = false;
                                        this.$emit("refreshDataList");
                                    }
                                });
                            } else {
                                this.$message.error(response.msg);
                            }
                        });
                    }

                }
            });
        }
    }
};
</script>

<style scoped>

</style>
