<template>
<div>
    <!-- 活动信息表格 -->
    <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="activityName" label="活动名称" ></el-table-column>
        <el-table-column prop="avatarUrl" label="活动头像" >
          <template slot-scope="scope">
            <el-image :src="scope.row.avatarUrl" ></el-image>   
          </template>
        </el-table-column>
        <!-- 活动的具体信息 -->
        <el-table-column prop="beginDate" label="开始时间" width="100px"></el-table-column>
        <el-table-column prop="stopDate" label="结束时间" width="100px" ></el-table-column>
        <el-table-column prop="region" label="活动区域"></el-table-column>
        <el-table-column prop="place" label="活动位置" ></el-table-column>
        <!-- 活动插入信息 -->
        <slot name="tableItem"></slot>
        <el-table-column prop="credit" label="活动学时"></el-table-column>
        <el-table-column prop="whetherReferee" label="裁判"></el-table-column>
        <el-table-column prop="refID" label="裁判工号"></el-table-column>
        <el-table-column prop="status" label="活动状态" width="110px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == '待审核'" type="info" >{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '未开始'" type="info" >{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '进行时'" type="success" >{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '已结束'" >{{ scope.row.status }}</el-button>
            <el-button v-if="scope.row.status == '未通过'" type="danger" >{{ scope.row.status }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="countRule" label="规定人数"></el-table-column>
        <el-table-column prop="countApply" label="报名人数"></el-table-column>
          <!-- 操作栏 -->
        <slot name="operate"></slot>
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
</div>
</template>

<script>
export default {
    props:['tableData','total','pageSize','pageNum','handleSizeChange','handleCurrentChange'],
}
</script>

<style>

</style>