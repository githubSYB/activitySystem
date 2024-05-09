<template>
  <el-empty :description="msg"></el-empty>
</template>

<script>
export default {
  data() {
    return {
      msg:"空空如也"
    }
  },
  mounted(){
    this.load()
  },
  methods:{
    load(){
      const text = this.$route.query.text
      this.msg = text
    }
  }
}
</script>

<style>

</style>