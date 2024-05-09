<template>
<div>
    <!-- 活动信息表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="60px"></el-table-column>
        <el-table-column prop="avatarUrl" label="头像" width="60px">
            <template slot-scope="scope">
                <el-image :src="scope.row.avatarUrl" ></el-image>   
            </template>
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称" width="100px"></el-table-column>
        <el-table-column prop="status" label="活动状态" width="110px">
            <template slot-scope="scope">
            <el-button v-if="scope.row.status == '待审核'" type="info" plain disabled>{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '未开始'" type="info" plain disabled>{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '进行时'" type="success" disabled>{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '已结束'" plain disabled>{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '未通过'" type="danger" plain disabled>{{ scope.row.status }}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="operate" label="签到" width="280px">
            <template slot-scope="scope">
                <el-button v-if="(scope.row.signIn == 1)" type="success">已签到</el-button>
                <el-button v-else-if="(scope.row.status == '进行时')" 
                           type="warning" @click="signInBtn(scope.row.activityId)">签到
                </el-button>
                <el-button v-else type="info">不可签到</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 输入签到码 -->
    <el-dialog title="签到码" :visible.sync="codeform" width="500px">
        <el-form ref="code" label-width="100px" size="small">
            <el-form-item label="签到：">
                <el-input v-model="code"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="signInSub()">提交</el-button>
            <el-button @click="codeform = false">取消</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>

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
export default {
    data() {
        return {
            tableData:[],
            total:0,
            pageSize:4,
            pageNum:1,
            codeform:false,
            code:'',
            activityId:''
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/activity/athleteSave",{
                params: {
                    userID:JSON.parse(localStorage.getItem("user")).studentCard,
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res => {
                // console.log("load1",res);
                if(res.data.total === 0){
                    const text = "你还没有报名活动！"
                    this.$router.push("/student/empty?text="+text)
                }else{
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                    this.tableData.forEach(item => {
                        for(const key in item){
                            if(key == "status"){
                                if(item.status==0){item.status = "待审核"}
                                else if(item.status==1){item.status = "未开始"}
                                else if(item.status==2){item.status = "进行时"}
                                else if(item.status==3){item.status = "已结束"}
                            }
                            if(key == "status"){
                                if(item.status==0){item.status = "待审核"}
                                else if(item.status==1){item.status = "未开始"}
                                else if(item.status==2){item.status = "进行时"}
                                else if(item.status==3){item.status = "已结束"}
                            }
                                
                        }
                    }); 
                }
                                       
            })
        },
        signInSub(){
            this.request.get("/activity/athleteSave",{
                params: {
                    userID:JSON.parse(localStorage.getItem("user")).studentCard,
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    activityId:this.activityId,
                    code:this.code
                }
            }).then(res => {
                console.log(res);
                this.codeform = false
                this.load()
                this.code = ''
                if(res.code == 200){
                    this.$message.success("签到成功！")
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        signInBtn(actId){
            this.activityId = actId
            this.codeform = true
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