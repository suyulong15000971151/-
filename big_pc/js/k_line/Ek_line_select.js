var pcUser = PCData.getUerInfo();
var token = $("#token").val()
var tradingArea = $("#tokenarea").val();
var tokenId = $("#tokenIds").val();
var INterval = 60
var num = 1;
var goType = "";
var PCUtil=PCUtils

function RefreshBalance(){
	var data = {
			"token": tradingArea,
			"bauId": pcUser.id
		};
		$.ajax({
			type: 'POST',
			url: PCData.TOKEN_URL + 'bigToken/selectuserBalance',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					//					alert(data.message);
					Message(data.message, "error")

				} else {
					console.log(data)

					$("#inMy").empty();
					if(data.data == null) {
						$("#inMy").append("available 0.0000" + token);
					} else {
						$("#inMy").append("available " + data.data.currentBalance.toFixed(6) + tradingArea);
						$("#hiddeninMy").val(data.data.currentBalance.toFixed(6));
					}
				}
			},
			error: function(e) {
				Message("Request error", "error")

				console.log(e);
			}
		});
		var data = {
			"token": token,
			"bauId": pcUser.id
		};
		$.ajax({
			type: 'POST',
			url: PCData.TOKEN_URL + 'bigToken/selectuserBalance',
			data: JSON.stringify(data),
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error")

				} else {
					console.log("-----")
					console.log(data)
					$("#outMy").empty();
					if(data.data == null) {
						$("#outMy").append("available 0.0000" + token);
					} else {
						$("#outMy").append("available	" + data.data.currentBalance.toFixed(6) + token);
						$("#hiddenoutMy").val(data.data.currentBalance);
					}
				}
			},
			error: function(e) {
				Message("Request error", "error")
				//				alert("请求错误");
				console.log(e);
			}
		});
}

//这里是k线行情

//console.log(PCData.PCBIBI_KLINE+'?tokenarea='+tradingArea+'&token='+token+'&interval=120&num=1')
//console.log("====================8888888888888888-------------------")

function tronclik(type, completeStatus, obj) {
	goType = type;
	$(obj).addClass("tv").siblings().removeClass("tv")

	console.log(this)
	var data = {
		"tradingArea": tradingArea,
		"token": token,
		"type": type,
		"bauId": pcUser.id,
		"completeStatus": completeStatus,
		"page": 1,
		"rows": 5
	};
	$.ajax({
		type: 'POST',
		url: PCData.PCQUOTATION_URL + 'pctransaction/selectOrderByUserId',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				//				alert(data.message);
				//				Message(data.message,"error")
			} else {
				if(completeStatus == 1) {
					var result = "";
					$("#tableTrSelectListwanP").empty();
					$("#tableTrSelectListwan").empty();
					if(data.data.objectList.length > 0) {
						
						$("#tableTrSelectListwan").append('<tr></tr>')
						$(data.data.objectList).each(function(i, n) {
							var timestamp3 = n.createTime;
							var newDate = new Date();
							newDate.setTime(timestamp3);
							var type = "";
							if(n.type == 0) {
								type = "Purchase";
							}
							if(n.type == 1) {
								type = "Sell out";
							}
							var status = "";
							if(n.revokeStatus == 0) {
								status = "<td class='win'>Deal</td>";
							}
							if(n.revokeStatus == 1) {
								status = "<td>Withdrawal of a bill</td>";
							}
							var averageTransactionPrice = 0;
							if(n.yesDealTotalAmount != 0) {
								averageTransactionPrice = n.yesDealTotalAmount / n.unitPrice;
							}

							var TrOneSelect = "<tr><td>" + newDate.format('yyyy-MM-dd hh:mm:ss') + "</td><td>" + n.token + "/" + n.tradingArea + "</td><td>" + type + "</td><td>" + averageTransactionPrice.toFixed(6) + n.tradingArea + "</td><td>" + n.unitPrice + n.tradingArea + "</td><td>" + n.yesDealNumber + n.token + "</td><td>" + n.totalAmount + n.token + "</td><td>" + n.yesDealTotalAmount + n.tradingArea + "</td>" + status + "<td>--</td></tr>";
							result = result + TrOneSelect;
						});
					} else {
						var TrOneSelect = "No record";
						$("#tableTrSelectListwanP").append(TrOneSelect);
					}
					$("#tableTrSelectListwan").append(result);
				} else {
					var result = "";
					$("#tableTrSelectListbuP").empty();
					$("#tableTrSelectListbu").empty();
					if(data.data.objectList.length > 0) {
						$("#tableTrSelectListbu").append('<tr></tr>')
						$(data.data.objectList).each(function(i, n) {
							var timestamp3 = n.createTime;
							var newDate = new Date();
							newDate.setTime(timestamp3);
							var type = "";
							if(n.type == 0) {
								type = "Purchase";
							}
							if(n.type == 1) {
								type = "Sell out";
							}
							var status = "";
							if(n.transactionStatus == 0) {
								status = "<td>No deal</td>";
							}
							if(n.transactionStatus == 1) {
								status = "<td>Partial transaction</td>";
							}
							var averageTransactionPrice = 0;
							if(n.yesDealTotalAmount != 0) {
								averageTransactionPrice = n.yesDealTotalAmount / n.unitPrice;
							}
							var CancelTheOrder = "CancelTheOrder(" + n.id + "," + n.type + "," + n.bauId + ",\"" + n.tradingArea + "\",\"" + n.token + "\")";
							var TrOneSelect = "<tr><td>" + newDate.format('yyyy-MM-dd hh:mm:ss') + "</td><td>" + n.token + "/" + n.tradingArea + "</td><td>" + type + "</td><td>" + averageTransactionPrice.toFixed(6) + n.tradingArea + "</td><td>" + n.unitPrice + n.tradingArea + "</td><td>" + n.yesDealNumber + n.token + "</td><td>" + n.totalAmount + n.token + "</td><td>" + n.yesDealTotalAmount + n.tradingArea + "</td>" + status + "<td onclick='" + CancelTheOrder + "'>Cancel the order</td></tr>";
							result = result + TrOneSelect;
						});
					} else {
						var TrOneSelect = "No record";
						$("#tableTrSelectListbuP").append(TrOneSelect);
					}
					$("#tableTrSelectListbu").append(result);
				}
			}
		},
		error: function(e) {
			Message("Request error", "error")

			console.log(e);
		}
	});
}

function CancelTheOrder(id, type, bauId, tradingArea, token) {
	
	var data = {
		"id": id,
		"type": type,
		"bauid": bauId,
		"tradingArea": tradingArea,
		"token": token
	};
	$.ajax({
		type: 'POST',
		url: PCData.TRANSACTION_URL + 'transaction/undo',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error")
			} else {
				Message(data.message, "win")
				tronclik(type, 0);
				RefreshBalance()
				
			}
		},
		error: function(e) {
			Message("Request error", "error")
			console.log(e);
		}
	});
}

function Refresh() {
	window.location.reload();
}

function business(type) {
	
	if(pcUser == null) {
		return;
	}
	if(pcUser != null) {
		if(pcUser.realNameStatus != 1) {
			//			alert("请实名认证")
			Message("Ask for real name certification", "warm")
			return;

		}
		if(pcUser.fundsStatus == 0) {
			Message("Please set the binding fund password", "warm")

			//			alert("请绑定资金密码")
			return;

		}
		var unitPrice = 0;
		var number = 0;
		
		

		
		if(type == 0) {
			unitPrice = $("#IninputMy").val();
			number = $("#IninputNum").val();
			$("#Type").val(0)
			if($("#IninputMy").val() * $("#IninputNum").val()<=0){
				Message("The amount should not be less than 0", "warm");
				return ;
			}
           
		}
		if(type == 1) {
			unitPrice = $("#OutinputMy").val();
			number = $("#OutinputNum").val();
			$("#Type").val(1)
			if($("#OutinputNum").val() * $("#OutinputMy").val() <= 0){
				Message("The amount should not be less than 0", "warm");
				return ;
			}

		}
		if(unitPrice <= 0) {
			//			alert("金额不能小于0");
			Message("The amount should not be less than 0", "warm")

			return;
		}
		if(number < 0) {
			//			alert("数量不能小于0");
			Message("The number can not be less than 0", "warm")

			return;

		}
		if(type == 0) {
			if(decimal($("#IninputNum").val())) {
				$("#inbutton").attr("disabled", true);
				Message("The purchase quantity can only be entered in 6 decimal places", "warm")
				return;
			}
			if(decimal($("#IninputMy").val())) {
				$("#inbutton").attr("disabled", true);
				Message("The purchase amount can only be entered in 6 decimal places", "warm")
				return;
			}
			$("#Capital .capital-box .content .con #amount").html("Purchase <span>("+token+")  </span>"+$("#IninputNum").val())
		}
		if(type == 1) {
			if(decimal($("#OutinputMy").val())) {
				$("#outbutton").attr("disabled", true);
				Message("The number of selling can only be entered in 6 decimal places", "warm")
				return;
			}
			if(decimal($("#OutinputNum").val())) {
				$("#outbutton").attr("disabled", true);
				Message("The number of selling can only be entered in 6 decimal places", "warm")
				return;
			}
				$("#Capital .capital-box .content .con #amount").html("Sell out <span> ("+token+")  </span>"+$("#OutinputNum").val())
		}

	}

	$("#Capital").addClass("fadeIn")
	$("#Capital .capital-box").addClass("slideInDown")
	

}

function padWord() {
	if(pcUser == null) {
		return;
	}
	if(pcUser != null) {
		if(pcUser.realNameStatus != 1) {
			//			alert("请实名认证")
			Message("Ask for real name certification", "warm")
			return;

		}
		if(pcUser.fundsStatus == 0) {
			Message("Please bind the capital cipher", "warm")

			//			alert("请绑定资金密码")
			return;

		}
	}
	$("#padWord").attr("onclick","");
	var type = $("#Type").val()
	var unitPrice = 0;
	var number = 0;
	var fundsPassword = "";
	if(type == 0) {
		unitPrice = $("#IninputMy").val();
		number = $("#IninputNum").val();
		
		fundsPassword = hex_md5(PCData.PREX + $("#fundsPassword").val());
		if(decimal(number)) {
			Message("The purchase quantity can only be entered in 6 decimal places", "warm")
			return;
		}
		if(decimal(unitPrice)) {
			Message("The purchase amount can only be entered in 6 decimal places", "warm")
			return;
		}
		if($("#fundsPassword").val()==""||$("#fundsPassword").val()==null){
			Message("Capital cipher can not be empty", "warm")
			return;
		}
		console.log(fundsPassword)
		//		console.log("")
	}
	if(type == 1) {
		unitPrice = $("#OutinputMy").val();
		number = $("#OutinputNum").val();
	
		fundsPassword = hex_md5(PCData.PREX + $("#fundsPassword").val());
		if(decimal(number)) {
			Message("The number of selling can only be entered in 6 decimal places", "warm")
			return;
		}
		if(decimal(unitPrice)) {
			Message("The selling amount can only be entered in 6 decimal places", "warm")
			return;
		}
	}
	if(unitPrice <= 0) {
		//			alert("金额不能小于0");
		Message("The amount should not be less than 0", "warm")

		return;
	}
	if(number < 0) {
		//			alert("数量不能小于0");
		Message("The number can not be less than 0", "warm")
		return;

	}

	console.log(type + pcUser.id + token + unitPrice + number + fundsPassword)
	//	console.log("----这里是密码加密0-----")

	var data = {
		"type": type,
		"bauid": pcUser.id,
		"tradingArea": tradingArea,
		"token": token,
		"unitPrice": unitPrice,
		"number": number,
		"fundsPassword": fundsPassword
	};
	$.ajax({
		type: 'POST',
		url: PCData.TRANSACTION_URL + 'transaction/inout',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error")
			} else {
				tronclik(type, 0);
				RefreshBalance();
				$("#padWord").attr("onclick","padWord()");
				Message(data.message, "win")
				$("#Capital").removeClass("fadeIn")
				$("#fundsPassword").val("")
			}
		},
		error: function(e) {
			Message("Request error", "error")
			console.log(e);
		}
	});
}
$(function() {

	

	if(pcUser != null) {
		$("#trlistSelect").empty();
		var trlistSelect = "<div class='Entrust curren'><div class='title'><span>Open Orders</span><div class='right'><a href='javascript:;' class='tv' onclick='tronclik(0,0,this);'>Buy</a><a href='javascript:;'  onclick='tronclik(1,0,this);'>Sell</a><a href='javascript:;' onclick='tronclik(null,0,this);'>All</a></div></div><div class='con'><table class='table table-striped'><thead><tr><th>Entrustment time</th><th>market</th><th>direction</th><th>average price</th><th>Price</th><th>Number of transactions</th><th>Number</th><th>Transaction amount	</th><th>state</th><th>operation</th></tr></thead><tbody  id='tableTrSelectListbu'></tbody></table><p id='tableTrSelectListbuP'></p><em onclick=\"goFundManagement(0)\">All records</em></div></div><div class='Entrust his'><div class='title'><span>Order History</span><i>(The last week)</i><div class='right'><a href='javascript:;' class='tv' onclick='tronclik(0,1,this)'>Buy</a><a href='javascript:;' onclick='tronclik(1,1,this)'>Sell</a><a href='javascript:;' onclick='tronclik(null,1,this)'>All</a></div></div><div class='con'><table class='table table-striped'><thead><tr><th>Entrustment time</th><th>market</th><th>direction</th><th>average price</th><th>Price</th><th>Number of transactions</th><th>Number</th><th>Transaction amount</th><th>state</th><th>operation</th></tr></thead><tbody id='tableTrSelectListwan'></tbody></table><p  id='tableTrSelectListwanP'></p><em onclick=\"goFundManagement(1)\">All records</em></div></div>";
		$("#trlistSelect").append(trlistSelect);
	}
	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes()<=9?"0"+this.getMinutes():this.getMinutes(),
			"s+": this.getSeconds()<=9?"0"+this.getSeconds():this.getMinutes(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S+": this.getMilliseconds()
		};
		if(/(y+)/i.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
		}
		for(var k in date) {
			if(new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
					date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			}
		}
		return format;
	}
	$("#businessInputBox").empty();
	if(pcUser == null) {
		var onkeyup="onkeyup=\"value=value.replace(/[^\\d.]/g,'')\" ng-pattern='/[^a-zA-Z]/'";
		var businessLoginAndRegister = "<div class='con_left'><div class='con_title'><span><a href='../system_log/login.html'>Login</a></span>or<span style='margin:0 4px'><a href='../system_register/register.html'>register</a></span>Start a deal<div class='line'></div></div><div class='sub'><div class='item'><label for=''>Buy price</label><div class='pic'><input type='text' name=''  maxlength='13' value='' class='form-control' "+onkeyup+"/><span>" + tradingArea + "</span></div></div><div class='item'><label for=''>Buy volume</label><div class='pic'><input type='text' maxlength='13' name='' value='' class='form-control' "+onkeyup+"/><span>" + token + "</span></div></div><div class='progess'><input id='ex13' type='text' /></div><div class='quota'>A turnover 0.00000000 " + tradingArea + "</div><div class='Purchase'><button class='btn'>Buy" + token + "</button></div></div></div><div class='con_left'><div class='con_title'><span><a href='../system_log/login.html'>Login</a></span>or<span style='margin:0 4px'><a href='../system_register/register.html'>register</a></span>Start a deal<div class='line'></div></div><div class='sub'><div class='item'><label for=''>Selling price</label><div class='pic'><input type='text' name='' maxlength='13' value='' class='form-control' "+onkeyup+"/><span>" + tradingArea + "</span></div></div><div class='item'><label for=''>Sales volume</label><div class='pic'><input type='text' name='' value='' maxlength='13' class='form-control' "+onkeyup+"/><span>" + token + "</span></div></div><div class='progess'><input id='ex14' type='text'/></div><div class='quota'>A turnover 0.00000000 " + tradingArea + "</div><div class='Purchase'><button class='btn'>Sell" + token + "</button></div></div></div>";
		$("#businessInputBox").append(businessLoginAndRegister);
	}
	if(pcUser != null) {
		var onkeyup="onkeyup=\"value=value.replace(/[^\\d.]/g,'')\" ng-pattern='/[^a-zA-Z]/'";
		var businessLoginAndRegister = "<div class='con_left'><div class='con_title' style='display:;'><div class='limt' id='inMy'>available 0.000000" + tradingArea + "</div><input type='hidden' maxlength='13'  id='hiddeninMy' value=''/><em onclick='goCharge(\""+tradingArea+"\");'>Charge money</em><div class='line'></div></div><div class='sub'><div class='item'><label for=''>Buy price</label><div class='pic'><input type='text' name='' maxlength='13' id='IninputMy' value='' class='form-control' "+onkeyup+"/><span>" + tradingArea + "</span></div></div><div class='item'><label for=''>Buy Volume</label><div class='pic'><input type='text' name='' maxlength='13' id='IninputNum' value='' class='form-control' "+onkeyup+"/><span>" + token + "</span></div></div><div class='progess'><input id='ex13' type='text'/></div><div class='quota' id='Ininput'>A turnover 0.0000 " + tradingArea + "</div><div class='Purchase'><button class='btn logr' onclick='business(0)' id='inbutton'>Buy" + token + "</button></div></div></div><div class='con_left'><div class='con_title' style='display: ;'><div class='limt' id='outMy'>available 0.000000" + token + "</div><input type='hidden' maxlength='13'  id='hiddenoutMy' value=''/><em onclick='goCharge(\""+token+"\");'>Charge money</em><div class='line'></div></div><div class='sub'><div class='item'><label for=''>Selling price</label><div class='pic'><input type='text' maxlength='13' name='' id='OutinputMy' value='' class='form-control' "+onkeyup+"/><span>" + tradingArea + "</span></div></div><div class='item'><label for=''>Sales volume</label><div class='pic'><input type='text' maxlength='13' name='' id='OutinputNum' value='' class='form-control' "+onkeyup+"/><span>" + token + "</span></div></div><div class='progess'><input id='ex14' type='text' /></div><div class='quota' id='Outinput'>A turnover 0.0000 " + tradingArea + "</div><div class='Purchase'><button class='btn logc' onclick='business(1)' id='outbutton'>Sell" + token + "</button></div></div></div>"
		$("#businessInputBox").append(businessLoginAndRegister);

		$('#IninputNum').bind('input propertychange', function() {
			if($("#IninputMy").val() < 0) {
				$("#inbutton").attr("disabled", true);
				//Message("买入金额不能小于0", "warm")
				return;
			}
			if($("#IninputNum").val() < 0) {
				$("#inbutton").attr("disabled", true);
				//Message("买入数量不能小于0", "warm")
				return;
			}
			if(decimal($("#IninputNum").val())) {
				$("#inbutton").attr("disabled", true);
				//Message("买入数量只能输入小数点6位", "warm")
//				$("#IninputNum").blur()
				return;
			}
			if(decimal($("#IninputMy").val())) {
				$("#inbutton").attr("disabled", true);
				//Message("买入金额只能输入小数点6位", "warm")
				//$("#IninputMy").blur()
				return;
			}
			$("#inbutton").attr("disabled", false);
			$('#Ininput').empty()
			var demo = $("#IninputMy").val() * $("#IninputNum").val()
			$('#Ininput').append("A turnover" + demo.toFixed(6) + tradingArea);
			//设置进度条的值
		});
		$('#OutinputNum').bind('input propertychange', function() {
			if($("#OutinputMy").val() < 0) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出金额不能小于0", "warm")
				return;
			}

			if($("#OutinputNum").val() < 0) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出数量不能小于0", "warm")
				return;
			}
			if(decimal($("#OutinputMy").val())) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出数量只能输入小数点6位", "warm")
				return;
			}
			if(decimal($("#OutinputNum").val())) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出数量只能输入小数点6位", "warm")
				return;
			}
			$("#outbutton").attr("disabled", false);
			$('#Outinput').empty()
			var demo = $("#OutinputMy").val() * $("#OutinputNum").val();
			$('#Outinput').append("A turnover" + demo.toFixed(6) + tradingArea);
			//设置进度条的值
		});
		$('#OutinputMy').bind('input propertychange', function() {
			if($("#OutinputMy").val() < 0) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出金额不能小于0", "warm")
				return;
			}

			if($("#OutinputNum").val() < 0) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出数量不能小于0", "warm")
				return;
			}
			if(decimal($("#OutinputMy").val())) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出金额只能输入小数点6位", "warm")
//				$('#OutinputMy').blur()
				return;
			}

			if(decimal($("#OutinputNum").val())) {
				$("#outbutton").attr("disabled", true);
				//Message("卖出数量只能输入小数点6位", "warm")
				return;
			}
			$("#outbutton").attr("disabled", false);
			$('#Outinput').empty()
			var demo = $("#OutinputMy").val() * $("#OutinputNum").val();
			$('#Outinput').append("A turnover" + demo.toFixed(6) + tradingArea);
			//设置进度条的值
		});
		$('#IninputMy').bind('input propertychange', function() {
			if($("#IninputMy").val() < 0) {
				$("#inbutton").attr("disabled", true);
			//	//Message("买入金额不能小于0", "warm")
				return;
			}
			if($("#IninputNum").val() < 0) {
				$("#inbutton").attr("disabled", true);
				//Message("买入数量不能小于0", "warm")
				return;
			}
			if(decimal($("#IninputNum").val())) {
				$("#inbutton").attr("disabled", true);
				//Message("买入数量只能输入小数点6位", "warm")
				return;
			}
			if(decimal($("#IninputMy").val())) {
				$("#inbutton").attr("disabled", true);
				//Message("买入金额只能输入小数点6位", "warm")
//				$("#IninputMy").blur()
				return;
			}
			$("#inbutton").attr("disabled", false);
			$('#Ininput').empty()
			var demo = $("#IninputMy").val() * $("#IninputNum").val()
			$('#Ininput').append("A turnover" + demo.toFixed(6) + tradingArea);
			//设置进度条的值
		});
		//TODO
		RefreshBalance();
	}
	if(pcUser != null) {
		tronclik(0, 0, this);
		tronclik(0, 1, this);
	}
	$("#IninputNum").blur(function() {
		var demo = $("#IninputMy").val() * $("#IninputNum").val()
		if(decimal($("#IninputNum").val())) {
			$("#inbutton").attr("disabled", true);
			//Message("买入数量只能输入小数点6位", "warm")
			return;
		}
		if(decimal($("#IninputMy").val())) {
			$("#inbutton").attr("disabled", true);
			//Message("买入金额只能输入小数点6位", "warm")
			return;
		}
		if(demo <= 0) {
			$("#inbutton").attr("disabled", true);
			//Message("买卖数量不能小于0", "warm")
		}
		if( parseFloat($("#hiddeninMy").val())>=parseFloat(demo)) {
			$("#inbutton").attr("disabled", false);
		} else {
			$("#inbutton").attr("disabled", true);
		//	Message("账户余额不足", "warm")
		}
	})
	$("#OutinputNum").blur(function() {
		if($("#OutinputNum").val() <= 0) {
			$("#outbutton").attr("disabled", true);
			//Message("买卖数量不能小于0", "warm")
		}
		if(decimal($("#OutinputMy").val())) {
			$("#outbutton").attr("disabled", true);
			//Message("卖出金额只能输入小数点6位", "warm")
			return;
		}
		if(decimal($("#OutinputNum").val())) {
			$("#outbutton").attr("disabled", true);
			//Message("卖出数量只能输入小数点6位", "warm")
			return;
		}
		if( parseFloat($("#hiddenoutMy").val())>=parseFloat($("#OutinputNum").val())) {
			$("#outbutton").attr("disabled", false);
		} else {
			$("#outbutton").attr("disabled", true);
			//Message("账户余额不足", "warm")
		}
	})

	//这里是进度条事件
	//买入的
	$("#ex13").change(function() {

		//		var quota=($("#inMy").val())
		var hiddeninMy = parseFloat($("#hiddeninMy").val())
		var Percentage = parseFloat($(this).val() / 100)
		var Buyprice = $("#IninputMy").val()
		console.log(hiddeninMy)
		console.log(Percentage)
		console.log(Buyprice)
		//            if(Buyprice==NaN)
		if(Buyprice == "" || Buyprice == 0) {
			$("#IninputNum").val("0.0000")
		} else {
			$("#IninputNum").val((hiddeninMy * Percentage) / Buyprice)
			$("#Ininput").text("A turnover" + hiddeninMy * Percentage.toFixed(6) + "CNDT")
		}

	})
	//卖出的
	$("#ex14").change(function() {

		//		var quota=($("#inMy").val())
		var hiddeninMy = $("#hiddenoutMy").val()
		var Percentage = parseFloat($(this).val() / 100)
		//      var Buyprice= $("#OutinputMy").val()
		console.log(hiddeninMy)
		console.log(Percentage)
		if(hiddeninMy == "") {
			hiddeninMy = 0
		}
		$("#OutinputNum").val((hiddeninMy * Percentage).toFixed(6))
		//      $("#Ininput").text("交易额"+hiddeninMy*Percentage+"CNDT")

	})

	//这里是币种资料
	$.ajax({
		type: "get",
		url: PCData.TOKEN_URL + "bigToken/selectBigAdminTokenOne?tokenId=" + tokenId,
		async: true,
		success: function(res) {

			if(res == null) {
				return;
			}
			console.log(res)
			console.log("这里是币种介绍----")
			console.log(PCUtil.getNowDate(res.tokenCreateTime))
			var res = res.data
			$(".shares .matrial .text .titleS span").text(res.englishAbbreviations)
			$(".shares .matrial .text .titleS i").text(res.tokenName)
			$(".shares .matrial .text .pre-con").text(res.tokenBriefIntroduction)
			$(".shares .matrial .text .issue .time").text("Release time：" +PCUtil.getTimeFull(res.tokenCreateTime,"-"))
			$(".shares .matrial .text .issue .issu").text("Total amount of distribution：" + res.totalAmountOfDistribution)
			$(".shares .matrial .text .issue .circulation").text("Total amount of circulation: " + res.totalAmountOfCirculation)
			$(".shares .matrial .text .issue .Crowd").text("Raise the price：" + res.raiseThePrice)
			$(".shares .matrial .text .isbot .bood").text("white paper：" + res.whitePaper)
			$(".shares .matrial .text .isbot .network").text("Official network：" + res.theOfficialWebsite)
			$(".shares .matrial .text .isbot .block").text("Block query：" + res.blockQuery)
			$(".shares .matrial .title em a").attr("href", res.tokenIntroduceUrl)
		}
	});
	
	

	

})

function goCharge(token) {

	canChargeMoney(token);

}


//点击所有记录跳转至资金管理的委托管理
function goFundManagement(isHistory) {
	location.href = "../../view/fund_manger/fund_manger.html?type=" + 4 +
		"&goType=" + goType + "&isHistory=" + isHistory +
		"&token=" + token + "&tradingArea=" + tradingArea;
};

function decimal(decimalNum) {
	var num = decimalNum.split(".");
	if(num.length > 1) {
		if(num[1].length > 6) {
			return true;
		}
	}
	return false;
}



//判断用户是否能充币
function canChargeMoney(token) {
	//判断用户是否可充币	
	var rechargeStatus = pcUser.rechargeStatus;
	if(!rechargeStatus || rechargeStatus == 0) {
		//用户禁止提币	
		Message("用户禁止充币", "error");
	} else {
		//用户允许提币 查询tokenId
		$.ajax({
			type: "get",
			url: PCData.TOKEN_URL + "bigToken/tokenNameId",
			async: false,
			success: function(data) {
				if(data.code != "200") {
					Message("Request error", message);
				} else {
					var canChargeMoneyData = data.data;
					if(!canChargeMoneyData || canChargeMoneyData.length == 0) {
						Message("The token does not support the money for the time being", "error");
					} else {
						//有数据的遍历获取tokenId
						var tokenId = null;
						for(i = 0; i < canChargeMoneyData.length; i++) {
							if(token == canChargeMoneyData[i].tokenName) {
								tokenId = canChargeMoneyData[i].tokenId;
							}
						}
						if(tokenId == null) {
							Message("The token does not support the money for the time being", "error");
						} else {
							$.ajax({
								type: "get",
								url: PCData.TOKEN_URL + "bigToken/selectBigAdminTokenOne?tokenId=" + tokenId,
								async: true,
								success: function(res) {
									if(res.code == "200" && res.data != null) {
										var rechargeStatus = res.data.rechargeStatus;
										if(!!rechargeStatus && rechargeStatus == 1) {
											location.href = "../fund_manger/fund_manger.html?type=1&&token=" + token+"&&tokenId=" + tokenId;
										}else{
											Message("The token does not support the money for the time being", "error");
										}
									}else{
										Message("The token does not support the money for the time being", "error");
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
			},
			error: function(e) {
				Message("Request error", "error");
				console.log(e);
				return;
			}
		});
	}

}



