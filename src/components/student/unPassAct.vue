<template>
<div>
    <!-- 活动信息表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="60px"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" width="100px"></el-table-column>
        <el-table-column prop="reason" label="失败原因" width="100px"></el-table-column>
        <el-table-column prop="operate" label="操作" width="280px">
            <template slot-scope="scope">
                <el-button icon="el-icon-edit" type="info" @click="reApply(scope.row)" >重新申请</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页处理的内容 -->
    <div style="padding: 10px 0">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-num="pageNum"
      :page-sizes="[3,4,5,6]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
</div>
</template>

<script>
import router from '@/router'
export default {
    data() {
        return {
            tableData:[],
            total:0,
            pageSize:4,
            pageNum:1,
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            // console.log(typeof JSON.parse(localStorage.getItem("user")).studentCard);
            this.request.get("/activity/actStatus",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard,
                    status:4//审核未通过的status==4
                }
            }).then(res => {
                if(res.data.total === 0){
                    const text = "你的活动都通过啦！"
                    this.$router.push("/student/empty?text="+text)
                }else{
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.tableData.forEach(item => {
                        for(const key in item){
                            if(key == "region"){
                                if(item.region==1){item.region = "室外"}
                                else if(item.region==0){item.region = "室内"}
                            }
                            if(key == "whetherReferee")
                                if(item.whetherReferee==true){item.whetherReferee = "需要"}
                                else if(item.whetherReferee==true){item.whetherReferee = "不需要"}
                            if(key == "status")
                                if(item.status==0){item.status = "待审核"}
                                else if(item.status==1){item.status = "未开始"}
                                else if(item.status==2){item.status = "进行时"}
                                else if(item.status==3){item.status = "已结束"}
                        }
                    }); 
                }
                                       
            })
        },
        reApply(activity){
            this.$router.push({
                path:"/student/apply",
                query:{
                    activity:JSON.stringify(activity)
                }
            })
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.load()
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.load()
        },
    }
}
</script>

<style>

</style>