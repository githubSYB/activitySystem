<template>
<el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router >
  <el-menu-item index="/index/indexOne">首页</el-menu-item>
  <el-menu-item index="/index/indexTwo">活动项目</el-menu-item>
  <el-menu-item index="/index/indexThree">光荣榜</el-menu-item>
  <el-menu-item index="/index/indexFour">留言信息</el-menu-item>
</el-menu>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
}
</script>

<style>

</style>