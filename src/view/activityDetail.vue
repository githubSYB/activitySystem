<template>
<div>
    <!-- 标题栏 -->
    <Header></Header>
    <!-- 具体的内容信息 -->
    <div style="width: 80%; margin: 10px auto;">
        <el-row>
        <el-col :span="10">
            <el-image :src="activity.avatarUrl" 
                    style="width:90%; border: 1px solid red;">
            </el-image>
        </el-col>
        <el-col :span="14">
            <el-descriptions :data="activity" :title="activity.name" :column="1">
                <el-descriptions-item label="活动编号">{{ activity.id }}</el-descriptions-item>
                <el-descriptions-item label="活动开始时间">{{ activity.beginDate }}</el-descriptions-item>
                <el-descriptions-item label="活动结束时间">{{ activity.stopDate }}</el-descriptions-item>
                <el-descriptions-item label="备注">
                <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            </el-descriptions>
        </el-col>     
        </el-row>
        
    </div>
</div>
</template>

<script>
import Header from '@/components/header.vue'
export default {
    components:{
        Header
    },
    data() {
        return {
            activity:{}
        }
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            const id = this.$route.query.id
            this.request.get("/activity/actDetail",{params:{
                id:id
            }}).then(res=>{
                this.activity = res.data
                console.log(this.activity);
            })
        }
    }
}
</script>

<style>

</style>