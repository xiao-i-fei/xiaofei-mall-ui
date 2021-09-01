<template>
    <div>
        <el-row>
            <!-- 增删查功能区 -->
            <el-col :span="22" :offset="1">
                <el-form style="margin: 20px 0 20px 0" :inline="true" @keyup.enter.native="">
                    <el-form-item>
                        <el-input v-model="searchValue" placeholder="参数名" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="queryBrand(false)">查询</el-button>
                        <el-button type="success" @click="queryBrand(true)">查询全部</el-button>
                        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
                        <!-- 这里要调用方法，不能直接写方法名字，如果直接写方法名字，会默认传入一个参数，event事件 -->
                        <el-button type="danger" @click="deleteBrand()" :disabled="selectBrands.length<=0">批量删除
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>

            <!-- 数据展示区域 -->
            <el-col :span="22" :offset="1">

                <!-- 商家信息展示区 -->
                <el-table :data="page.items" border v-loading="" @selection-change="selectionChangeHandle"
                          style="width: 100%;">
                    <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
                    <el-table-column prop="brandId" header-align="center" align="center" label="品牌id"></el-table-column>
                    <el-table-column prop="name" header-align="center" align="center" label="品牌名"></el-table-column>
                    <el-table-column prop="logo" header-align="center" align="center" label="品牌logo">
                        <template slot-scope="scope"><img alt="" style="height: 36px;object-fit: contain" :src="scope.row.logo"/></template>
                    </el-table-column>
                    <el-table-column prop="descript" header-align="center" align="center" label="介绍"></el-table-column>
                    <el-table-column prop="showStatus" header-align="center" align="center" label="显示状态">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.showStatus" active-color="#13ce66" inactive-color="#ff4949"
                                       :active-value="1" :inactive-value="0" @change="updateBrandStatus(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column prop="firstLetter" header-align="center" align="center"
                                     label="检索首字母"></el-table-column>
                    <el-table-column prop="sort" header-align="center" align="center" label="排序"></el-table-column>
                    <el-table-column header-align="center" align="center" width="250" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="updateBrandCategory(scope.row.brandId)">关联分类
                            </el-button>
                            <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.brandId)">修改
                            </el-button>
                            <el-button type="text" size="small" @click="deleteBrand(scope.row.brandId)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-col>

            <!-- 分页区域 -->
            <el-col style="margin-top: 20px;text-align: center" :span="22" :offset="1">
                <el-pagination @size-change="changePageSize" @current-change="changePageNo" :current-page="page.pageNo"
                               :page-sizes="[8,12,16,20,24]" :page-size="page.pageSize" :total="page.itemCount"
                               layout="total, sizes, prev, pager, next, jumper">
                </el-pagination>
            </el-col>

            <!-- 修改品牌和类别的关联信息 -->
            <el-dialog title="品牌和类别关联" :close-on-click-modal="false" :visible.sync="visible">

                <el-popover placement="right-end" v-model="cascaderVisible">
                    <el-cascader v-model="catelogPath" :options="categorys" :props="categoryProps"
                                 @change="categorySelect"></el-cascader>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="cascaderVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="addRelation()">确定</el-button>
                    </div>
                    <el-button slot="reference">新增关联</el-button>
                </el-popover>

                <el-table :data="categoryBrandRelations" style="width: 100%">
                    <el-table-column prop="id" label="#"></el-table-column>
                    <el-table-column prop="brandName" label="品牌名"></el-table-column>
                    <el-table-column prop="catelogName" label="分类名"></el-table-column>
                    <el-table-column fixed="right" header-align="center" align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small"
                                       @click="deleteCategoryBrandRelation(scope.row.id,scope.row.brandId)">移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible=false">取消</el-button>
                </span>

            </el-dialog>
        </el-row>

        <add-or-update :queryBrand="queryBrand"/>
    </div>
</template>

<script>

import {queryBrandByPage, deleteBrandById, updateBrand} from '@/api/product/brand'
import AddOrUpdate from '@/views/product/brand/brand-add-or-update.vue'
import {listTree} from "@/api/product/category";
import {
    addCategoryBrandRelation,
    queryCategoryBrandRelationByBrandId,
    deleteCategoryBrandRelation
} from "@/api/product/category-brand-relation";


export default {
    components: {
        AddOrUpdate
    },
    data() {
        return {
            //这里的props是给级联选择器配置
            categoryProps: {
                value: "catId",
                label: "name",
                children: "children",
                expandTrigger: 'hover'
            },
            categoryBrandRelations: [],
            categoryBrandRelation: {
                id: "",
                brandId: "",
                catelogId: "",
                brandName: "",
                catelogName: "",
            },
            categorys: [],//级联选择器全部的值
            catelogPath: [],//级联选择器选中后的值
            cascaderVisible: false,//级联选择器是否显示
            visible: false,//模态框是否显示
            //===================上面为品牌和类别关联需要的数据============================
            attrType: "",//添加还是修改
            addOrUpdateVisible: false,//判断是否添加或删除
            searchValue: "",//搜索条件
            page: {
                pageNo: 1,
                pageSize: 8,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            selectBrands: []
        }
    },

    //加载数据
    mounted() {
        this.queryBrand()
    },

    methods: {
        // 新增 / 修改
        addOrUpdateHandle(id) {
            //发布消息
            this.$bus.$emit('addOrUpdateBrand', id)
        },
        //分页获取商家的信息
        queryBrand(isQueryAll) {
            this.searchValue = isQueryAll ? "" : this.searchValue;
            queryBrandByPage(this.page.pageNo, this.page.pageSize, this.searchValue).then(response => {
                this.page = response.data
            });
        },

        //修改商家的显示状态
        updateBrandStatus(data) {
            updateBrand(data)
        },

        //复选框选中之后会执行的方法
        selectionChangeHandle(select) {
            this.selectBrands = select
        },

        //批量删除或单个删除商家信息
        deleteBrand(brandId) {
            //将所有id提取出来，判断是批量删除还是非批量删除
            let brandIds = brandId ? [brandId] : this.selectBrands.map(item => {
                return item.brandId
            })

            //确认框，确认之后请求后台接口
            this.$confirm(`是否删除id为【${brandIds}】的商家`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteBrandById(String(brandIds)).then(response => {
                    if (response.data) this.$message.success("删除成功")
                    else this.$message.error("删除失败")
                })
            }).catch(() => {
            })
        },

        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.queryBrand()
        },

        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.queryBrand()
        },

        //========================下面为品牌和类别需要用到的方法=============================


        /**
         * 打开添加关联方分类的模态框
         */
        updateBrandCategory(brandId) {
            this.visible = true
            this.categoryBrandRelation.brandId = brandId
            this.queryCategoryBrandRelation(brandId)
            //查询级联选择器中的值
            this.queryCategoryTree()
        },

        //获取指定商家绑定的数据
        queryCategoryBrandRelation(brandId) {
            //查询该商家已经关联的分类
            queryCategoryBrandRelationByBrandId(brandId).then(response => {
                this.categoryBrandRelations = response.data
            })
        },

        //根据id和商家id删除
        deleteCategoryBrandRelation(id, brandId) {
            this.$confirm(`是否删除id为【${id}】的关联分类信息`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteCategoryBrandRelation(id, brandId).then(response => {
                    if (response.data) {
                        this.$message.success("删除成功")
                        //刷新关联上数据
                        this.queryCategoryBrandRelation(this.categoryBrandRelation.brandId)
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            }).catch(() => {
            })

        },

        //获取级联选择器中的值
        queryCategoryTree() {
            this.cascaderVisible = true
            listTree().then(response => {
                this.categorys = response.data
            })
        },


        //级联选择器选中之后触发的函数
        categorySelect(value) {
            if (value.length > 0) {
                this.categoryBrandRelation.catelogId = value[value.length - 1]
            }
        },

        //添加商家和类别关联的信息
        addRelation() {
            addCategoryBrandRelation(this.categoryBrandRelation).then(response => {
                if (response.data) {
                    this.$message.success("添加成功")
                    //清空级联选择器中的属性
                    this.catelogPath = []
                    //关闭模态框
                    this.cascaderVisible = false;
                    //刷新关联上数据
                    this.queryCategoryBrandRelation(this.categoryBrandRelation.brandId)
                } else {
                    this.$message.error("添加失败")
                }
            })
        },

        //关闭商家和类别的模态框
        closeBrandCategoryRelation() {
            this.categoryBrandRelation = {
                id: "",
                brandId: "",
                catelogId: "",
                brandName: "",
                catelogName: "",
            };
            this.categoryBrandRelations = [];
            this.visible = false;
            this.cascaderVisible = false;
            this.catelogPath = []
        }


    }

};
</script>

<style scoped>

</style>

