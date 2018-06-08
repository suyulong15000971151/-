<template>
	<div>
		<!--<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>-->

		<el-dialog title="提示" :visible.sync="dialogVisible" @close="close" :show-close="whether">
			<span>这是一段信息</span>
			<span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibl">取 消</el-button>
        <el-button type="primary" @click="dialogVisibl">确 定</el-button>
          </span>
		</el-dialog>
	</div>
</template>

<script>
	   export default {
    data() {
      return {
        dialogVisible: true,
        whether:""
      };
    },
    methods: {
     dialogVisibl(){
     	this.$store.dispatch("hideDiao")
//   	this.dialogVisible=false
     },
     close(){
     this.whether=this.$store.dispatch("hideDiao")
     }
     
      
    }
  };
</script>

<style scoped>
.el-dialog{width:3.1rem;height:2rem}
.el-button{padding: 0.12rem 0.14rem !important;font-size: 0.14rem !important;}
</style>