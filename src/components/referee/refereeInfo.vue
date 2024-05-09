<template>
<div>
  <el-descriptions class="margin-top" :title="(user.name) ? user.name : user.studentCard" :column="1" size=" " border>
    <template slot="extra">
      <el-button type="primary" @click="changeInfo">完善信息</el-button>
      <el-button type="info" @click="dialogVisible = true">修改密码</el-button>
    </template>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user-solid"></i>
        学号
      </template>
      {{user.studentCard}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        姓名
      </template>
      {{ (user.name) ? user.name : "未填写"}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        性别
      </template>
      {{ (user.gender) ? user.gender : "未填写"}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        电话
      </template>
      {{ (user.phone) ? user.phone : "未填写"}}  
    </el-descriptions-item>
  </el-descriptions>

  
  <!-- 个人信息弹框 -->
  <el-dialog title="个人信息" :visible.sync="dialogVisible1" width="500px">
  <el-form ref="form" :model="user" label-width="80px" size="small">
    <el-form-item label="头像" style="line-height: 100px;">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:9090/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess">
        <img v-if="user.avatarUrl" :src="user.avatarUrl" class="avatar">
        <div v-if="user.avatarUrl"><em>点击更换头像</em></div>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      
    </el-form-item>
    <el-form-item label="学号"><el-input v-model="user.studentCard" disabled></el-input></el-form-item>
    <el-form-item label="姓名"><el-input v-model="user.name"></el-input></el-form-item>
    <el-form-item label="性别"><el-input v-model="user.gender"></el-input></el-form-item>
    <el-form-item label="电话"><el-input v-model="user.phone"></el-input></el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="dialogVisible1 = false">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>

<!-- 修改密码弹框 -->
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
    <el-form ref="person" :model="person" label-width="100px" size="small" :rules="rules">
          <el-form-item label="密码：" prop="password">
              <el-input show-password v-model="person.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="repassword">
              <el-input show-password v-model="person.repassword"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePsd">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.person.password !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.person.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user:JSON.parse(localStorage.getItem("user")),
        person:{},
        dialogVisible1:false,
        dialogVisible:false,
        disabled:false,
        rules:{
          password: [
            { required: true, message: '请输入密码11', trigger: 'blur' },
            { min: 3, max: 6, message: '长度不正确,应该是3-6', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          repassword:[
            { required: true, message: '请再次输入密码11', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    created(){
      if(this.user.name==null || this.user.phone==null || this.user.gender==null){
        this.$message.error("请完善个人信息")
      }
    },
    methods:{
        changeInfo(){
          this.dialogVisible1 = true
          this.disabled=true
        },
        changePsd(){
          this.$refs['form'].validate((valid) => {
            if(valid){
              this.user.password = this.person.password
              this.update()
              localStorage.removeItem("user")
              this.$message.success("请重新登陆")
              this.$router.push("/login")
            }else{
              this.$message.error("请将信息填写完整")
              return false;
            }
          })
        },
        submit(){
            this.update()
        },
        update(){
          this.request.post("/user/save",this.user).then((res) =>{
                if(res){
                    this.dialogVisible1 = false
                    localStorage.setItem("user",JSON.stringify(this.user))
                    this.$message.success("保存完成")
                }
            })
        },
        handleAvatarSuccess(res, file) {

          this.user.avatarUrl = res
          console.log(res);
          console.log(this.user.avatarUrl);
          // this.user.imageUrl = URL.createObjectURL(file.raw);
        },

    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    margin-top: 45px;
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 68px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>