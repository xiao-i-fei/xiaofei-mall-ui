<template>
    <div>
        <el-row :gutter="10">
            <el-col :offset="1" :span="22">
                <el-col :span="24">orderEntity</el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
//================引入echarts---start==========================
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
//================引入echarts---end============================
export default {
    name: "index",
    data() {
        return {
            // 版本号
            version: "3.0.0",
        };
    },
    methods: {
        goTarget(href) {
            window.open(href, "_blank");
        },
    },
};
</script>

