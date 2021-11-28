<template>
    <div>
        <el-row :gutter="10" style="margin-top:20px">

            <!-- 数据展示区域 -->
            <el-col :span="22" :offset="1">

                <!-- 添加搜索条件区域 -->
                <el-col :span="24">
                    <el-form :inline="true" :model="skuSearchVo" @keyup.enter.native="getSkuInfo()">
                        <el-form-item label="分类">
                            <category-cascader :catelogPath.sync="catelogPath"></category-cascader>
                        </el-form-item>
                        <el-form-item label="品牌">
                            <brand-select style="width:160px"></brand-select>
                        </el-form-item>
                        <el-form-item label="销量">
                            <el-select placeholder="请选择" v-model="skuSearchVo.saleCount" filterable clearable>
                                <el-option label="销量最少" value="-1"></el-option>
                                <el-option label="正常排序" value="0"></el-option>
                                <el-option label="销量最多" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格">
                            <el-input-number style="width:160px" v-model.number="skuSearchVo.minPrice"
                                             :min="0"></el-input-number>
                            -
                            <el-input-number style="width:160px" v-model.number="skuSearchVo.maxPrice"
                                             :min="0"></el-input-number>
                        </el-form-item>
                        <el-form-item label="检索">
                            <el-input style="width:160px" v-model="skuSearchVo.searchValue" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchSkuInfo(false)">查询</el-button>
                            <el-button type="primary" @click="searchSkuInfo(true)">查询全部</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <!-- 数据展示区域 -->
                <el-col :span="24">
                    <el-table :data="page.items" border v-loading="dataListLoading"
                              @selection-change="selectionChangeHandle" style="width: 100%;"
                              @expand-change="getSkuDetails">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                商品标题：{{ scope.row.skuTitle }}<br/>
                                商品副标题：{{ scope.row.skuSubtitle }}<br/>
                                商品描述：{{ scope.row.skuDesc }}<br/>
                                分类ID：{{ scope.row.catalogId }}<br/>
                                SpuID：{{ scope.row.spuId }}<br/>
                                品牌ID：{{ scope.row.brandId }}<br/>
                            </template>
                        </el-table-column>
                        <el-table-column type="selection" header-align="center" align="center"
                                         width="50"></el-table-column>
                        <el-table-column prop="skuId" header-align="center" align="center"
                                         label="skuId"></el-table-column>
                        <el-table-column prop="skuName" header-align="center" align="center"
                                         label="名称"></el-table-column>
                        <el-table-column prop="skuDefaultImg" header-align="center" align="center" label="默认图片">
                            <template slot-scope="scope">
                                <el-image alt="" lazy :preview-src-list="skuImages" :src="scope.row.skuDefaultImg"
                                          style="width:80px;height:80px;" @click="preview(scope.row.skuId)"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" header-align="center" align="center" label="价格"></el-table-column>
                        <el-table-column prop="saleCount" header-align="center" align="center"
                                         label="销量"></el-table-column>
                        <el-table-column header-align="center" align="center" width="300" label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="text" icon="el-icon-edit" @click="preview(scope.row.skuId)"
                                >预览
                                </el-button>
                                <el-button size="mini" type="text" icon="el-icon-edit" @click="skuInfoUpdate(scope.row)"
                                           v-hasPermi="['product:skuinfo:edit']">修改
                                </el-button>
                                <el-dropdown @command="handleCommand($event,scope.row)">
                                     <span class="el-dropdown-link">
                                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                                     </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item command="/product/spu/skuedit">商品信息修改</el-dropdown-item>
                                        <el-dropdown-item command="上传图片路由，后续添加">上传图片</el-dropdown-item>
                                        <el-dropdown-item command="参与秒杀路由，后续添加">参与秒杀</el-dropdown-item>
                                        <el-dropdown-item command="满减设置路由，后续添加">满减设置</el-dropdown-item>
                                        <el-dropdown-item command="折扣设置路由，后续添加">折扣设置</el-dropdown-item>
                                        <el-dropdown-item command="会员价格路由，后续添加">会员价格</el-dropdown-item>
                                        <el-dropdown-item command="库存管理路由，后续添加">库存管理</el-dropdown-item>
                                        <el-dropdown-item command="优惠劵路由，后续添加">优惠劵</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>

                <!-- 分页区域 -->
                <el-col style="margin-top: 20px;text-align: center;margin-bottom:20px;" :span="22" :offset="1" te>
                    <el-pagination @size-change="changePageSize" @current-change="changePageNo"
                                   :current-page="page.pageNo"
                                   :page-sizes="[30,40,50,60,70,80]" :page-size="page.pageSize" :total="page.itemCount"
                                   layout="total, sizes, prev, pager, next, jumper">
                    </el-pagination>
                </el-col>

            </el-col>

        </el-row>

        <!-- 添加或修改sku信息对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                <el-form-item label="spuId" prop="spuId">
                    <el-input v-model="form.spuId" placeholder="请输入spuId"/>
                </el-form-item>
                <el-form-item label="sku名称" prop="skuName">
                    <el-input v-model="form.skuName" placeholder="请输入sku名称"/>
                </el-form-item>
                <el-form-item label="sku介绍描述" prop="skuDesc">
                    <el-input v-model="form.skuDesc" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item label="所属分类id" prop="catalogId">
                    <el-input v-model="form.catalogId" placeholder="请输入所属分类id"/>
                </el-form-item>
                <el-form-item label="品牌id" prop="brandId">
                    <el-input v-model="form.brandId" placeholder="请输入品牌id"/>
                </el-form-item>
                <el-form-item label="默认图片" prop="skuDefaultImg">
                    <el-select v-model="form.skuDefaultImg" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
                        <el-option style="height: 150px" v-for="(item,index) in skuImages"
                                   :key="index" :label="item" :value="item">
                            <el-image style="width: 150px;height: 150px" :src="item"></el-image>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标题" prop="skuTitle">
                    <el-input v-model="form.skuTitle" placeholder="请输入标题"/>
                </el-form-item>
                <el-form-item label="副标题" prop="skuSubtitle">
                    <el-input v-model="form.skuSubtitle" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
                <el-form-item label="价格" prop="price">
                    <el-input v-model="form.price" placeholder="请输入价格"/>
                </el-form-item>
                <el-form-item label="销量" prop="saleCount">
                    <el-input v-model="form.saleCount" placeholder="请输入销量"/>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import BrandSelect from '@/views/components/brand/brand-select'
import CategoryCascader from '@/views/components/category/category-cascader'
import PubSub from 'pubsub-js'
import {querySkuInfoByPage, getSkuImageBySkuId, getInfo, updateInfo} from "@/api/product/sku-info";

export default {
    data() {
        return {
            // 遮罩层
            loading: true,
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 表单参数
            form: {},
            // 表单校验
            rules: {},
            page: {
                pageNo: 1,
                pageSize: 30,
                pageTotal: 1,
                itemCount: 0,
                items: []
            },
            catPathSub: null,
            brandIdSub: null,
            skuSearchVo: {
                searchValue: "",
                brandId: 0,
                catelogId: 0,
                saleCount: "",
                minPrice: "",
                maxPrice: "",
            },
            dataListLoading: false,
            dataListSelections: [],
            addOrUpdateVisible: false,
            catelogPath: [],
            skuImages: [],//大图预览时的图片
        };
    },
    components: {
        CategoryCascader,
        BrandSelect
    },
    activated() {
        this.getSkuInfo();
    },
    methods: {
        //查看sku的相关信息
        getSkuDetails(row, expand) {
            //sku详情查询
            console.log("展开某行...", row, expand);
        },
        /** 提交按钮 */
        submitForm() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.skuId != null) {
                        updateInfo(this.form).then(response => {
                            this.$modal.msgSuccess("修改成功");
                            this.open = false;
                        });
                    }
                }
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                skuId: null,
                spuId: null,
                skuName: null,
                skuDesc: null,
                catalogId: null,
                brandId: null,
                skuDefaultImg: null,
                skuTitle: null,
                skuSubtitle: null,
                price: null,
                saleCount: null
            };
            this.resetForm("form");
        },
        /** 修改按钮操作 */
        skuInfoUpdate(row) {
            this.preview(row.skuId)
            this.reset();
            const skuId = row.skuId || this.ids
            getInfo(skuId).then(response => {
                this.form = response.data;
                this.open = true;
                this.title = "修改sku信息";
            });
        },
        //搜索按钮
        searchSkuInfo(isAll) {
            if (isAll) {
                this.skuSearchVo = {
                    searchValue: "",
                    brandId: 0,
                    catelogId: 0,
                    saleCount: "",
                    minPrice: "",
                    maxPrice: "",
                }
            }
            this.getSkuInfo();
        },
        // 获取数据列表
        getSkuInfo() {
            this.dataListLoading = true;
            querySkuInfoByPage(this.page.pageNo, this.page.pageSize, this.skuSearchVo).then(response => {
                if (response.data && response.code === 200) {
                    this.page = response.data;
                } else {
                    this.page = {
                        pageNo: 1,
                        pageSize: 8,
                        pageTotal: 1,
                        itemCount: 0,
                        items: []
                    };
                }
                this.dataListLoading = false;
            });
        },
        //修改每一页显示的数量
        changePageSize(pageSize) {
            this.page.pageSize = pageSize
            this.getSkuInfo()
        },
        //预览部分
        preview(skuId) {
            this.skuImages = []
            //查询指定商品的所有图片
            getSkuImageBySkuId(skuId).then(response => {
                if (response.code == 200) {
                    let images = [];
                    response.data.forEach(image => {
                        images.push(image.imgUrl)
                    });
                    this.skuImages = images;
                }

            })

            //this.$message.info("预览功能待完善")
        },
        //评论功能
        comment() {
            this.$message.info("评论功能待完善")
        },
        //修改当前页，上一页或下一页
        changePageNo(pageNo) {
            this.page.pageNo = pageNo
            this.getSkuInfo()
        },
        // 多选
        selectionChangeHandle(val) {
            console.log("多选选中的数据为：", val)
            this.dataListSelections = val;
        },
        //最右边下拉框选择触发的
        handleCommand(command, sku) {
            this.$router.push({
                path: `${command}`,
                query: {skuId: sku.skuId}
            })
        }
    },
    mounted() {
        this.getSkuInfo()
        this.catPathSub = PubSub.subscribe("catPath", (msg, val) => {
            this.skuSearchVo.catelogId = val[val.length - 1];
        });
        this.brandIdSub = PubSub.subscribe("brandId", (msg, val) => {
            this.skuSearchVo.brandId = val;
        });

    },
    beforeDestroy() {
        PubSub.unsubscribe(this.catPathSub);
        PubSub.unsubscribe(this.brandIdSub);
    } //生命周期-销毁之前
};
</script>

<style scoped>

</style>
