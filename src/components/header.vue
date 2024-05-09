<template>
<div>
    <el-header style="text-align: center;">
        <slot name="back"></slot>
        <p class="title">高校活动管理系统</p>
        <el-dropdown class="accountBtn">
            <span class="el-dropdown-link">
                {{ user.name ? user.name : user.studentCard }}
                <img v-if="user.avatarUrl" :src="user.avatarUrl" class="avatarImg">
                <i v-else class="el-icon-user-solid el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <span @click="myInfo">{{ identity }}主页</span></el-dropdown-item>
                <el-dropdown-item>
                    <span @click="loginOut">{{ loginInfo }}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</div>
</template>

<script>
export default {
    data() {
        return {
            user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {"studentCard":"未登录"},
            loginInfo:localStorage.getItem("user") ? "退出登录" : "去登录",
            identity: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).role : ""
        }
    },
    methods:{
        loginOut(){
            if(localStorage.getItem("user")){
                localStorage.removeItem("user")
                this.$message.success("退出成功")
            }
            this.$router.push("/login")
        },
        myInfo(){
            if(this.identity === "") 
                this.$message.error("你还没有登录，请先登录")
            if(this.identity === "管理员")
                this.$router.push("/admin/studentManager")
            if(this.identity === "学生")
                this.$router.push("/student/info")
            if(this.identity === "裁判")
                this.$router.push("/referee")
        },
    }
}
</script>

<style>
.avatarImg{
    margin: 15px 5px 0 0;
    float: left;
    height: 30px;
    width: 30px;
    border-radius: 100%;
}
</style>