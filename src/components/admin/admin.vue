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
            <Aside></Aside>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
import Aside from '../admin/aside.vue'
import Header from '@/components/header.vue'
export default {
    data(){
    return {
        tableData: [],
        total:0,
        pageSize:3,
        pageNum:1,
        studentCard:"",
        dialogVisible: false,
        form:{},
        disabled:true
        }
    },
    components:{
        Aside,
        Header
    },
    methods:{
        goBack() {
            this.$router.push("/index/indexOne")
        }
    }
};
</script>    
  
<style>

</style>