<template>
  <div>
    <!-- 标题 -->
    <Header></Header>
    <!-- 导航栏 -->
    <Banner></Banner>
    <!-- 主体内容 -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header.vue"
import Banner from "../components/index/IndexBanner.vue"
export default {
  components:{
        Header,
        Banner
  },
}
</script>

<style>

</style>