<template>
<div>
    <!-- 表格上边的按钮 -->
    <div style="padding: 10px 0;">
            <el-input 
                v-model="status" 
                style="width: 200px;" 
                placeholder="输入活动状态" 
                prefix-icon="el-icon-search">
            </el-input>
            <el-button class="ml-10" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-10" type="info" @click="reset">重置</el-button>
    </div>
    <!-- 活动信息表格 -->
    <activityTable 
                :handle-current-change="handleCurrentChange"
                :handle-size-change="handleSizeChange"
                :page-num="pageNum"
                :page-size="pageSize"
                :table-data="tableData"
                :total="total">
        <template #operate>
            <el-table-column prop="operate" label="操作" width="200px">
            <template slot-scope="scope">
                <el-popconfirm
                    v-if="scope.row.status == '未开始'"
                    class="ml-5"
                    confirm-button-text='确认'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定取消报名吗？"
                    @confirm = "delMyAct(scope.row.id)"
                    >
                <el-button type="info" 
                           icon="el-icon-delete" 
                           slot="reference"
                           round>
                    取消报名</el-button>
                </el-popconfirm>
                <el-button type="info" 
                           @click="msgText"
                           icon="el-icon-delete" 
                           round 
                           v-else>
                    取消报名
                </el-button>
            </template>
        </el-table-column>
        </template>
    </activityTable>
</div>
</template>

<script>
import activityTable from '../activityTable.vue'
export default {
    components:{
        activityTable
    },
    data() {
        return {
            tableData: [],
            total:0,
            pageSize:4,
            pageNum:1,
            dialogVisible: false,
            form:{},
            disabled:true,
            activityName:'',
            status:''
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/user/myActPage",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard
                }
            }).then(res => {
                if(res.total === 0){
                    this.$router.push("/student/empty")
                }else{
                    this.tableData = res.data;
                    console.log(res)
                    this.total = res.total;
                    res.data.forEach(item => {
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
        delMyAct(id){
            this.request.get("/user/delMyAct",{
                params:{
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard,
                    actId:id
                }}).then(res => {
                    if(res === 1){
                        this.$message.success("取消报名成功")
                        this.load()
                    }else{
                        this.$message.error("取消失败")
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
        search(){
            this.request.post("/activity/findAct",this.status).then(res =>{
                this.tableData = res
            })
        },
        reset(){
            this.load()
        },
        cancel(){
            this.dialogVisible = false
            this.disabled = true
            this.form = {}
        },
        handleEdit(row){
            this.form = row
            this.dialogVisible = true;
        },
        addstu(){
            this.disabled = false
            this.dialogVisible = true;
        },
        msgText(){
            this.$message.error("活动已经开始/结束不能操作！")
        }
    }
}
</script>

<style>

</style>