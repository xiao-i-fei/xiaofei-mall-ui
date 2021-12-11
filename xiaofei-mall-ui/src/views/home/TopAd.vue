<!-- 顶部广告栏目 -->
<template>
    <div class="top-ad-main">
        <div class="xiaofei-row xiaofei-center">
            <img :src="topAd" alt="加载失败">
        </div>
    </div>
</template>

<script>
import topAd from '@/views/home/img/ad/dhiahduaihduiahduhurewrh.webp'

export default {
    data() {
        return {
            topAd: topAd
        }
    }
}
</script>

<style lang="scss" scoped>
$height: 80px;
.top-ad-main {
    // background-color: rgb(198, 46, 36);
    background-color: #fae1e1;
    height: $height;
    img{&:hover{
        cursor:pointer;
    }}
}
</style>
