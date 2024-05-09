<template>
  <div>
    <!-- <h2>活动管理系统</h2>
    <router-link to="/login" class="el-icon-user">登录</router-link>
    <div id="app">
    <el-breadcrumb separator="\" class="banner">
      <el-breadcrumb-item :to="{ path: '/shouye' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/zixun' }">资讯</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/huodong' }">活动</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view> 
    </div>-->
    


    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
.box{
  text-align: center;
  margin-top: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.el-icon-user{
  float: right;
  margin-right: 10px;
}
</style>
