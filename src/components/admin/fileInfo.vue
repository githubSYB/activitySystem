<template>
<div>
    <!-- 表格上边的按钮 -->
    <div style="padding: 10px 0;">
            <el-input v-model="name" style="width: 200px;" placeholder="输入文件名" prefix-icon="el-icon-search"></el-input>
            <el-button class="ml-10" type="primary" @click="search">搜索</el-button>
            <el-button class="ml-10" type="info" @click="reset">重置</el-button>
            <el-button class="ml-10" type="success" @click="addFile">新增文件</el-button>
    </div>
    <!-- 数据库中的文件表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="50px"></el-table-column>
        <el-table-column prop="name" label="文件名" width=""></el-table-column>
        <el-table-column prop="type" label="文件格式" width=""></el-table-column>
        <el-table-column prop="size" label="文件大小(kb)" width=""></el-table-column>
        <el-table-column prop="url" label="下载" width="">
            <template slot-scope="scope">
               <el-button type="primary" @click="window.open(scope.row.url)">下载</el-button> 
            </template>
        </el-table-column>
        <el-table-column  label="文件状态">
          <template slot-scope="scope">
          <el-switch 
                    v-model="scope.row.enable" 
                    active-color="#13ce66" 
                    inactive-color="#ccc"
                    @change="changeEnable(scope.row)"></el-switch>
          </template>
         </el-table-column>
        <el-table-column prop="operate" label="操作" width="">
            <template slot-scope="scope">
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确认'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定删除吗？"
                    @confirm = "delFile(scope.row.id)"
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
    <!-- 弹出的上传窗口 -->
    <el-dialog title="上传文件" :visible.sync="dialogVisible" width="500px">
        <el-upload
            class="upload-demo"
            drag
            action="http://localhost:9090/file/upload"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            
        </el-upload>
        <el-button type="primary" @click="submit">上传完成</el-button> 
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
            dialogVisible: false,
            form:{},
            disabled:true,
            name:'',
            window:window
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/file/findAll",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    name:this.name

                }
            }).then(res => {
                console.log(res);
                this.tableData = res.data.records;
                this.total = res.data.total;
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
            this.load()
        },
        changeEnable(row){
            this.request.post("/file/update",row).then(res=>{
                if(row.enable){
                    this.$message.success(row.name+"已启用！")
                }else{
                    this.$message.error(row.name+"已禁用！")
                }
            })
        },
        delFile(id){
            this.request.delete("/file/"+id).then(res => {
                if(res.code == 200){
                    this.$message.success("删除成功")
                    this.load()
                }else{
                    this.$message.error("删除失败")
                }
            })
        },
        addFile(){
            this.dialogVisible = true
            this.load()
        },
        submit(){
            this.dialogVisible = false
            this.load()
        }
        
    }
}
</script>

<style>

</style>