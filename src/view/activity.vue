<template>
<el-container>
    <el-header>
      <myHeader>
        <template #back>
            <el-page-header @back="goBack" class="goBack" title="返回"></el-page-header>
        </template>
    </myHeader>  
    </el-header>
    <el-main>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>本场比赛的选手：</span>
            </div>
            <el-button type="primary" @click="all">全部</el-button>
            <el-button type="success" @click="todo">已签到</el-button>
            <el-button type="info" @click="notdo">未签到</el-button>
            <div v-for="item in member" :key="item.id" class="text item" >
                选手的名字是：
                <b  id="name" style="color: burlywood;"> {{ item.name }}</b>
                学号是：
                <b  id="name" style="color: blue;"> {{ item.studentCard }}</b>
                <el-button type="text" @click="detail(item)">
                    <p style="font-size: 20px;">更多<i class="el-icon-d-arrow-right" ></i></p>
                </el-button>
            </div> 
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" >
            <div slot="header" class="clearfix">
            <span>成员的信息：</span>
            </div>
            <el-form v-if="person.studentCard" label-position="right" label-width="80px" :model="person" >
                <el-form-item label="姓名:">
                    <el-input v-model="person.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                    <el-input v-model="person.gender" disabled></el-input>
                </el-form-item>
                <el-form-item label="学号:">
                    <el-input v-model="person.studentCard" disabled></el-input>
                </el-form-item>
                <el-form-item label="签到"> 
                    <el-button v-if="person.signIn" type="success">已签到</el-button>
                    <el-button v-else type="info" @click="changeStatus">点击签到</el-button>
                </el-form-item>
                <el-form-item label="成绩">
                    <p v-if="person.core === 0 || person.core === ''">还没有成绩---
                        <el-button  type="info" @click="dialogVisible = true">输入成绩</el-button></p>
                    <el-input v-else v-model="person.core" disabled></el-input>
                </el-form-item>

            </el-form>
            <div v-else>
                <empty></empty>
            </div>
        </el-card>
      </el-col>
        
    </el-row>
        
    </el-main>

    <el-dialog
        title="输入成绩"
        :visible.sync="dialogVisible"
        width="30%">
        <el-input v-model="core"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</el-container>

    
</template>

<script>
import myHeader from '@/components/header.vue';
import empty from '@/components/empty.vue';
export default {
    data() {
        return {
            member:{},
            person:{
                studentCard:"",
                activityId:"",
                status:"",
                core:""
            },
            dialogVisible:false,
            core:'',

        }
    },
    components:{
        myHeader,
        empty
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            const id = this.$route.query.id
            this.request.get("/activity/status",{
                params:{
                    id:id,
                    signIn:this.person.status
                }
            }).then(res=>{
                this.member = res.data
            })
        },
        all(){
            this.person.status = null
            this.load()
        },
        todo(){
            this.person.status = true
            this.load()
        },
        notdo(){
            this.person.status = false
            this.load()
        },
        detail(item){
            this.person = item
        },
        goBack(){
            this.$router.push("/referee/activityManager")
        },
        changeStatus(){
            this.load()
            this.submit()
        },
        submit(){
            this.person.core = this.core
            this.dialogVisible = false
            this.request.get("/activity/athleteSave",{
                params:{
                    userID:JSON.parse(localStorage.getItem("user")).studentCard,
                    studentCard:this.person.studentCard,
                    activityId:this.person.activityId,
                    core: this.person.core 
                }
            }).then(res=>{
                if(res.code == 200){
                    this.$message.success("修改成功")
                }else{
                    this.$message.success(res.msg)  
                }
            })
        }
    }
}
</script>

<style>
 .text {
    font-size: 20px;
  }

  .item {
    margin-bottom: 10px;
  }
</style>