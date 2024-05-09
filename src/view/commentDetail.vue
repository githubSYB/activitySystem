<template>
<el-container>
  <el-header>
    <Header>
        <template #back>
            <el-page-header @back="goBack" class="goBack" title="回首页"></el-page-header>
        </template>
    </Header>
  </el-header>
  <el-main>
    <div style="padding: 10px;">
      <div style="font-size: 15px; margin: 5px 0 10px 0;">
        来自学生<i style="color: blue">{{ comment.studentCard }}</i>关于
        {{ comment.activityName}} 的留言
        <i class="el-icon-time" style="margin-left: 100px;">{{ comment.time }}</i>
      </div>
      <!-- <div style="font-size: 23px;">{{ comment.text }}</div> -->
      <div>
        <mavon-editor
        class="md"
        :value="comment.text"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
        />
       </div>
      
    </div>
  </el-main>
  <el-footer>
    <!-- 发表评论区 -->
    <div style="margin:20px 0">
        <div style="border-bottom:1px solid orangered;padding:10px 0;font-size:20px">评论</div>
        <div style="padding:10px 0">
        <el-input size="small" type="textarea" v-model="form.content"></el-input>
        </div>
        <div class="pd-10" style="text-align:right">
        <el-button type="primary" size="small" @click="submit">发表评论</el-button>
        </div>
    </div>
    <!-- 评论列表区 -->
    <div style="border-bottom: 1px solid gray; padding: 6px;">
        <div v-for="item in comments" :key="item.id" style="border-bottom:lpx solid #ccc;padding:10px 0;display:flex">
            {{ item.children.Length }}
            <!-- 头像 -->
            <div style="width:100px;text-align:center">
                <el-image :src="item.avatarUrl" style="width:50px;height:50px;border-radius:50%"></el-image>
            </div>
            <!-- 内容 -->
            <div style="flex:1;font-size:14px;padding:5px 0;line-height:25px">
                <div style="padding: 10px;">
                    <b>{{item.studentCard }}</b>:<span>{{item.content }}</span> 
                </div>
                <div style="display: flex;height: 30px">
                    <div style="width: 200px;padding-top: 12px;">
                        <i class="el-icon-time"></i><span style="margin-left:5px">{{item.time }}</span>
                    </div>
                    <div style="text-align: right;flex: 1;">
                        <el-button 
                            style="margin-left:5px" 
                            type="text"
                            @click="reply(item.id)"
                            >回复</el-button>
                        <el-button 
                            type="text" 
                            style="color:red" 
                            @click="del(item.id)"
                            v-if="user.id === item.userId"
                        >删除</eL-button>
                    </div>
                </div>
            <!-- 回复列表 -->
            <div v-if="item.children.length" style="padding-left:200px;">
                <div v-for="subItem in item.children" :key="subItem.id" style="background-color:#F2F2F2;padding:5px 20px">
                    <div style="font-size:14px;padding:5px 0;line-height:25px">
                        <div>
                            <b style="color:#3a8ee6">@{{subItem.puserCard }}</b>
                        </div>
                        <div style="padding-left:5px">
                            <b>{{subItem.studentCard }}:</b>
                            <span> {{subItem.content}} </span>
                        </div>
                    </div>  
                    <div style="display: flex;height: 30px">
                        <div style="width: 200px;padding-top: 12px;">
                            <i class="el-icon-time"></i><span style="margin-left:5px">{{subItem.time }}</span>
                        </div>
                        
                        <div style="text-align: right;flex: 1;">
                            <el-button 
                                style="margin-left:5px" 
                                type="text"
                                @click="reply(subItem.id)"
                                >回复</el-button>
                            <el-button 
                                type="text" 
                                style="color:red" 
                                @click="del(subItem.id)"
                                v-if="user.id === subItem.userId"
                            >删除</eL-button>
                        </div>
                    </div>

                </div>
            </div>
            </div>    
        </div>
    </div>  
  </el-footer>
  <!-- 回复弹窗 -->
  <el-dialog title="回复" :visible.sync="dialogFormVisible" width="30%">
    <el-form Label-width="80px" size="small">
        <el-form-item label="回复内容">
            <el-input type="textarea" v-model="content" autocomplete="off"></el-input>
        </el-form-item>
        <div>
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </el-form>
  </el-dialog>
</el-container>
</template>

<script>
import Header from "@/components/header.vue"
export default {
    data() {
        return {
            comment:[],
            content:'',
            comments:{},
            form:{
                content:'',
                userId:JSON.parse(localStorage.getItem("user")).id,
                commentId:this.$route.query.id
            },
            user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
            dialogFormVisible:false,
        }
    },
    components:{
        Header
    },
    created(){
        this.load()
        this.loadList()
    },
    methods:{
        load(){
            const id = this.$route.query.id
            this.request.get("/comment/commentDetail",{params:{id:id}}).then(res=>{
                this.comment = res
            })
        },
        loadList(){
            const id = this.$route.query.id
            this.request.get("/comments/findTree",{params:{commentId:id}}).then(res=>{
                this.comments = res
                console.log(res);
            })
        },
        reply(id){
            this.dialogFormVisible = true
            this.form.pid = id
        },
        submit(){
            if(this.content.length){
                this.form.content = this.content
            }
            this.request.post("/comments/add",this.form).then(res=>{
                if(res.code == 200){
                    this.$message.success("发表成功")
                    this.dialogFormVisible = false
                    this.loadList()
                    this.form.content = ""
                    this.content = ""
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        del(id){
            this.request.delete("/comments/del/"+id).then(res=>{
                if(res.code == 200){
                    this.$message.success("删除成功")
                    this.loadList()
                }else{
                    this.$message.error(res.msg)
                }
            })
        },
        goBack(){
            this.$router.push("/index/indexFour")
        },
    }
}
</script>

<style>

</style>