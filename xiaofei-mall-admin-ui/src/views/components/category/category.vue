<template>
    <div>
        <!-- 节点过滤 -->
        <el-input placeholder="搜索" v-model="searchValue"></el-input>

        <!-- highlight-current：高亮选中。expand-on-click-node：false需要点击左边小三角才能打开节点 -->
        <el-tree class="filter-tree" :data="categorys" :props="defaultProps" :filter-node-method="filterNode"
                 node-key="catId" highlight-current :expand-on-click-node="true" ref="tree" @current-change="nodeClick"
                 accordion :default-expanded-keys="defaultExpandedKeys">
        </el-tree>
    </div>
</template>

<script>

import {queryAllCategory} from '@/api/product/category'

export default {
    methods: {
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

        //节点选中触发的事件
        nodeClick(value, node,component) {
            //向父组件发送事件；
            this.$emit("tree-node-click", value, node, component);
        }
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

    watch: {
        //监听搜索框的值，如果值一改变，就调用过滤节点的方法
        searchValue(val) {
            this.$refs.tree.filter(val);
        }
    },

};
</script>

<style scoped>

</style>
