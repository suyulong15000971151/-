var pcUser = PCData.getUerInfo();
if(pcUser == null) {
	location.href = "../../view/system_log/Elogin.html";
}

//测试用
//pcUser.id = 1666;
//pcUser.membershipLevel = 2;


var userId = pcUser.id;
var membershipLevel = pcUser.membershipLevel;

var userId = pcUser.id;
var membershipLevel = pcUser.membershipLevel;
var type = getQueryString("type");
var tabIndex = 0;
var txNum=0;


if(userId!=null){
	$("#exampleInputId").val(userId);
}

      

if(pcUser != null) {
	if((pcUser.realNameStatus != null && pcUser.realNameStatus != 1) || (pcUser.fundsStatus != null && pcUser.fundsStatus != 1)) {
		$("#undefindDiv").css("display", "");
		$("#readyDiv").hide();
		$("#modifyDiv").hide();
		$("#locationDiv").hide();
		$("#recordDiv").hide();
		if(pcUser.realNameStatus!=1) {
			$("#authSetn").show();
			$("#authSets").hide();
		} else {
			$("#authSetn").hide();
			$("#authSets").show();
		}
		if(pcUser.fundsStatus!=1) {
			$("#fundSetn").show();
			$("#fundSets").hide();
		} else {
			$("#fundSetn").hide();
			$("#fundSets").show();
		}
	} else {
		$("#undefindDiv").css("display", "none");
		$.ajax({
			type: "get",
			url: PCData.APPUSER_URL + "appuser/judgewithdraw?bauId=" + pcUser.id,
			async: false,
			success: function(data) {
				if(data != null && data.code != null && data.code != "200") {
					$("#locationDiv").css("display", "none");
					$("#recordDiv").css("display", "none");
					$("#modifyDiv").css("display", "");
				} else {
					$("#modifyDiv").css("display", "none");
					$("#locationDiv").css("display", "");
					$("#recordDiv").css("display", "");
				}
			},
			error: function(e) {
				console.log(e);
			}
		});
	}
}

//查看是否提币

if(pcUser != null && (pcUser.realNameStatus != null && pcUser.realNameStatus == 1) && (pcUser.fundsStatus != null && pcUser.fundsStatus == 1)) {
	$("#readyDiv").css("display", "");
	$.ajax({
		type: "get",
		url: PCData.APPUSER_URL + "appuser/judgewithdraw?bauId=" + pcUser.id,
		async: false,
		success: function(data) {
			if(data != null && data.code != null && data.code != "200") {
				$("#locationDiv").css("display", "none");
				$("#recordDiv").css("display", "none");
				$("#modifyDiv").css("display", "");
			} else {
				$("#modifyDiv").css("display", "none");
				$("#locationDiv").css("display", "");
				$("#recordDiv").css("display", "");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

//提币分页
var p = new Paging();
p.init({
	target: '#pageToolbar',
	pagesize: 10,
	count: $('#total').val(),
	toolbar: false,
	hash: false,
	callback: function(page, size, count) {
		withdrawMoneyRecord(page, 10);
	},
	go: function(p) {
		withdrawMoneyRecord(p, 10);
	}
});

//充币分页
var pR = new Paging();
pR.init({
	target: '#pageToolbarR',
	pagesize: 10,
	count: $('#totalR').val(),
	toolbar: false,
	hash: false,
	callback: function(page, size, count) {
		chargeMoneyRecord(page, 10);
	},
	go: function(p) {
		chargeMoneyRecord(p, 10);
	}
});

var pW = new Paging();
pW.init({
	target: '#pageToolbarW',
	pagesize: 10,
	count: $('#totalW').val(),
	toolbar: false,
	hash: false,
	callback: function(page, size, count) {
		getSearchList(page, 10);
	},
	go: function(p) {
		getSearchList(p, 10);
	}
});

//用户退出
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

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}
var type = getQueryString("type");
if(type != null && type == 1) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

	//获取代币
	var token = getQueryString("token");
	//获取代币id
	var tokenId=getQueryString("tokenId");
	//获取用户资产账户
	chargeMoney();
	//获取充值记录
	chargeMoneyRecord(1, 10);

	$("#chargeMoneyOptions option:contains('" + token + "')").attr("selected", true);

	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressCharge?userId=" + userId + "&&tokenId=" + $("#chargeMoneyOptions").val(),
		success: function(addr) {
			if(addr.code == "200" && addr.data != null && addr.data["3"] != null && addr.data["3"].address != null) {
				$("#Website").val(addr.data["3"].address);
				//jQuery('#output').qrcode('http://www.baidu.com');
				$("#output").empty();
				var qrcode = new QRCode(document.getElementById("output"));
				var QRCodeUrl = addr.data["3"].address;
				qrcode.makeCode(QRCodeUrl);
			} else {
				$("#Website").val("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
	//刷新提币温馨提示
		getRechargeConetxt(tokenId);

}

if(type != null && type == 2) {
	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .identity").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #identity").addClass("fadeIn");

	$.ajax({
		type: "get",
		url: PCData.APPUSER_URL + "appuser/judgewithdraw?bauId=" + pcUser.id,
		success: function(data) {
			if(data != null && data.code != null && data.code != "200") {
				$("#locationDiv").css("display", "none");
				$("#recordDiv").css("display", "none");
			} else {

				withdrawMoney();
				withdrawMoneyRecord(1, 10);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});

};

if(type != null && type == 4) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .French").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #French").addClass("fadeIn");

	//获取币币交易 传递的参数
	//买入还是卖出
	var goType = getQueryString("goType");
	//已成交还是未成交
	var isHistory = getQueryString("isHistory");

	tabIndex = isHistory;

	//代币
	var token = getQueryString("token");
	//交易区		
	var tradingArea = getQueryString("tradingArea");

	$("#tradingPost option:contains('" + tradingArea + "')").attr("selected", true);

	$('.conta #French .entrust_nav a').siblings().removeClass("tv");
	if(tabIndex == 0) {
		$("#current").addClass("tv");
	} else if(tabIndex == 1) {
		$("#history").addClass("tv");
	}

	//买入卖出类型
	if(goType == null || goType == "null" || goType == "" || goType.length < 1) {
		$("#direction").val(0);
	} else {
		$("#direction").val(goType);
	}

	//获取当前代币存在的交易区
	getCurrencyList(token);

}

$(function() {

	//这里是点击选项按钮

	$(".conta .con-box .left-con #self_info .history table tr th label").click(function() {
		$(this).toggleClass("ck")
	})

	//这里是提币地址下拉效果
	$("#addres").click(function() {
		$(this).next().slideToggle()
	})

	//这里是充币二维码点击弹窗效果
	$(".conta .con-box .left-con #security .item .address i").click(function() {
		$("#change_code").css("display", "block")
		$("#change_code .change_box").addClass("slideInDown")
		$("#change_code").removeClass("fadeOut")

	})

	$("#change_code .change_box .content i").click(function() {

		$("#change_code .change_box").removeClass("slideInDown")
		$("#change_code").addClass("fadeOut")
		$("#change_code").css("display", "none")
	})

	//左侧点击对应右侧内容
	$(".conta .con-box .sidebar .list .item").click(function() {
		$(".conta .con-box .sidebar .list .item").removeClass("active")
		$(this).addClass("active")

		$('.conta .con-box .left-con .self-item').css("display", "none")
		$('.conta .con-box .left-con .self-item').removeClass("fadeIn")
		if($(this).hasClass('info')) {
			$(".conta .con-box .left-con #self_info").addClass("fadeIn")
		} else if($(this).hasClass('security')) {
			$(".conta .con-box .left-con #security").addClass("fadeIn")

			//获取用户资产账户
			chargeMoney();
			//获取充值记录
			chargeMoneyRecord(1, 10);
			var tokenId = $("#chargeMoneyOptions").val();
			getRechargeConetxt(tokenId);

		} else if($(this).hasClass('identity')) {
			$(".conta .con-box .left-con #identity").addClass("fadeIn")
			$.ajax({
				type: "get",
				url: PCData.APPUSER_URL + "appuser/judgewithdraw?bauId=" + pcUser.id,
				success: function(data) {
					if(data != null && data.code != null && data.code != "200") {

					} else {
						withdrawMoney();
						withdrawMoneyRecord(1, 10);
					}
				},
				error: function(e) {
					console.log(e);
				}
			});

		} else if($(this).hasClass('French')) {
			$(".conta .con-box .left-con #French").addClass("fadeIn");
			getCurrencyList("");
		} else if($(this).hasClass('problem')) {
			$(".conta .con-box .left-con #problem").addClass("fadeIn")

		}
	})

	//这里是当前委托和历史委托切换
	$('.conta #French .entrust_nav a').click(function() {
		$(this).siblings().removeClass("tv");
		$(this).addClass("tv")
	})

	$("#box").click(function() {
		capitalOfUser(userId);
	})

	$("#inputVal").keyup(function(e) {
		var ev = document.all ? window.event : e;
		if(ev.keyCode == 13) {
			capitalOfUser(userId);
		}
	});

	$("#numWithdraw").keyup(function(e) {
		getInputWithdrawNum();
	});

	$("#commit").click(function(e) {
		confirmWithdraw();
	});

	// 委托管理查询
	$("#searchBtn").click(function() {
		getSearchList(1, 10);
	})

	$(".Entrust .entrust_nav a").click(function() {
		tabIndex = $(this).index();
		getSearchList(1, 10);
	});

	//获取用户余额
	capitalOfUser(pcUser.id);

	//点击添加地址清空输入框
	$("#addAddr").click(function() {
		$("#bat_id").val("");
		$("#pretermitAddr").val("");
		$(this).parent().slideToggle();
	});

});

//身份认证未认证调至认证页面
function goAuth() {
	location.href = "../../view/person_cen/person_cen.html?type=1";
};

function setFundPasswd() {
	location.href = "../../view/person_cen/person_cen.html?type=2";
}

//获取用户余额
function capitalOfUser(userId) {
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressChargeList?userId=" + userId,
		async: true,
		success: function(res) {
			$("#dataList").html("");
			if(res.code != "200") {
				$("#dataList").html("");
			} else {
				if(!!res.data) {
					var BTC_balance = res.data.BTC;
					var CNDT_balance = res.data.CNDT;
					if(!BTC_balance) {
						BTC_balance = 0;
					}
					if(!CNDT_balance) {
						CNDT_balance = 0;
					}
					$("#balance").text(" " + BTC_balance.toFixed(6) + "BTC" + "≈¥" + CNDT_balance.toFixed(6) + "CNDT");
					var list = res.data.list;
					var _html = "",
						inputVal;
					inputVal = $("#inputVal").val();
					for(i = 0; i < list.length; i++) {
						if("ck" == $("#self_info .history table tr th label").attr("class")) {
							if(list[i].currentBalance == 0 && list[i].freezeTheBalance == 0) {
								continue;
							}
						}
						if(!!inputVal) {
							if(list[i].tokenName != inputVal.toUpperCase()) {
								continue;
							}
						}
						var strR = "";
						if(list[i].rechargeStatus != 1 || list[i].userrechargeStatus != 1) {
							strR = "<td><span style=\"color:#ccc\" >Charge money</span>";
						} else {
							strR = "<td><span onclick=\"rechargeClick(" + list[i].tokenId + ");\">Charge money</span>";
						}

						var strW = "";
						if(list[i].withdrawalsStatus != 1 || list[i].userwithdrawStatus != 1) {
							strW = "<span style=\"color:#ccc\">Withdraw money</span>";
						} else {
							strW = "<span onclick=\"withdrawClick(" + list[i].tokenId + ",'" + list[i].tokenName + "');\">Withdraw money</span>";
						}

						var strB = "";

						$.ajax({
							type: "get",
							url: PCData.TOKEN_URL + "bigToken/selectBigAdminTokenOne?tokenId=" + list[i].tokenId,
							async: false,
							success: function(res) {
								if(res != null && res.code == "200" && res.data != null) {
									if(res.data.transactionStatus != 1) {
										strB = "<span style=\"color:#ccc\">transaction</span></td></tr>";
									} else {
										strB = "<span onclick=\"tradeClick(" + list[i].tokenId + ",'" + list[i].tokenName + "');\">transaction</span></td></tr>";
									}
								} else {
									strB = "<span style=\"color:#ccc\">transaction</span></td></tr>";
								}
							},
							error: function(e) {
								console.log(e);
								strB = "<span style=\"color:#ccc\">transaction</span></td></tr>";
							}
						});

						_html = _html + "<tr>" +
							"<td>" + list[i].tokenName + "</td>" +
							"<td>" + (list[i].currentBalance.toFixed(6)) + "</td>" +
							"<td>" + (list[i].freezeTheBalance.toFixed(6)) + "</td>" +
							"<td>" + (list[i].btcprice.toFixed(6)) + "</td>" + strR + strW + strB;
					}
					$("#dataList").append(_html);
				} else {
					$("#dataList").html("");
				}
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

function rechargeClickNo() {
	Message("The token does not support the money for the time being", "error");
}

function withdrawClickNo() {
	Message("The token does not support the currency for the time being", "error");
}

function tradeClickNo() {
	Message("The token does not support transactions for the time being", "error");
}

//充币
function rechargeClick(tokenId) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .security").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #security").addClass("fadeIn");

	//获取用户资产账户
	chargeMoney();
	//获取充值记录
	chargeMoneyRecord(1, 10);

	$("#chargeMoneyOptions").val(tokenId);

	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressCharge?userId=" + userId + "&&tokenId=" + tokenId,
		success: function(addr) {
			if(addr.code == "200" && addr.data != null && addr.data["3"] != null && addr.data["3"].address != null) {
				$("#Website").val(addr.data["3"].address);
				//jQuery('#output').qrcode('http://www.baidu.com');
				$("#output").empty();
				var qrcode = new QRCode(document.getElementById("output"));
				var QRCodeUrl = addr.data["3"].address;
				qrcode.makeCode(QRCodeUrl);
			} else {
				$("#Website").val("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

//提币
function withdrawClick(tokenId, tokenName) {

	$(".conta .con-box .sidebar .list .active").removeClass("active");
	$(".conta .con-box .sidebar .list .identity").addClass("active");

	$('.conta .con-box .left-con #self_info').css("display", "none");
	$('.conta .con-box .left-con #self_info').removeClass("fadeIn");
	$(".conta .con-box .left-con #identity").addClass("fadeIn");

	$.ajax({
		type: "get",
		url: PCData.APPUSER_URL + "appuser/judgewithdraw?bauId=" + pcUser.id,
		success: function(data) {
			if(data != null && data.code != null && data.code != "200") {

			} else {
				withdrawMoney();
				withdrawMoneyRecord(1, 10);

				$("#withdrawMoneyOptions").val(tokenId);
				queryWithdraw(tokenId, tokenName);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});

}

//交易
function tradeClick(tokenId, tokenName) {

	var Trading = "";

	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + 'bigToken/selectListBigAdminTokenAreaList',
		async: false,
		success: function(res) {
			console.log(res.data);
			if(res != null && res.code != null && res.code == "200" && res.data != null && res.data.length > 0) {
				var list1 = res.data;
				for(i = 0; i < list1.length; i++) {
					if(Trading == "" || Trading == null || Trading.length < 1) {
						var list2 = list1[i];
						for(j = 0; j < list2.length; j++) {
							if(Trading == "" || Trading == null || Trading.length < 1) {
								if(list2[j].id == tokenId) {
									if(i == 0) {
										Trading = "BIGT";
									} else if(i == 1) {
										Trading = "BTC";
									} else if(i == 2) {
										Trading = "ETH";
									} else if(i == 3) {
										Trading = "CNDT";
									}
								}
							}
						}
					}
				}
			} else {
				Message("该代币暂不支持交易", "error");
			}
		},
		error: function(e) {
			console.log(e);
			Message("该代币暂不支持交易", "error");
		}
	});

	if(Trading != null && Trading != "") {
		location.href = "../../view/k_line/k_line.html?Token=" + tokenName + "&Trading=" + Trading + "&TokenId=" + tokenId;
	}
}

//添加充币输入框数据
function chargeMoney() {
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressChargeList?userId=" + userId,
		async: false,
		success: function(res) {
			$("#chargeMoneyOptions").empty();
			if(res.code != "200") {
				$("#chargeMoneyOptions").empty();
			} else {
				if(!!res.data) {
					var list = res.data.list;
					var _html = "";
					var firstTokenId = "";
					for(i = 0; i < list.length; i++) {
						if(list[i].rechargeStatus != 1) {
							continue;
						}
						var tokenName = list[i].tokenName;
						var tokenId = list[i].tokenId;
						if(firstTokenId == "") {
							firstTokenId = tokenId;
						}
						_html = _html + '<option value ="' + tokenId + '">' + tokenName + '</option>';
					};
					$("#chargeMoneyOptions").append(_html);
					$.ajax({
						type: "get",
						url: PCData.TOKEN_URL + "bigToken/userAddressCharge?userId=" + userId + "&&tokenId=" + firstTokenId,
						success: function(addr) {
							if(addr.code == "200" && addr.data != null && addr.data["3"] != null && addr.data["3"].address != null) {
								$("#Website").val(addr.data["3"].address);
								//jQuery('#output').qrcode('http://www.baidu.com');
								$("#output").empty();
								var qrcode = new QRCode(document.getElementById("output"));
								var QRCodeUrl = addr.data["3"].address;
								qrcode.makeCode(QRCodeUrl);
							} else {
								$("#Website").val("");
							}
						},
						error: function(e) {
							console.log(e);
						}
					});
				}
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

//添加充币输入框数据
function chargeChange() {
	var tokenId = $("#chargeMoneyOptions").val();
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressCharge?userId=" + userId + "&&tokenId=" + tokenId,
		success: function(addr) {
			if(addr.code == "200" && addr.data != null && addr.data["3"] != null && addr.data["3"].address != null) {
				$("#Website").val(addr.data["3"].address);
				//jQuery('#output').qrcode('http://www.baidu.com');
				$("#output").empty();
				var qrcode = new QRCode(document.getElementById("output"));
				var QRCodeUrl = addr.data["3"].address;
				qrcode.makeCode(QRCodeUrl);
				//获取充币提示
				getRechargeConetxt(tokenId);
				//刷新充币记录
				chargeMoneyRecord(1, 10);
				
				
			} else {
				$("#Website").val("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

function copyUrl() {
	var url = document.getElementById("Website");
	url.select(); // 选择对象
	document.execCommand("Copy"); // 执行浏览器复制命令
	Message("复制成功", "win");
}

//充币记录

function chargeMoneyRecord(page, rows) {
	
	var data = {
		"bau_id": userId,
		"type": 0,
		"bat_id":$("#chargeMoneyOptions").val(),
		"page": page == null || page == "" ? 1 : page,
		"rows": rows == null || rows == "" ? 10 : rows,
	};

	$.ajax({
		type: "post",
		url: PCData.TOKENRECORD_URL + "tokenRecord/selectBigAppChargeProvidedList ",
		data: JSON.stringify(data),
		contentType: "application/json",
		async: true,
		success: function(res) {
			$("#rechargeList").empty();
			if(res.code == "200" && res.data != null && res.data.objectList != null) {
				var _html = "<tr></tr>",
					className, status;
				var userRechargeOrWithdrawData = res.data.objectList;
				for(i = 0; i < userRechargeOrWithdrawData.length; i++) {
					if(userRechargeOrWithdrawData[i].arrivalStatus == 0) {
						className = "";
						status = "等待到账";
					} else if(userRechargeOrWithdrawData[i].arrivalStatus == 1) {
						className = "win";
						status = "到账成功";
					} else {
						className = "default";
						status = "到账失败";
					}
					_html = _html +
						"<tr>" +
						"<td>" +
						"<p>地址：" + userRechargeOrWithdrawData[i].address + "</p>" +
						"<p>Txid：" + (userRechargeOrWithdrawData[i].withdrawHash == null ? "" : userRechargeOrWithdrawData[i].withdrawHash) + "</p></td>" +
						"<td>" + (userRechargeOrWithdrawData[i].num.toFixed(6)) + "</td>" +
						"<td>" + PCUtils.getTimeFull(userRechargeOrWithdrawData[i].updateTime, "-") + "</td>" +
						"<td class=" + className + ">" + status + "</td></tr>";
				}
				$("#rechargeList").append(_html);
				$('#pageR').val(page == null || page == "" ? 1 : page);
				$('#totalR').val(res.data.total);
				$('#rowsR').val(rows == null || rows == "" ? 10 : rows);

				//重新渲染分页使用render
				pR.render({
					count: $('#totalR').val(),
					pagesize: rows,
					current: page
				});

			} else {
				$("#rechargeList").append("");
			}
		},
		error: function(e) {
			console.log(e);
		}

	});
}

//添加提取下拉框
function withdrawMoney() {
	if(pcUser.fundsStatus == null || (pcUser.fundsStatus != null && pcUser.fundsStatus != 1)) {
		$("#rightDiv").css("display", "");
		$("#readyDiv").css("display", "none");
		return false;
	}
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressChargeList?userId=" + userId,
		async: false,
		success: function(res) {
			$("#withdrawMoneyOptions").empty();
			if(res.code == "200" && res.data != null && res.data.list != null) {
				var list = res.data.list;
				var _html = "";
				var firsttokenId = "";
				var firsttokenName = "";
				for(i = 0; i < list.length; i++) {
					if(list[i].withdrawalsStatus != 1) {
						continue;
					}
					var tokenName = list[i].tokenName;
					var tokenId = list[i].tokenId;
					if(firsttokenId == "") {
						firsttokenId = tokenId;
					}
					if(firsttokenName == "") {
						firsttokenName = tokenName;
					}
					_html = _html + '<option value ="' + tokenId + '">' + tokenName + '</option>';
				}
				$("#withdrawMoneyOptions").append(_html);
				queryWithdraw(firsttokenId, firsttokenName);
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

//获取币种的可提现额度
function numWithdraw() {
	//tokenId
	var tokenId = $(withdrawMoneyOptions).children('option:selected').val();
	//tokenName
	var tokenName = $(withdrawMoneyOptions).children('option:selected').text();
	//刷新额度 和提现地址
	queryWithdraw(tokenId, tokenName);
	//刷新额度 和提现地址
	withdrawalsConetxt(tokenId,tokenName);
	//刷新提现列表
	withdrawMoneyRecord(1, 10);
	$("#fundsPassword").val("");
	$("#vaildatecode").val("");
	$("#chargeNum").text("");
	$("#balanceNum").text("");

}

function queryWithdraw(tokenId, tokenName) {
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/userAddressCharge?userId=" + userId + "&&tokenId=" + tokenId,
		async: true,
		success: function(addr) {
			if(addr.code == "200" && addr.data != null && addr.data["1"] != null) {
				//活期余额度
				$("#currentBalance").text(addr.data["1"].currentBalance.toFixed(6));
				queryAdressList(tokenName);
			}
		},
		error: function(e) {
			console.log(e);
		}

	});
	withdrawalsConetxt(tokenId,tokenName);
}

function queryAdressList(tokenName) {
	var data = {
		"bauId": userId,
		"tokenType": tokenName
	};
	//访问后台获取提币地址
	$.ajax({
		type: "post",
		url: PCData.APPUSER_URL + "appuser/useraddress",
		data: JSON.stringify(data),
		contentType: "application/json",
		async: true,
		success: function(res) {
			$("#withdrawAddrs").empty();
			if(res.code == "200" && res.data != null) {
				var addresses = res.data;
				if(addresses.length > 0) {
					_html = "";
					//填充第一条数据
					$("#pretermitAddr").text(addresses[0].address);
					$("#bat_id").val(addresses[0].id);
					//从第二条开始填充
					for(i = 1; i < addresses.length; i++) {
						_html = _html +
							"<div class=\"his_item\" >" +
							"<p onclick=\"changeText(this);\" value=" + addresses[i].id + ">" + addresses[i].address + "</p>" +
							"<i  class=\"iconfont icon-weibiaoti101\" onclick=\"addressunbind(" + addresses[i].id + ")\" ></i>" +
							"</div>";
					}
					$("#withdrawAddrs").append(_html);
				}
			} else {
				$("#withdrawAddrs").append("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});

}

//
function changeText(obj) {
	//当前标签内容填充到第一条	
	var pretermitAddr = $("#pretermitAddr").text();
	var bat_id = $("#bat_id").val();
	var t_text=$(obj).text();
	var t_attr=$(obj).attr("value");
	
	$(obj).text(pretermitAddr);
	$(obj).attr("value", bat_id);

	$("#pretermitAddr").text(t_text);
	$("#bat_id").val(t_attr);

}




function changeAdress() {
	$("#bat_id").val("");
}

//获取用户输入的提现数量 计算手续费和实际到账
function getInputWithdrawNum() {
	var numWithdraw = $("#numWithdraw").val();
	//判断用户输入类型是否为数值

	var tokenId = $("#withdrawMoneyOptions").val();
	var chargData = {
		"bauId": userId,
		"num": membershipLevel,
		"tokenId": tokenId,
		"type": 1
	};
	chargeNumAndBalanceNum(chargData);
}

//获取手续费以及时实际到账
function chargeNumAndBalanceNum(chargData) {
	$.ajax({
		type: "post",
		url: PCData.TOKEN_URL + "bigToken/ServiceTokenIDChargequery",
		data: JSON.stringify(chargData),
		contentType: "application/json",
		async: true,
		success: function(chargRes) {
			if(chargRes.code == "200" && chargRes.data != null) {
			var	type=chargRes.data.type;
			var getWithdrawType=chargRes.data.getWithdrawType;
			
			var numWithdraw=$("#numWithdraw").val();
			//手续费
			var chargeNum=0;
			 if(type==1){
				//按照百分比收取
				chargeNum=(numWithdraw*(chargRes.data.num/100)).toFixed(6);
			}else if(type==2){
				//按照数量收取
				chargeNum=chargRes.data.num;
			}   //手续费显示
				$("#chargeNum").text(chargeNum);
				//计算实际到账  输入数量-手续费数量
				//实际到账显示
				var balanceNum = ($("#numWithdraw").val() - chargeNum).toFixed(6);
				$("#balanceNum").text(balanceNum);
			} else {
				$("#chargeNum").text("0.000000");
				$("#balanceNum").text("0.000000");
				//window.Location();
			}
			txNum=getWithdrawType;
			
		},
		error: function(e) {
			console.log(e);
		}
	});
};

var codeTime = 120;
var codeId = null;

function sendCode() {
	if(codeId == null) {
		var data = {
			"phone": pcUser.phone,
			"codeType": 3
		};
		$.ajax({
			type: 'POST',
			url: PCData.OUTSIDE_AUTHORITY_URL + 'user/sendcode',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					$('#vaildatecode').val('');
					codeTimeInit();
				}
			},
			error: function(e) {
				Message("Request error", "error");
				console.log(e);
			}
		});
	}
}

function codeTimeInit() {
	var index = codeTime;
	var go = function() {
		if(index < 0) {
			clearInterval(codeId);
			codeId = null;
		} else {
			if(index == 0) {
				$('#txDiv').html('Send authentication code');
			} else {
				$('#txDiv').html('has been sent(' + index + ')');
			}
			index--;
		}
	};
	go();
	codeId = setInterval(go, 1000);
};

//确认提现
function confirmWithdraw() {
	var baaId=$("#bat_id").val();
	var tokenType= $("#withdrawMoneyOptions").find("option:selected").text();
    if(baaId==""){
	    //添加地址	
	    //获取用户输入地址 并发送请求绑定地址
	    var addr=$("#pretermitAddr").val();
	    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	    if(addr.replace(/(^s*)|(s*$)/g, "").length ==0){
	    	Message("The address of the coin can not be empty", "error");
	    }else if(reg.test(addr)){
	    	Message("Money address can not contain Chinese characters", "error");
	    }else{
	    	var bindData={
				"bauId": userId,
				"address":addr,
				"tokenType":tokenType
			};
			$.ajax({
				type: "post",
				url: PCData.APPUSER_URL + "appuser/addressbind",
				data: JSON.stringify(bindData),
				contentType: "application/json",
				async: false,
				success: function(bindDataRes){
					//绑定成功 查询地址列表	
					var addressData = {
						"bauId": userId,
						"tokenType":tokenType
					};
					//访问后台获取提币地址
					$.ajax({
							type: "post",
							url: PCData.APPUSER_URL + "appuser/useraddress",
							data: JSON.stringify(addressData),
							contentType: "application/json",
							async: false,
							success: function(addressRes) {
							if(addressRes.code == "200" && addressRes.data != null) {
								var addresses = addressRes.data;
								for(i=0;i<addresses.length;i++){
									//获取该地址对应的地址id
									if(addresses[i].address==addr){
										baaId=addresses[i].id;
									}
								}
										
							}
						},
						error:function(e) {
							console.log(e);
						}
					});
				},
				error:function(e) {
						Message("Request error", "error");
						console.log(e);
					}	
				});
	    }
   }
   if(baaId!=null&&baaId!=""){
   		 //发送请求确认
   	    var	vaildatecode= $("#vaildatecode").val();
   	    var isNumber = PCUtils.checkStr(vaildatecode,3); 
   	    
   	    var pretermitAddr=$("#pretermitAddr").val();
   	    var isChinese= PCUtils.checkStr(pretermitAddr,6); 
   	    var num=$("#numWithdraw").val();	
   	    var isNum = PCUtils.checkStr(num,3); 
   	    
   	    if(vaildatecode==null||vaildatecode.trim()==""){
   	    	Message("Please enter the verification code", "error");
   	    }else if(!isNumber){
   	    	Message("The verifying code must be a number", "error");
   	    }else if(num<txNum){
   	    	Message("The amount of money should be greater than the minimum amount of money", "error");
   	    }else{ 
   	    		var forgetpwdAuthD = {
					"phone": pcUser.phone,
					"vaildatecode": $("#vaildatecode").val(),
				};
				
				$.ajax({
					type: 'POST',
					url: PCData.OUTSIDE_AUTHORITY_URL + 'user/forgetpwdAuth',
					data: JSON.stringify(forgetpwdAuthD),
					contentType: "application/json",
					dataType: 'json',
					async: false,
					success: function(forgetpwdAuthD) {
						if(forgetpwdAuthD.code != "200") {
							Message(forgetpwdAuthD.message, "error");
						} else if(pretermitAddr==null||pretermitAddr.trim()==""){
						   Message("The address of the coin can not be empty", "error");
			   	       }else if(isChinese){
			   	       	  	Message("Money address can not contain Chinese characters", "error");
			   	       }else if(num==null||num.trim()==""){
			   	    	    Message("The amount of money can not be empty", "error");
			   	        }else if(!PCUtils.checkStr(num,9)){
			   				Message("The amount must be counted as a number", "error");
			   		   }else{
			   		   		var data = {
								"bau_id": userId,
								"bat_id": $("#withdrawMoneyOptions").val(),
								"baa_id": baaId,
								"type": 1,
								"num": $("#numWithdraw").val(),
								"arrivalStatus": 0,
								"auditingType": 0,
								"address":pretermitAddr,
								"fundsPassword": hex_md5(PCData.PREX + $("#fundsPassword").val())
							};
							$.ajax({
								type: 'POST',
								url: PCData.TOKENRECORD_URL + "tokenRecord/appsaveBigAppChargeProvided",
								data: JSON.stringify(data),
								contentType: "application/json",
								dataType: 'json',
								success: function(data) {
									if(data.code== "200") {
										Message("Application for success", "win");
										$("#fundsPassword").val("");
										$("#vaildatecode").val("");
										$("#chargeNum").text("");
										$("#balanceNum").text("");
										$("#numWithdraw").val("");
										//刷新提现列表
										withdrawMoneyRecord(1,10);
										//刷新余额度
										var tokenName = $(withdrawMoneyOptions).children('option:selected').text();
										queryAdressList(tokenName);
									    var	tokenId=$("#withdrawMoneyOptions").val();
									    //刷新提示
									    var	tokenName=$("#withdrawMoneyOptions").children('option:selected').text();
									    withdrawalsConetxt(tokenId,tokenName);
										queryWithdraw(tokenId, tokenName);
									}else{
										Message(data.message, "error");	
									}
								},
								error: function(e) {
									Message("Request error", "error");
									console.log(e);
								}
							});
			   		   }
					},
					error: function(e) {
						Message("Request error", "error");
						console.log(e);
					}
			});
   	    }
   }
}

//提币解绑地址
function addressunbind(bauaId) {
	var data = {
		"bauId": userId,
		"bauaId": bauaId
	};
	$.ajax({
		type: 'POST',
		url: PCData.APPUSER_URL + "appuser/addressunbind",
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code == "200") {
				var tokenName = $(withdrawMoneyOptions).children('option:selected').text();
				queryAdressList(tokenName);
			}
		},
		error: function(e) {
			Message("Request error", "error");
			console.log(e);
		}
	});
}

//提币记录
function withdrawMoneyRecord(page, rows) {

	var data = {
		"page": page == null || page == "" ? 1 : page,
		"rows": rows == null || rows == "" ? 10 : rows,
		"bat_id":$("#withdrawMoneyOptions").val(),
		"type": 1,
		"bau_id": userId
	};

	$.ajax({
		type: "post",
		url: PCData.TOKENRECORD_URL + "tokenRecord/selectBigAppChargeProvidedList",
		data: JSON.stringify(data),
		contentType: "application/json",
		async: false,
		success: function(res) {
			if(res.code != "200") {
				Message(res.message, "error");
			} else {
				$("#transitionSet").empty();
				var _html = "<tr></tr>",
					className, status;
				var userRechargeOrWithdrawData = res.data && res.data.objectList || [];
				for(i = 0; i < userRechargeOrWithdrawData.length; i++) {
					var color="";
					if(userRechargeOrWithdrawData[i].auditingType==0){
						className = "";
						status = "Audit";
						color="#8EA8F1";
					}
					if(userRechargeOrWithdrawData[i].auditingType==1){
						if(userRechargeOrWithdrawData[i].arrivalStatus == 0) {
						className = "";
						status = "Waiting for the account";
						
					} else if(userRechargeOrWithdrawData[i].arrivalStatus == 1) {
						className = "win";
						status = "The success of the account";
						color="#46C79C";
					} else {
						className = "default";
						status = "Account failure";
						color="#DF6B3A";
					}
					}
					if(userRechargeOrWithdrawData[i].auditingType==2){
						className = "default";
						status = "Audit does not pass through";
						color="#DF6B3A";
					}
					
					_html = _html + "<tr>" +
						"<td>" + PCUtils.getTimeFull(userRechargeOrWithdrawData[i].updateTime, "-") + "</td>" +
						"<td>" + userRechargeOrWithdrawData[i].id + "</td>" +
						"<td>" + userRechargeOrWithdrawData[i].num.toFixed(6) + "</td>" +
						"<td>" + userRechargeOrWithdrawData[i].serviceCharge.toFixed(6) + "</td>" +
						"<td>" +
						"<p>address：" + userRechargeOrWithdrawData[i].address + "</p>" +
						"<p>Txid：" + (userRechargeOrWithdrawData[i].withdrawHash == null ? "" : userRechargeOrWithdrawData[i].withdrawHash) + "</p>" +
						"</td>" +
						"<td  style=\"color:"+color+"\"  class=" + className + ">" + status + "</td></tr>";
				}

				$("#transitionSet").append(_html);

				$('#page').val(page == null || page == "" ? 1 : page);
				$('#total').val(res.data.total);
				$('#rows').val(rows == null || rows == "" ? 10 : rows);

				//重新渲染分页使用render
				p.render({
					count: $('#total').val(),
					pagesize: rows,
					current: page
				});

			}

		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}

	});
}

function getCurrencyList(token) {
	var status = $("#tradingPost").val();
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/selectListBigAdminTokenArea?status=" + status,
		async: true,
		success: function(res) {
			$("#currency").empty();
			if(res.code == "200" && res.data != null) {
				var _html = "",
					list;
				list = res.data;
				for(i = 0; i < list.length; i++) {
					if(token != null && token == list[i].englishAbbreviations) {
						_html = _html + '<option value="' + list[i].englishAbbreviations + '" selected="selected">' + list[i].englishAbbreviations + '</option>';
					} else {
						_html = _html + '<option value="' + list[i].englishAbbreviations + '">' + list[i].englishAbbreviations + '</option>';
					}
				}
				$("#currency").append(_html);
				getSearchList(1, 10);
			} else {
				$("#currency").html("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});

}

// 委托管理列表
function getSearchList(page, rows) {
	var tradingArea, token, type, start, end, transactionStatus0, transactionStatus1, transactionStatus2, revokeStatus, completeStatus;
	tradingArea = $("#tradingPost").children('option:selected').text(); //交易区
	token = $("#currency").children('option:selected').val(); //交易代币
	type = $("#direction").children('option:selected').val(); //类型
	start = ($("#startDateTimeS").val() == null || $("#startDateTimeS").val() == "" ? FundMangerUtils.getBeforeMonth(new Date(), 3, "-") : $("#startDateTimeS").val()) + " 00:00:00";
	end = ($("#endDateTimeS").val() == null || $("#endDateTimeS").val() == "" ? FundMangerUtils.getNowDate("-") : $("#endDateTimeS").val()) + " 23:59:59";

	var startDateTimeS = $("#startDateTimeS").val();
	var endDateTimeS = $("#endDateTimeS").val();
	var d1 = new Date(startDateTimeS.replace(/\-/g, "\/"));
	var d2 = new Date(endDateTimeS.replace(/\-/g, "\/"));

	if(startDateTimeS != "" && endDateTimeS != "") {
		if(d1 > d2) {
			Message("The start date cannot be greater than the end date", "error");
			return false;
		}
	}

	transactionStatus0 = null;
	transactionStatus1 = null;
	transactionStatus2 = null;
	revokeStatus = null;
	completeStatus = null;
	if(tabIndex == 0) {
		//当前记录单     部分成交 或者 未成交 未撤销  未完成
		transactionStatus0 = 0;
		transactionStatus1 = 1;
		completeStatus = 0;
		revokeStatus = 0;
	} else if(tabIndex == 1) {
		//查询历史记录单  已完成
		completeStatus = 1;
	}

	//测试用
	// tradingArea="BIGT";
	// token="BTC";
	// start="";
	// end="";
	// userId=1096;

	var reqData = {
		"tradingArea": tradingArea,
		"token": token,
		"start": start,
		"page": page == null || page == "" ? 1 : page,
		"rows": rows == null || rows == "" ? 10 : rows,
		"bauId": userId,
		"end": end,
		"transactionStatus0": transactionStatus0,
		"transactionStatus1": transactionStatus1,
		"transactionStatus2": transactionStatus2,
		"completeStatus": completeStatus,
		"type": type,
		"revokeStatus": revokeStatus
	};

	$.ajax({
		type: "post",
		url: PCData.PCTRANSACTION_URL + "pctransaction/selectOrderByUserId",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(reqData),
		async: true,
		success: function(res) {
			$("#tradingList").html("");
			if(res.code == "200" && res.data != null && res.data.objectList != null) {
				var _html = "<tr></tr>",
					list;
				list = res.data.objectList;
				for(i = 0; i < list.length; i++) {
					_operateHtml = "";
					if(tabIndex == 0) {
						//买入
						_operateHtml = "<td class='undo' onclick='undo(\"" + tradingArea + "\",\"" + token + "\"," + type + "," + userId + "," + list[i].id + "," + page + "," + rows + ")'>Cancel the order</td>";
					} else {
						_operateHtml = "<td>--</td>";
					}
					_css = "";
					if(transactionStatusFn(list[i].transactionStatus, list[i].revokeStatus) == "部分成交") {
						_css = "deal";
					}
					if(transactionStatusFn(list[i].transactionStatus, list[i].revokeStatus) == "未成交") {
						_css = "noDeal";
					}

					_html = _html +
						"<tr>" +
						"<td>" + PCUtils.getTimeFull(list[i].updateTime, "-") + "</td>" +
						"<td>" + list[i].tradingArea + "／" + list[i].token + "</td>" +
						"<td class='purchase'>" + typeFn(list[i].type) + "</td>" +
						"<td>" + (list[i].yesDealNumber.toFixed(6)) + "</td>" +
						"<td>" + (list[i].number.toFixed(6)) + "</td>" +
						"<td>" + (list[i].yesDealTotalAmount.toFixed(6)) + "</td>" +
						"<td>" + (list[i].yesDealServiceCharge.toFixed(6)) + "</td>" +
						"<td class=" + _css + ">" + transactionStatusFn(list[i].transactionStatus, list[i].revokeStatus) + "</td>" +
						_operateHtml +
						"</tr>";
				}
				$("#tradingList").append(_html);

				$('#pageW').val(page == null || page == "" ? 1 : page);
				$('#totalW').val(res.data.total);
				$('#rowsW').val(rows == null || rows == "" ? 10 : rows);

				//重新渲染分页使用render
				pW.render({
					count: $('#totalW').val(),
					pagesize: rows,
					current: page
				});

			} else {
				$("#tradingList").html("");
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
};

function typeFn(val) {
	switch(val) {
		case null:
			val = "No record";
			break;
		case 0:
			val = "Buy";
			break;
		case 1:
			val = "Sell";
			break;
		default:
			break;
	}
	return val;
}

function transactionStatusFn(transactionStatus, revokeStatus) {
	//当前委托 已完成 和部分完成 两个状态
	val = "";
	if(tabIndex == 0) {
		if(transactionStatus == 0) {
			return val = "未成交";
		} else {
			return val = "部分成交";
		}
	}
	//历史委托   已撤销  已完成
	else {
		if(revokeStatus == 0) {
			return val = "已成交";
		} else {
			return val = "已撤销";
		}
	}

	return val;
}

//全局方法
var FundMangerUtils = {
	getNowDate: function(value) {
		var d = new Date();
		return d.getFullYear() + value + PCUtils.addZero((d.getMonth() + 1)) + value + PCUtils.addZero(d.getDate());
	},
	getBeforeMonth: function(data, num, value) {
		d = new Date(data);
		d = new Date(d);
		var year = d.getFullYear();
		//		获取月份判断
		var mon;
		if(d.getMonth() + 1 - num > 0) {
			mon = d.getMonth() + 1 - num;
		} else {
			year = year - 1;
			mon = d.getMonth() + 1 + 12 - num;
		}

		var day = d.getDate();
		return year + value + (mon < 10 ? ('0' + mon) : mon) + value + (day < 10 ? ('0' + day) : day);
	},
};

//获取充币温馨提示
function getRechargeConetxt(tokenId) {
	$("#getRechargeConetxt").html("");
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/selectBigAdminTokenOne?tokenId=" + tokenId,
		async: true,
		success: function(data) {
			if(data.code != "200" || data.data == null) {
				Message(data.message, "error");
			} else {
				var rechargeTxt = data.data.rechargeConetxt;
				if(rechargeTxt != null) {
					_html = "";
					var strs = rechargeTxt.split("•");
					for(i = 1; i < strs.length; i++) {
						_html = _html + "<p><i></i>" + strs[i] + "</p>";
					}
					$("#getRechargeConetxt").append(_html);
				}
			}
		},
		error: function(e) {
			console.log(e);
		}
	});
}

//撤单
function undo(tradingArea, token, type, userId, id, page, rows) {
	var data = {
		"tradingArea": tradingArea,
		"token": token,
		"type": type,
		"bauid": userId,
		"id": id
	};
	$.ajax({
		type: "post",
		url: PCData.TRANSACTION_URL + "/transaction/undo",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		async: false,
		success: function(data) {
			if(data.code == "200") {
				//撤单成功
				Message("Successful withdrawal", "win");
				//查询当前订单列表列表
				getSearchList(page, rows);
			} else {
				Message("Request error", "error");
			}
		},
		error: function(e) {
			Message("Request error", "error");
			console.log(e);
		}
	});

}

//获取提币提示
function withdrawalsConetxt(tokenId,tokenName) {
	$("#numWithdraw").attr('placeholder', "");
	$("#numWithdraw").val();
	
	var chargData = {
		"bauId": userId,
		"num": membershipLevel,
		"tokenId": tokenId,
		"type": 1
	};
	
	$.ajax({
		type : "post",
		url : PCData.TOKEN_URL + "bigToken/ServiceTokenIDChargequery",
		data: JSON.stringify(chargData),
		contentType: "application/json",
		async: true,
		success: function(chargRes) {
			if(chargRes.code == "200" && chargRes.data != null) {
				var	getWithdrawType=chargRes.data.getWithdrawType;
				if(getWithdrawType!=null){
					$("#numWithdraw").attr('placeholder', "Minimum amount of money："+getWithdrawType+tokenName);
					txNum=getWithdrawType;
				}else{
					$("#numWithdraw").attr('placeholder', "Minimum amount of money：0"+tokenName);
				}
			} else {
				$("#numWithdraw").attr('placeholder', "Minimum amount of money：0"+tokenName);
			}
			
		},
		error: function(e) {
			console.log(e);
		}
	});

}




