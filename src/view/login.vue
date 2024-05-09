<template>
<div class="loginBox">
  <h1 style="margin-bottom: 30px;">用户登录</h1>
  <el-form :rules="rules" ref="userForm" :model="user" label-position="right" label-width="80px" >
    <el-form-item label="学号：" prop="studentCard">
      <el-input v-model="user.studentCard"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input show-password v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">立即登录</el-button>
      <el-button @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        user:{
          studentCard:"",
          password:""
        },
        rules: {
          studentCard: [
            { required: true, message: '请输入学号/工号', trigger: 'blur' },
            { min: 5, max: 12, message: '长度不正确,应该是12', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 8, message: '长度不正确,应该是3-8', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      register(){
        this.$router.push("/register")
      },
      submitForm(userForm) {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.request.post("/user/login",this.user).then((res)=>{
              if(res.code == 200){
                localStorage.setItem("user",JSON.stringify(res.data))
                this.$router.push("/index/indexOne")
                this.$message.success("登陆成功")
              }else{
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style>

.loginBox{
    border: 1px solid black;
    margin: 80px auto;
    width: 400px;
    height: 400px;
    text-align: center;
    padding: 5% 5%;
}
a{
    display: inline-block;
    font-size: 10px;
    margin: 10px 5px;
}
</style>