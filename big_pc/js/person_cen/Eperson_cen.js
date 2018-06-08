var pcUser = PCData.getUerInfo();
if(pcUser == null) {
	location.href = "../../view/system_log/login.html";
}

var data = {
	"bauId": pcUser.id
};
$.ajax({
	type: 'POST',
	url: PCData.APPUSER_URL + 'appuser/userinfo',
	data: JSON.stringify(data),
	contentType: "application/json",
	dataType: 'json',
	async: false,
	success: function(data) {
		if(data.code != "200") {

		} else {
			pcUser = data.data;
			PCData.setUserInfo(data.data);
		}
	},
	error: function(e) {
		console.log(e);
	}
});

if(pcUser != null && pcUser.phone != null) {
	$("#loginUser").text(pcUser.phone);
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
var type = getQueryString("type");
if(type != null && type == 1) {
	$(".Authen").hide();

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .identity").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #identity").addClass("fadeIn");
}

if(type != null && type == 2) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

	$('#modifyFundPwdDiv').css("display", "block");
	$("#fundModifyDiv").html("cancel");

};

if(type != null && type == 3) {
	$(".conta .con-box .sidebar .list .item").removeClass("active");
	$(".conta .con-box .sidebar .list .French").addClass("active");

	$(".conta .con-box .sidebar .list .French").parent().find("i").addClass("tv");
	$(".conta .con-box .sidebar .list .French").parents(".list").siblings().find("i").removeClass("tv");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");

	if(pcUser.realNameStatus == null || pcUser.realNameStatus != 1) {
		$(".Authen").show();
		// goAuth();
	} else {
		$(".conta .con-box .left-con #French").addClass("fadeIn");
		$.ajax({
			type: 'GET',
			url: PCData.AGENT_URL + "agentV1/userInformationService?bauId=" + pcUser.id,
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code == "200") {
					pcUser.payment = data.data;
					PCData.setUserInfo(pcUser);
					userPayments();
				}
			},
			error: function(e) {
				console.log(e);
			}
		});
		$("#name").val(pcUser.name);
		$("#wxname").val(pcUser.name);
		$("#aliname").val(pcUser.name);
	}
};

if(type != null && type == 4) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

	$('#modifyEmailDiv').css("display", "block");
};
if(type != null && type == 5) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

};

if(type != null && type == 6) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .problem").addClass("active");

	$(".conta .con-box .sidebar .list .problem").parent().find("i").addClass("tv");
	$(".conta .con-box .sidebar .list .problem").parents(".list").siblings().find("i").removeClass("tv");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #problem").addClass("fadeIn");

};

$(function() {

	//登录密码修改div
	$("#loginModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.googleStatus != 1) {
			$("#googleModigyDiv").text("set");
		} else {
			$("#googleModigyDiv").text("see");
		}

		var display = $('#modifyFundPwdDiv').css('display');
		if(display == 'none') {
			if(pcUser.fundsStatus != 1) {
				$("#fundModifyDiv").text("set");
			} else {
				$("#fundModifyDiv").text("modify");
			}
		} else {
			$("#fundModifyDiv").text("cancel");
		}

		if(pcUser.mailbox == null || pcUser.mailbox == "" || pcUser.mailbox.length < 1) {
			$("#emailModifyDiv").text("set");
		} else {
			$("#emailModifyDiv").text("modify");
		}
		if(block == "block") {
			$(this).text("modify");
		} else {
			$(this).text("cancel");
		}
	});

	//绑定手机号修改div
	$("#phoneModigyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.googleStatus != 1) {
			$("#googleModigyDiv").text("set");
		} else {
			$("#googleModigyDiv").text("see");
		}
		if(pcUser.fundsStatus != 1) {
			$("#fundModifyDiv").text("set");
		} else {
			$("#fundModifyDiv").text("modify");
		}
		if(pcUser.mailbox == null || pcUser.mailbox == "" || pcUser.mailbox.length < 1) {
			$("#emailModifyDiv").text("set");
		} else {
			$("#emailModifyDiv").text("modify");
		}

		if(block == "block") {
			$(this).text("modify");
		} else {
			$(this).text("cancel");
		}
	});
	//api
	$(".openApiBtn").click(function(){
		$(".bindApi").show();
		$(".apiSet").hide();
		$(this).css("background","#CBCBCB");
	})
	$(".bindApi .open").click(function(){
		$(".openApi").show();
		$(".bindApi").hide();
		$(".openApiBtn").hide();
		$(".closeApiBtn").show();
	})
	$(".bindApi .cancel").click(function(){
		$(".bindApi").hide();
		$(".apiSet").show();
		$(".openApiBtn").css("background","#1660EB");
	})
	$(".closeApiBtn").click(function(){
		$(".bindCloseApi").show();
		$(".openApi").hide();
		
	})
	$(".bindCloseApi .cancel").click(function(){
		$(".bindCloseApi").hide();
		$(".openApi").show();
	})
	$(".generateBtn").click(function(){
		$(".bindSetApi").show();
		$(".openApi").hide();
		$(".closeApiBtn").hide();
		$(".titleText").html("API重新生成秘钥");
	})
	$(".bindSetApi .cancel").click(function(){
		$(".bindSetApi").hide();
		$(".openApi").show();
		$(".closeApiBtn").show();
		$(".titleText").html("API私有交易设置");
	})
	$(".modifyBtn").click(function(){
		$(".bindModifyApi").show();
		$(".openApi").hide();
		$(".closeApiBtn").hide();
		$(".titleText").html("API绑定IP设备");
	})
	$(".bindModifyApi .cancel").click(function(){
		$(".bindModifyApi").hide();
		$(".openApi").show();
		$(".closeApiBtn").show();
		$(".titleText").html("API私有交易设置");
	})
	//绑定谷歌验证码修改div
	$("#googleModigyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.fundsStatus != 1) {
			$("#fundModifyDiv").text("set");
		} else {
			$("#fundModifyDiv").text("modify");
		}
		if(pcUser.mailbox == null || pcUser.mailbox == "" || pcUser.mailbox.length < 1) {
			$("#emailModifyDiv").text("set");
		} else {
			$("#emailModifyDiv").text("modify");
		}

		if(block == "block") {
			if(pcUser.googleStatus != 1) {
				$(this).text("set");
			} else {
				$(this).text("see");
			}
		} else {
			$(this).text("cancel");
		}
	});

	//资金密码修改div
	$("#fundModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.googleStatus != 1) {
			$("#googleModigyDiv").text("set");
		} else {
			$("#googleModigyDiv").text("see");
		}
		if(pcUser.mailbox == null || pcUser.mailbox == "" || pcUser.mailbox.length < 1) {
			$("#emailModifyDiv").text("set");
		} else {
			$("#emailModifyDiv").text("modify");
		}

		if(block == "block") {
			if(pcUser.fundsStatus != 1) {
				$(this).text("set");
			} else {
				$(this).text("modify");
			}
		} else {
			$(this).text("cancel");
		}
	});

	//邮箱修改div
	$("#emailModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.googleStatus != 1) {
			$("#googleModigyDiv").text("set");
		} else {
			$("#googleModigyDiv").text("see");
		}
		if(pcUser.fundsStatus != 1) {
			$("#fundModifyDiv").text("set");
		} else {
			$("#fundModifyDiv").text("modify");
		}

		if(block == "block") {
			if(pcUser.mailbox == null || pcUser.mailbox == "" || pcUser.mailbox.length < 1) {
				$(this).text("set");
			} else {
				$(this).text("modify");
			}
		} else {
			$(this).text("cancel");
		}
	});

	//这里是身份认证的第二步
	$(".conta .con-box .left-con #identity .level-con .first .sub .btn").click(function() {
		var userName = $("#userName").val();
		var idCard = $("#idCard").val();
		var res = IdentityCodeValid(idCard);
		if(userName == null || userName == "" || userName.length < 1) {
			Message("请输入姓名", "error");
		} else if(idCard == null || idCard == "" || idCard.length < 1) {
			Message("请输入身份证号码", "error");
		} else if(!res) {
			Message("身份证号码输入有误", "error");
		} else {
			$('.conta .con-box .left-con #identity .level-con .first').css("display", "none");
			$('.conta .con-box .left-con #identity .level-con .second ').css("display", "block");
			$(".conta .con-box .left-con #identity .level a").addClass("active");
		}
	});

	// //这里是法币交易下拉设置
	// $(".conta .con-box .left-con #French .item .item_top .set").click(function(){
	// var block=$(this).parent().next().css("display")
	// $(this).parent().next().slideToggle();
	// 		
	// $(this).parents(".item").siblings().find(".sub-box").slideUp()
	// $(this).parents(".item").siblings().find(".set").text("设置")
	// 		
	// if(block=="block"){
	// $(this).text("设置")
	// }else{
	// $(this).text("取消")
	// }
	// 	
	// });

	//左侧点击对应右侧内容
	$(".conta .con-box .sidebar .list .item").click(function() {
		$(".conta .con-box .sidebar .list .item").removeClass("active")
		$(this).addClass("active")
		$(this).parent().find("i").addClass("tv")
		$(this).parents(".list").siblings().find("i").removeClass("tv")

		$('.conta .con-box .left-con .self-item').css("display", "none")
		$('.conta .con-box .left-con .self-item').removeClass("fadeIn")
		if($(this).hasClass('info')) {
			$(".conta .con-box .left-con #self_info").addClass("fadeIn")
		} else if($(this).hasClass('security')) {
			$(".conta .con-box .left-con #security").addClass("fadeIn")

		} else if($(this).hasClass('identity')) {
			$(".conta .con-box .left-con #identity").addClass("fadeIn")

		}else if($(this).hasClass('apiTransaction')) {
			$(".conta .con-box .left-con #apiTransaction").addClass("fadeIn")

		} else if($(this).hasClass('French')) {
			if(pcUser.realNameStatus == null || pcUser.realNameStatus != 1) {
				$(".Authen").show();
				// goAuth();
			} else {
				$(".conta .con-box .left-con #French").addClass("fadeIn")

				$.ajax({
					type: 'GET',
					url: PCData.AGENT_URL + "agentV1/userInformationService?bauId=" + pcUser.id,
					contentType: "application/json",
					dataType: 'json',
					success: function(data) {
						if(data.code == "200") {
							pcUser.payment = data.data;
							PCData.setUserInfo(pcUser);
							userPayments();
						}
					},
					error: function(e) {
						console.log(e);
					}
				});
				$("#name").val(pcUser.name);
				$("#wxname").val(pcUser.name);
				$("#aliname").val(pcUser.name);
			}
		} else if($(this).hasClass('problem')) {
			$(".conta .con-box .left-con #problem").addClass("fadeIn")

		}
	});

	//银行卡修改div
	$("#bankModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.payment != null && pcUser.payment.paymentMethod1 != null && pcUser.payment.paymentMethod1 === 0) {
			$("#aliModifyDiv").text("modify");
		} else {
			$("#aliModifyDiv").text("set");
		}

		if(pcUser.payment != null && pcUser.payment.paymentMethod2 != null && pcUser.payment.paymentMethod2 === 0) {
			$("#wxModifyDiv").text("modify");
		} else {
			$("#wxModifyDiv").text("set");
		}

		if(block == "block") {
			if(pcUser.payment != null && pcUser.payment.paymentMethod3 != null && pcUser.payment.paymentMethod3 === 0) {
				$(this).text("modify");
			} else {
				$(this).text("set");
			}
		} else {
			$(this).text("cancel");
		}
	});

	//微信修改div
	$("#wxModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.payment != null && pcUser.payment.paymentMethod1 != null && pcUser.payment.paymentMethod1 === 0) {
			$("#aliModifyDiv").text("modify");
		} else {
			$("#aliModifyDiv").text("set");
		}

		if(pcUser.payment != null && pcUser.payment.paymentMethod3 != null && pcUser.payment.paymentMethod3 === 0) {
			$("#bankModifyDiv").text("modify");
		} else {
			$("#bankModifyDiv").text("set");
		}

		if(block == "block") {
			if(pcUser.payment != null && pcUser.payment.paymentMethod2 != null && pcUser.payment.paymentMethod2 === 0) {
				$(this).text("modify");
			} else {
				$(this).text("set");
			}
		} else {
			$(this).text("cancel");
		}
	});

	//支付宝修改div
	$("#aliModifyDiv").click(function() {
		var block = $(this).parent().next().css("display");
		$(this).parent().next().slideToggle();
		$(this).parents(".item").siblings().find(".sub-box").slideUp();
		$(this).parents(".item").siblings().find(".set").text("modify");

		if(pcUser.payment != null && pcUser.payment.paymentMethod2 != null && pcUser.payment.paymentMethod2 === 0) {
			$("#wxModifyDiv").text("modify");
		} else {
			$("#wxModifyDiv").text("set");
		}

		if(pcUser.payment != null && pcUser.payment.paymentMethod3 != null && pcUser.payment.paymentMethod3 === 0) {
			$("#bankModifyDiv").text("modify");
		} else {
			$("#bankModifyDiv").text("set");
		}

		if(block == "block") {
			if(pcUser.payment != null && pcUser.payment.paymentMethod1 != null && pcUser.payment.paymentMethod1 === 0) {
				$(this).text("modify");
			} else {
				$(this).text("set");
			}
		} else {
			$(this).text("cancel");
		}
	});

});

//style="background: url(../../img/zhengmian.png) no-repeat;background-size: contain;

if(pcUser.realNameStatus != null) {
	if(pcUser.realNameStatus == 0 || pcUser.realNameStatus == 3) {
		$("#noAdopt").show();
		$("#adopting").hide();
		$("#adopted").hide();

		$("#stepTitle").show();
		$("#stepOne").show();
		$("#stepTwo").hide();
		$("#stepThree").hide();
		$("#stepFour").hide();
		$("#stepFive").hide();

	} else if(pcUser.realNameStatus == 2) {
		$("#noAdopt").hide();
		$("#adopting").show();
		$("#adopted").hide();

		$("#stepTitle").hide();
		$("#stepOne").hide();
		$("#stepTwo").hide();
		$("#stepThree").show();
		$("#stepFour").hide();
		$("#stepFive").hide();

	} else if(pcUser.realNameStatus == 1) {
		$("#noAdopt").hide();
		$("#adopting").hide();
		$("#adopted").show();

		$("#stepTitle").hide();
		$("#stepOne").hide();
		$("#stepTwo").hide();
		$("#stepThree").hide();
		$("#stepFour").show();
		$("#stepFive").hide();

	}
}

if(pcUser.phone != null && pcUser.phone != "") {
	var phone = pcUser.phone;
	phone = phone.substring(0, 3) + '****' + phone.substring(7, 11);
	$("#authenPhone").append('<span>' + phone + '</span>');
} else {
	$("#authenPhone").append('<span class="set" onclick="goSecurity(1);">go set</span>');
}

if(pcUser.mailbox != null && pcUser.mailbox != "") {
	$("#authenEmail").append('<span>' + pcUser.mailbox + '</span>');
} else {
	$("#authenEmail").append('<span class="set" onclick="goSecurity(2);">go set</span>');
}

if(pcUser.name != null && pcUser.name != "") {
	$("#authenName").append('<span>' + pcUser.name + '</span>');
} else {
	$("#authenName").append('<span class="set" onclick="goAuth();">authenticate</span>');
}

if(pcUser.googleStatus != null) {
	if(pcUser.googleStatus == 1) {
		$("#googlePicture").attr("src", "../../img/setup.png");
		$("#googleDiv1").hide();
		$("#googleDiv2").hide();
		$("#googleDiv3").hide();
		$("#googleModigyDiv").text("see");

	} else {
		$("#googlePicture").attr("src", "../../img/setno.png");
		$("#googleDiv1").show();
		$("#googleDiv2").show();
		$("#googleDiv3").show();
		$("#googleModigyDiv").text("set");
	}
	if(pcUser.googleUrl != null && pcUser.googleUrl != "") {
		jQuery('#output').qrcode(pcUser.googleUrl);
	}
	if(pcUser.googleKey != null && pcUser.googleKey != "") {
		$("#googleKey").html(pcUser.googleKey);
	}
}

if(pcUser.fundsStatus != null) {

	var display = $('#modifyFundPwdDiv').css('display');

	if(pcUser.fundsStatus == 1) {
		$("#fundPicture").attr("src", "../../img/setup.png");
		if(display == 'none') {
			$("#fundModifyDiv").text("modify");
		} else {
			$("#fundModifyDiv").text("cancel");
		}
	} else {
		$("#fundPicture").attr("src", "../../img/setno.png");
		if(display == 'none') {
			$("#fundModifyDiv").text("set");
		} else {
			$("#fundModifyDiv").text("cancel");
		}
	}
}

if(pcUser.mailbox != null && pcUser.mailbox != "") {
	$("#emailPicture").attr("src", "../../img/setup.png");
	var email = pcUser.mailbox;
	if(email != null && email != "") {
		$("#email").val(email);
		$("#emailTishi").text('');
	}
	$("#emailModifyDiv").text("modify");
} else {
	$("#emailPicture").attr("src", "../../img/setno.png");
	$("#emailModifyDiv").text("set");
}

function userPayments() {

	if(pcUser.payment != null) {
		var payment = pcUser.payment;
		var paymentMethod1 = payment.paymentMethod1;
		var paymentMethod2 = payment.paymentMethod2;
		var paymentMethod3 = payment.paymentMethod3;
		if(payment.bankCard != null) {
			$("#witch3").find(".move").removeClass("moveright");
			$("#witch3").removeClass("togpar");
			var name = payment.name;
			$("#name").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);
			var bankCard = payment.bankCard;
			$("#bankCard").val((bankCard == null || bankCard == "" || bankCard.length < 1) ? "" : bankCard);
			var bankOfDeposit = payment.bankOfDeposit;
			$("#bankOfDeposit").val((bankOfDeposit == null || bankOfDeposit == "" || bankOfDeposit.length < 1) ? "" : bankOfDeposit);
			var accountOpeningBranch = payment.accountOpeningBranch;
			$("#accountOpeningBranch").val((accountOpeningBranch == null || accountOpeningBranch == "" || accountOpeningBranch.length < 1) ? "" : accountOpeningBranch);
			if(payment.bankCard != null && payment.bankCard != "") {
				$("#bankPicture").attr("src", "../../img/setup.png");
				$("#bankText").html("Set up");
			}
			if(paymentMethod3 == 0) {
				$("#bankModifyDiv").text("modify");
				$("#witch3").find(".move").addClass("moveright");
				$("#witch3").addClass("togpar");
			}
		} else {
			$("#witch3").hide();
		}
		if(payment.weChat != null) {
			$("#witch2").find(".move").removeClass("moveright");
			$("#witch2").removeClass("togpar");
			var weChatUrl = payment.weChatUrl;
			$("#weChatUrl").val((weChatUrl == null || weChatUrl == "" || weChatUrl.length < 1) ? "" : weChatUrl);
			$("#wxInput").attr("src", (weChatUrl == null || weChatUrl == "" || weChatUrl.length < 1) ? "" : weChatUrl);

			$("#wxbtn").css("background", 'url(' + weChatUrl + '?x-oss-process=image/resize,m_mfit,h_120,w_140)');

			var name = payment.name;
			$("#wxname").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);

			var weChat = payment.weChat;
			$("#weChat").val((weChat == null || weChat == "" || weChat.length < 1) ? "" : weChat);
			if(payment.weChat != null && payment.weChat != "") {
				$("#wxPicture").attr("src", "../../img/setup.png");
				$("#wxText").html("Set up");
			}
			if(paymentMethod2 == 0) {
				$("#wxModifyDiv").text("modify");
				$("#witch2").find(".move").addClass("moveright");
				$("#witch2").addClass("togpar");
			}
		} else {
			$("#witch2").hide();
		}
		if(payment.alipay != null) {
			$("#witch1").find(".move").removeClass("moveright");
			$("#witch1").removeClass("togpar");
			var alipayUrl = payment.alipayUrl;
			$("#alipayUrl").val((alipayUrl == null || alipayUrl == "" || alipayUrl.length < 1) ? "" : alipayUrl);
			$("#aliInput").attr("src", (alipayUrl == null || alipayUrl == "" || alipayUrl.length < 1) ? "" : alipayUrl);

			$("#alibtn").css("background", 'url(' + alipayUrl +'?x-oss-process=image/resize,m_mfit,h_120,w_140)');

			var name = payment.name;
			$("#aliname").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);

			var alipay = payment.alipay;
			$("#alipay").val((alipay == null || alipay == "" || alipay.length < 1) ? "" : alipay);
			if(payment.alipay != null && payment.alipay != "") {
				$("#aliPicture").attr("src", "../../img/setup.png");
				$("#aliText").html("Set up");
			}
			if(paymentMethod1 == 0) {
				$("#aliModifyDiv").text("modify");
				$("#witch1").find(".move").addClass("moveright");
				$("#witch1").addClass("togpar");
			}
		} else {
			$("#witch1").hide();
		}
	}
}

function userPayment() {

	if(pcUser.payment != null) {
		var payment = pcUser.payment;
		var paymentMethod1 = payment.paymentMethod1;
		var paymentMethod2 = payment.paymentMethod2;
		var paymentMethod3 = payment.paymentMethod3;
		if(payment.bankCard != null) {
			$("#witch3").find(".move").removeClass("moveright");
			$("#witch3").removeClass("togpar");
			var name = payment.name;
			$("#name").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);
			var bankCard = payment.bankCard;
			$("#bankCard").val((bankCard == null || bankCard == "" || bankCard.length < 1) ? "" : bankCard);
			var bankOfDeposit = payment.bankOfDeposit;
			$("#bankOfDeposit").val((bankOfDeposit == null || bankOfDeposit == "" || bankOfDeposit.length < 1) ? "" : bankOfDeposit);
			var accountOpeningBranch = payment.accountOpeningBranch;
			$("#accountOpeningBranch").val((accountOpeningBranch == null || accountOpeningBranch == "" || accountOpeningBranch.length < 1) ? "" : accountOpeningBranch);
			if(payment.bankCard != null && payment.bankCard != "") {
				$("#bankPicture").attr("src", "../../img/setup.png");
				$("#bankText").html("Set up");
			}
			if(paymentMethod3 == 0) {
				$("#bankModifyDiv").text("modify");
				$("#witch3").find(".move").addClass("moveright");
				$("#witch3").addClass("togpar");
			}
		} else {
			$("#witch3").hide();
		}
		if(payment.weChat != null) {
			$("#witch2").find(".move").removeClass("moveright");
			$("#witch2").removeClass("togpar");
			var weChatUrl = payment.weChatUrl;
			$("#weChatUrl").val((weChatUrl == null || weChatUrl == "" || weChatUrl.length < 1) ? "" : weChatUrl);
			$("#wxInput").attr("src", (weChatUrl == null || weChatUrl == "" || weChatUrl.length < 1) ? "" : weChatUrl);

			$("#wxbtn").css("background", 'url(' + weChatUrl + ')');

			var name = payment.name;
			$("#wxname").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);

			var weChat = payment.weChat;
			$("#weChat").val((weChat == null || weChat == "" || weChat.length < 1) ? "" : weChat);
			if(payment.weChat != null && payment.weChat != "") {
				$("#wxPicture").attr("src", "../../img/setup.png");
				$("#wxText").html("Set up");
			}
			if(paymentMethod2 == 0) {
				$("#wxModifyDiv").text("modify");
				$("#witch2").find(".move").addClass("moveright");
				$("#witch2").addClass("togpar");
			}
		} else {
			$("#witch2").hide();
		}
		if(payment.alipay != null) {
			$("#witch1").find(".move").removeClass("moveright");
			$("#witch1").removeClass("togpar");
			var alipayUrl = payment.alipayUrl;
			$("#alipayUrl").val((alipayUrl == null || alipayUrl == "" || alipayUrl.length < 1) ? "" : alipayUrl);
			$("#aliInput").attr("src", (alipayUrl == null || alipayUrl == "" || alipayUrl.length < 1) ? "" : alipayUrl);

			$("#alibtn").css("background", 'url(' + alipayUrl + ')');

			var name = payment.name;
			$("#aliname").val((name == null || name == "" || name.length < 1) ? pcUser.name : name);

			var alipay = payment.alipay;
			$("#alipay").val((alipay == null || alipay == "" || alipay.length < 1) ? "" : alipay);
			if(payment.alipay != null && payment.alipay != "") {
				$("#aliPicture").attr("src", "../../img/setup.png");
				$("#aliText").html("Set up");
			}
			if(paymentMethod1 == 0) {
				$("#aliModifyDiv").text("modify");
				$("#witch1").find(".move").addClass("moveright");
				$("#witch1").addClass("togpar");
			}
		} else {
			$("#witch1").hide();
		}
		Message("操作成功", "win");
		setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=3";', 300);
	}
}

var data = {
	"bauId": pcUser.id
};
console.log(data);
$.ajax({
	type: 'POST',
	url: PCData.PCUSER_URL + "pcuser/loginHistory",
	data: JSON.stringify(data),
	contentType: "application/json",
	dataType: 'json',
	success: function(data) {
		console.log(data);
		$('#resultBox').empty();
		if(data.code == "200") {
			var res = data.data || [];
			if(res.length < 1) {
				var create_tr = $('<tr></tr>');
				var _html = '<td colspan="3" style="text-align:center">没有记录</td>';
				create_tr.html(_html);
				$('#resultBox').append(create_tr);
			} else {
				var create_trfirst = $('<tr></tr>');
				$('#resultBox').append(create_trfirst);
				if(res.length >= 10) {
					for(var i = 0; i < 10; i++) {
						var create_tr = $('<tr></tr>');
						var _html = '<td>' + PCUtils.getTimeFull(res[i].createTime, "-") + '</td>' +
							'<td>' + (res[i].loginIp == null ? "" : res[i].loginIp) + '</td>' +
							'<td>' + (res[i].loginAdress == null ? "" : res[i].loginAdress) + '</td>';
						create_tr.html(_html);
						$('#resultBox').append(create_tr);
					};
				} else {
					for(var i = 0; i < res.length; i++) {
						var create_tr = $('<tr></tr>');
						var _html = '<td>' + PCUtils.getTimeFull(res[i].createTime, "-") + '</td>' +
							'<td>' + (res[i].loginIp == null ? "" : res[i].loginIp) + '</td>' +
							'<td>' + (res[i].loginAdress == null ? "" : res[i].loginAdress) + '</td>';
						create_tr.html(_html);
						$('#resultBox').append(create_tr);
					};
				}

			}
		} else {
			var create_tr = $('<tr></tr>');
			var _html = '<td colspan="3" style="text-align:center">没有记录</td>';
			create_tr.html(_html);
			$('#resultBox').append(create_tr);
		}
	},
	error: function(e) {
		Message("请求错误", "error");
		console.log(e);
	}
});

//身份认证
function goAuth() {

	$(".Authen").hide();

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .identity").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #identity").addClass("fadeIn");
};

//安全设置
function goSecurity(type) {
	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

	if(type != null && type == 1) {
		$('#bindPhoneDiv').css("display", "block");
	} else if(type != null && type == 2) {
		$('#modifyEmailDiv').css("display", "block");
		$("#emailModifyDiv").text("cancel");
	}
};

var codeTime = 120;
var codeId = null;

var isRegister = false;

//查看手机号是否注册
function checkPhone() {
	//手机号
	var phone = $('#newPhone').val();
	var isPhone = PCUtils.checkStr(phone, 0);
	if(phone == null || phone == "") {
		$('#phoneText').html("请输入新手机号");
		isRegister = false;
	} else if(phone.length != 11) {
		$('#phoneText').html("");
		isRegister = false;
	} else if(!isPhone) {
		$('#phoneText').html("新手机号格式不正确");
	} else {
		$('#phoneText').html("");
		//查询手机号是否注册
		$.ajax({
			type: 'GET',
			url: PCData.OUTSIDE_AUTHORITY_URL + 'user/phoneavailable?phone=' + phone,
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				console.log(data);
				if(data.code != "200") {
					$('#phoneText').html("新手机号已注册");
					isRegister = false;
				} else {
					$('#phoneText').html("");
					isRegister = true;
				}
			},
			error: function(e) {
				console.log(e);
				isRegister = false;
			}
		});
	}
}

//发送验证码
function sendCode(codeType) {
	if(codeId == null) {
		//手机号
		var phone = pcUser.phone;
		//手机号校验
		var isPhone = PCUtils.checkStr(phone, 0);
		if(phone == "") {
			return false;
		} else if(!isPhone) {
			return false;
		} else {
			if(codeType != null && codeType == 2) {
				//用户密码
				var password = $('#orignPasswd').val();
				//用户新密码
				var newpassword = $('#newPasswd').val();
				//用户确认密码
				var cpassword = $('#conPasswd').val();
				if(password == null || password == "") {
					$('#passwordText1').html("请输入原密码");
					return false;
				} else if(newpassword == null || newpassword == "") {
					$('#passwordText2').html("请输入新密码");
					return false;
				} else if(newpassword.length < 6) {
					$('#passwordText2').html("新密码至少6位");
					return false;
				} else if(cpassword == null) {
					$('#passwordText3').html("请输入用户确认密码");
					return false;
				} else if(cpassword.length < 6) {
					$('#passwordText3').html("用户确认密码至少6位");
					return false;
				} else if(newpassword != cpassword) {
					$('#passwordText3').html("用户两遍密码输入不一致");
					return false;
				}
			} else if(codeType != null && codeType == 3) {
				//手机号
				var phone = $('#newPhone').val();
				//手机号校验
				var isPhone = PCUtils.checkStr(phone, 0);
				if(phone == "") {
					$('#phoneText').html("请输入手机号");
					return false;
				} else if(!isPhone) {
					$('#phoneText').html("手机号格式不正确");
					return false;
				} else if(!isRegister) {
					return false;
				}
			} else if(codeType != null && codeType == 4) {
				var googleNum = $("#googleNum").val();
				if(googleNum == "") {
					return false;
				}
			} else if(codeType != null && codeType == 5) {
				var fundsPassword = $("#fundsPassword").val();
				var confundsPassword = $("#confundsPassword").val();
				if(fundsPassword == "") {
					return false;
				} else if(confundsPassword == "") {
					return false;
				} else if(fundsPassword.length < 6) {
					$("#passwordTishi").text("资金密码最少6位");
					return false;
				} else if(confundsPassword != fundsPassword) {
					$("#conPasswordTishi").text("密码不一致");
					return false;
				}
			} else if(codeType != null && codeType == 6) {
				var email = $("#email").val();
				var isEmail = PCUtils.checkStr(email, 2);
				if(email != null && email != "") {
					if (!isEmail) {
						$("#emailTishi").text("邮箱格式不正确");
						return false;
					}else{
						$("#emailTishi").text('');
					}
				} else {
					$("#emailTishi").text("请输入邮箱");
					return false;
				}
			} else if(codeType != null && codeType == 7) {

				var bankCard = $('#bankCard').val();
				var bankCardC = $("#bankCardC").val();
				var bankName = "";
				var num = /^\d*$/;
				var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
				if(bankCard != "") {
					if(bankCard.length < 16 || bankCard.length > 19) {
						$("#bankCardTishi").text("银行卡号长度必须在16到19之间");
						return false;
					} else if(!num.exec(bankCard)) {
						$("#bankCardTishi").text("银行卡号必须全为数字");
						return false;
					} else if(strBin.indexOf(bankCard.substring(0, 2)) == -1) {
						$("#bankCardTishi").text("银行卡号开头6位不符合规范");
						return false;
					} else if(bankCardAttribution(bankCard) != null && bankCardAttribution(bankCard).bankName != null) {
						bankName = bankCardAttribution(bankCard).bankName;
						$("#bankCardTishi").text("");
						$("#bankOfDeposit").val(bankName);
					} else {
						$("#bankCardTishi").text("银行卡号不正确");
						$("#bankOfDeposit").val('');
						return false;
					}
				} else {
					$("#bankCardTishi").text("请输入银行卡号");
					$("#bankOfDeposit").val('');
					return false;
				}
				if(bankCardC != null && bankCardC != "") {
					$("#bankCardCTishi").text('');
					if(bankCardC != bankCard) {
						$("#bankCardCTishi").text("卡号不一致");
						return false;
					}
				} else {
					$("#bankCardCTishi").text("请确认卡号");
					return false;
				}
				if($("#accountOpeningBranch").val() != null && $("#accountOpeningBranch").val() != "") {
					$("#accountOpeningBranchTishi").text('');
				} else {
					$("#accountOpeningBranchTishi").text("请输入开户支行");
					return false;
				}
			} else if(codeType != null && codeType == 8) {
				if($("#weChat").val() != null && $("#weChat").val() != "") {
				    $("#weChatTishi").text('');
				} else {
					$("#weChatTishi").text("请输入账号");
					return false;
				}
				var weChatUrl = $('#weChatUrl').val();
				if(weChatUrl == null || weChatUrl == "") {
				    Message("请上传收款码", "error");
					return false;
				}
			} else if(codeType != null && codeType == 9) {
				if($("#alipay").val() != null && $("#alipay").val() != "") {
					$("#alipayTishi").text('');
				} else {
					$("#alipayTishi").text("请输入账号");
					return false;
		        }
				var alipayUrl = $('#alipayUrl').val();
				if(alipayUrl == null || alipayUrl == "") {
					Message("请上传收款码", "error");
					return false;
				}
			}
			var data = {
				"phone": phone,
				"codeType": codeType
			};
			$('#loginCode').val('');
			$('#phoneCode').val('');
			$.ajax({
				type: 'POST',
				url: PCData.PCUSER_URL + "pcuser/sendcode",
				data: JSON.stringify(data),
				contentType: "application/json",
				dataType: 'json',
				success: function(data) {
					if(data.code != "200") {
						return false;
					} else {
						codeTimeInit(codeType);
					}
				},
				error: function(e) {
					Message("请求错误", "error");
					console.log(e);
				}
			});
		}
	}
}

function codeTimeInit(codeType) {
	var index = codeTime;
	var go = function() {
		if(index < 0) {
			clearInterval(codeId);
			codeId = null;
		} else {
			if(index == 0) {
				if(codeType != null && codeType == 2) {
					$('#modifyPasswd').html('发送验证码');
					$('#passwordText3').html("");
				} else if(codeType != null && codeType == 3) {
					$('#modifyPhone').html('发送验证码');
				} else if(codeType != null && codeType == 4) {
					$('#modifyGoogle').html('发送验证码');
				} else if(codeType != null && codeType == 5) {
					$('#modifyFundpw').html('发送验证码');
				} else if(codeType != null && codeType == 6) {
					$('#modifyEmail').html('发送验证码');
				} else if(codeType != null && codeType == 7) {
					$('#bankMethodText').html('发送验证码');
				} else if(codeType != null && codeType == 8) {
					$('#wxMethodText').html('发送验证码');
				} else if(codeType != null && codeType == 9) {
					$('#alMethodText').html('发送验证码');
				}
			} else {
				if(codeType != null && codeType == 2) {
					$('#modifyPasswd').html('<span style="color:#0A5BEF">' + index + 'S</span>');
					$('#passwordText3').html("");
				} else if(codeType != null && codeType == 3) {
					$('#modifyPhone').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 4) {
					$('#modifyGoogle').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 5) {
					$('#modifyFundpw').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 6) {
					$('#modifyEmail').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 7) {
					$('#bankMethodText').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 8) {
					$('#wxMethodText').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				} else if(codeType != null && codeType == 9) {
					$('#alMethodText').html('<span style="color:#0A5BEF">' + index + 'S</span>');
				}
			}
			index--;
		}
	};
	go();
	codeId = setInterval(go, 1000);
};

//用户修改密码
function modifyPwd() {

	//手机号
	var phone = pcUser.phone;
	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);

	//验证码
	var vaildatecode = $('#loginCode').val();
	var isNum = PCUtils.checkStr(vaildatecode, 3);

	//用户密码
	var password = $('#orignPasswd').val();

	//用户新密码
	var newpassword = $('#newPasswd').val();
	//用户确认密码
	var cpassword = $('#conPasswd').val();

	if(phone == "") {
		Message("请输入手机号", "error");
	} else if(!isPhone) {
		Message("手机号格式不正确", "error");
	} else if(vaildatecode == "") {
		Message("请输入验证码", "error");
	} else if(!isNum) {
		Message("验证码格式不正确", "error");
	} else if(password == null) {
		Message("请输入用户密码", "error");
	} else if(password.length < 6) {
		Message("用户密码至少6位", "error");
	} else if(newpassword == null) {
		Message("请输入用户新密码", "error");
	} else if(newpassword.length < 6) {
		Message("用户新密码至少6位", "error");
	} else if(cpassword == null) {
		Message("请输入用户确认密码", "error");
	} else if(cpassword.length < 6) {
		Message("用户确认密码至少6位", "error");
	} else if(newpassword != cpassword) {
		Message("用户两遍密码输入不一致", "error");
	} else {
		var isPasswordN = PCUtils.checkStr(newpassword, 8);
		var isPasswordC = PCUtils.checkStr(cpassword, 8);

		if(!isPasswordN) {
			Message("用户新密码格式不正确", "error");
		} else if(!isPasswordC) {
			Message("用户新确认密码格式不正确", "error");
		} else {
			var data = {
				"phone": phone,
				"vaildatecode": vaildatecode,
			};
			$.ajax({
				type: 'POST',
				url: PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
				data: JSON.stringify(data),
				contentType: "application/json",
				dataType: 'json',
				success: function(data) {
					if(data.code != "200") {
						Message(data.message, "error");
					} else {
						var data = {
							"bauId": pcUser.id,
							"password": hex_md5(PCData.PREX + password),
							"newpassword": hex_md5(PCData.PREX + newpassword),
						};
						$.ajax({
							type: 'POST',
							url: PCData.APPUSER_URL + 'appuser/updateuserinfo',
							data: JSON.stringify(data),
							contentType: "application/json",
							dataType: 'json',
							success: function(data) {
								if(data.code != "200") {
									Message(data.message, "error");
								} else {
									Message("修改成功", "win");
									location.href = "../../view/system_log/login.html";
								}
							},
							error: function(e) {
								Message("请求错误", "error");
								console.log(e);
							}
						});
					}
				},
				error: function(e) {
					Message("请求错误", "error");
					console.log(e);
				}
			});
		}
	}
}

//用户修改绑定手机号
function modifyPhone() {

	//手机号
	var phone = $('#newPhone').val();

	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);

	//验证码
	var vaildatecode = $('#phoneCode').val();
	var isNum = PCUtils.checkStr(vaildatecode, 3);

	if(phone == "") {
		$('#phoneText').html("请输入手机号");
	} else if(!isPhone) {
		$('#phoneText').html("手机号格式不正确");
	} else if(vaildatecode == "") {
		Message("请输入验证码", "error");
	} else if(!isNum) {
		Message("验证码格式不正确", "error");
	} else {
		var data = {
			"phone": phone,
			"vaildatecode": vaildatecode,
		};
		$.ajax({
			type: 'POST',
			url: PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					var data = {
						"bauId": pcUser.id,
						"phone": phone,
					};
					$.ajax({
						type: 'POST',
						url: PCData.APPUSER_URL + 'appuser/updateuserinfo',
						data: JSON.stringify(data),
						contentType: "application/json",
						dataType: 'json',
						success: function(data) {
							if(data.code != "200") {
								Message(data.message, "error");
							} else {
								Message("修改成功", "win");
								location.href = "../../view/system_log/login.html";
							}
						},
						error: function(e) {
							Message("请求错误", "error");
							console.log(e);
						}
					});
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}
}

//用户修改谷歌身份认证状态
function modifyGoogle() {

	//手机号
	var phone = pcUser.phone;;

	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);

	//验证码
	var vaildatecode = $('#googleCode').val();
	var isNum = PCUtils.checkStr(vaildatecode, 3);

	//谷歌验证码
	var googleNum = $('#googleNum').val();
	var isNumG = PCUtils.checkStr(googleNum, 3);

	if(phone == "") {
		Message("请输入手机号", "error");
	} else if(!isPhone) {
		Message("手机号格式不正确", "error");
	} else if(googleNum == "") {
		Message("请输入谷歌验证码", "error");
	} else if(!isNumG) {
		Message("谷歌验证码格式不正确", "error");
	} else if(vaildatecode == "") {
		Message("请输入验证码", "error");
	} else if(!isNum) {
		Message("验证码格式不正确", "error");
	} else {
		var data = {
			"phone": phone,
			"vaildatecode": vaildatecode,
		};
		$.ajax({
			type: 'POST',
			url: PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					var data = {
						"bauId": pcUser.id,
						"googleCode": googleNum,
					};
					$.ajax({
						type: 'POST',
						url: PCData.APPUSER_URL + 'appuser/googleauthdo',
						data: JSON.stringify(data),
						contentType: "application/json",
						dataType: 'json',
						success: function(data) {
							data.code = "200";
							if(data.code != "200") {
								Message(data.message, "error");
							} else {
								var data = {
									"bauId": pcUser.id,
									"googleStatus": 1,
								};
								$.ajax({
									type: 'POST',
									url: PCData.APPUSER_URL + 'appuser/updateuserinfo',
									data: JSON.stringify(data),
									contentType: "application/json",
									dataType: 'json',
									success: function(data) {
										if(data.code != "200") {
											Message(data.message, "error");
										} else {
											Message("验证成功", "win");
											pcUser.googleStatus = 1;
											PCData.setUserInfo(pcUser);
											setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=5";', 2000);
										}
									},
									error: function(e) {
										console.log(e);
									}
								});
							}
						},
						error: function(e) {
							Message("请求错误", "error");
							console.log(e);
						}
					});
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}
}

//用户修改资金密码
function modifyFundpw() {

	//手机号
	var phone = pcUser.phone;
	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);

	//验证码
	var vaildatecode = $('#fundCode').val();
	var isNum = PCUtils.checkStr(vaildatecode, 3);

	//用户资金密码
	var fundsPassword = $('#fundsPassword').val();

	//用户确认资金密码
	var confundsPassword = $('#confundsPassword').val();

	if(phone == "") {
		Message("请输入手机号", "error");
	} else if(!isPhone) {
		Message("手机号格式不正确", "error");
	} else if(vaildatecode == "") {
		Message("请输入验证码", "error");
	} else if(!isNum) {
		Message("验证码格式不正确", "error");
	} else if(fundsPassword == null) {
		Message("请输入资金密码", "error");
	} else if(fundsPassword.length < 6) {
		Message("资金密码至少6位", "error");
	} else if(confundsPassword == null) {
		Message("请输入资金确认密码", "error");
	} else if(confundsPassword.length < 6) {
		Message("资金确认密码至少6位", "error");
	} else if(fundsPassword != confundsPassword) {
		Message("资金两遍密码输入不一致", "error");
	} else {
		var data = {
			"bauId": pcUser.id,
			"fundsPassword": hex_md5(PCData.PREX + fundsPassword),
			"phone": phone,
			"vaildatecode": vaildatecode
		};
		$.ajax({
			type: 'POST',
			url: PCData.APPUSER_URL + 'appuser/updateuserinfo',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					Message("修改成功", "win");
					pcUser.fundsStatus = 1;
					PCData.setUserInfo(pcUser);
					setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=5";', 2000);
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}
}

//用户修改邮箱
function modifyEmail() {

	//手机号
	var phone = pcUser.phone;
	//手机号校验
	var isPhone = PCUtils.checkStr(phone, 0);

	//验证码
	var vaildatecode = $('#emailCode').val();
	var isNum = PCUtils.checkStr(vaildatecode, 3);

	//用户邮箱
	var email = $('#email').val();
	var isEmail = PCUtils.checkStr(email, 2);

	if(phone == "") {
		Message("请输入手机号", "error");
	} else if(!isPhone) {
		Message("手机号格式不正确", "error");
	} else if(email == "") {
		$("#tishi").text('请输入邮箱');
	} else if(!isEmail) {
		Message("邮箱格式不正确", "error");
	} else if(vaildatecode == "") {
		Message("请输入验证码", "error");
	} else if(!isNum) {
		Message("验证码格式不正确", "error");
	} else {
		var data = {
			"phone": phone,
			"vaildatecode": vaildatecode,
		};
		$.ajax({
			type: 'POST',
			url: PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					var data = {
						"bauId": pcUser.id,
						"email": email,
					};
					$.ajax({
						type: 'POST',
						url: PCData.APPUSER_URL + 'appuser/updateuserinfo',
						data: JSON.stringify(data),
						contentType: "application/json",
						dataType: 'json',
						success: function(data) {
							if(data.code != "200") {
								Message(data.message, "error");
							} else {
								Message("修改成功", "win");
								// pcUser.mailbox=email;
								// PCData.setUserInfo(pcUser);
								// location.reload();
								setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=5";', 2000);
							}
						},
						error: function(e) {
							Message("请求错误", "error");
							console.log(e);
						}
					});
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}
}

function checkEmail(type) {
	if(type == 2) {
		if($("#orignPasswd").val() != null && $("#orignPasswd").val() != "") {
			$("#passwordText1").text('');
		} else {
			$("#passwordText1").text("请输入原密码");
		}
		if($("#newPasswd").val() != null && $("#newPasswd").val() != "") {
			$("#passwordText2").text('');
		} else {
			$("#passwordText2").text("请输入6~32位字母和数字");
		}
		if($("#conPasswd").val() != null && $("#conPasswd").val() != "") {
			$("#passwordText3").text('');
		} else {
			$("#passwordText3").text("请确认新密码");
		}
	} else if(type == 4) {
		if($("#googleNum").val() != null && $("#googleNum").val() != "") {
			$("#googleTishi").text('');
		} else {
			$("#googleTishi").text("请输入谷歌验证码");
		}
	} else if(type == 5) {
		if($("#fundsPassword").val() != null && $("#fundsPassword").val() != "") {
			$("#passwordTishi").text('');
		} else {
			$("#passwordTishi").text("请输入资金密码");
		}
		if($("#confundsPassword").val() != null && $("#confundsPassword").val() != "") {
			$("#conPasswordTishi").text('');
		} else {
			$("#conPasswordTishi").text("请确认资金密码");
		}
	} else if(type == 6) {
		var email = $("#email").val();
		var isEmail = PCUtils.checkStr(email, 2);
		if(email != null && email != "") {
			if (!isEmail) {
				$("#emailTishi").text("邮箱格式不正确");
			}else{
				$("#emailTishi").text('');
			}
		} else {
			$("#emailTishi").text("请输入邮箱");
		}
	} else if(type == 7) {
		var bankCardTishi = $('#bankCard').val();
		var bankCardC = $("#bankCardC").val()
		if(bankCardC != null && bankCardC != "") {
			$("#bankCardCTishi").text('');
			if(bankCardC != bankCardTishi) {
				$("#bankCardCTishi").text("卡号不一致");
			}
		} else {
			$("#bankCardCTishi").text("请确认卡号");
		}
		if($("#accountOpeningBranch").val() != null && $("#accountOpeningBranch").val() != "") {
			$("#accountOpeningBranchTishi").text('');
		} else {
			$("#accountOpeningBranchTishi").text("请输入开户支行");
		}
	}else if (type == 8) {
		if($("#weChat").val() != null && $("#weChat").val() != "") {
			$("#weChatTishi").text('');
		} else {
			$("#weChatTishi").text("请输入账号");
		}
	}else if (type == 9) {
		if($("#alipay").val() != null && $("#alipay").val() != "") {
			$("#alipayTishi").text('');
		} else {
			$("#alipayTishi").text("请输入账号");
		}
	}
}
//银行卡校验
function checkBank() {
	var bankCard = $('#bankCard').val();
	var bankName = "";
	var num = /^\d*$/;
	var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
	if(bankCard != "") {
		if(bankCard.length < 16 || bankCard.length > 19) {
			$("#bankCardTishi").text("银行卡号长度必须在16到19之间");
		} else if(!num.exec(bankCard)) {
			$("#bankCardTishi").text("银行卡号必须全为数字");
		} else if(strBin.indexOf(bankCard.substring(0, 2)) == -1) {
			$("#bankCardTishi").text("银行卡号开头6位不符合规范");
		} else if(bankCardAttribution(bankCard) != null && bankCardAttribution(bankCard).bankName != null) {
			bankName = bankCardAttribution(bankCard).bankName;
			$("#bankCardTishi").text("");
			$("#bankOfDeposit").val(bankName);
		} else {
			$("#bankCardTishi").text("银行卡号不正确");
			$("#bankOfDeposit").val('');
		}
	} else {
		$("#bankCardTishi").text("请输入银行卡号");
		$("#bankOfDeposit").val('');
	}
}

function changeBank(type) {

	if(type == null) {

		//验证码
		var vaildatecode = $('#bankcode').val();
		var isNum = PCUtils.checkStr(vaildatecode, 3);

		//姓名
		var name = $('#name').val();

		//银行卡号
		var bankCard = $('#bankCard').val();

		//确认银行卡号
		var bankCardC = $('#bankCardC').val();

		//开户行
		var bankOfDeposit = $('#bankOfDeposit').val();

		//开户支行
		var accountOpeningBranch = $('#accountOpeningBranch').val();

		if(vaildatecode == "") {
			Message("请输入验证码", "error");
			return false;
		} else if(!isNum) {
			Message("验证码格式不正确", "error");
			return false;
		} else if(name == null || name == "" || name.length < 1) {
			Message("请输入姓名", "error");
			return false;
		} else if(bankCard == null || bankCard == "" || bankCard.length < 1) {
			Message("请输入银行卡号", "error");
			return false;
		} else if(bankCardC == null || bankCardC == "" || bankCardC.length < 1) {
			Message("请输入银行确认卡号", "error");
			return false;
		} else if(bankOfDeposit == null || bankOfDeposit == "" || bankOfDeposit.length < 1) {
			Message("请输入开户行", "error");
			return false;
		} else if(accountOpeningBranch == null || accountOpeningBranch == "" || accountOpeningBranch.length < 1) {
			Message("请输入开户支行", "error");
			return false;
		} else if(bankCard != bankCardC) {
			Message("银行卡号输入不一致", "error");
			return false;
		} else {
			var data = {
				"bauId": pcUser.id,
				"paymentMethod3": 0,
				"bankCard": bankCard,
				"bankOfDeposit": bankOfDeposit,
				"accountOpeningBranch": accountOpeningBranch,
				"name": name,
				"code": vaildatecode
			};

		}
	} else {
		var data = {
			"bauId": pcUser.id,
			"paymentMethod3": type
		}
	}
	changePayment(data);
}

function changeWx(type) {
	if(type == null) {
		//验证码
		var vaildatecode = $('#wxcode').val();
		var isNum = PCUtils.checkStr(vaildatecode, 3);

		//姓名
		var name = $('#wxname').val();

		//微信账号
		var weChat = $('#weChat').val();

		//收款码
		var weChatUrl = $('#weChatUrl').val();

		if(vaildatecode == "") {
			Message("请输入验证码", "error");
			return false;
		} else if(!isNum) {
			Message("验证码格式不正确", "error");
			return false;
		} else if(name == null || name == "" || name.length < 1) {
			Message("请输入姓名", "error");
			return false;
		} else if(weChat == null || weChat == "" || weChat.length < 1) {
			Message("请输入微信账号", "error");
			return false;
		} else {
			var data = {
				"bauId": pcUser.id,
				"paymentMethod2": 0,
				"weChat": weChat,
				"name": name,
				"weChatUrl": weChatUrl,
				"code": vaildatecode
			};
		}
	} else {
		var data = {
			"bauId": pcUser.id,
			"paymentMethod2": type
		}
	}
	changePayment(data);
}

function changeAli(type) {
	if(type == null) {
		//验证码
		var vaildatecode = $('#alicode').val();
		var isNum = PCUtils.checkStr(vaildatecode, 3);

		//姓名
		var name = $('#aliname').val();

		//支付宝账号
		var alipay = $('#alipay').val();

		//收款码
		var alipayUrl = $('#alipayUrl').val();

		if(vaildatecode == "") {
			Message("请输入验证码", "error");
			return false;
		} else if(!isNum) {
			Message("验证码格式不正确", "error");
			return false;
		} else if(name == null || name == "" || name.length < 1) {
			Message("请输入姓名", "error");
			return false;
		} else if(alipay == null || alipay == "" || alipay.length < 1) {
			Message("请输入支付宝账号", "error");
			return false;
		} else if(alipayUrl == "") {
			Message("请添加收款码", "error");
			return false;
		} else {
			var data = {
				"bauId": pcUser.id,
				"paymentMethod1": 0,
				"alipay": alipay,
				"name": name,
				"alipayUrl": alipayUrl,
				"code": vaildatecode
			};
		}
	} else {
		var data = {
			"bauId": pcUser.id,
			"paymentMethod1": type
		}
	}
	changePayment(data);
}

function changePayment(data) {
	$.ajax({
		type: 'GET',
		url: PCData.AGENT_URL + 'agentV1/userInformationService?bauId=' + pcUser.id,
		contentType: "application/json",
		dataType: 'json',
		success: function(dataNew) {
			if(dataNew.code == "200") {
				$.ajax({
					type: 'POST',
					url: PCData.AGENT_URL + 'agentV1/userInformationUpdate',
					data: JSON.stringify(data),
					contentType: "application/json",
					dataType: 'json',
					success: function(data) {
						if(data.code != "200") {
							Message(data.message, "error");
						} else {
							$.ajax({
								type: 'GET',
								url: PCData.AGENT_URL + "agentV1/userInformationService?bauId=" + pcUser.id,
								contentType: "application/json",
								dataType: 'json',
								success: function(data) {
									if(data.code == "200") {
										pcUser.payment = data.data;
										PCData.setUserInfo(pcUser);
										userPayment();
									} else {
										location.href = "../../view/system_log/login.html";
									}
								},
								error: function(e) {
									location.href = "../../view/system_log/login.html";
								}
							});
						}
					},
					error: function(e) {
						Message("请求错误", "error");
						console.log(e);
					}
				});
			} else {
				$.ajax({
					type: 'GET',
					url: PCData.AGENT_URL + 'agentV1/userInformationAdd?bauId=' + pcUser.id,
					contentType: "application/json",
					dataType: 'json',
					success: function(data) {
						if(data.code != "200") {
							Message(data.message, "error");
						} else {
							$.ajax({
								type: 'GET',
								url: PCData.AGENT_URL + "agentV1/userInformationService?bauId=" + pcUser.id,
								contentType: "application/json",
								dataType: 'json',
								success: function(data) {
									if(data.code == "200") {
										pcUser.payment = data.data;
										PCData.setUserInfo(pcUser);
										userPayment();
									} else {
										location.href = "../../view/system_log/login.html";
									}
								},
								error: function(e) {
									location.href = "../../view/system_log/login.html";
								}
							});
						}
					},
					error: function(e) {
						Message("请求错误", "error");
						console.log(e);
					}
				});
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});
}

function memberAuth() {

	var userName = $("#userName").val();
	var idCard = $("#idCard").val();
	var res = IdentityCodeValid(idCard);
	var idCardPositive = $("#idCardPositive").val();
	var idCardBack = $("#idCardBack").val();
	var handheldIdCard = $("#handheldIdCard").val();
	var country = 0;

	if(userName == null || userName == "" || userName.length < 1) {
		Message("请输入姓名", "error");
	} else if(idCard == null || idCard == "" || idCard.length < 1) {
		Message("请输入身份证号", "error");
	} else if(!res) {
		Message("身份证号输入有误", "error");
	} else if(idCardPositive == null || idCardPositive == "" || idCardPositive.length < 1) {
		Message("请上传身份证人面像", "error");
	} else if(idCardBack == null || idCardBack == "" || idCardBack.length < 1) {
		Message("请上传身份证国徽面", "error");
	} else if(handheldIdCard == null || handheldIdCard == "" || handheldIdCard.length < 1) {
		Message("请上传手持身份证照", "error");
	} else {

		$.ajax({
			type: 'GET',
			url: PCData.APPUSER_URL + 'appuser/judgeidcard?idCard=' + idCard,
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					var data = {
						"bauId": pcUser.id,
						"name": userName,
						"country": country,
						"idCardPositive": idCardPositive,
						"idCardBack": idCardBack,
						"handheldIdCard": handheldIdCard,
						"idCard": idCard,
					};

					$.ajax({
						type: 'POST',
						url: PCData.PCUSER_URL + 'pcuser/insertUserAtn',
						data: JSON.stringify(data),
						contentType: "application/json",
						dataType: 'json',
						success: function(data) {
							if(data.code != "200") {
								Message(data.message, "error");
							} else {
								var data = {
									"bauId": pcUser.id
								};
								$.ajax({
									type: 'POST',
									url: PCData.APPUSER_URL + 'appuser/userinfo',
									data: JSON.stringify(data),
									contentType: "application/json",
									dataType: 'json',
									success: function(data) {
										if(data.code != "200") {
											Message("认证信息提交失败", "error");
										} else {
											Message("认证信息已提交，请耐心等待审核", "win");
											PCData.setUserInfo(data.data);
											setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=1";', 2000);
										}
									},
									error: function(e) {
										Message("认证信息提交失败", "error");
										console.log(e);
									}
								});
							}
						},
						error: function(e) {
							Message("请求错误", "error");
							console.log(e);
						}
					});
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}
}

function button() {
	var problemDesc = $("#text").val();
	if(problemDesc == "") {
		$("#red").text("问题描述不能为空");
		return false;
	}

	var pictureUrl = "";
	var urls = document.getElementsByName("propPicture");
	for(var i = 0, j = urls.length; i < j; i++) {
		console.log("获取到图片的列表" + urls[i].value);
		pictureUrl = pictureUrl + urls[i].value + ",";
	}

	var data = {};
	if(pictureUrl != "") {
		data = {
			"pictureUrl": pictureUrl,
			"bauId": pcUser.id,
			"problemDesc": problemDesc
		};
	} else {
		data = {
			"bauId": pcUser.id,
			"problemDesc": problemDesc
		};
	}
	$.ajax({
		type: 'POST',
		url: PCData.PCUSER_URL + 'pcuser/insertUserProblem',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			console.log(data);
			if(data.code != "200") {
				Message(data.message, "error");
				return false;
			} else {
				Message(data.message, "win");
				setTimeout('window.location.href="../../view/person_cen/person_cen.html?type=6";', 2000);
			}
		}
	});
}

function doLoginOut() {
	var data = {
		"bauId": pcUser.id
	};
	$.ajax({
		type: 'POST',
		url: PCData.APPUSER_URL + 'login/loginOut',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		async: false,
		success: function(data) {
			if(data != null) {
				localStorage.removeItem('pcUser');
				location.href = "../../view/system_log/login.html";
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}