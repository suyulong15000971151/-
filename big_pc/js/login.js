var isFull=false;

var pcUser=PCData.getUerInfo();	
if(pcUser!=null){
	var data = {
		"bauId":pcUser.id
	};
	$.ajax({
		type : 'POST',
		url :PCData.APPUSER_URL + 'login/loginOut',
		data : JSON.stringify(data),
		contentType : "application/json",
		dataType : 'json',
		async: false,
		success : function(data) {
			if(data!=null){
				localStorage.removeItem('pcUser');
			}
		},
		error : function(e) {
			console.log(e);
		}
	});	
}

$(function(){
	
	
	
	$(".loginPhone").click(function(){
		change($(this),$(".loginPhoneInput"), $(".changeLinePhone"));
	});
	$(".checkPassword").click(function(){
		change($(this),$(".checkPasswordInput"), $(".changeLinePassword"));
	});
	
	$(".loginPhone").keydown(function(){
		change($(this),$(".loginPhoneInput"), $(".changeLinePhone"));
	});
	$(".checkPassword").keydown(function(){
		change($(this),$(".checkPasswordInput"), $(".changeLinePassword"));
	});
	//可见密码
	$(".checkPasswordRight").click(function(){
		openEyes($(this),$(".closeImg"));
	});
	$(".closeImg").click(function(){
		$(this).fadeOut().siblings().find(".checkPasswordInput").attr("type","password");
		$(".checkPasswordRight").fadeIn();
		
	});
	
	//点击登录
	$(".loginBtn").click(function(){
		if(isFull){
			login();
		}
	});
});

function checkParams(){
	//手机号
	var phone = $('#phone').val();
	//手机号格式验证
	var isPhone = PCUtils.checkStr(phone, 0);
	
	//用户密码
	var password=$('#password').val();
	if (phone == ""||(!isPhone)||password == ""||password==null||password.length<6) {
		isFull=false;
		$('.loginBtn').css("background-color","#cbcbcb");
	}else{
		isFull=true;
		$('.loginBtn').css("background-color","rgba(22,96,235,1)");
	}
}


function openEyes(open,close){
	open.fadeOut().siblings().find(".checkPasswordInput").attr("type","text");
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

var loginAdress=returnCitySN["cname"];
var loginIp=returnCitySN["cip"];




//用户登录
function login(){
	//手机号
	var phone = $('#phone').val();
	//手机号格式验证
	var isPhone = PCUtils.checkStr(phone, 0);
	//用户密码
	var password=$('#password').val();
	
	if (phone == "") {
		Message("请输入手机号","error");
	}else if (!isPhone) {
		Message("手机号格式不正确","error");
	}else if (password == ""||password==null||password.length<6) {
		Message("请输入密码","error");
	}else{
		//请求参数封装
		var data = {
			"phone" : phone,
			"password" : hex_md5(PCData.PREX+password),
			"loginAdress" : loginAdress,
			"loginIp" : loginIp
		};
		console.log(data);
	 	$.ajax({
			type : 'POST',
			url : PCData.APPUSER_URL + 'login/dologin',
			data : JSON.stringify(data),
			contentType : "application/json",
			dataType : 'json',
			success : function(data) {
				console.log(data);
				if (data.code != "200") {
					Message(data.message,"error");
				} else {
					var pcUser=data.data;
					PCData.setUserInfo(pcUser);
					location.href = "../../index.html";
					
					// $.ajax({
						// type : 'GET',
						// url : PCData.AGENT_URL+"agentV1/userInformationService?bauId="+pcUser.id,
						// contentType : "application/json",
						// dataType : 'json',
						// success : function(data) {
							// if (data.code == "200") {
								// pcUser.payment=data.data;
								// PCData.setUserInfo(pcUser);
								// location.href = "../../index.html";
							// }else{
								// PCData.setUserInfo(pcUser);
								// location.href = "../../index.html";
							// }
						// },
						// error : function(e) {
							// PCData.setUserInfo(pcUser);
							// location.href = "../../index.html";
						// }
					// });
				}
			},
			error : function(e) {
				Message("请求错误","error");
				console.log(e);
			}
		});
	}
}
