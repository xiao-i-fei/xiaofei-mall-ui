<template>
    <div class="mod-config">
        <el-col>
            <el-table :data="page.items" border v-loading="dataListLoading" @selection-change="selectionChangeHandle"
                      style="width: 100%;">
                <!--<el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>-->
                <el-table-column prop="id" header-align="center" align="center" label="id"></el-table-column>
                <el-table-column prop="spuName" header-align="center" align="center" label="名称"></el-table-column>
                <el-table-column prop="spuDescription" header-align="center" align="center"
                                 label="描述"></el-table-column>
                <el-table-column prop="catalogId" header-align="center" align="center" label="分类"></el-table-column>
                <el-table-column prop="brandId" header-align="center" align="center" label="品牌"></el-table-column>
                <el-table-column prop="weight" header-align="center" align="center" label="重量（kg）"></el-table-column>
                <el-table-column prop="publishStatus" header-align="center" align="center" label="上架状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.publishStatus === 0">已下架</el-tag>
                        <el-tag v-if="scope.row.publishStatus === 1">已上架</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" header-align="center" align="center" label="修改时间"></el-table-column>
                <el-table-column header-align="center" align="center" width="150" label="操作">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.publishStatus === 0" type="text" size="small"
                                   @click="productUp(scope.row.id)">上架
                        </el-button>
                        <el-button type="text" size="small" @click="attrUpdateShow(scope.row)">规格</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>

        <!-- 分页区域 -->
        <el-col style="margin-top: 20px;text-align: center" :span="22" :offset="1" te>
            <el-pagination @size-change="changePageSize" @current-change="changePageNo" :current-page="page.pageNo"
                           :page-sizes="[8,12,16,20,24]" :page-size="page.pageSize" :total="page.itemCount"
                           layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </el-col>


    </div>
</template>

<script>
import {querySpuInfoByPage} from "@/api/product/spu-info";
import PubSub from 'pubsub-js'

export default {
    data() {
        return {
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            dataSub: null,
            spuSearchInfo: {},
            dataListLoading: false,//是否显示加载
            dataListSelections: [],//多选框选中之后的值
            addOrUpdateVisible: false//添加或修改的模态框显示
        }
    },

    methods: {
        //商品上架
        productUp(id) {
            this.$http({
                url: this.$http.adornUrl('/product/spuinfo/' + id + '/up'),
                method: 'post'
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.getSpuInfo()
                        }
                    })
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        attrUpdateShow(row) {
            this.$router.push({
                path: '/product-attrupdate',
                query: {spuId: row.id, catalogId: row.catalogId}
            })
        },
        // 获取数据列表
        getSpuInfo() {
            this.dataListLoading = true
            querySpuInfoByPage(this.pageNo, this.pageSize, this.spuSearchInfo).then(response => {
                if (response.data && response.code === 200) {
                    this.page = response.data
                } else {
                    this.page = {
                        pageNo: 1,
                        pageSize: 8,
                        pageTotal: 1,
                        itemCount: 0,
                        items: []
                    }
                }
                this.dataListLoading = false
            })
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getSpuInfo()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getSpuInfo()
        },
        // 多选
        selectionChangeHandle(val) {
            this.dataListSelections = val
        },
        // 新增 / 修改
        addOrUpdateHandle(id) {
        }
    },
    mounted() {
        //this.getSpuInfo()
        this.dataSub = PubSub.subscribe('spuInfoSearch', (msg, spuSearchInfo) => {
            this.spuSearchInfo = spuSearchInfo
            this.getSpuInfo()
        })
        this.getSpuInfo()

    },
    beforeDestroy() {
        PubSub.unsubscribe(this.dataSub)
    }
}
</script>
