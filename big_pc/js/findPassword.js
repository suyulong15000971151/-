var isFull=false;

$(function(){

	
	
	$(".registerPhone").click(function(){
		change($(this),$(".registerPhoneInput"), $(".changeLinePhone"));
	});
	$(".registerVerify").click(function(){
		change($(this),$(".registerVerifyInput"), $(".changeLineVerify"));

	});
	$(".loginPassword").click(function(){
		change($(this),$(".loginPasswordInput"), $(".changeLinePassword"));
	})
	$(".checkPassword").click(function(){
		change($(this),$(".checkPasswordInput"), $(".changeLineCheckPassword"));
	})
	$(".registerPhone").keydown(function(){
		change($(this),$(".registerPhoneInput"), $(".changeLinePhone"));
	});
	$(".registerVerify").keydown(function(){
		change($(this),$(".registerVerifyInput"), $(".changeLineVerify"));

	});
	$(".loginPassword").keydown(function(){
		change($(this),$(".loginPasswordInput"), $(".changeLinePassword"));
	})
	$(".checkPassword").keydown(function(){
		change($(this),$(".checkPasswordInput"), $(".changeLineCheckPassword"));
	})
	//可见密码
	$(".loginPasswordRight").click(function(){
		openEyes($(this),$(".closeImg"));
	});
	$(".checkPasswordRight").click(function(){
		$(this).fadeOut().siblings().find(".checkPasswordInput").attr("type","text");
		$(".closeImg1").fadeIn();
//		openEyes($(this),$(".closeImg1"));
	});
	$(".closeImg").click(function(){
		$(this).fadeOut().siblings().find(".loginPasswordInput").attr("type","password");
		$(".loginPasswordRight").fadeIn();
		
	});
	$(".closeImg1").click(function(){
		$(this).fadeOut().siblings().find(".checkPasswordInput").attr("type","password");
		$(".checkPasswordRight").fadeIn();	
	});
	//验证码
	$(".registerVerifyRight").click(function(){
		sendCode();
	});
	
	$(".registerBtn").click(function(){
		if(isFull){
			forgetPwd();
		}
	});
	
});

function checkParams(){

	//手机号
	var phone = $('#phone').val();
	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);
	
	//验证码
	var vaildatecode=$('#vaildatecode').val();
	var isNum = PCUtils.checkStr(vaildatecode,3);
	
	//用户密码
	var password=$('#password').val();
	//用户确认密码
	var cpassword=$('#cpassword').val();
	
	if (phone == ""||(!isPhone)||vaildatecode==""||(!isNum)||password==null||password==""||password.length<6||cpassword==null||cpassword==""||cpassword.length<6) {
		isFull=false;
		$('.registerBtn').css("background-color","#cbcbcb");
	}else{
		isFull=true;
		$('.registerBtn').css("background-color","rgba(22,96,235,1)");
	}
}



function openEyes(open,close){
	open.fadeOut().siblings().find(".loginPasswordInput").attr("type","text");
	close.fadeIn();
}
function change(thiss,inputs,changeLines){
	 inputs.addClass("active").focus();
	 var inputHtmls = thiss.siblings().find(".allInput");
	 for(var i = 0;i < inputHtmls.length;i++){
	 	if(inputHtmls.eq(i).val() == ""){
	 		inputHtmls.eq(i).removeClass("active");
	 	}
	 }
	 changeLines.addClass("changeLine");
	  
	 thiss.find(".changeLine").animate({width:"420px",left:"0px",right:"0px"});
	 thiss.siblings().find(".changeLine").css({width:"0px",position:"absolute",left:"50%"});
	 thiss.siblings().find(".all").removeClass("changeLine");
}


var codeTime = 120;
var codeId = null;
var isRegister=false;


//查看手机号是否注册
function checkPhone(){
	//手机号
	var phone = $('#phone').val();
	var isPhone = PCUtils.checkStr(phone, 0);
	 if(phone==null||phone==""||phone.length!=11){
	 	$('.phoneHint').html("请输入正确的手机号");
	 	isFull=false;
		$('.registerBtn').css("background-color","#999999");
	 	return false;
	 }else if (!isPhone) {
	 	$('.phoneHint').html("请输入正确的手机号");
	 	isFull=false;
		$('.registerBtn').css("background-color","#999999");
		return false;
	 }else{
	 	//查询手机号是否注册
	 	$.ajax({
			type : 'GET',
			url : PCData.OUTSIDE_AUTHORITY_URL + 'user/phoneavailable?phone='+phone,
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				console.log(data);
				if (data.code != "200") {
					$('.phoneHint').html("");
					isRegister=true;
					checkParams();
				}else{
					$('.phoneHint').html("手机号未注册");
					isRegister=false;
					isFull=false;
					$('.registerBtn').css("background-color","#999999");
				}
			},
			error : function(e) {
				console.log(e);
				isRegister=false;
			}
		});
	 }
}

function sendCode() {
	if (codeId == null&&isRegister) {
		//手机号
		var phone = $('#phone').val();
		
		//手机号校验
		var isPhone = PCUtils.checkStr(phone, 0);
		if (phone == "") {
			$('.phoneHint').html("请输入正确的手机号");
		} else if (!isPhone) {
			$('.phoneHint').html("请输入正确的手机号");
		} else {
			var data = {
				"phone" : phone,
			};
			$.ajax({
				type : 'POST',
				url : PCData.OUTSIDE_AUTHORITY_URL + 'user/sendcode',
				data : JSON.stringify(data),
				contentType : "application/json",
				dataType : 'json',
				success : function(data) {
					if (data.code != "200") {
						Message(data.message,"error");
					} else {
						$('#vaildatecode').val('');	
						codeTimeInit();
					}
				},
				error : function(e) {
					Message("请求错误","error");
					console.log(e);
				}
			});
		}
	}
}

function codeTimeInit() {
	var index = codeTime;
	var go = function() {
		if (index < 0) {
			clearInterval(codeId);
			codeId = null;
		} else {
			if(index==0){
				$('.registerVerifyRight').html('获取验证码');
			}else{
				$('.registerVerifyRight').html('<span style="color:#0A5BEF">'+index+'S</span>');
			}
			index--;
		}
	};
	go();
	codeId = setInterval(go, 1000);
};


//用户忘记密码
function forgetPwd() {
	
	//手机号
	var phone = $('#phone').val();
	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);
	
	//验证码
	var vaildatecode=$('#vaildatecode').val();
	var isNum = PCUtils.checkStr(vaildatecode,3);
	
	//用户密码
	var password=$('#password').val();
	//用户确认密码
	var cpassword=$('#cpassword').val();
	
	
	if (phone == "") {
		Message("请输入手机号","error");
	} else if (!isPhone) {
		Message("手机号格式不正确","error");
	} else if(vaildatecode==""){
		Message("请输入验证码","error");
	} else if(!isNum){
		Message("验证码格式不正确","error");
	} else if(password==null){
		Message("请输入用户密码","error");
	} else if(password.length<6){
		Message("用户密码至少6位","error");
	} else if(cpassword==null){
		Message("请输入用户确认密码","error");
	} else if(cpassword.length<6){
		Message("用户确认密码至少6位","error");
	} else if(password!=cpassword){
		Message("用户两遍密码输入不一致","error");
	} else {
		var isPassword = PCUtils.checkStr(password,8);
		var isPasswordc = PCUtils.checkStr(cpassword,8);
		
		if(!isPassword){ 
			Message("用户密码格式不正确","error");
		}else if(!isPasswordc){
			Message("用户确认密码格式不正确","error");
		}else{
			var data = {
				"phone" : phone,
				"vaildatecode" :vaildatecode,
			};
			$.ajax({
				type : 'POST',
				url : PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
				data : JSON.stringify(data),
				contentType : "application/json",
				dataType : 'json',
				success : function(data) {
					if (data.code != "200") {
						Message(data.message,"error");
					} else {
						var data = {
							"phone" : phone,
							"newpassword" :hex_md5(PCData.PREX+password)
						};
						$.ajax({
							type : 'POST',
							url : PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwd',
							data : JSON.stringify(data),
							contentType : "application/json",
							dataType : 'json',
							success : function(data) {
								if (data.code != "200") {
									Message(data.message,"error");
								} else {
									Message("修改成功，将跳转到登录页面","win");
									setTimeout('window.location.href="../../view/system_log/login.html"',2000);
								}
							},
							error : function(e) {
								Message("请求错误","error");
								console.log(e);
							}
						});
					}
				},
				error : function(e) {
					Message("请求错误","error");
					console.log(e);
				}
			});
		}
	}
}







