<template>
    <div>
        <!-- 表格上边的按钮 -->
        <div style="padding: 10px 0;">
                <el-input v-model="activityName" style="width: 200px;" placeholder="输入活动名称" prefix-icon="el-icon-search"></el-input>
                <el-button class="ml-10" type="primary" @click="search">搜索</el-button>
                <el-button class="ml-10" type="info" @click="reset">重置</el-button>
        </div>
        <!-- 活动信息表格 -->
        <activityTable 
            :table-data="tableData" 
            :pageNum="pageNum" 
            :pageSize="pageSize" 
            :total="total"
            :handle-current-change="handleCurrentChange"
            :handle-size-change="handleSizeChange">
            <template #tableItem>
                <el-table-column prop="studentCard" label="申报人"></el-table-column>
            </template>
            <template #operate>
                <el-table-column prop="operate" label="操作" width="280px">
                    <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="success" @click="checkPass(scope.row)" >通过</el-button>
                    <el-popconfirm
                        class="ml-5"
                        confirm-button-text='确认'
                        cancel-button-text='我再想想'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定不通过吗？"
                        @confirm="unPass(scope.row)">
                        
                        <el-button type="danger" 
                                    icon="el-icon-delete" 
                                    slot="reference">
                                不通过</el-button>
                    </el-popconfirm>
                </template>
                </el-table-column>
            </template>
        </activityTable>
    <!-- 设置裁判的弹框 -->
    <el-dialog title="请添加裁判" :visible.sync="caipan" width="500px">
    <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="活动序号：">
            <el-input v-model="form.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="裁判号：">  
            <el-autocomplete
                v-model="form.refereeCard"
                :fetch-suggestions="querySearchAsync"
                placeholder="输入裁判序号"
                @select="handleSelect">
            </el-autocomplete>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="caipan = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <!-- 填写不通过的原因 -->
  <el-dialog title="填写原因" :visible.sync="reason" width="500px">
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="活动序号：">
            <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="原因：">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入原因"
            v-model="form.reason">
        </el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkUnPass">提交</el-button>
        <el-button @click="reason = false">取消</el-button>
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
                caipan: false,
                reason:false,
                form:{},
                act:{},
                refereeId:"",
                disabled:true,
                activityName:'',
                bgcolor:'bgcolor',
                restaurants: [],
                state: '',
                timeout:  null,
                restaurants:[]
            }
        },
        created(){
            this.load()
            this.request.get("/user/findRef").then(res => {
                    res.forEach(item => {
                        this.restaurants.push({value:item.studentCard})
                    });
        })
        },
        methods:{
            load(){
                this.request.get("/activity/beginAct",{
                    params: {
                        pageNum:this.pageNum,
                        pageSize:this.pageSize,
                    }
                }).then(res => {
                    this.tableData = res.data.records;
                    this.total = res.data.total;
                    this.tableData.forEach(item => {
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
            checkPass(item){
                if(item.whetherReferee === "不需要" ||(item.refereeCard != "" && item.refereeCard != undefined && item.refereeCard != null)){
                    this.request.get("/activity/approvalAct",
                    {params:{
                        status:1,
                        actId:item.id
                    }}).then(res =>  {
                        this.$message.success("审核通过")
                        this.load()
                    })
                }else{
                    this.caipan = true
                    this.form.id = item.id
                }
                
            },
            unPass(item){
                this.form = item
                this.reason = true
            },
            checkUnPass(){
                this.request.get("/activity/approvalAct",
                    {params:{
                        status:4,
                        actId:this.form.id,
                        reason:this.form.reason
                    }}).then(res =>  {
                        this.reason = false
                        this.$message.info("审核已打回")
                        this.form = {}
                        this.load()
                    })
            },
            submit(id) {
                this.request.post("/activity/updateAct",this.form).then(res => {
                    if(res){
                        this.caipan = false
                        this.$message.success("添加成功，重新审核")
                        this.load()
                    }else{
                        this.$message.error("审核失败")
                    }
                })
            },
            info(item){
                console.log(item);
                this.caipan = true
                this.act = item
                if(item.whetherReferee==1){
                    this.act.whetherReferee="需要"
                    this.refereeId=this.act.refereeId
                }
                else{
                    this.act.whetherReferee="不需要"
                    this.refereeId="无"
                }
                if(item.region==1){this.act.region="室外"}
                else{this.act.region="室内"}
                if(item.whetherReferee==1){this.act.region="室外"}
                else{this.act.region="室内"}
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
                this.load()
            },
            reset(){
                this.load()
            },
            
            cancel(){
                this.caipan = false
                this.disabled = true
                this.form = {}
            },
            handleEdit(row){
                this.form = row
                this.caipan = true;
            },
            addstu(){
                this.disabled = false
                this.caipan = true;
            },
            loadAll() {
                return [
                    {value:"1"},
                    {value:"2"}
                ];
            },
            querySearchAsync(queryString, cb) {
                var results = this.restaurants;
                console.log(results);
                cb(results)
                // var restaurants = this.restaurants;
                // var results = restaurants;
                // cb(results);
                // clearTimeout(this.timeout);
                // this.timeout = setTimeout(() => {
                
                // }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
    }
    </script>
    
<style>
.bgcolor{
    background: rgb(229, 83, 83);
}
</style>