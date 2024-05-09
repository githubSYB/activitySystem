<template>
  <div>
    <!-- 表格上边的按钮 -->
    <div style="padding: 10px 0;">
            <el-input v-model="studentCard" style="width: 200px;" placeholder="输入学号" prefix-icon="el-icon-search"></el-input>
            <el-button class="ml-10" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-10" type="info" @click="reset">重置</el-button>
            <el-button class="ml-10" type="success" @click="addstu">添加</el-button>
    </div>
    <!-- 数据库中的学生表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="studentCard" label="学号" width="150px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100px"></el-table-column>
        <el-table-column prop="gender" label="性别" width="50px"></el-table-column>
        <el-table-column prop="phone" label="电话" width="150px"></el-table-column>
        <el-table-column prop="credit" label="学分" width="50px"></el-table-column>
        <el-table-column prop="representative" label="学生身份" width="150px">
            <template slot-scope="scope">
                <span v-if="scope.row.representative == 0">普通学生</span>
                <el-button type="info" v-else-if="scope.row.representative == 1" @click="approval(scope.row)">成为学生代表</el-button>
                <el-button type="success" v-else>学生代表</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="300px">
            <template slot-scope="scope">
                <el-button icon="el-icon-edit" type="info" @click="handleEdit(scope.row)" >编辑</el-button>
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确认'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定删除吗？"
                    @confirm = "delstu(scope.row.studentCard)"
                    >
                <el-button type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
                </el-popconfirm>
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

<!-- 弹出的个人信息窗口 -->
<el-dialog title="个人信息" :visible.sync="dialogVisible" width="500px">
  <el-form ref="form" :model="form" label-width="80px" size="small">
  <el-form-item label="学号" ><el-input v-model="form.studentCard" :disabled="disabled"></el-input></el-form-item>
  <el-form-item label="姓名"><el-input v-model="form.name"></el-input></el-form-item>
  <el-form-item label="性别"><el-input v-model="form.gender"></el-input></el-form-item>
  <el-form-item label="电话"><el-input v-model="form.phone"></el-input></el-form-item>
  <el-form-item label="学分"><el-input v-model="form.credit"></el-input></el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit">提交</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [],
            total:0,
            pageSize:5,
            pageNum:1,
            studentCard:"",
            dialogVisible: false,
            form:{},
            disabled:true
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/user/findStuPage",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    studentCard:this.studentCard
                }
            }).then(res => {
                this.tableData = res.data;
                this.total = res.total;
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
            this.load()
        },
        reset(){
            this.studentCard = "";
            this.load()
        },
        submit() {
            this.request.post("/user/save",this.form).then(res => {
                if(res){
                    this.$message.success("保存成功")
                    this.dialogVisible = false
                    this.disabled = true
                    this.load()
                }else{
                    this.$message.error("保存失败")
                }
            })
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
        delstu(studentCard){
            this.request.delete("/user/del/"+studentCard).then(res => {
                if(res){
                    this.$message.success("删除成功")
                    this.load()
                }else{
                    this.$message.error("删除失败")
                }
            })
        },
        approval(stu){
            stu.representative = 2
            this.request.post("/user/changeIdentity",stu).then(res=>{
                if(res.code == 200){
                    this.$message.success("审核通过")
                    this.load()
                }else{
                    this.$message.error(res.msg)
                }
            })
        }
    }
}
</script>

<style>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
}
.el-input{
    width:200px
}
.el-aside {
    color: #333;
}
</style>