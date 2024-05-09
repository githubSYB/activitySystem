<template>
    <div>
  <el-aside width="200px" style="background-color: #545c64;height:600px;" >
      <div style="line-height: 60px;
                  height: 60px;
                  text-align: center;
                  background-color: #545c64;
                  color:#fff;">
          <b>裁判主页</b>
      </div>

      <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/referee/myInfo">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">个人信息</span>
              </template>
          </el-menu-item>
          <el-menu-item index="/referee/activityManager">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">活动管理</span>
              </template>
          </el-menu-item>
          <el-menu-item index="">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">参与留言</span>
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