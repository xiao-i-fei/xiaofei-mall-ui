<template>
    <div>
        <el-cascader filterable clearable placeholder="试试搜索：手机" v-model="paths" :options="categorys"
                     :props="setting"></el-cascader>
    </div>
</template>

<script>

import {listTree} from "@/api/product/category";

export default {
    //接受父组件传来的值
    props: {
        catelogPath: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        //这里存放数据
        return {
            setting: {
                value: "catId",
                label: "name",
                children: "children"
            },
            categorys: [],
            paths: this.catelogPath
        };
    },
    watch: {
        catelogPath(value) {
            this.paths = this.catelogPath;
        },
        paths(value) {
            this.$emit("update:catelogPath", value);
            //还可以使用pubsub-js进行传值
            //this.PubSub.publish("catPath", value);
        }
    },
    //方法集合
    methods: {
        getCategorys() {
            listTree().then(response => {
                this.categorys = response.data;
            })
        }
    },
    //生命周期创建完成（可以访问当前this实例）
    created() {
        this.getCategorys();
    }
};
</script>
<style scoped>
</style>
