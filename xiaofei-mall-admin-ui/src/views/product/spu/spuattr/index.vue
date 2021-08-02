<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="14" :offset="2">
                <el-card class="box-card">
                    <el-col :span="18">
                        <el-tabs tab-position="left" style="width:98%">
                            <el-tab-pane :label="group.attrGroupName" v-for="(group,gidx) in baseAttr.attrGroups"
                                         :key="group.attrGroupId">
                                <!-- 遍历属性,每个tab-pane对应一个表单，每个属性是一个表单项  spu.baseAttrs[0] = [{attrId:xx,val:}]-->
                                <el-form ref="form" :model="baseAttr">
                                    <el-form-item :label="attr.attrName" v-for="(attr,aidx) in group.attrs"
                                                  :key="attr.attrId">
                                        <el-input v-model="baseAttr.baseAttrs[gidx][aidx].attrId" type="hidden"
                                                  v-show="false"></el-input>
                                        <el-select v-model="baseAttr.baseAttrs[gidx][aidx].attrValues"
                                                   :multiple="attr.valueType === 1" filterable allow-create
                                                   default-first-option placeholder="请选择或输入值">
                                            <el-option v-for="(val,vidx) in attr.valueSelect.split(';')" :key="vidx"
                                                       :label="val" :value="val">
                                                {{ val }}
                                            </el-option>
                                        </el-select>
                                        <el-checkbox style="margin-left: 20px"
                                                     v-model="baseAttr.baseAttrs[gidx][aidx].showDesc" :true-label="1"
                                                     :false-label="0">快速展示
                                        </el-checkbox>
                                    </el-form-item>
                                </el-form>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="primary" style="float:right" @click="submitSpuAttrs">确认修改</el-button>
                    </el-col>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

import {queryAttrGroupWithAttr} from "@/api/product/attrgroup";

<script>
import {queryAttrGroupWithAttr} from "@/api/product/attrgroup";
import {queryProductAttrValueBySpuId, updateProductAttrValue} from "@/api/product/product-attr-value";

export default {
    data() {
        return {
            spuId: '',
            catalogId: '',
            baseAttr: {
                //后台返回的所有数据
                attrGroups: [],//属性分组名称
                baseAttrs: []//属性名称和属性值
            },
            spuAttrsMap: []//spu属性值
        }
    },
    computed: {},
    methods: {
        //清楚表单数据
        clearData() {
            this.baseAttr.attrGroups = []
            this.baseAttr.baseAttrs = []
            this.spuAttrsMap = []
        },
        //获取指定spu的基本属性
        getSpuBaseAttrs() {
            queryProductAttrValueBySpuId(this.spuId).then(response => {
                if (response.data.length > 0 && response.code === 200) {
                    response.data.forEach(item => {
                        this.spuAttrsMap['' + item.attrId] = item
                    })
                }
            })
        },
        //获取路由中的请求参数
        getQueryParams() {
            this.spuId = this.$route.query.spuId
            this.catalogId = this.$route.query.catalogId
        },
        //获取指定类别的所有基本属性
        showBaseAttrs() {
            queryAttrGroupWithAttr(this.catalogId).then(response => {
                if (response.data.length > 0 && response.code === 200) {

                    //先对表单的baseAttrs进行初始化
                    let x = 0;
                    response.data.forEach(item => {
                        x++;
                        let y = 0;
                        let attrArray = []
                        item.attrs.forEach(attr => {
                            y++;
                            let v = ''
                            console.log(this.spuAttrsMap['' + attr.attrId])
                            if (this.spuAttrsMap['' + attr.attrId]) {
                                v = this.spuAttrsMap['' + attr.attrId].attrValue.split(';')
                            }
                            attrArray.push({
                                attrId: attr.attrId,
                                attrName: attr.attrName,
                                attrValues: v,
                                showDesc: this.spuAttrsMap['' + attr.attrId]
                                    ? this.spuAttrsMap['' + attr.attrId].quickShow
                                    : attr.showDesc
                            })
                        })
                        this.baseAttr.baseAttrs.push(attrArray)
                    })
                    this.baseAttr.attrGroups = response.data
                }
            })
        },
        //提交修改后的属性
        submitSpuAttrs() {
            let submitData = []
            this.baseAttr.baseAttrs.forEach(item => {
                item.forEach(attr => {
                    let val = ''
                    if (attr.attrValues instanceof Array) {
                        val = attr.attrValues.join(';')
                    } else {
                        val = attr.attrValues
                    }

                    if (val !== '') {
                        submitData.push({
                            attrId: attr.attrId,
                            attrName: attr.attrName,
                            attrValue: val,
                            quickShow: attr.showDesc
                        })
                    }
                })
            })

            console.log("submitData:", submitData)

            this.$confirm('修改商品规格信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    updateProductAttrValue(submitData, this.spuId).then(response => {
                        this.$message({
                            type: 'success',
                            message: '属性修改成功!'
                        })
                    })
                })
                .catch((e) => {
                    this.$message({
                        type: 'info',
                        message: '已取消修改' + e
                    })
                })
        }
    },
    //初始化
    mounted() {
        this.clearData()
        this.getQueryParams()
        if (this.spuId && this.catalogId) {
            this.getSpuBaseAttrs()
            this.showBaseAttrs()
        }
    }
}
</script>
<style scoped>
</style>
