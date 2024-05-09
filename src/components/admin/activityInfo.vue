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
    <activityTable :handleCurrentChange="handleCurrentChange"
                   :handleSizeChange="handleSizeChange"
                   :page-num="pageNum"
                   :page-size="pageSize"
                   :table-data="tableData"
                   :total="total">
        <template #operate>
            <el-table-column prop="operate" label="操作" width="280px">
            <template slot-scope="scope">
                <el-button icon="el-icon-edit" type="info" @click="handleEdit(scope.row)" >编辑</el-button>
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确认'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定删除吗？"
                    @confirm = "delAct(scope.row.id)"
                    >
                <el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
                </el-popconfirm>
            </template>
        </el-table-column>
        </template>
    </activityTable>
<!-- 活动信息窗口 -->
<el-dialog title="活动信息" :visible.sync="dialogVisible" width="500px">
  <el-form ref="form" :model="form" label-width="120px" size="small">
  <el-form-item label="活动序号" ><el-input v-model="form.id" :disabled="disabled"></el-input></el-form-item>
  <el-form-item label="活动名称"><el-input v-model="form.activityName"></el-input></el-form-item>
  <el-form-item label="开始时间"><el-input v-model="form.beginDate"></el-input></el-form-item>
  <el-form-item label="结束时间"><el-input v-model="form.stopDate"></el-input></el-form-item>
  <el-form-item label="活动区域"><el-input v-model="form.region"></el-input></el-form-item>
  <el-form-item label="活动位置"><el-input v-model="form.place"></el-input></el-form-item>
  <el-form-item label="活动学时"><el-input v-model="form.credit"></el-input></el-form-item>
  <el-form-item label="裁判"><el-input v-model="form.whetherReferee"></el-input></el-form-item>
  <el-form-item label="裁判工号"><el-input v-model="form.refereeId"></el-input></el-form-item>  
  <el-form-item label="活动状态"><el-input v-model="form.status"></el-input></el-form-item>
  <el-form-item label="规定人数"><el-input v-model="form.countRule"></el-input></el-form-item>
  <el-form-item label="报名人数"><el-input v-model="form.countApply"></el-input></el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
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
            this.request.get("/activity/findActPage",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                }
            }).then(res => {
                this.tableData = res.data;
                console.log(this.tableData);
                this.total = res.total;
                res.data.forEach(item => {
                    for(const key in item){
                        if(key == "region"){
                            if(item.region==1){item.region = "室外"}
                            else if(item.region==0){item.region = "室内"}
                        }
                        if(key == "whetherReferee")
                            if(item.whetherReferee==1){item.whetherReferee = "需要"}
                            else if(item.whetherReferee==0){item.whetherReferee = "不需要"}
                        if(key == "status")
                            if(item.status==0){item.status = "待审核"}
                            else if(item.status==1){item.status = "未开始"}
                            else if(item.status==2){item.status = "进行时"}
                            else if(item.status==3){item.status = "已结束"}
                    }
                });
                
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
        submit() {
        //     this.request.post("/user/save",this.form).then(res => {
        //         if(res){
        //             this.$message.success("保存成功")
        //             this.dialogVisible = false
        //             this.disabled = true
        //             this.load()
        //         }else{
        //             this.$message.error("保存失败")
        //         }
        //     })
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
        delAct(id){
            this.request.delete("/activity/delAct/"+id).then(res => {
                if(res){
                    this.$message.success("删除成功")
                    this.load()
                 }else{
                     this.$message.error("删除失败")
                 }
            })
        }
    }
}
</script>

<style>

</style>