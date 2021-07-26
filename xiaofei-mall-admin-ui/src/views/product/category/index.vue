<template>
    <div>
        <el-row>
            <el-col style="margin-top: 20px" :span="22" :offset="1">
                <!-- 节点过滤 -->
                <el-input placeholder="搜索" v-model="searchValue"></el-input>

                <!-- highlight-current：高亮选中。expand-on-click-node：需要点击左边小三角才能打开节点 -->
                <el-tree class="filter-tree" :data="categorys" :props="defaultProps" :filter-node-method="filterNode"
                         node-key="catId" highlight-current :expand-on-click-node="false" ref="tree"
                         accordion :current-node-key="2" :default-expanded-keys="defaultExpandedKeys">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button v-if="node.level <= 2" type="text" size="mini"
                                       @click="() => update(data,'add')">添加</el-button>
                            <el-button v-if="node.childNodes.length === 0" type="text" size="mini"
                                       @click="() => remove( data)">删除</el-button>
                            <el-button type="text" size="mini" @click="() => update(data,'update')">修改</el-button>
                        </span>
                    </span>
                </el-tree>

            </el-col>
        </el-row>

        <!-- 引入添加和修改的组件 -->
        <category-add-or-update :getAll="getAll"/>
    </div>
</template>

<script>

import {queryAllCategory, deleteCategoryById} from '@/api/product/category'
import categoryAddOrUpdate from "@/views/product/category/category-add-or-update";
import pubsub from 'pubsub-js'

export default {
    methods: {

        //删除节点
        remove(data) {
            this.$confirm(`是否删除【${data.name}】`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deleteCategoryById(data.catId).then(response => {
                    if (response.data) {
                        this.$message.success("删除成功")
                        //更新数据
                        this.getAll()
                        //刷新数据之后设置默认展开的父节点，前面node-key属性的值，区分了每一个节点
                        this.defaultExpandedKeys = [data.parentCid]
                    } else {
                        this.$message.error("删除失败")
                    }
                })
            }).catch(() => {
                this.$message.info("已取消")
            })
        },

        //修改节点
        update(data, update) {
            let updateData;
            if (update === "add") {
                updateData = {"category": data, "update": "add"}
            } else {
                updateData = {"category": data, "update": "update"}
            }
            //发布一个消息
            pubsub.publish('updateCategory', updateData)
            //打开选中的节点
            this.defaultExpandedKeys = [data.catId]
        },

        //查询所有商品类别
        getAll() {
            queryAllCategory().then(response => {
                this.categorys = response.data
            });
        },

        //过滤节点，用于搜索
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
    },

    data() {
        return {
            defaultExpandedKeys: [],//默认打开的节点
            searchValue: "",
            categorys: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        };
    },

    //初始化
    created() {
        //加载页面数据
        this.getAll()
    },

    //组件
    components: {
        categoryAddOrUpdate
    },

    watch: {
        //监听搜索框的值，如果值一改变，就调用过滤节点的方法
        searchValue(val) {
            this.$refs.tree.filter(val);
        }
    },

};
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 28px;
}
</style>
