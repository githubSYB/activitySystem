<template>
  <activityTableVue :tableData="tableData" :total="total" :pageNum="pageNum" :pageSize="pageSize">
  </activityTableVue>
</template>

<script>
import activityTableVue from '../activityTable.vue'
export default {
    data() {
        return {
            tableData:[],
            total:0,
            pageSize:4,
            pageNum:1,
        }
    },
    components:{
        activityTableVue
    },
    created(){
        this.load()
    },
    methods:{
        load(){
            this.request.get("/activity/actStatus",{
                params: {
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    studentCard:JSON.parse(localStorage.getItem("user")).studentCard
                }
            }).then(res => {
                if(res.total === 0){
                    this.$router.push("/student/empty")
                }else{
                    this.tableData = res.data.records;
                    console.log(res)
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
                                else if(item.status==4){item.status = "未通过"}
                        }
                    }); 
                }
                                       
            })
        }
    }
}
</script>

<style>

</style>