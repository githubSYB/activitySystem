<template>
<div class="registerBox">
  <h1 style="margin-bottom: 30px;">用户注册</h1>
  <el-form :rules="rules" ref="userForm" :model="user" label-position="right" label-width="100px" >
    <el-form-item label="学号：" prop="studentCard">
      <el-input v-model="user.studentCard" placeholder="请输入学号"></el-input>
    </el-form-item>
    <el-form-item label="密码：" prop="password">
      <el-input show-password v-model="user.password" placeholder="输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码：" prop="repassword">
      <el-input show-password v-model="user.repassword" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-form-item label="身份：" prop="role">
      <el-autocomplete
      class="inline-input"
      v-model="user.role"
      :fetch-suggestions="querySearch"
      placeholder="请选择身份"
      @select="handleSelect"
    ></el-autocomplete>
      <!-- <el-input v-model="user.role"></el-input> -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">注册</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
 export default {
    mounted(){
      this.restaurants = this.loadAll();
    },
    data() {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.password !== '') {
            this.$refs.userForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user:{
          studentCard:"",
          password:"",
          repassword:"",
          role:"",
          restaurants: []
        },
        rules: {
          studentCard: [
            { required: true, message: '请输入学号/工号', trigger: 'blur' },
            { min: 3, max: 12, message: '长度不正确,应该是3-12', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 6, message: '长度不正确,应该是3-6', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          repassword:[
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      back(){
        this.$router.push("/login")
      },
      submitForm(userForm) {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            this.request.post("/user/userRegister",this.user).then((res)=>{
                console.log(res);
              if(res.code == 200){
                localStorage.setItem("user",JSON.stringify(res.data))
                this.$message.success("注册成功,请返回登陆")
                this.$router.push("/login")
              }else{
                this.$message.error(res.msg)
              }
            })
          } else {
            console.log('请将信息填写完整！');
            return false;
          }
        });
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;        
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "学生"},
          { "value": "裁判"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>

<style>
.registerBox{
    border: 1px solid black;
    margin: 80px auto;
    width: 400px;
    height: 500px;
    text-align: center;
    padding: 5% 5%;
}
</style>