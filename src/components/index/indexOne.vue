<template>
<div>
  <!-- 轮播图效果 -->
  <div style="text-align: center" v-if="user=='admin'">
   <el-button @click="box2=true" type="info">
      编辑轮播图
  </el-button> 
  </div>
  <el-carousel :interval="5000" arrow="always" height="400px">
    <el-carousel-item v-for="item in imgArrs" :key="item.id">
      <img :src="item.url" width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
  <!-- 首页展示 -->
  <div style="text-align: center" v-if="user=='admin'">
   <el-button @click="box1=true" type="info" >
      编辑活动展示
   </el-button> 
  </div>
  <div style="text-align: center;">
    <h1>活动</h1>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="6" v-for="item in showActivity" :key="item.id">
        <div @click="$router.push('/activityDetail?id='+item.id)">
          <el-card :body-style="{ padding: '40px' }">
          <img :src="item.avatarUrl" width="80%" height="250px" >
          <!-- <el-image :src="item.avatarUrl"></el-image> -->
          <div>
            <span>{{ item.activityName }}</span>
          </div>
        </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-divider>关于我们</el-divider>
  <div style="text-align: center;" class="footer">
    <h1>关于我们</h1>
    <span>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</span><br>
    <span>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</span>
  </div>
  <!-- 管理轮播图 -->
  <el-dialog
    title="轮播图片"
    :visible.sync="box2"
    width="50%">
    <el-table :data="imgArrs" border stripe height="500px">
        <el-table-column prop="id" label="序号" width="60px"></el-table-column>
        <el-table-column prop="name" label="图片名称" width="100px"></el-table-column>
        <el-table-column prop="url" label="活动头像" width="100px">
          <template slot-scope="scope">
            <el-image :src="scope.row.url"></el-image>   
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="280px">
            <template slot-scope="scope">
                <el-button v-if="scope.row.showed==0" type="success" @click="show(scope.row)" >展示</el-button>
                <el-button v-if="scope.row.showed==1" type="info" @click="delshow(scope.row)" >隐藏</el-button>
            </template>
        </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="box2=false">取 消</el-button>
      <el-button type="primary" @click="box2=false">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 管理活动图片 -->
  <el-dialog
    title="展示活动"
    :visible.sync="box1"
    width="50%">
    <el-table :data="allActivity" border stripe height="500px">
        <el-table-column prop="id" label="序号" width="60px"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" width="100px"></el-table-column>
        <el-table-column prop="avatarUrl" label="活动头像" width="100px">
          <template slot-scope="scope">
            <el-image :src="scope.row.avatarUrl"></el-image>   
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="280px">
            <template slot-scope="scope">
                <el-button v-if="scope.row.showed==0" type="success" @click="show(scope.row)" >展示</el-button>
                <el-button v-if="scope.row.showed==1" type="info" @click="delshow(scope.row)" >隐藏</el-button>
            </template>
        </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="box1 = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { Image } from "element-ui"
import img1 from "../../assets/a.png"
import img2 from "../../assets/b.jpg"
import img3 from "../../assets/c.jpg"
import img4 from "../../assets/d.jpg"
import router from "@/router"

export default {
    data() {
      return {
        user:JSON.parse(localStorage.getItem("user")).studentCard,
        showActivity:[],
        allActivity:[],
        imgArrs:[
          {id:0,url: img1,name:"图片1"},
          {id:1,url: img2,name:"图片2"},
          {id:2,url: img3,name:"图片3"},
          {id:3,url: img4,name:"图片4"}],
        activeName:['1','2','3'],
        title:"有梦想，就去努力实现！",
        text:"生命在于运动，多参见活动有利于身体健康",
        box1:false,
        box2:false
      }
    },
    created(){
      this.load()
    },
    methods:{
      load(){
          this.request.get("/activity/find").then(res => {
            // console.log(res);
            this.allActivity = res
            this.showActivity = []
            res.forEach(item => {
              for(const key in item){
                if( key == "showed"){
                  if(item.showed == 1){
                    this.showActivity.push(item)
                  }else{

                  }
                }
              }
            });
          })
        },
      show(item){
        item.showed = 1
        console.log(item);
        this.request.post("/activity/show",item).then(res=>{
          if(res.code == 200){
            this.$message.success("开始展示")
          }
          else{
            this.$message.error(res.msg)
          }
        })
      },
      delshow(item){
        item.showed = 0
        console.log(item);
        this.request.post("/activity/show",item).then(res=>{
          if(res.code == 200){
            this.$message.success("隐藏展示")
          }
          else{
            this.$message.error(res.msg)
          }
        })
      },
      submit(){
        this.box1 = false
        this.load()
      },
      showDetail(id){
        console.log(id);
      }
    }
}
</script>

<style>
.footer{
    background-color: #04395E;
    color: white;
  }
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
  
</style>