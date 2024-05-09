<template>
<div>
    <!-- 裁判的活动 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
           <b style="color: blue;">{{ user.name }}</b>
           <span>作为裁判的比赛有：</span>
        </div>
        <div v-for="item in activities" :key="item.id" class="text item">
            <span style="font-size: 30px;">{{"活动序号"+item.id + ':' + item.activityName }}</span>
            当前状态：<span style="font-size: 30px;color: aqua;">{{ item.status }}</span>
            <el-button type="text" @click="$router.push('/activity?id='+item.id)" style="padding: 0;">
                <span style="font-size: 20px;">查看详情</span>
                <i class="el-icon-d-arrow-right" style="font-size: 20px;"></i>
            </el-button>
        </div>
    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            user:JSON.parse(localStorage.getItem("user")),
            activities:{}
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.post("/user/refMyAct",this.user).then(res=>{
                this.activities = res.data
                res.data.forEach(item => {
                    for(const key in item){
                        if(key == "status"){
                            if(item.status==1){item.status = "未开始"}
                            else if(item.status==2){item.status = "进行中"}
                            else if(item.status==3){item.status = "已结束"}
                        }
                    }
                console.log(this.activities);
                })
            })
        },
    }
}
</script>

<style>
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

  .box-card {
    width: 100%;
  }
</style>