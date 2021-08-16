<template>
    <div id="app">
        <router-view :key="key"/>
    </div>
</template>

<script>
export default {
//组件动态key属性的值
    computed: {
        key() {
            return this.$route.name !== undefined
                ? this.$route.name + new Date()
                : this.$route + new Date();
        }
    }
}
</script>

