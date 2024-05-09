<template>
<div>
    <!-- 表格上边的按钮 -->
    <div style="padding: 10px 0;">
            <!-- <el-input v-model="studentCard" style="width: 200px;" placeholder="输入活动名称" prefix-icon="el-icon-search"></el-input> -->
            <!-- <el-button class="ml-10" type="primary" @click="search">搜索</el-button> -->
            <!-- <el-button class="ml-10" type="info" @click="reset">重置</el-button> -->
            <el-button class="ml-10" type="success" @click="addBtn">添加</el-button>
    </div>
    <!-- 数据库中的信息表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="留言id" width="50px"></el-table-column>
        <el-table-column prop="studentCard" label="学号" width="150px"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" width="100px"></el-table-column>
        <el-table-column prop="text" label="留言内容" width="200px"></el-table-column>
        <el-table-column prop="time" label="留言时间" width="200px"></el-table-column>
        <el-table-column prop="operate" label="操作" width="280px">
            <template slot-scope="scope">
                <!-- <el-button icon="el-icon-edit" type="info" @click="handleEdit(scope.row)" >编辑</el-button> -->
                <el-popconfirm
                    class="ml-5"
                    confirm-button-text='确认'
                    cancel-button-text='我再想想'
                    icon="el-icon-info"
                    icon-color="red"
                    title="你确定删除吗？"
                    @confirm = "delstu(scope.row.id)"
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
    <!-- 新增内容 -->
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
            <!-- <mavon-editor ref="mkd" v-model="com.text" :ishljs="true"></mavon-editor> -->
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
import axios from 'axios'
export default {
    data(){
    return {
        tableData: [],
        total:0,
        pageSize:5,
        pageNum:1,
        studentCard:"",
        dialogVisible: false,
        comment:{
            studentCard:JSON.parse(localStorage.getItem("user")).studentCard
        },
        restaurants: [],
        state1: '',
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/comment/findAll",{
                params:{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize
                }
            }).then(res => {
                this.tableData = res.comment
                this.total = res.total
            })
        },
        handleEdit(item){
            alert(item)
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
        submit(){
            this.request.post("/comment/save",this.comment).then(res =>{
                if(res.code == 200){
                    this.dialogVisible = false
                    this.load()
                    this.$message.success("新增成功！")
                }
            })
        },
        delstu(id){
            this.request.delete("/comment/delCom/"+id).then(res=>{
                if(res){
                    this.load()
                    this.$message.success("删除成功！")
                }else{
                    this.$message.error("操作失败！")
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
        querySearch(queryString, cb) {
        var results = this.restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
        },
        imgAdd(pos,$file){
            let $vm = this.refs.mkd
            // 
            const formData = new FormData();
            formData.append('file',$file);
            axios({
                url:"http://localhost:9090/file/upload",
                method:'post',
                data: formData,
                headers: {'Content-Type' : 'multipart/form-data'}
            }).then((res) => {
                $vm.$img2Url(pos,res.data);
            })
        }
    },
}
</script>

<style>

</style>