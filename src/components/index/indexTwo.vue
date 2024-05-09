<template>
<div>
  
<el-row>
  <el-col :span="12">
   <el-card class="box-card"> 
      <div slot="header" class="clearfix">
        <span outAct="1">室外活动</span>
      </div>
    <div v-for="item in outActArr" :key="item.id" class="text item" style="margin-bottom: 0;padding: 8px 0;">
      <i>活动的名字是：{{ item.activityName }}</i>
      <el-button type="text" @click="info(item)">
        更多信息<i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
   </el-card>
  </el-col>
  <el-col :span="12">
   <el-card class="box-card"> 
      <div slot="header" class="clearfix">
        <span inAct="0">室内活动</span>
      </div>
    <div v-for="item in inActArr" :key="item.id" class="text item" style="margin-bottom: 0;padding: 8px 0;">
      <i>活动的名字是：{{ item.activityName }}</i>
      <el-button type="text" @click="info(item)">
        了解更多<i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
   </el-card>
  </el-col>
</el-row>
  




<el-dialog
  title="详细信息"
  :visible.sync="dialogVisible"
  width="80%">     
    <el-descriptions :data="act" :title="act.activityName+'的状态是：'+act.status" direction="vertical" :column="4" border>
      <el-descriptions-item label="活动序号">{{ act.id }}</el-descriptions-item>
      <el-descriptions-item label="活动名称">{{ act.activityName }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ act.beginDate }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ act.stopDate }}</el-descriptions-item>
      <el-descriptions-item label="活动区域">{{ act.region }}</el-descriptions-item>
      <el-descriptions-item label="活动场地">{{ act.place }}</el-descriptions-item>
      <el-descriptions-item label="裁判">{{ act.whetherReferee }}</el-descriptions-item>
      <el-descriptions-item label="裁判工号">{{ act.refereeCard }}</el-descriptions-item>
      <el-descriptions-item label="活动学时">{{ act.credit }}</el-descriptions-item>
      <el-descriptions-item label="限报人数">{{ act.countRule }}</el-descriptions-item>
      <el-descriptions-item label="已报人数">{{ act.countApply }}</el-descriptions-item>
      <el-descriptions-item label="活动信息">{{ act.activityMessage }}</el-descriptions-item>
    </el-descriptions>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="apply">报名</el-button>
    <el-button type="info" @click="dialogVisible = false">取消</el-button>
  </span>
</el-dialog>
  

</div>
</template>

<script>
export default {
    data() {
      return {
          act:{},
          dialogVisible: false,
          outActArr:localStorage.getItem("outAct") ? JSON.parse(localStorage.getItem("outAct")): {},
          inActArr :localStorage.getItem("inAct") ? JSON.parse(localStorage.getItem("inAct")): {},
          studentCard:''
        }
    },
    created(){
      this.load()
    },
    methods: {
      load(){
        this.request.get("/activity/regionAct").then(res=>{
          if(res.outAct == this.outActArr && res.inAct == this.outActArr){
          }else{
             localStorage.setItem("outAct",JSON.stringify(res.outAct))
              localStorage.setItem("inAct",JSON.stringify(res.inAct))
          }
        })
      },
      apply(){
        this.request.get("/activity/signUp",{
          params:{
            studentCard: JSON.parse(localStorage.getItem("user")).studentCard,
            activityId:this.act.id,
            role:JSON.parse(localStorage.getItem("user")).role
          }
        }).then(res =>{
          if(res.code == 200){
            this.$message.success("报名成功")
            this.dialogVisible = false
          }
          else {
            this.$message.error(res.msg)
            this.dialogVisible = false
          }
        })
      },
      ifneed(){
        
      },
      info(item){
        console.log(item);
        this.dialogVisible = true
        this.act = item
        if(this.act.whetherReferee==true){
          this.act.whetherReferee="需要"
        }else{
          this.act.whetherReferee="不需要"
          this.act.refereeCard="无"
        }
        if(item.status == 1){
          this.act.status="活动未开始"
        }else if(item.status == 2){
          this.act.status="正在进行中"
        }else if(item.status == 3){
          this.act.status="活动已结束"
        }
        if(item.region==1){this.act.region="室外"}
        else{this.act.region="室内"}
      }
    }
}
</script>

<style>
.box-card{
  /* width: 100%; */
  padding: auto;
  margin: 15px auto;
}
.text {
    font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>