<template>
    <div>
        <div class="div-col-1">
            <div class="order-menu">
                <dl>
                    <dt class="menu-dt">
                        <router-link
                            style="text-decoration: none; color: #666666"
                            :to="{ path: '/order' }"
                            >订单中心
                        </router-link>
                    </dt>
                    <dd class="menu-dd">我的订单</dd>
                    <dd class="menu-dd">我的活动</dd>
                    <dd class="menu-dd">评价晒单</dd>
                    <dd class="menu-dd">我的常购商品</dd>
                    <dd class="menu-dd">代下单</dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.order-menu {
    dl {
        padding-bottom: 20px;
        font-size: 12px;
        color: #333;

        .menu-dt {
            height: 28px;
            line-height: 28px;
            font-weight: 900;
        }

        .menu-dd {
            height: 24px;
            line-height: 24px;
            margin-left: 0;
        }
    }
}
</style>
