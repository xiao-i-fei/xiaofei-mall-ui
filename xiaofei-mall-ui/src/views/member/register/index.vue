<template>
    <div class="register-page" style="height: 100%">
        <div class="register-page">


            <div class="xiaofei-center xiaofei-register">


                <div class="register-title">
                    创建你的商城账户
                </div>

                <div class="register-subtitle">
                    已有商城账户？<span>登录</span>
                </div>

                <div class="register-main">

                    <div class="item">
                        <label>账号：<input type="text" class="xiaofei-clear-input register-input"/></label>
                    </div>
                    <div class="item">
                        <label>密码：<input type="password" class="xiaofei-clear-input register-input"/></label>
                    </div>
                    <div class="item">
                        <label>手机号码：<input class="xiaofei-clear-input register-input"/></label>
                    </div>
                    <div class="item">
                        <label>邮箱：<input class="xiaofei-clear-input register-input"/></label>
                    </div>
                    <div class="item">
                        <label>验证码：<input type="number" class="xiaofei-clear-input register-input"/></label>
                    </div>
                    <div class="item">
                        <label>账号：<input class="xiaofei-clear-input register-input"/></label>
                    </div>


                </div>

                <!--                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                                    <el-form-item label="活动名称" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>

                                    <el-form-item label="活动区域" prop="region">
                                        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="活动时间" required>
                                        <el-col :span="11">
                                            <el-form-item prop="date1">
                                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                                                style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="11">
                                            <el-form-item prop="date2">
                                                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2"
                                                                style="width: 100%;"></el-time-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="即时配送" prop="delivery">
                                        <el-switch v-model="ruleForm.delivery"></el-switch>
                                    </el-form-item>

                                    <el-form-item label="活动性质" prop="type">
                                        <el-checkbox-group v-model="ruleForm.type">
                                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>

                                    <el-form-item label="特殊资源" prop="resource">
                                        <el-radio-group v-model="ruleForm.resource">
                                            <el-radio label="线上品牌商赞助"></el-radio>
                                            <el-radio label="线下场地免费"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>

                                    <el-form-item label="活动形式" prop="desc">
                                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                                    </el-form-item>

                                    <el-form-item style="text-align: center">
                                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                                    </el-form-item>

                                </el-form>-->

            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    {required: true, message: '请输入活动名称', trigger: 'blur'},
                    {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                ],
                region: [
                    {required: true, message: '请选择活动区域', trigger: 'change'}
                ],
                date1: [
                    {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                ],
                date2: [
                    {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                ],
                type: [
                    {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                ],
                resource: [
                    {required: true, message: '请选择活动资源', trigger: 'change'}
                ],
                desc: [
                    {required: true, message: '请填写活动形式', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="scss" scoped>
$width: 860px;

.register-input {
    width: 80%;
    border: 0;
    border-bottom: 2px solid #CBC5BF;
    margin-left: 30px;


    &:focus {
        border-color: #6a9d67;
    }
}

.item {
    margin: 10px 0;
}

.register-page {
    background: url(../../../assets/images/background_oeuhe7.jpg) no-repeat fixed 58% 20% / cover;
    background-size: cover;

    &:before {
        content: ".";
        display: BLOCK;
        height: 0;
        clear: BOTH;
        visibility: HIDDEN;
    }
}

.xiaofei-register {
    width: 50%;
    margin-top: 60px;
    max-width: $width;
    border-radius: 10px;
    background-color: rgba(252, 251, 250, 0.7);
    padding: 50px;

    .register-title {
        color: #003D5B;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }

    .register-subtitle {
        color: #333333;
        text-align: center;
        margin-bottom: 30px;
        font-size: 18px;

        span {
            color: #bb501c;
        }

        .register-main {

        }
    }
}
</style>
