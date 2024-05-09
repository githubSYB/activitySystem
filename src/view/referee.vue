<template>
  <div style="height: 100%;">
  <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
          <Header>
            <template #back>
              <el-page-header @back="goBack" class="goBack" title="回首页"></el-page-header>
            </template>
          </Header>
      </el-header>
      <el-container>
          <el-aside width="200px" style="background-color: rgb(238, 241, 246);height:100%;" >
              <refereeAsideVue></refereeAsideVue>
          </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
  </template>
  
  <script>
import Header from "@/components/header.vue"
import refereeAsideVue from '@/components/referee/refereeAside.vue';
  export default {
      components:{
        Header,
        refereeAsideVue
      },
      methods:{
        goBack() {
            this.$router.push("/index/indexOne")
        }
      }
  }
  </script>
  
  <style>
  
  </style>