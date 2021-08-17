<template>
    <div>
        <div class="login-register-main">
            <div :class="{'container':true,'right-panel-active':loginRegisterSwitch}">
                <!-- 注册 -->
                <div class="container__form container--signup">
                    <form class="form verify-code" id="form1">
                        <h2 class="form__title">注册</h2>
                        <label>
                            <input type="text" v-model="userInfo.username" placeholder="用户名"
                                   :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.username!=''&&errorInfo.username.length>0}">
                            <span>{{ errorInfo.username }}</span>
                        </label>
                        <label><input type="password" v-model="userInfo.password" placeholder="密码"
                                      :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.password!=''&&errorInfo.password.length>0}">
                            <span>{{ errorInfo.password }}</span>
                        </label>
                        <label>
                            <input type="email" v-model="userInfo.email" placeholder="邮箱"
                                   :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.email!=''&&errorInfo.email.length>0}">
                            <span>{{ errorInfo.email }}</span>
                        </label>
                        <label>
                            <input type="text" v-model="userInfo.code" placeholder="邮箱验证码"
                                   :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.code!=''&&errorInfo.code.length>0}">
                            <span>{{ errorInfo.code }}</span>
                        </label>
                        <button class="btn" type="button" @click="regist">注册</button>
                        <span class="verify-btn" @click="sendCode">发送验证码</span>
                    </form>
                </div>

                <!-- 登录 -->
                <div class="container__form container--signin">
                    <form action="" class="form  verify-code" id="form2">
                        <h2 class="form__title">登录</h2>

                        <label>
                            <input type="email" v-model="userInfo.username" placeholder="用户名"
                                   :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.username!=''&&errorInfo.username.length>0}">
                            <span>{{ errorInfo.username }}</span>
                        </label>

                        <label>
                            <input type="password" v-model="userInfo.password" placeholder="密码"
                                   :class="{'xiaofei-clear-input':true,'input':true,'error-light':errorInfo.password!=''&&errorInfo.password.length>0}">
                            <span>{{ errorInfo.password }}</span>
                        </label>

                        <a href="#" class="link" @click="findPassword">找回密码</a>
                        <button class="btn" type="button" @click="login">登录</button>
                    </form>
                </div>

                <!-- 覆盖 -->
                <div class="container__overlay">
                    <div class="overlay">
                        <div class="overlay__panel overlay--left">
                            <button class="btn" id="signIn" @click="loginAndRegistSwitch('login')">登录</button>
                            <a href="/" class="btn" style="margin-top: 20px;text-decoration: none">首页</a>
                        </div>
                        <div class="overlay__panel overlay--right">
                            <button class="btn" id="signUp" @click="loginAndRegistSwitch('regist')">注册</button>
                            <a href="/" class="btn" style="margin-top: 20px;text-decoration: none">首页</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import {sendEmailCode, userLogin, userRegister} from "@/api/auth/auth";
import Cookies from "js-cookie";
import {getMemberByToken} from '@/api/member/member'

export default {
    created() {
        //获取传入的参数，判断是登录还是注册
        if (this.$route.params.flag == "regist") {
            this.loginRegisterSwitch = true;
        }
    },
    methods: {
        //找回密码
        findPassword() {
            this.$message.error("该功能尚未推出")
        },

        //切换登录和注册
        loginAndRegistSwitch(flag = 'login') {
            if (flag == "login") {
                this.loginRegisterSwitch = false
                this.clearUserInfo()
            } else if (flag == "regist") {
                this.loginRegisterSwitch = true;
                this.clearUserInfo()
            }
        },

        //清空填写的用户信息和错误信息
        clearUserInfo() {
            this.userInfo = {username: "", email: "", password: "", code: ""}
            this.errorInfo = {username: "", email: "", password: "", code: ""};
        },

        //注册
        regist() {
            let verify = true;

            console.log("用户名验证：", this.userInfoVerify.username.test(this.userInfo.username));

            //用户名校验
            if (this.userInfo.username.indexOf(" ") > -1) {
                this.errorInfo.username = "不能包含空格"
                verify = false;
            } else if (!this.userInfoVerify.username.test(this.userInfo.username) || this.userInfo.username.length > 11) {
                this.errorInfo.username = "用户名长度6-11";
                verify = verify && false;
            } else {
                this.errorInfo.username = "";
                this.userInfo.username = this.userInfo.username.replace(" ", "");
                verify = verify && true;
            }

            //密码校验
            if (this.userInfo.password.indexOf(" ") > -1) {
                this.errorInfo.password = "不能包含空格"
                verify = verify && false;
            } else if (this.userInfo.password.length > 11 || this.userInfo.password.length < 6) {
                this.errorInfo.password = "密码长度必须为6-11"
                verify = verify && false;
            } else {
                this.errorInfo.password = "";
                this.userInfo.password = this.userInfo.password.replace(" ", "");
                verify = verify && true;
            }

            //邮箱校验
            let email = this.userInfo.email
            if (this.userInfo.email.indexOf(" ") > -1) {
                this.errorInfo.email = "不能包含空格"
                verify = verify && false;
            } else if (!this.userInfoVerify.email.test(email) && email.indexOf("@qq.com") == -1) {
                this.errorInfo.email = "QQ邮箱格式错误"
                verify = verify && false;
            } else {
                this.errorInfo.email = "";
                this.userInfo.email = this.userInfo.email.replace(" ", "");
                verify = verify && true;
            }

            //验证码校验
            if (this.userInfo.code.indexOf(" ") > -1) {
                this.errorInfo.code = "不能包含空格";
                verify = verify && false
            } else if (this.userInfo.code.length != 6) {
                this.errorInfo.code = "验证码错误";
                verify = verify && false
            } else {
                this.errorInfo.code = "";
                this.userInfo.code = this.userInfo.code.replace(" ", "");
                verify = verify && true;
            }

            if (verify) {
                //发送注册请求
                userRegister(this.userInfo).then(response => {
                    if (response.data.isSuccess) {
                        this.$message.success(response.data.message)
                        this.$router.push({path: '/loginorregist/login'});
                    } else {
                        this.$message.error(response.data.message)
                    }

                })
            }
        },

        //发送验证码
        sendCode() {
            let email = this.userInfo.email
            if (this.userInfo.email.indexOf(" ") > -1 || !this.userInfoVerify.email.test(email) && email.indexOf("@qq.com") == -1) {
                this.$message.error("请先填写邮箱信息再发送验证码");
            } else {
                sendEmailCode(this.userInfo.email).then(response => {
                    if (response.code == 200) {
                        this.$message.info(response.data.message);
                    }
                })
            }
        },

        //登录
        login() {
            let verify = true;
            //用户名校验
            if (this.userInfo.username.indexOf(" ") > -1) {
                this.errorInfo.username = "不能包含空格"
                verify = false;
            } else if (!this.userInfoVerify.username.test(this.userInfo.username) || this.userInfo.username.length > 11) {
                this.errorInfo.username = "用户名长度6-11";
                verify = verify && false;
            } else {
                this.errorInfo.username = "";
                this.userInfo.username = this.userInfo.username.replace(" ", "");
                verify = verify && true;
            }

            //密码校验
            if (this.userInfo.password.indexOf(" ") > -1) {
                this.errorInfo.password = "不能包含空格"
                verify = verify && false;
            } else if (this.userInfo.password.length > 11 || this.userInfo.password.length < 6) {
                this.errorInfo.password = "密码长度必须为6-11"
                verify = verify && false;
            } else {
                this.errorInfo.password = "";
                this.userInfo.password = this.userInfo.password.replace(" ", "");
                verify = verify && true;
            }

            if (verify) {
                userLogin(this.userInfo).then(response => {
                    if (response.data.isSuccess) {
                        this.$message.success(response.data.message)
                        //将token保存在浏览器自带的服务器中
                        //window.sessionStorage.setItem("Admin-Token", response.data.token)
                        //window.sessionStorage.setItem("username", response.data.username)
                        //将cookie信息保存在cookie中
                        Cookies.set("Admin-Token", response.data.token, {domain: 'localhost'});
                        Cookies.set("username", response.data.username, {domain: 'localhost'});


                        //获取用户信息
                        getMemberByToken().then(response => {
                            if (response.data.id > 0) {
                                this.userInfo = response.data
                                //将token保存在浏览器自带的服务器中
                                //window.sessionStorage.setItem("userInfo", response.data)
                                //将用户信息保存在cookie中
                                let userInfo = JSON.stringify(response.data)
                                Cookies.set("userInfo", userInfo, {domain: 'localhost'})
                            }
                            this.$router.push({path: '/'});
                        })

                    } else {
                        this.$message.error(response.data.message)
                    }
                })
            }
        }

    },
    data() {
        return {
            errorInfo: {username: "", email: "", password: "", code: ""},
            loginRegisterSwitch: false,//点击登录按钮的显示方式
            userInfo: {username: "", email: "", password: "", checkPass: "", code: ""},
            userInfoVerify: {
                username: /[1-9]([0-9]{5,11})/,
                email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
                password: ""
            }  //用户信息的正则表达式
        }
    }
}
</script>

<style lang="scss" scoped>

.login-register-main {
    align-items: center;
    background: #e9e9e9 url("../../../assets/images/background_oeuhe7.jpg") no-repeat fixed center;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;
}

.form__title {
    font-weight: 300;
    margin: 0 0 1.25rem;
}

.link {
    color: #333;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
}

.container {
    background-color: #e9e9e9;
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 420px;
    max-width: 758px;
    overflow: hidden;
    position: relative;
    width: 100%;
}

.container__form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
}

.container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .container--signin {
    transform: translateX(100%);
}

.container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
}

.container.right-panel-active .container--signup {
    -webkit-animation: show 0.6s;
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
}

.container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
}

.container.right-panel-active .container__overlay {
    transform: translateX(-100%);
}

.overlay {
    background: #008997 url("../../../assets/images/background_oeuhe7.jpg") no-repeat fixed center;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
}

.overlay--left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
    transform: translateX(0);
}

.overlay--right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay--right {
    transform: translateX(20%);
}

.btn {
    background-color: #0367a6;
    background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
    border-radius: 20px;
    border: 1px solid #0367a6;
    color: #e9e9e9;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

.form > .btn {
    margin-top: 1.5rem;
}

.btn {
    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }
}

.form {
    background-color: #e9e9e9;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
}

.input {
    background-color: #fff;
    border: 1px solid #e9e9e9;
    padding: 0.9rem 0.9rem;
    margin: 0.6rem 0;
    width: 100%;
}

@-webkit-keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

//错误高亮显示
.error-light {
    border: 1px solid #f44336;

    &:focus {
        border: 1px solid #f44336;
    }
}

//验证码位置
.verify-code {
    position: relative;

    > label {
        position: relative;

        > span {
            position: absolute;
            z-index: 999;
            color: #f44336;
            font-size: 12px;
            top: 55px;
            left: 5px;
        }
    }

    .verify-btn {
        position: absolute;
        top: 290px;
        left: 240px;
        font-size: 12px;
        color: #026ba4;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>
