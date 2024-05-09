<template>
  <div>
<el-aside width="200px" style="background-color: #545c64;height:600px;" >
    <div style="line-height: 60px;
                height: 60px;
                text-align: center;
                background-color: #545c64;
                color:#fff;">
        <b>管理员模块</b>
    </div>


    <el-menu router 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="/admin/myInfo">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">个人信息</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/admin/studentManager">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">学生管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/admin/refereeManager">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">裁判管理</span>
            </template>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>活动管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/admin/activityManager">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">活动管理</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/admin/approvalAct">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">活动审批</span>
                    </template>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/admin/messageManager">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">留言管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/admin/fileManager">
            <template slot="title">
                <i class="el-icon-folder"></i>
                <span slot="title">文件管理</span>
            </template>
        </el-menu-item>
    </el-menu>
</el-aside>
  </div>
</template>

<script>
export default {
    
}
</script>

<style>

</style>