<template>
	<div class="content">
		<p class="fhbtn">
			<a href="javascript:;" onclick="window.history.go(-1)"></a>
		</p>
		<h1></h1>
		<div class="login-box">
			<p class="lsolid"></p>
			<div class="login">
				<router-link to="/user-login">登录</router-link>
				<span></span>
				<router-link to="/user-reg">注册</router-link>
			</div>
			<p class="rsolid"></p>
		</div>
		<ul>
			<div class="error"></div>
			<li class="lifirst">
				<input type="text" v-model="phone" value="" class="phone" placeholder="手机号" onkeyup="value=value.replace(/[^\d]/g,'')" maxlength="11" />
				<!--<span>帐号</span>-->
			</li>
			<li>
				<input type="text" value="" placeholder="验证码" />
				<span class="vertical" @click="varical">发送验证码</span>
			</li>
			<li>
				<input type="password" value="" placeholder="登陆密码" />
				<!--<span>密码</span>-->
			</li>
			<li>
				<input type="password" value="" placeholder="确认密码" />
				<!--<span>密码</span>-->
			</li>
		</ul>
		<div class="footbox">
			<input type="button" value="注 册" class="login-btn" />
			<a href="javascript:;" class="tishi">忘记密码？</a>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				validCode: true,
				phone:""
			}
		},
		methods: {
			varical() {
			
		        var _this=this
				console.log(this.$el)
				var time = 120;
				var code = $('.vertical');
				var phone = $(".phone").val()
				if(phone == "") {
					//						alert("请输入手机号")
					$(".error").html("请输入手机号")
				} else {
					var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
					if(!myreg.test(phone)) {
						//							alert("请输入正确的手机格式")
						$(".error").html("请输入正确的手机格式")

					} else {
						if(_this.validCode) {
							_this.validCode = false
							//						code.addClass("msgs1");
							var t = setInterval(function() {
								time--;
								code.html(time + "秒");
								if(time == 0) {
									clearInterval(t);
									code.html("重新获取");
									_this.validCode = true;
									//								code.removeClass("msgs1");

								}
							}, 1000)
                            const params=JSON.stringify({
									phone:_this.phone,
									codeType:0
									
								})
							_this.$http({
								method:"post",
								url:"http://121.196.206.199:8884/outsideauthority/user/sendcode",
								data:params,
							    headers:{'Content-Type': "application/json"}
								
							}).then(function(res) {
								//console.log( res.data);
								//setTimeout(function(){
//								_this.arrList = res.data;
								console.log(res.data)
								console.log("成功")
								//},1000);
							}).catch(function(err) {
								console.log(err);
								console.log("失败")
							});

							//								$.ajax({
							//									type: "post",
							//									url: "http://121.196.206.199:8884/outsideauthority/user/sendcode",
							//									async: true,
							//									dataType: "json",
							//									contentType: "application/json",
							//									data: JSON.stringify({
							//										phone: phone,
							//										codeType: 0
							//									}),
							//									success: function(res) {
							//										console.log(res)
							//									},
							//									error: function() {
							//										console.log("错误")
							//									}
							//								});

						}
					}
				}
			}
		}
	}
</script>
<style scoped>
	body {
		background: #f2f4f5;
	}
	
	li {
		overflow: hidden;
		margin-bottom: 10px !important;
	}
	
	li input {
		display: inline-block;
		float: left;
		padding-left: 0 !important;
		text-indent: 10px;
		font-size: 14px !important;
		background: #fff
	}
	
	.content {
		max-width: 6.4rem;
		margin: 0 auto;
		background: none
	}
	
	.content .fhbtn {
		padding-top: 0.27rem;
	}
	
	.content .fhbtn a {
		display: block;
		width: 0.23rem;
		height: 0.25rem;
		background: url(../assets/img/history1.png) no-repeat 0 0;
		background-size: 100%;
		margin-left: 0.3rem;
	}
	
	.content h1 {
		width: 2.18rem;
		height: 1.35rem;
		background: url(../assets/img/logo.png) no-repeat 0 0;
		background-size: 100%;
		margin: 0 auto;
		margin-top: 1.22rem;
	}
	
	.content .login {
		width: 2.0rem;
		height: 0.38rem;
		margin: 0 auto;
		margin-top: 0.85rem;
	}
	
	.login a {
		width: 0.97rem;
		height: 0.38rem;
		font-size: 0.35rem;
		line-height: 0.38rem;
		float: left;
		color: #4c4f50;
		text-align: center;
	}
	
	.login span {
		float: left;
		height: 0.38rem;
		border-left: 1px solid #4c4f50;
	}
	
	.content .login-box {
		position: relative;
	}
	
	.content .login-box .lsolid {
		width: 1.96rem;
		height: 0.18rem;
		border-bottom: 1px solid #4c4f50;
		position: absolute;
		top: 0;
		left: 0.1rem;
	}
	
	.content .login-box .rsolid {
		width: 1.96rem;
		height: 0.18rem;
		border-bottom: 1px solid #4c4f50;
		position: absolute;
		top: 0;
		right: 0.1rem;
	}
	
	.content ul {
		width: 5.78rem;
		background: none;
		margin: 0 auto;
		margin-top: 0.68rem;
		overflow: hidden;
	}
	
	.content ul li {
		height: 0.95rem;
		position: relative;
		background: #fff
	}
	
	.content ul li.lifirst {
		border-bottom: 1px solid #e5e7e8;
	}
	
	.content ul li input {
		padding-left: 1.24rem;
		width: 4.54rem;
		height: 100%;
		font-size: 0.4rem;
	}
	
	.content ul li span {
		width: 1.43rem;
		height: 0.49rem;
		position: absolute;
		top: 0.26rem;
		right: 0;
		border-left: 1px solid #676868;
		color: #676868;
		font-size: 0.22rem;
		line-height: 0.49rem;
		text-align: center;
	}
	
	.content .footbox {
		width: 4.65rem;
		height: 0.65rem;
		margin: 0 auto 1rem;
	}
	
	.content .login-btn {
		width: 4.65rem;
		height: 0.65rem;
		background: #4c4f50;
		color: #fff;
		text-align: center;
		line-height: 0.65rem;
		border-radius: 8px;
		display: block;
		margin-top: 0.32rem;
		font-size: 0.28rem;
	}
	
	.content .tishi {
		width: 1.4rem;
		font-size: 0.25rem;
		margin-top: 0.28rem;
		display: block;
	}
</style>