<template>
    <div>
        <!-- 搜索条件主要区域  -->
        <div>
            <div class="search-value-main xiaofei-center xiaofei-row">
                <!-- 已选搜索条件区域 -->
                <div class="search-result">
                    <div class="xiaofei-col-1">
                        <a>全部结果 ></a>
                    </div>
                    <!-- 已选搜索值展示区域 -->
                    <div class="xiaofei-col-11">
                        <!-- 选择条件 -->
                        <div class="show-search-value2">
                            <a>
                                <b>品牌：</b>
                                <span> 华为（HUAWEI）</span>
                                <i class="el-icon-close"></i>
                            </a>
                        </div>

                        <!-- 搜索条件 -->
                        <div class="show-search-value">"手机"</div>
                    </div>
                </div>

                <!-- 全部可查询条件区域 -->
                <div class="search-criteria xiaofei-row">
                    <div v-for="index in 3" class="xiaofei-row attr-item">
                        <div class="search-key xiaofei-col-1">cpu型号</div>
                        <div class="search-value xiaofei-col-11">
                            <div>
                                <ul class="xiaofei-clear-level-ul">
                                    <li><a>麒麟9000</a></li>
                                    <li><a>晓龙888</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                    <li><a>晓龙865</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

// 搜索条件选中和展示搜索条件区域区域
.search-value-main {

    //已选搜索条件
    .search-result {
        margin-top: 20px;
        margin-bottom: 20px;
        $height: 20px;
        $line-height: 20px;
        height: $height;
        line-height: $line-height;

        div:nth-child(1) {
            height: $height;
            line-height: $line-height;

            a {
                font-size: 12px;
                color: #666;

                &:hover {
                    cursor: pointer;
                    color: #f30213;
                }
            }
        }

        //展示搜索条件的值
        div:nth-child(2) {
            $height: 20px;
            $line-height: 20px;

            //输入框的搜索条件
            .show-search-value {

                height: $height;
                line-height: $line-height;
                float: left;
                margin-left: 10px;
                color: #666;
                font-weight: 800;
                width: 110px;
                white-space: nowrap; //文本强制不换行
                text-overflow: ellipsis; //文本溢出显示省略号
                overflow: hidden; //溢出的部分隐藏
                font-size: 13px;
            }

            //已选搜索条件的值
            .show-search-value2 {
                float: left;
                //选择框的搜索条件
                a {
                    height: $height;
                    line-height: $line-height;
                    border: 1px solid #dddddd;
                    font-size: 12px;

                    b {
                        color: #333333;
                    }

                    span,
                    i {
                        color: $color;
                    }

                    background-color: #f3f3f3;
                    padding: 5px;

                    &:hover {
                        border: 1px solid $color;
                        cursor: pointer;
                    }
                }

                //解决边框塌陷
                &:after {
                    content: ".";
                    display: block;
                    height: 0;
                    clear: both;
                    visibility: hidden;
                }
            }
        }

        //解决边框塌陷
        &:after {
            content: ".";
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
    }

    //选择筛选条件
    .search-criteria {
        .attr-item {
            background-color: #f3f3f3;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            line-height: 30px;

            .search-key {
                color: #666;
                font-weight: 400;
                font-size: 14px;
            }

            .search-value {
                background-color: white;

                ul {
                    padding-left: 10px;
                }
            }

            //更多和多选按钮
            .search-check-btn {
                height: 100%;
                background-color: white;
            }

            //解决边框塌陷
            &:after {
                content: ".";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
            }

        }
    }
}
</style>
