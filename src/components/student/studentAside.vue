<template>
    <div>
  <el-aside width="200px" style="background-color: #545c64;height:600px;" >
      <div style="line-height: 60px;
                  height: 60px;
                  text-align: center;
                  background-color: #545c64;
                  color:#fff;">
          <b>学生主页</b>
      </div>

      <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="/student/info">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">个人信息</span>
              </template>
          </el-menu-item>
          <el-menu-item index="/student/myAct">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">报名记录</span>
              </template>
          </el-menu-item>
          <el-menu-item index="/student/mySignIn">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">签到管理</span>
              </template>
          </el-menu-item>
          <el-submenu index="" v-if="user.representative == 2">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>申报活动</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/student/apply">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>创建</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/student/passAct">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>全部</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="/student/unPassAct">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>驳回</span>
                    </template>
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="/student/identity" v-else>
            <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">申请身份</span>
              </template>
          </el-menu-item>
          <el-menu-item index="">
              <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">活动成绩</span>
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
    data() {
        return {
            user:JSON.parse(localStorage.getItem("user"))
        }
    },
  }
  </script>
  
  <style>
  
  </style>