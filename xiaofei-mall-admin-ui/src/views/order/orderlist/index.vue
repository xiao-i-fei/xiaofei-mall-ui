<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">

                <!-- 数据检索部分 -->
                <el-col :span="24">
                    <el-form :inline="true" :model="orderItemQuery" @keyup.enter.native="queryOrderItem()">
                        <el-form-item>
                            <el-input v-model.number="orderItemQuery.orderSn" placeholder="订单编号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!-- 数据展示区域 -->
                <el-col :span="24">
                    <el-table  max-height="1100" :data="page.items" lazy border style="width: 100%;" highlight-current-row>
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                    <el-table :data="scope.row.orderItemEntitys" lazy border mstyle="width: 100%" highlight-current-row>
                                        <el-table-column header-align="center" align="center" label="商品图片">
                                            <template slot-scope="scope">
                                                <el-image :src="scope.row.skuPic" fit="contain" style="width:80px;height:80px;" lazy></el-image>
                                            </template>
                                        </el-table-column>
                                        <el-table-column header-align="center" align="center" prop="skuName" label="名称"></el-table-column>
                                        <el-table-column header-align="center" align="center" prop="skuQuantity" label="购买数量"></el-table-column>
                                        <el-table-column header-align="center" align="center" prop="realAmount" label="订单金额">
                                            <template slot-scope="scope">
                                                <strong>应付</strong><br/>
                                                <strong>￥{{ scope.row.realAmount }}</strong><br/>
                                                <span style="display: inline-block;margin-top: 10px;border-top:1px solid #e5e5e5;color: #aaaaaa;padding-top: 5px">
                                                    在线支付
                                                </span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column header-align="center" align="center" label="操作">
                                            <template slot-scope="scope">
                                                这是个好想法，后续再开发.....
                                            </template>
                                        </el-table-column>
                                    </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="orderEntity.orderSn" header-align="center" align="center"
                                         label="订单编号"></el-table-column>
                        <el-table-column header-align="center" align="center" label="收货人">
                                         <template slot-scope="scope">
                                             <el-row :gutter="10">
                                                 <el-col :span="24">
                                                     <el-tooltip class="item" effect="dark" placement="left">
                                                        <div slot="content">
                                                            <span style="color: white;font-weight: 800">{{
                                                                    scope.row.orderEntity.receiverName
                                                                }}</span><br/>
                                                            <span
                                                                style="padding: 10px 0;color: white">{{
                                                                    scope.row.orderEntity.receiverProvince
                                                                }}{{
                                                                    scope.row.orderEntity.receiverCity
                                                                }}{{
                                                                    scope.row.orderEntity.receiverRegion
                                                                }}{{ scope.row.orderEntity.receiverDetailAddress }}</span><br/>
                                                            <span
                                                                style="padding: 10px 0;color: white">{{
                                                                    scope.row.orderEntity.receiverPhone
                                                                }}</span>
                                                        </div>
                                                        <span>{{ scope.row.orderEntity.receiverName }}
                                                            <i class="el-icon-s-custom"></i></span>
                                                    </el-tooltip>
                                                 </el-col>
                                             </el-row>
                                         </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center"
                                         label="订单来源">
                                         <template slot-scope="scope">
                                             <span v-show="scope.row.orderEntity.sourceType==0">PC订单</span>
                                             <span v-show="scope.row.orderEntity.sourceType==1">APP订单</span>
                                         </template>
                        </el-table-column>
                        <el-table-column prop="orderEntity.totalAmount" header-align="center" align="center"
                                         label="订单金额"></el-table-column>
                        <el-table-column prop="orderEntity.payAmount" header-align="center" align="center"
                                         label="应付金额"></el-table-column>
                        <el-table-column header-align="center" align="center" label="支付方式">
                            <template slot-scope="scope">
                                在线支付
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center"label="下单时间">
                            <template slot-scope="scope">
                                {{scope.row.orderEntity.createTime.replace("T"," ")}}
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" label="订单状态">
                            <template slot-scope="scope">
                               <!--  {{scope.row.orderEntity.status}} -->
                                <span v-if="scope.row.orderEntity.status==0" style="color: #ff6c00">待付款</span>
                                <span v-if="scope.row.orderEntity.status==1" style="color: #ff6c00">正在出库</span>
                                <span v-if="scope.row.orderEntity.status==2">已发货</span>
                                <span v-if="scope.row.orderEntity.status==3">已完成</span>
                                <span v-if="scope.row.orderEntity.status==4">已取消</span>
                                <span v-if="scope.row.orderEntity.status==5">订单无效</span>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" width="300" label="操作">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.orderEntity.status==1" type="primary" size="mini">发 货</el-button>
                                <el-button v-else type="success" size="mini">已完成</el-button></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>

                <!-- 分页区域 -->
                <el-col style="margin-top: 20px;text-align: center">
                    <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                                   :current-page="page.pageNo"
                                   :page-sizes="[10,20,30,40,50]" :page-size="page.pageSize" :total="page.itemCount"
                                   layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { queryAllByPage } from "@/api/order/order-item";
export default {
    created() {
        this.queryOrderItem();
    },
    data() {
        return {
            orderStatus: 0, //订单状态
            orderItemQuery: { orderSn: "", orderStatus: null, addTime: null }, //订单查询条件
            page: {
                pageNo: 1,
                pageSize: 10,
                pageTotal: 1,
                itemCount: 0,
                items: [],
            },
        };
    },
    methods: {
        //查询订单详细信息
        queryOrderItem() {
            queryAllByPage(
                this.orderItemQuery,
                this.page.pageNo,
                this.page.pageSize
            ).then((response) => {
                this.page = response.data;
            });
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize;
            this.queryOrderItem();
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo;
            this.queryOrderItem();
        },
    },
};
</script>

<style lang="scss" scoped></style>
