<template>
    <div id="member-info">
        <top-nav/>
        <top/>
        <div style="height: 1px"></div>
        <!--        <div class="member-info-main">
                    <h2>修改您的账户信息</h2>
                    <h3><a href="#">返回</a></h3>
                    <form id="member-info-form">

                        <label>
                            用户名：
                            <input type="text" class="xiaofei-clear-input form-input">
                        </label>
                    </form>
                </div>-->
        <div class="content-box" style="min-height: 276px;">

            <div class="info-title">个人资料</div>
            <div class="info-box">
                <div class="info-box-title">基本资料</div>
                <div>
                    <label>用户名：</label>
                    <input disabled type="text" name="name" :value="updateUserInfo.username"
                           placeholder="最多可输入20个字符">
                </div>
                <div>
                    <label>性别：</label>
                    <label><input type="radio" value="1" v-model="updateUserInfo.gender"
                                  :checked="updateUserInfo.gender==1" name="sex"> 男</label>
                    <label><input type="radio" value="0" v-model="updateUserInfo.gender"
                                  :checked="updateUserInfo.gender==0" name="sex"> 女</label>
                </div>
                <div>
                    <label>手机号：</label>
                    <input type="text" name="name" :value="updateUserInfo.phone" placeholder="最多可输入20个字符">
                </div>
                <div>
                    <label>真实姓名：</label>
                    <input type="text" name="name" :value="updateUserInfo.realName" placeholder="最多可输入20个字符">
                </div>
                <div>
                    <label>年龄：</label>
                    <input type="text" name="name" :value="updateUserInfo.age" placeholder="最多可输入20个字符">
                </div>
                <div>
                    <label>邮箱：</label>
                    <input type="text" name="email" placeholder="输入邮箱地址" v-model="updateUserInfo.email">
                </div>
                <div>
                    <label>邮编：</label>
                    <input type="text" name="email" placeholder="输入邮箱地址" v-model="updateUserInfo.postcode">
                </div>

                <!--<div class="date">
                    <label>出生日期：</label>
                    <select name="year" id="year" v-model="updateUserInfo.year">
                        <option value="">--</option>
                        <option value="2118">2118</option>
                        <option value="2117">2117</option>
                        <option value="2116">2116</option>
                        <option value="2115">2115</option>
                        <option value="2114">2114</option>
                        <option value="2113">2113</option>
                        <option value="2112">2112</option>
                        <option value="2111">2111</option>
                        <option value="2110">2110</option>
                        <option value="2109">2109</option>
                        <option value="2108">2108</option>
                        <option value="2107">2107</option>
                        <option value="2106">2106</option>
                        <option value="2105">2105</option>
                        <option value="2104">2104</option>
                        <option value="2103">2103</option>
                        <option value="2102">2102</option>
                        <option value="2101">2101</option>
                        <option value="2100">2100</option>
                        <option value="2099">2099</option>
                        <option value="2098">2098</option>
                        <option value="2097">2097</option>
                        <option value="2096">2096</option>
                        <option value="2095">2095</option>
                        <option value="2094">2094</option>
                        <option value="2093">2093</option>
                        <option value="2092">2092</option>
                        <option value="2091">2091</option>
                        <option value="2090">2090</option>
                        <option value="2089">2089</option>
                        <option value="2088">2088</option>
                        <option value="2087">2087</option>
                        <option value="2086">2086</option>
                        <option value="2085">2085</option>
                        <option value="2084">2084</option>
                        <option value="2083">2083</option>
                        <option value="2082">2082</option>
                        <option value="2081">2081</option>
                        <option value="2080">2080</option>
                        <option value="2079">2079</option>
                        <option value="2078">2078</option>
                        <option value="2077">2077</option>
                        <option value="2076">2076</option>
                        <option value="2075">2075</option>
                        <option value="2074">2074</option>
                        <option value="2073">2073</option>
                        <option value="2072">2072</option>
                        <option value="2071">2071</option>
                        <option value="2070">2070</option>
                        <option value="2069">2069</option>
                        <option value="2068">2068</option>
                        <option value="2067">2067</option>
                        <option value="2066">2066</option>
                        <option value="2065">2065</option>
                        <option value="2064">2064</option>
                        <option value="2063">2063</option>
                        <option value="2062">2062</option>
                        <option value="2061">2061</option>
                        <option value="2060">2060</option>
                        <option value="2059">2059</option>
                        <option value="2058">2058</option>
                        <option value="2057">2057</option>
                        <option value="2056">2056</option>
                        <option value="2055">2055</option>
                        <option value="2054">2054</option>
                        <option value="2053">2053</option>
                        <option value="2052">2052</option>
                        <option value="2051">2051</option>
                        <option value="2050">2050</option>
                        <option value="2049">2049</option>
                        <option value="2048">2048</option>
                        <option value="2047">2047</option>
                        <option value="2046">2046</option>
                        <option value="2045">2045</option>
                        <option value="2044">2044</option>
                        <option value="2043">2043</option>
                        <option value="2042">2042</option>
                        <option value="2041">2041</option>
                        <option value="2040">2040</option>
                        <option value="2039">2039</option>
                        <option value="2038">2038</option>
                        <option value="2037">2037</option>
                        <option value="2036">2036</option>
                        <option value="2035">2035</option>
                        <option value="2034">2034</option>
                        <option value="2033">2033</option>
                        <option value="2032">2032</option>
                        <option value="2031">2031</option>
                        <option value="2030">2030</option>
                        <option value="2029">2029</option>
                        <option value="2028">2028</option>
                        <option value="2027">2027</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014">2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                        <option value="2008">2008</option>
                        <option value="2007">2007</option>
                        <option value="2006">2006</option>
                        <option value="2005">2005</option>
                        <option value="2004">2004</option>
                        <option value="2003">2003</option>
                        <option value="2002">2002</option>
                        <option value="2001">2001</option>
                        <option value="2000">2000</option>
                        <option value="1999">1999</option>
                        <option value="1998">1998</option>
                        <option value="1997">1997</option>
                        <option value="1996">1996</option>
                        <option value="1995">1995</option>
                        <option value="1994">1994</option>
                        <option value="1993">1993</option>
                        <option value="1992">1992</option>
                        <option value="1991">1991</option>
                        <option value="1990">1990</option>
                        <option value="1989">1989</option>
                        <option value="1988">1988</option>
                        <option value="1987">1987</option>
                        <option value="1986">1986</option>
                        <option value="1985">1985</option>
                        <option value="1984">1984</option>
                        <option value="1983">1983</option>
                        <option value="1982">1982</option>
                        <option value="1981">1981</option>
                        <option value="1980">1980</option>
                        <option value="1979">1979</option>
                        <option value="1978">1978</option>
                        <option value="1977">1977</option>
                        <option value="1976">1976</option>
                        <option value="1975">1975</option>
                        <option value="1974">1974</option>
                        <option value="1973">1973</option>
                        <option value="1972">1972</option>
                        <option value="1971">1971</option>
                        <option value="1970">1970</option>
                        <option value="1969">1969</option>
                        <option value="1968">1968</option>
                        <option value="1967">1967</option>
                        <option value="1966">1966</option>
                        <option value="1965">1965</option>
                        <option value="1964">1964</option>
                        <option value="1963">1963</option>
                        <option value="1962">1962</option>
                        <option value="1961">1961</option>
                        <option value="1960">1960</option>
                        <option value="1959">1959</option>
                        <option value="1958">1958</option>
                        <option value="1957">1957</option>
                        <option value="1956">1956</option>
                        <option value="1955">1955</option>
                        <option value="1954">1954</option>
                        <option value="1953">1953</option>
                        <option value="1952">1952</option>
                        <option value="1951">1951</option>
                        <option value="1950">1950</option>
                        <option value="1949">1949</option>
                        <option value="1948">1948</option>
                        <option value="1947">1947</option>
                        <option value="1946">1946</option>
                        <option value="1945">1945</option>
                        <option value="1944">1944</option>
                        <option value="1943">1943</option>
                        <option value="1942">1942</option>
                        <option value="1941">1941</option>
                        <option value="1940">1940</option>
                        <option value="1939">1939</option>
                        <option value="1938">1938</option>
                        <option value="1937">1937</option>
                        <option value="1936">1936</option>
                        <option value="1935">1935</option>
                        <option value="1934">1934</option>
                        <option value="1933">1933</option>
                        <option value="1932">1932</option>
                        <option value="1931">1931</option>
                        <option value="1930">1930</option>
                        <option value="1929">1929</option>
                        <option value="1928">1928</option>
                        <option value="1927">1927</option>
                        <option value="1926">1926</option>
                        <option value="1925">1925</option>
                        <option value="1924">1924</option>
                        <option value="1923">1923</option>
                        <option value="1922">1922</option>
                        <option value="1921">1921</option>
                        <option value="1920">1920</option>
                        <option value="1919">1919</option>
                        <option value="1918">1918</option>
                        <option value="1917">1917</option>
                        <option value="1916">1916</option>
                        <option value="1915">1915</option>
                        <option value="1914">1914</option>
                        <option value="1913">1913</option>
                        <option value="1912">1912</option>
                        <option value="1911">1911</option>
                        <option value="1910">1910</option>
                        <option value="1909">1909</option>
                        <option value="1908">1908</option>
                        <option value="1907">1907</option>
                        <option value="1906">1906</option>
                        <option value="1905">1905</option>
                        <option value="1904">1904</option>
                        <option value="1903">1903</option>
                        <option value="1902">1902</option>
                        <option value="1901">1901</option>
                        <option value="1900">1900</option>
                    </select>
                    <span>年</span>
                    <select name="month" id="month" v-model="updateUserInfo.month">
                        <option value="">--</option>
                        <option v-for="i in 12" :value="i">{{ i }}</option>
                    </select>
                    <span>月</span>
                    <select id="days" name="days" class="day" v-model="updateUserInfo.day">
                        <option value="">--</option>
                        <option v-for="i in 31" :value="i">{{ i }}</option>
                    </select>
                    <span>日</span><span class="date-text">保存后一年内不可更改</span>
                </div>
                -->
                <div>
                    <label>详细地址：</label>
                    <input disabled type="text" name="name" :value="updateUserInfo.address" placeholder="详细地址">
                </div>
                <span class="text-span"></span>
                <button class="info-submit" type="button">保存</button>
            </div>
        </div>
    </div>
</template>
<script>
import TopNav from "@/views/components/TopNav";
import Top from "@/views/member/account/home/top";

export default {
    components:{
        Top,
        TopNav
    },
    data() {
        return {
            userInfo: {},
            updateUserInfo: {},
            userInfoDialogVisible: false,
            passwordDialogVisible: false,
        }
    },
    created() {
        this.getUserInfoById()
    },
    methods: {
        getUserInfoById() {
            getUserInfoById().then(response => {
                if (response.data != false) {
                    this.userInfo = response.data
                    this.updateUserInfo = this.userInfo
                } else {
                    this.$notify({
                        message: '未登录',
                        position: 'bottom-right'
                    });
                }

            })
        }
    },
}
</script>

<style lang="scss" scoped>
*{
    box-sizing:content-box
}
.content-box {
    width: 1000px;
    margin: 0 auto;
}

.info-title {
    font-size: 16px;
    color: #383838;
    line-height: 22px;
    margin-top: 40px;
    margin-bottom: 16px;
}

.info-box {
    border: 1px solid #E1E1E1;
}

.info-box .info-box-title {
    font-size: 14px;
    line-height: 44px;
    height: 44px;
    background: #FBFBFB;
    border-bottom: 1px solid #E1E1E1;
    margin-bottom: 25px;
}

.info-box label {

    font-size: 14px;
    line-height: 30px;
    width: 70px;
    display: inline-block;
}

.info-box div {
    padding-left: 17px;
    margin-bottom: 16px;
    font-size: 0;
}

.info-box input[type=text] {

    font-size: 14px;
    height: 28px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
    padding-left: 8px;
    width: 232px;
}


.info-submit {
    background: #684029;
    color: #fff;
    font-size: 14px;
    width: 100px;
    height: 30px;
    margin: 0 17px 45px;
    display: block;
}

/*#member-info {
    height: 100vh;
    background: url(https://xiaofei-mall.oss-cn-beijing.aliyuncs.com/2021-12-24/background_oeuhe7.jpg) no-repeat fixed 58% 20% / cover;
    background-size: cover;
}*/

.member-info-main {
    padding: 40px;
    background-color: #fcfbfa;
    width: 770px;
    margin: 20px auto;

    > h2, h3 {
        padding: 0;
        border: 0;
        text-align: center;
        color: #333333;
        font-size: 35px;
    }

    > h3 {
        > a {
            color: #bf6856;
            text-decoration: none;
        }

        font-size: 18px;
    }

    #member-info-form {
        background-color: #fddd9b;
        width: 763px;
        margin: 0 auto;
    }

}

// 输入框的样式
.form-input {
    width: 324px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 0;
    border-bottom: 2px solid #cbc5bf;
    height: 25px;
    margin: 0;
    font-size: 15px !important;
    padding: 8px 30px 8px 10px;

    &:focus {
        background-color: white;
        border-bottom: 2px solid #669763;
    }
}
</style>
