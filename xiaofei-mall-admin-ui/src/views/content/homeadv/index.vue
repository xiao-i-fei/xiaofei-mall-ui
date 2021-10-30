<template>
    <div>
        <el-row style="margin-top: 20px">

            <!-- 数据展示区域 -->
            <el-col :span="22" :offset="1">

                <!-- 商家信息展示区 -->
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
                            后续开发
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

    </div>
</template>

<script>
import {queryAdvByPage} from "@/api/product/home-adv";

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
        }
    },
    methods: {
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
    }
}
</script>

<style scoped>

</style>
