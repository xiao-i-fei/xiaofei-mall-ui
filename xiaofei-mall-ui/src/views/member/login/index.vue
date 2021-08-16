<template>
    <div>
        <div class="login-register-main">
            <div :class="{'container':true,'right-panel-active':loginRegisterSwitch}">
                <!-- 注册 -->
                <div class="container__form container--signup">
                    <form class="form" id="form1">
                        <h2 class="form__title">注册</h2>
                        <label><input type="text" v-model="userInfo.username" placeholder="用户名" class="input"></label>
                        <label><input type="password" v-model="userInfo.password" placeholder="密码"
                                      class="input"></label>
                        <label><input type="email" v-model="userInfo.email" placeholder="邮箱" class="input"></label>
                        <label><input type="text" v-model="userInfo.code" placeholder="邮箱验证码" class="input"></label>
                        <button class="btn">注册</button>
                    </form>
                </div>

                <!-- 登录 -->
                <div class="container__form container--signin">
                    <form action="" class="form" id="form2">
                        <h2 class="form__title">登录</h2>
                        <input type="email" v-model="userInfo.email" placeholder="邮箱" class="input">
                        <input type="password" v-model="userInfo.password" placeholder="密码" class="input">
                        <a href="#" class="link" @click="findPassword">找回密码</a>
                        <button class="btn" type="button">登录</button>
                    </form>
                </div>

                <!-- 覆盖 -->
                <div class="container__overlay">
                    <div class="overlay">
                        <div class="overlay__panel overlay--left">
                            <button class="btn" id="signIn" @click="loginRegisterSwitch=false">登录</button>
                            <a href="/" class="btn" style="margin-top: 20px;text-decoration: none">首页</a>
                        </div>
                        <div class="overlay__panel overlay--right">
                            <button class="btn" id="signUp" @click="loginRegisterSwitch=true">注册</button>
                            <a href="/" class="btn" style="margin-top: 20px;text-decoration: none">首页</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        //找回密码
        findPassword() {
            this.$message.error("该功能尚未推出")
        }

    },
    data() {
        return {
            loginRegisterSwitch: false,//点击登录按钮的显示方式
            userInfo: {
                username: "",//用户名
                email: "",//用户邮箱
                password: "",//用户密码
                code: "",//验证码
            }
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
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
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
</style>
