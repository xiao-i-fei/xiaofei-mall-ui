<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">
                <!-- 数据展示区域 -->
                <el-col :span="24">
                    <el-table  max-height="1100" :data="page.items" lazy border style="width: 100%;" highlight-current-row>
                        <el-table-column type="expand" label="收获地址" width="80">
                            <template slot-scope="scope">
                                <el-table :data="scope.row.memberReceiveAddressEntitys" lazy border mstyle="width: 100%" highlight-current-row>
                                    <el-table-column prop="id" align="center" header-align="center" label="编号"></el-table-column>
                                    <el-table-column header-align="center" align="center" prop="name" label="收货人"></el-table-column>
                                    <el-table-column header-align="center" align="center" prop="phone" label="联系方式"></el-table-column>
                                    <el-table-column header-align="center" align="center" label="收货地址">
                                        <template slot-scope="scope">
                                            {{scope.row.province}}-
                                            {{scope.row.city}}-
                                            {{scope.row.region}}-
                                            {{scope.row.detailAddress}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column header-align="center" align="center" prop="provincesId" label="邮编"></el-table-column>
                                    <el-table-column header-align="center" align="center" label="操作">
                                        <template slot-scope="scope">
                                            这是个好想法，后续再开发.....
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column prop="memberEntity.id" header-align="center" align="center"
                                         label="会员id"></el-table-column>
                        <el-table-column header-align="center" align="center" prop="memberEntity.levelId" label="会员等级id"></el-table-column>
                        <el-table-column header-align="center" align="center" label="性别">
                            <template slot-scope="scope">
                                <span v-show="scope.row.memberEntity.gender==0">男</span>
                                <span v-show="scope.row.memberEntity.gender==1">女</span>
                            </template>
                        </el-table-column>
                        <el-table-column header-align="center" align="center" label="头像">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.memberEntity.header" lazy fit="contain" style="width:60px;height:60px"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column prop="memberEntity.username" header-align="center" align="center" label="用户名"></el-table-column>
                        <el-table-column prop="memberEntity.nickname" header-align="center" align="center" label="昵称"></el-table-column>
                        <el-table-column prop="memberEntity.mobile" header-align="center" align="center" label="手机号码"></el-table-column>
                        <el-table-column prop="memberEntity.email" header-align="center" align="center" label="QQ邮箱"></el-table-column>
                        <el-table-column prop="memberEntity.birth" header-align="center" align="center"label="生日"></el-table-column>
                        <el-table-column prop="memberEntity.status" header-align="center" align="center"label="启用状态">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.memberEntity.status" :active-value="1" :inactive-value="0"
                                    @change="updateStatus(scope.row)" active-color="#13ce66" inactive-color="#ff4949">
                                </el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column prop="memberEntity.createTime" header-align="center" align="center"label="注册时间"></el-table-column>
                        <el-table-column header-align="center" align="center" width="300" label="操作">
                            <template slot-scope="scope">
                                这是个好想法，后续再开发
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { queryMemberByPage,updateMemberStatus } from "@/api/member/member";
export default {
    data() {
        return {
            memberUpdate:{status:"false"},
            memberQuery: {},
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
        //分页和根据查询条件查询会员信息
        queryMemberByPage() {
            queryMemberByPage(
                this.memberQuery,
                this.pageNo,
                this.pageSize
            ).then((response) => {this.page = response.data});
        },
        //会员状态修改执行的方法
        updateStatus(data){
            //封装信息
            let memberUpdate = {id:data.memberEntity.id,status:data.memberEntity.status}
            updateMemberStatus(memberUpdate).then(response=>{
                if(!response.data){
                    this.$message.error("用户状态修改失败，请重新修改")
                }
            })
        }
    },
    created() {
        this.queryMemberByPage();
    },
};
</script>

<style lang="scss" scoped>
</style>

