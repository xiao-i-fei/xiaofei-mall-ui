<template>
    <div>
        <pay-top/>
        <pay-main/>
    </div>
</template>

<script>
import PayTop from "@/views/order/pay/pay-top";
import PayMain from "@/views/order/pay/pay-main";

export default {
    components: {PayMain, PayTop}
}
</script>

<style lang="scss" scoped>
.aaa {

}
</style>
