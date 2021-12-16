<template>
  <div>
    <svg-icon icon-class="github" @click="goto"/>
  </div>
</template>

<script>
export default {
  name: 'RuoYiGit',
  data() {
    return {
      url: 'https://gitee.com/Li_Fei_git/xiaofei-mall-ui/tree/master/xiaofei-mall-admin-ui'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
