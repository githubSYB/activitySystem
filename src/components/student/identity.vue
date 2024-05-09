<template>
<div v-if="user.representative == 0">
    <el-button type="success" @click="submit">申请</el-button>
    <i class="el-icon-d-arrow-left"></i>
    <span style="color: red;">点击此按钮申请成为学生代表</span>
</div>
<div v-else-if="user.representative == 1">
    <span>正在申请中，请等待...</span>
</div>    
</template>

<script>
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem("user"))
        }
    },
    methods:{
        submit(){
            this.user.representative = 1
            this.request.post("/user/changeIdentity",this.user).then(res=>{
                if(res.code == 200){
                    this.$message.success("申请成功，等待审核")
                }else{
                    this.$message.error("申请失败"+res.msg)
                }
            })
        }
    }
}
</script>

<style>

</style>