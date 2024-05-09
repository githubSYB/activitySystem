<template>
<div>
  <!-- 添加按钮 -->
  <div style="padding: 10px 0;">
      <el-input v-model="comment.text" placeholder="留言内容" style="width: 200px;" class="ml-10"></el-input>
      <el-input v-model="comment.activityName" placeholder="活动名称" style="width: 200px;" class="ml-10"></el-input>
      <el-button class="ml-10" type="primary" @click="search">搜索</el-button>
      <el-button class="ml-10" type="success" @click="addBtn">新增留言</el-button>
  </div>
  <!-- 评论内容 -->
  <div v-for="item in tableData" :key="item.id" style="padding: 5px;">
    <span style="color: #F88070;">{{ item.activityName }}</span>的留言
    <el-button type="text" @click="$router.push('/commentDetail?id='+item.id)" style="padding: 0;">
        查看更多<i class="el-icon-d-arrow-right"></i>
      </el-button>
    <div style="border-bottom: 1px solid gray; padding: 10px;">
      <div style="font-size: 23px;">{{ item.text }}</div>
      <div style="font-size: 15px; margin-top: 5px; height: 20px; line-height: 20px">
        <img v-if="item.avatarUrl" :src="item.avatarUrl" class="avatar1">
        <i v-else class="el-icon-user-solid el-icon--right"></i>
        {{ item.studentCard }}
        <i class="el-icon-time" style="margin-left: 100px;">{{ item.time }}</i>
      </div>
    </div>
  </div>
  
  <!-- 添加弹出框 -->
  <el-dialog title="新增留言" :visible.sync="dialogVisible" width="500px">
        <el-form ref="form" :model="comment" label-width="80px" size="small">
        <el-form-item label="学号" ><el-input v-model="comment.studentCard" disabled></el-input></el-form-item>
        <el-form-item label="活动名称">
            <el-autocomplete
                class="inline-input"
                v-model="comment.activityName"
                :fetch-suggestions="querySearch"
                placeholder="请输入活动名称"
                ></el-autocomplete>
        </el-form-item>
        <el-form-item label="留言内容">
            <el-input v-model="comment.text"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
      return {
        dialogVisible:false,
        comment:{
          studentCard:JSON.parse(localStorage.getItem("user")).studentCard
        },
        restaurants:[],
        tableData:[],
        msg:'',
      }
    },
    created(){
      this.load()
    },
    methods:{
      load(){
            this.request.get("/comment/find").then(res => {
                this.tableData = res
                console.log(res);
            })
        },
      addBtn(){
            this.dialogVisible = true
            this.request.get("/activity/find").then(res=>{
                res.forEach(item => {
                    for (const key in item) {
                        if(key === "activityName")
                            this.restaurants.push({value:item.activityName})
                    }
                });
            })
        },
        search(){
          this.request.post("/comment/search",this.comment).then(res=>{
            console.log(res);
          })
        },
        submit(){

        },
        querySearch(queryString, cb) {
        var results = this.restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
        },
    }
}
</script>

<style>
.avatar1{
    float: left;
    height: 23px;
    width: 23px;
    border-radius: 100%;
    margin-right: 10px;
}
</style>