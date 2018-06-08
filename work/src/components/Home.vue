<template>
	<div class="content">
		<Slider></Slider>
		<div class="newsList">
			<ul>
				<li v-for="(item,index) in arrList" >
					<router-link :to="'/article/'+item.id">
						<h2>{{index+1}} . {{item.title}}</h2>
						<p>{{item.detail}}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Slider from './Slider.vue'
	export default {
		data() {
			return {
				arrList: []
			}
		},
		components: {
			Slider
		},
		mounted() {
			//获取数据
			this.fetchData();
		},
		methods: {
			fetchData() {

				var _this = this;
				_this.$store.dispatch('showLoading')

				//这里是axios请求
				this.$http.get('src/data/index.data').then(function(res) {
					//console.log( res.data);
					//setTimeout(function(){
					_this.arrList=res.data;
					console.log(res)
//					_this.$emit("child-say",res.data)
					//},1000);
				}).catch(function(err) {
					console.log(err);
				});

				// GET request for remote image


				//              这里是jquery请求

				//              setTimeout(function(){
				//              	 $.ajax({
				//             	type:"get",
				//             	url:"src/data/index.data",
				//             	async:false,
				//             	success:function(res){
				//             		var res=JSON.parse(res)
				//             		_this.arrList=res;
				//                  console.log(res)
				//
				//                    _this.$store.dispatch('hideLoading')
				//             	},
				//             	error:function(res){
				//             		consolef.log(res)
				//             	}
				//             });
				//              },1000)

			}
			
			
		}
	}
</script>
<style scoped>
	@import '../assets/css/index.css';
</style>

<!--http://iservice.itshsxt.com/restaurant/find-->