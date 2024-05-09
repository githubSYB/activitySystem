import VueRouter from "vue-router";
import Vue from "vue";
import index from "../view/index.vue"
import login from "../view/login.vue"
import register from "@/view/register.vue";
import student from "../view/student.vue"
import referee from "../view/referee.vue"
import IndexOne from "@/components/index/indexOne.vue";
import IndexTwo from "@/components/index/indexTwo.vue";
import IndexThree from "@/components/index/indexThree.vue";
import IndexFour from "@/components/index/indexFour.vue";
import StudentApply from "@/components/student/studentApply.vue";
import StudentInfo from "@/components/admin/studentInfo.vue";
import Admin from "@/components/admin/admin.vue";
import ActivityInfo from "@/components/admin/activityInfo.vue";
import ApprovalAct from "@/components/admin/approvalAct.vue";
import MessageInfo from "@/components/admin/messageInfo.vue";
import Refereeinfo from "@/components/admin/refereeinfo.vue";
import MyAct from "@/components/student/myAct.vue";
import Empty from "@/components/empty.vue";
import CommentDetail from "@/view/commentDetail.vue";
import FileInfo from "@/components/admin/fileInfo.vue";
import MyInfo from "@/components/myInfo.vue";
import RefereeInfo from "@/components/referee/refereeInfo.vue";
import ActivityManager from "@/components/referee/activityManager.vue";
import Activity from "@/view/activity.vue";
import PassAct from "@/components/student/passAct.vue";
import UnPassAct from "@/components/student/unPassAct.vue";
import MySignIn from "@/components/student/mySignIn.vue";
import Identity from "@/components/student/identity.vue";
import ActivityDetail from "@/view/activityDetail.vue";


Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path:"/",
            name:"根路径",
            redirect: '/index/indexOne'
        },
        {
            path:'/index',
            name:"首页",
            component: index,
            children: [
                {path:'indexOne', component: IndexOne},
                {path:'indexTwo', component: IndexTwo},
                {path:"indexThree",component: IndexThree},
                {path:"indexFour",component: IndexFour}
            ]
        },
        {
            path:"/login",
            name:"登录界面",
            component: login
        },
        {
            path:"/register",
            name:"注册界面",
            component: register
        },
        {
            path:"/student",
            name:"学生主页",
            component: student,
            children:[
                {path:'info',name:"学生信息",component:MyInfo},
                {path:'apply',name:"申请活动",component:StudentApply},
                {path:'myAct',name:"我的活动",component:MyAct},
                {path:"empty",name:"空",component: Empty},
                {path:"passAct",name:"已通过的活动",component:PassAct},
                {path:"unPassAct",name:"已通过的活动",component:UnPassAct},
                {path:"mySignIn",name:"签到",component:MySignIn},
                {path:"identity",name:"申请身份",component:Identity}
            ]
        },
        {
            path:"/referee",
            name:"裁判主页",
            component: referee,
            children:[
                {path:'myInfo',name:'裁判信息',component:RefereeInfo},
                {path:"activityManager",name:'活动管理',component:ActivityManager}
            ]
        },
        {
            path:'/admin',
            name:"管理员界面",
            component: Admin, 
            children: [
                {path:'studentManager',component:StudentInfo},
                {path:'refereeManager',component:Refereeinfo},
                {path:'activityManager',component:ActivityInfo},
                {path:'approvalAct',component: ApprovalAct},
                {path:'messageManager',component:MessageInfo},
                {path:'fileManager',component:FileInfo},
                {path:'myInfo',component:MyInfo}
            ]
        },
        {
            path:"/commentDetail",
            name:"评论详情页",
            component:CommentDetail
        },
        {
            path:"/activity",
            name:"裁判管理人员信息",
            component:Activity
        },
        {
            path:"/activityDetail",
            name:"活动具体信息",
            component:ActivityDetail
        }
    ]
})
export default router