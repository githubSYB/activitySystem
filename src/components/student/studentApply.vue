<template>
<div>
<el-form :model="actForm" :rules="rules" ref="actForm" label-width="100px" class="demo-ruleForm">
<el-form-item label="活动名称" prop="activityName">
    <el-input v-model="actForm.activityName"></el-input>
</el-form-item>
<el-form-item label="活动头像" prop="avatarUrl">
    <el-upload
    class="avatar-uploader"
    action="http://localhost:9090/file/upload"
    :show-file-list="false"
    :on-success="handleAvatarSuccess">
    <img v-if="actForm.avatarUrl" :src="actForm.avatarUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</el-form-item>
<el-form-item label="申报人" prop="studentCard">
  <el-input v-model="actForm.studentCard" disabled></el-input>
</el-form-item>
<el-form-item label="活动区域" prop="region">
    <el-select v-model="actForm.region" placeholder="请选择活动区域">
    <el-option label="室内" value="0"></el-option>
    <el-option label="室外" value="1"></el-option>
    </el-select>
</el-form-item>
<el-form-item label="活动场地" prop="place">
    <el-input v-model="actForm.place"></el-input>
</el-form-item>
<el-form-item label="开始时间" required>
        <el-date-picker 
              v-model="actForm.beginDate" 
              type="datetime" 
              placeholder="选择日期时间" 
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm">
        </el-date-picker>
</el-form-item>
<el-form-item label="结束时间" required>
      <el-date-picker 
              v-model="actForm.stopDate" 
              type="datetime" 
              placeholder="选择日期时间" 
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm">
        </el-date-picker>
</el-form-item>
<el-form-item label="需要裁判" prop="choice">
    <el-switch v-model="actForm.choice"></el-switch>
</el-form-item>
<el-form-item label="比赛人数" prop="countRule">
    <el-input v-model="actForm.countRule"></el-input>
</el-form-item>
<el-form-item label="活动学分" prop="credit">
    <el-input v-model="actForm.credit"></el-input>
</el-form-item>
<el-form-item>
    <el-button type="primary" @click="submitForm('actForm')">提交申请</el-button>
    <el-button @click="resetForm('actForm')">重置</el-button>
</el-form-item>
</el-form>
</div>
</template>

<script>
export default {
    data() {
      return {
        actForm:{
          studentCard:JSON.parse(localStorage.getItem("user")).studentCard,
        },
        date1: '',
        date2: '',
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          beginDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          stopDate: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
      };
    },
    created(){
      const activity = JSON.parse(this.$route.query.activity)
      if(activity){
        this.actForm = activity
      }else{
        this.actForm = ''
      }
    },
    methods: {
      submitForm(formName) {
        // console.log(this.actForm.beginDate);
        // console.log(this.actForm.stopDate);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.actForm.choice == true){
              this.actForm.whetherReferee = 1
            }else{
              this.actForm.whetherReferee = 0
            }
            this.request.post("/activity/insert",this.actForm).then(res => {
              if(res){
                this.$message.success("申请成功！")
                this.$router.push("/student/passAct")
              }else{
                this.$message.error("申请失败！")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccess(res, file){
        this.actForm.avatarUrl = res
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