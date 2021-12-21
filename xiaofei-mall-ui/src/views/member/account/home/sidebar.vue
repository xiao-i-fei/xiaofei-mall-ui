<template>
    <div>

        <div style="background-color:#f0f3ef;padding-bottom: 30px">
            <div class="xiaofei-row xiaofei-center" style="background-color:#f0f3ef;">

                <!-- 左边侧边连区域 -->
                <div class="sidebar-left" style="margin-top: 20px">
                    <!-- 用户中心【修改密码，修改用户信息】 -->
                    <dl>
                        <dt>用户中心</dt>
                        <dd><a @click="memberDialog = true">个人信息</a></dd>
                        <dd><a @click="passwordDialog=true">密码修改</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 订单中心 -->
                    <dl>
                        <dt>订单中心</dt>
                        <dd><a href="/order">我的订单</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 我的钱包 -->
                    <dl>
                        <dt>我的钱包</dt>
                        <dd><a>成长积分</a></dd>
                        <dd><a>购物积分</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>
                    <!-- 我的关注 -->
                    <dl style="border-bottom: 0">
                        <dt>我的关注</dt>
                        <dd><a href="/cart">购物车</a></dd>
                        <dd><a>我的收藏</a></dd>
                        <dd><a>更多>></a></dd>
                    </dl>

                </div>

                <!-- 右面主要区域 -->
                <div class="right-main">
                    <!-- 用户账户和余额显示区域 -->
                    <div class="user-photo">
                        <div class="one">
                            <div class="img">
                                <el-image fit="contain" lazy :src="userInfo.header"
                                          style="width: 64px;height: 64px;border-radius: 50%"/>
                            </div>
                            <div class="nick-name"><a>{{ userInfo.username }}</a></div>
                            <div class="user-bound">
                                <a>成长值{{ memberDetailInfo.memberEntity.growth }}</a>
                                <a>普通会员</a>
                            </div>
                            <div class="user-member">
                                <!--会员尊享10大权益--> <a href="/">去逛逛</a>
                            </div>
                        </div>
                        <div class="two">
                            <h3>我的钱包</h3>
                            <div class="discount">
                                <ul class="xiaofei-clear-level-ul">
                                    <li>
                                        <div><a>{{ memberDetailInfo.memberEntity.integration }}</a></div>
                                        积分
                                    </li>
                                    <li>
                                        <div><a>{{ memberDetailInfo.memberEntity.growth }}</a></div>
                                        成长值
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 我的订单区域 -->
                <div class="order-main">
                    <div class="left">
                        <h3>我的订单</h3>

                        <!-- 有订单的时候 -->
                        <div v-if="memberDetailInfo.orderItems.length>0" class="order">
                            <!-- 订单状态选择 -->
                            <div class="order-state">
                                <router-link :to="{path:`/order?orderStatus=0`}" style="text-decoration: none;color: #333">
                                    <div class="icon-sprite">
                                        <svg style="width: 40px;height: 40px" t="1637996812690" class="icon"
                                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             p-id="5573" width="200" height="200">
                                            <path
                                                d="M800.362059 639.125329c-10.467399 0-18.940374 8.469905-19.016099 18.939351l0 0.038886c0 0 0 0.038886 0 0.079818 0 0 0 0 0 0.038886l0 96.378048c0 21.017686-17.019629 38.038338-38.034245 38.038338L379.591853 792.638655c-0.01842 0-0.01842 0-0.036839 0L212.86969 792.638655c-20.99722 0-38.034245-17.020652-38.034245-38.038338L174.835446 264.310781c0-21.016663 17.037025-38.033221 38.034245-38.033221l530.441001 0c21.014616 0 38.036291 17.016559 38.036291 38.033221l0 102.026698c0 0.038886 0 0.076748 0 0.076748 0 10.510378 8.505721 19.019169 19.016099 19.019169s19.017122-8.509814 19.017122-19.019169c0 0 0-0.037862 0-0.076748l0-105.830327c0-39.916105-32.349779-72.26486-72.26486-72.26486L209.065038 188.242292c-39.915082 0-72.26486 32.348756-72.26486 72.26486l0 497.896794c0 39.917128 32.348756 72.266907 72.26486 72.266907l538.050306 0c39.915082 0 72.26486-32.349779 72.26486-72.266907l0-100.340289C819.340295 647.595234 810.830481 639.125329 800.362059 639.125329z"
                                                p-id="5574"></path>
                                            <path
                                                d="M814.163389 412.369885l-277.060153 0c-37.448914 0-67.855434 28.54615-71.550593 65.010643-0.420579 0.666172-0.724501 1.607614-0.733711 3.294023l0 60.188824c0 39.915082 32.346709 72.26486 72.285327 72.26486l277.060153 0c39.916105 0 72.26793-32.349779 72.26793-72.26486l0-50.699706 0-0.038886 0-5.487991C886.43132 444.719664 854.079494 412.369885 814.163389 412.369885zM848.394005 537.062815c0 21.014616-17.055444 38.030152-38.032198 38.030152L567.098387 575.092967c-0.038886 0-0.038886 0-0.038886 0l-26.15366 0c-21.024849 0-38.046524-17.015535-38.046524-38.030152l0-48.623417c0-20.979824 17.021675-38.035268 38.046524-38.035268l269.455965 0c20.977777 0 38.032198 17.056468 38.032198 38.035268L848.394005 537.062815z"
                                                p-id="5575"></path>
                                            <path
                                                d="M788.639063 489.143433c-12.821003 0-23.212678 10.392698-23.212678 23.212678 0 12.784164 10.390651 23.175839 23.212678 23.175839s23.212678-10.391674 23.212678-23.175839C811.850717 499.536131 801.460066 489.143433 788.639063 489.143433z"
                                                p-id="5576"></path>
                                        </svg>
                                    </div>
                                    <span class="name">待付款</span>
                                </router-link>
                                <router-link :to="{path:`/order?orderStatus=2`}" style="text-decoration: none;color: #333">
                                    <div class="icon-sprite">
                                        <svg style="width: 40px;height: 40px" t="1637997363866" class="icon"
                                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             p-id="24326" width="200" height="200">
                                            <path
                                                d="M114.530462 449.102769l102.025846-111.025231c5.907692-6.419692 14.296615-10.102154 23.000615-10.102153h188.061539v121.127384H114.530462zM469.267692 733.932308V230.321231a31.310769 31.310769 0 0 1 31.232-31.192616h425.353846a31.310769 31.310769 0 0 1 31.232 31.192616v472.398769a31.310769 31.310769 0 0 1-31.232 31.192615H879.655385a111.497846 111.497846 0 0 0-93.538462-89.737846 113.624615 113.624615 0 0 0-16.541538-1.220923c-53.070769 0-99.879385 38.951385-109.784616 90.958769H469.267692z m-350.030769 0a31.310769 31.310769 0 0 1-31.232-31.192616V490.692923h339.633231v243.219692h-42.338462a111.497846 111.497846 0 0 0-93.538461-89.737846 113.624615 113.624615 0 0 0-16.541539-1.220923c-53.070769 0-99.879385 38.951385-109.784615 90.958769H119.217231z m650.496-49.388308a70.301538 70.301538 0 0 1 70.262154 70.183385 70.301538 70.301538 0 0 1-70.262154 70.183384 70.419692 70.419692 0 0 1-70.242461-70.183384 70.301538 70.301538 0 0 1 70.242461-70.183385z m-494.375385 0a70.301538 70.301538 0 0 1 70.242462 70.183385 70.301538 70.301538 0 0 1-70.242462 70.183384 70.419692 70.419692 0 0 1-70.262153-70.183384 70.301538 70.301538 0 0 1 70.262153-70.183385zM275.475692 866.461538c53.070769 0 99.879385-38.951385 109.784616-90.978461h274.510769a111.497846 111.497846 0 0 0 93.538461 89.757538c5.474462 0.807385 11.027692 1.220923 16.541539 1.220923 53.070769 0 99.879385-38.951385 109.784615-90.978461h46.198154a73.019077 73.019077 0 0 0 72.861539-72.763077v-472.418462A73.019077 73.019077 0 0 0 925.833846 157.538462h-425.353846a73.019077 73.019077 0 0 0-72.861538 72.782769v56.064h-188.061539a73.255385 73.255385 0 0 0-53.661538 23.552l-134.301539 146.156307-0.157538 0.236308a18.648615 18.648615 0 0 0-1.969231 2.678154l-0.295385 0.492308a20.578462 20.578462 0 0 0-1.496615 3.170461l-0.177231 0.472616c-0.393846 1.122462-0.669538 2.264615-0.846769 3.406769l-0.078769 0.472615c-0.137846 0.964923-0.196923 1.910154-0.216616 2.835693v232.861538a73.019077 73.019077 0 0 0 72.861539 72.782769h46.178461a111.497846 111.497846 0 0 0 93.538462 89.737846c5.474462 0.807385 11.027692 1.220923 16.541538 1.220923z"
                                                p-id="24327"></path>
                                        </svg>
                                    </div>
                                    <span class="name">待收货</span>
                                </router-link>
                                <router-link :to="{path:`/order?orderStatus=3`}" style="text-decoration: none;color: #333">
                                    <div class="icon-sprite">
                                        <svg style="width: 40px;height: 40px" t="1637996982643" class="icon"
                                             viewBox="0 0 1114 1024" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg" p-id="9580" width="200" height="200">
                                            <path
                                                d="M240.935578 541.984583a30.116947 30.116947 0 1 1 0-60.233894h542.105051a30.116947 30.116947 0 1 1 0 60.233894H240.935578z m0-210.788514a30.116947 30.116947 0 1 1 0-60.233894h662.57284a30.116947 30.116947 0 1 1 0 60.233894H240.935578z m214.402548 518.131961a30.116947 30.116947 0 0 1 21.232448-8.733914H1054.093155V60.233895H60.233895v780.330104h169.136776a30.116947 30.116947 0 0 1 21.322798 8.824265l101.975984 101.945867 102.668673-102.006101z m-81.496459 165.884146A30.116947 30.116947 0 0 1 331.28642 1015.151942L216.902254 900.797893H60.233895a60.233895 60.233895 0 0 1-60.233895-60.233894V60.233895a60.233895 60.233895 0 0 1 60.233895-60.233895h993.85926a60.233895 60.233895 0 0 1 60.233894 60.233895v780.330104a60.233895 60.233895 0 0 1-60.233894 60.233894H488.978756l-115.137089 114.4444z"
                                                fill="#7F7F7F" p-id="9581"></path>
                                        </svg>
                                    </div>
                                    <span class="name">待评价</span>
                                </router-link>
                                <router-link :to="{path:`/order?orderStatus=3`}" style="text-decoration: none;color: #333">
                                    <div class="icon-sprite">
                                        <svg style="width: 40px;height: 40px" t="1637997151123" class="icon"
                                             viewBox="0 0 1024 1024" version="1.1"
                                             xmlns="http://www.w3.org/2000/svg" p-id="12295" width="200" height="200">
                                            <path
                                                d="M844.8 617.5744v-234.1632c0-34.0992-18.176-68.224-47.744-86.4l-225.0752-134.144a102.7328 102.7328 0 0 0-102.3232 0l-227.328 136.4224C212.736 317.44 194.56 349.312 194.56 383.4112v275.0976c0 34.0992 18.176 68.1984 47.744 86.4l225.0752 134.144a105.6256 105.6256 0 0 0 52.3008 13.6192c18.176 0 36.3776-4.5312 52.3008-13.6192l227.328-134.144c4.5568-2.304 9.1136-9.1136 9.1136-15.9232a17.92 17.92 0 0 0-18.176-18.176c-4.5568 0-6.8352 2.2528-9.1136 2.2528l-227.328 134.144c-20.48 11.3664-45.4912 11.3664-65.9456 0l-225.1008-134.144a63.9744 63.9744 0 0 1-29.5424-54.5536V383.4112c0-22.7584 11.3664-43.2128 29.5424-54.5792l225.1008-134.144a67.9936 67.9936 0 0 1 65.92 0l222.8224 136.4224a63.9744 63.9744 0 0 1 29.5424 54.5792v234.1632a17.92 17.92 0 0 0 18.176 18.176c11.392-2.2528 20.48-9.088 20.48-20.4544z"
                                                fill="#333333" p-id="12296"></path>
                                            <path
                                                d="M378.7264 426.5984l-29.568 222.7968c-2.2528 15.9232 2.304 31.8464 13.6448 43.2128 11.3664 11.3664 25.0112 18.176 40.9344 18.176h234.1632c15.9232 0 31.8464-6.8096 40.9344-18.176 11.3664-11.3664 15.9232-27.2896 13.6448-43.2128l-29.568-222.7968c-2.2528-27.2896-27.264-50.0224-54.5536-50.0224h-175.0784c-27.264 0-52.2752 20.48-54.5536 50.0224z m54.5536-11.3664h175.0784c9.088 0 18.176 6.8096 18.176 15.8976l29.568 222.8224c0 4.5312 0 11.3664-4.5568 13.6448-4.5312 4.5312-9.088 6.8096-13.6448 6.8096h-234.1632c-4.5568 0-11.3664-2.2784-13.6448-6.8096-4.5568-4.5568-4.5568-9.088-4.5568-13.6448l29.568-222.8224c0-9.088 9.088-15.8976 18.176-15.8976zM519.68 322.048c20.48 0 36.3776 11.3408 45.4656 27.264 2.2784 6.8096 9.088 9.088 15.9232 9.088 13.6448 0 22.7328-15.9232 15.9232-27.2896-15.9232-27.264-45.4912-47.744-79.5904-47.744s-63.6416 18.176-79.5648 47.744c-6.8352 11.3664 2.2784 27.2896 15.8976 27.2896 6.8352 0 13.6448-4.5568 15.9232-9.088 11.3664-15.9232 29.568-27.2896 50.0224-27.2896z"
                                                fill="#333333" p-id="12297"></path>
                                            <path
                                                d="M478.7712 526.6176a22.784 22.784 0 0 0 22.7328-22.7328c0-13.6448-9.088-22.7328-22.7328-22.7328a22.784 22.784 0 0 0-22.7584 22.7328c0 13.6448 9.1136 22.7328 22.7584 22.7328zM560.6144 526.6176a22.784 22.784 0 0 0 22.7328-22.7328c0-13.6448-9.088-22.7328-22.7328-22.7328a22.784 22.784 0 0 0-22.7328 22.7328 22.784 22.784 0 0 0 22.7328 22.7328zM476.4928 551.6544c-9.088 0-15.9232 9.088-15.9232 18.176 4.5568 36.3776 27.2896 59.136 61.3888 59.136 25.0112 0 54.5792-11.392 61.3888-59.136 0-9.088-6.8096-18.176-15.9232-18.176H560.64c-9.088 0-13.6448 6.8096-15.9232 13.6448-2.2784 20.4544-11.3664 25.0112-25.0112 25.0112-6.8096 0-20.4544 0-25.0112-25.0112-2.2528-6.8352-6.8096-13.6448-15.8976-13.6448h-2.304z"
                                                fill="#333333" p-id="12298"></path>
                                        </svg>
                                    </div>
                                    <span class="name">退换/售后</span>
                                </router-link>
                                <router-link :to="{path:`/order?orderStatus=-1`}" style="text-decoration: none;color: #333">
                                    <div class="icon-sprite">
                                        <svg style="width: 40px;height: 40px" t="1637997240699" class="icon"
                                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                             p-id="22061" width="200" height="200">
                                            <path
                                                d="M321.11809 65.612347 257.085728 129.009236 638.078998 512.615007 253.882779 892.992247 317.372789 956.917162 765.594207 513.137916Z"
                                                p-id="22062" fill="#a6a6a6"></path>
                                        </svg>
                                    </div>
                                    <span class="name">全部订单</span>
                                </router-link>
                            </div>

                            <!-- 每一项订单 -->
                            <div class="order-item">
                                <ul class="xiaofei-clear-vertical-ul">
                                    <li v-for="order in memberDetailInfo.orderItems" :key="order.id">
                                        <router-link style="text-decoration: none;"
                                                     :to="{path:`/item/${order.skuId}`}">
                                            <el-image style="width: 60px;height: 60px" alt="" :src="order.skuPic"/>
                                        </router-link>
                                        <div class="state">
                                            <div class="text" :title="order.skuName">
                                                {{ order.skuName }}
                                            </div>
                                            <div class="other">
                                                <div class="type">普通快递</div>
                                                <div class="type">数量：{{ order.skuQuantity }}</div>
                                                <div class="type">单价：{{ order.skuPrice }}</div>
                                                <div class="type">支付：{{ order.realAmount }}</div>
                                            </div>
                                        </div>

                                        <div class="operate">
                                            <router-link :to="{path:`/order`}" style="text-decoration: none">我的订单
                                            </router-link>
                                        </div>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- 没有订单的时候 -->
                        <div v-else class="no-order" style="">
                            没有相关订单...
                        </div>
                    </div>
                    <div class="right">
                        <div class="item">
                            <h3>我的关注</h3>
                            <div></div>
                        </div>

                        <div class="item">
                            <h3>常购清单</h3>
                            <div></div>
                        </div>

                        <div class="item">
                            <h3>我的回答</h3>
                            <div></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- 修改密码弹窗 -->
        <el-dialog v-bind="$attrs" v-on="$listeners" :visible="passwordDialog" title="修改密码" :show-close="false">
            <el-form ref="passwordForm" :model="passwordFormData" :memberInfoRules="passwordRules" size="medium"
                     label-width="100px">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="passwordFormData.oldPassword" placeholder="请输入旧密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="passwordFormData.password" placeholder="请输入新密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password1">
                    <el-input v-model="passwordFormData.password1" placeholder="请输入确认密码" clearable show-password
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="passwordDialog = false">取消</el-button>
                <el-button type="primary" @click="memberInfoConfirm('password')">确定</el-button>
            </div>
        </el-dialog>

        <!-- 修改用户信息对话框 -->
        <el-dialog v-bind="$attrs" v-on="$listeners" @open="memberDialogOpen" :visible="memberDialog" title="修改信息"
                   :show-close="false">
            <el-form ref="memberInfoForm" :model="memberInfoFormData" :rules="memberInfoRules" size="medium"
                     label-width="100px">
                <el-form-item label="头像" prop="logo">
                    <single-upload v-model="memberInfoFormData.header"></single-upload>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="memberInfoFormData.nickname" placeholder="请输入昵称昵称昵称" clearable
                              :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="memberInfoFormData.mobile" placeholder="请输入手机号码" clearable
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-radio-group v-model="memberInfoFormData.gender" size="medium">
                        <el-radio v-for="(item, index) in genderOptions" :key="index" :label="item.value"
                                  :disabled="item.disabled">{{ item.label }}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="生日" prop="birth">
                    <el-date-picker v-model="memberInfoFormData.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                    :style="{width: '100%'}" placeholder="请选择生日" clearable></el-date-picker>
                </el-form-item>
                <el-form-item label="职业" prop="job">
                    <el-input v-model="memberInfoFormData.job" placeholder="请输入职业" clearable
                              :style="{width: '100%'}"></el-input>
                </el-form-item>
                <el-form-item label="个性签名" prop="sign">
                    <el-input v-model="memberInfoFormData.sign" placeholder="请输入个性签名" clearable
                              :style="{width: '100%'}">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="memberDialog = false">取消</el-button>
                <el-button type="primary" @click="memberInfoConfirm('memberInfo')">确定</el-button>
            </div>
        </el-dialog>

        <!-- 用户头像修改 -->
    </div>
</template>

<script>
import singleUpload from "@/components/upload/singleUpload";
import {queryMemberDetailInfo, getMemberByToken, updateMemberPassword, updateMemberInfo} from "@/api/member/member";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

export default {
    inheritAttrs: false,
    components: {
        singleUpload
    },
    created() {
        this.getUserInfo()
        this.getDetailInfo()
    },
    methods: {
        //获取用户信息
        getUserInfo() {
            let userInfo = Cookie.get("userInfo")
            if (userInfo) this.userInfo = JSON.parse(userInfo)
        },
        //从后台刷新用户信息
        getMemberInfo() {
            getMemberByToken().then(response => {
                if (response.code == 200) {
                    Cookies.remove("userInfo")
                    Cookies.set("userInfo", response.data)
                }
            })
        },
        //获取其他信息
        getDetailInfo() {
            queryMemberDetailInfo().then(response => {
                if (response.code == 200) {
                    if (response.data.orderItems.length > 3) {
                        let items = response.data.orderItems
                        this.memberDetailInfo = response.data
                        this.memberDetailInfo.orderItems = []
                        for (let i = 0; i < 3; i++) {
                            this.memberDetailInfo.orderItems.push(items[i])
                        }
                    } else {
                        this.memberDetailInfo = response.data
                    }
                }

            })
        },
        memberInfoConfirm(flag) {
            if (flag == 'password') {
                this.$refs['passwordForm'].validate(valid => {
                    if (valid) {
                        if (this.passwordFormData.password == this.passwordFormData.password1) {
                            updateMemberPassword(this.passwordFormData).then(response => {
                                if (response.code == 200&&response.data) {
                                    this.passwordDialog = false
                                    this.getMemberInfo()
                                }else {
                                    this.$message.error("修改失败")
                                }
                            })

                        } else {
                            this.$message.error("两次密码不一致，请重新输入")
                        }
                    }
                })
            } else if (flag == 'memberInfo') {
                this.$refs['memberInfoForm'].validate(valid => {
                    if (valid) {
                        updateMemberInfo(this.memberInfoFormData).then(response => {
                            if (response.code == 200) {
                                this.$message.success("修改成功")
                                this.memberDialog = false
                                this.getMemberInfo()
                            } else {
                                this.$message.error("修改失败")
                            }
                        })
                    }
                })
            }

        },
        memberDialogOpen() {
            this.memberInfoFormData = this.userInfo
        }

    },
    data() {
        return {
            passwordDialog: false,
            userInfoDialog: false,
            passwordFormData: {
                oldPassword: undefined,
                password: undefined,
                password1: undefined,
            },
            passwordRules: {
                oldPassword: [{
                    required: true,
                    message: '请输入旧密码',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }],
                password1: [{
                    required: true,
                    message: '请输入确认密码',
                    trigger: 'blur'
                }],
            },
            userInfo: {},//用户信息
            memberDetailInfo: {memberEntity: {}, orderItems: []},
            memberDialog: false,
            memberInfoFormData: {
                nickname: undefined,
                mobile: undefined,
                gender: undefined,
                birth: null,
                header: undefined,
                job: undefined,
                sign: undefined,
            },
            memberInfoRules: {
                nickname: [],
                mobile: [{
                    pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message: '输入正确的手机号码',
                    trigger: 'blur'
                }],
                gender: [],
                birth: [],
                job: [],
                sign: [],
            },
            genderOptions: [{
                "label": "男",
                "value": 0
            }, {
                "label": "女",
                "value": 1
            }],
        }
    }
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
$width: 170px;
$color: #df3028;

.sidebar-left {
    float: left;
    width: $width;
    margin-right: 20px;
    background-color: white;

    dl {
        padding: 15px 20px;
        border-bottom: 1px solid #f3f3f3;

        dt {
            font-size: 16px;
            font-weight: 700;
            line-height: 32px;
            color: #333;
        }

        dd {
            margin: 0;

            a {
                position: relative;
                color: #333;
                text-decoration: none;
                font-size: 14px;
                line-height: 32px;

                &:hover {
                    cursor: pointer;
                    color: $color;
                }
            }

        }
    }
}

.right-main {
    $width: (1190-$width);
    float: right;
    width: $width*1-20;
    //用户账户和余额显示区域
    .user-photo {
        height: 243px;
        margin: 20px 0;
        background-color: white;

        .one, .two {
        }

        .one {
            float: left;
            width: 250px;
            height: 243px;
            $color: #f4ca3a;
            background-color: $color;

            .img {
                text-align: center;
                margin-top: 35px;
            }

            .nick-name {
                color: #232331;
                font: 700 18px/20px Arial;
                margin-top: 15px;
                text-align: center;
            }

            .user-bound {
                margin-top: 15px;
                text-align: center;

                a {
                    margin: 0 10px;
                    padding: 5px 10px;
                    font-size: 12px;
                    border-radius: 14px;
                    color: #232331;
                    border: 1px solid #232331;

                    &:hover {
                        cursor: pointer;
                        background-color: #ffffff;
                    }
                }
            }

            .user-member {
                text-align: center;
                margin-top: 13px;
                height: 36px;
                padding: 10px 20px;
                line-height: 36px;
                background-color: #232331;
                color: $color;
                font-size: 13px;
                font-weight: 700;

                > a {
                    margin-left: 5px;
                    padding: 5px 8px;
                    background-color: $color;
                    border-radius: 14px;
                    color: #232331;

                    &:hover {
                        cursor: pointer;
                        background-color: #ffffff;
                    }
                }
            }
        }

        .two {
            width: $width*1-270;
            float: left;

            > h3 {
                height: 62px;
                line-height: 62px;
                margin: 0 0 0 15px;
                padding: 0;
                border: 0;
                border-bottom: 1px solid aliceblue;
                font-size: 16px;
                color: #333;
                font-weight: 400;
            }

            .discount {
                height: 140px;
                margin-top: 40px;

                li {
                    text-align: center;
                    width: ($width*1-270)/5;
                    color: #333;
                    font-size: 12px;

                    > div {
                        text-align: center;
                        height: 24px;
                        margin-bottom: 10px;

                        a {
                            padding-top: 10px;
                            color: #333;
                            line-height: 24px;
                            font-size: 22px;
                            font-weight: 700;

                            &:hover {
                                cursor: pointer;
                                color: #c81623;
                            }
                        }
                    }

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

}

//订单区域
.order-main {
    .left {
        $width: 694px;
        width: $width;
        // height: 200px;
        background-color: white;
        float: left;

        > h3 {
            height: 62px;
            line-height: 62px;
            margin: 0 0 0 15px;
            padding: 0;
            border: 0;
            border-bottom: 1px solid aliceblue;
            font-size: 16px;
            color: #333;
            font-weight: 400;
        }

        > .no-order {
            color: #333;
            font-size: 16px;
            text-align: center;
            padding: 30px;
        }

        > .order {
            > .order-state {
                padding: 15px 20px;

                > a {
                    width: 90px;
                    float: left;
                    box-sizing: border-box;
                    padding: 13px 0 0;
                    margin: 0 20px;
                    height: 90px;
                    text-align: center;
                    color: #333;
                    text-decoration: none;

                    &:hover {
                        box-shadow: 1px 1px 5px #888888;
                    }
                }

                .icon-sprite {

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

            > .order-item {
                > ul {
                    width: 100%;
                }

                li {
                    font-size: 12px;
                    color: #666;
                    width: 90%;
                    padding: 10px 20px;
                    height: 60px;
                    border-top: 1px solid #f0f3ef;

                    > a {
                        float: left;
                    }

                    > .state {
                        float: left;
                        padding: 10px 0;
                        margin: 0 15px;
                        height: 40px;
                        line-height: 20px;

                        width: 338px;

                        .text {
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            height: 20px;
                            overflow: hidden;
                            font-size: 12px;
                        }

                        .other {


                            > div {
                                margin-right: 20px;
                                float: left;
                            }
                        }
                    }

                    > .operate {
                        padding: 20px 0 14px;
                        float: right;
                        color: #666;

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

    }

    .right {
        $width: 286px;

        width: $width;
        float: right;

        .item {
            background-color: white;
            margin-bottom: 20px;

            > h3 {
                height: 62px;
                line-height: 62px;
                margin: 0 0 0 15px;
                padding: 0;
                border: 0;
                border-bottom: 1px solid aliceblue;
                font-size: 16px;
                color: #333;
                font-weight: 400;
            }

            > div {
                padding: 20px;
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

</style>
