var pcUser = PCData.getUerInfo();

if(pcUser!=null&&pcUser.agentStatus==1){
	location.href = "../../index.html";
}

function selectuserBalance() {
	//冻结
	var data1 = {
		"token": "CNDT",
		"bauId": pcUser.id
	};
	$.ajax({
		type: 'POST',
		url: PCData.TOKEN_URL + 'bigToken/selectuserBalance',
		data: JSON.stringify(data1),
		contentType: "application/json",
		dataType: 'json',
		success: function(data1) {
			if(data1.code != "200") {
				Message(data1.message, "error");
			} else {

				$("#topNumber").empty();
				var currentBalance = data1.data.currentBalance;
				var freezeTheBalance = data1.data.freezeTheBalance;
				var topNumber = "CNDT可用&nbsp<span>：" + currentBalance + "</span>&nbsp&nbsp 冻结：" + freezeTheBalance;
				$("#topNumber").append(topNumber);
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});
}
$(function() {
	if(pcUser != null) {
		$.ajax({
			type: 'GET',
			url: PCData.AGENT_URL + 'agentV1/userInformationService?bauId=' + pcUser.id,
			contentType: "application/json",
			dataType: 'json',
			success: function(data) {
				if(data.code != "200") {
					Message(data.message, "error");
				} else {
					if(data.data.paymentMethod1 == 0) {
						statusPayment = 1;
						userInformationService = data.data;
					}
					if(data.data.paymentMethod2 == 0) {
						statusPayment = 1;
						userInformationService = data.data;
					}
					if(data.data.paymentMethod3 == 0) {
						statusPayment = 1;
						userInformationService = data.data;
					}
				}
			},
			error: function(e) {
				Message("请求错误", "error");
				console.log(e);
			}
		});
	}

	Date.prototype.format = function(format) {
		var date = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
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
	if(pcUser != null) {
		if(pcUser.agentStatus == 1) {
			$("#topNumber").empty();
			var currentBalance = 0;
			var freezeTheBalance = 0;
			var topNumber = "CNDT可用&nbsp<span>：" + currentBalance + "</span>&nbsp&nbsp 冻结：" + freezeTheBalance;
			$("#topNumber").append(topNumber);
			return;
		}
		selectuserBalance();
	}
	if(pcUser == null) {
		$("#topNumber").empty();
		var currentBalance = 0;
		var freezeTheBalance = 0;
		var topNumber = "CNDT可用&nbsp<span>：" + currentBalance + "</span>&nbsp&nbsp 冻结：" + freezeTheBalance;
		$("#topNumber").append(topNumber);
	}

	var data = {
		"tokenType": "CNDT"
	};
	$.ajax({
		type: 'POST',
		url: PCData.PCAGENT_URL + 'pcagent/selectListAdminAgent',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				console.log(data)
				$("#agentList").empty();
				var agentList = data.data;
				var result = "";
				$(agentList).each(function(i, n) {
					var type1 = n.type;
					var typeclass = "";
					if(pcUser != null) {
						if(pcUser.agentStatus == 0) {
							if(type1 == 0) {
								typeclass = "<div class='buyBtn fr' onclick='buyBtn(" + n.id + ")'>买入</div>";
								orderclass = "<td class = 'girdSale'>" + n.orderNum + "</td>";
							} else {
								typeclass = "<div class='saleBtn fr'  onclick='saleBtn(" + n.id + ")'>卖出</div>";
								orderclass = "<td class = 'girdBuy'>" + n.orderNum + "</td>";
							}
						} else {
							//TODO 通知代理没有下单权限
							Message("代理没有下单权限", "warm");
							if(type1 == 0) {
								typeclass = "<div class='buyBtn fr'>买入</div>";
								orderclass = "<td class = 'girdSale'>" + n.orderNum + "</td>";
							} else {
								typeclass = "<div class='saleBtn fr'>卖出</div>";
								orderclass = "<td class = 'girdBuy'>" + n.orderNum + "</td>";
							}
						}
					} else {
						//TODO 别忘了用户未登录跳转到登录页面的地址
						var loginUrl = "../system_log/login.html";
						if(type1 == 0) {
							typeclass = "<a href=" + loginUrl + "><div class='buyBtn fr'>买入</div></a>";
							orderclass = "<td class = 'girdSale'>" + n.orderNum + "</td>";
						} else {
							typeclass = "<a href='" + loginUrl + "'><div class='saleBtn fr'>卖出</div></a>";
							orderclass = "<td class = 'girdBuy'>" + n.orderNum + "</td>";
						}
					}

					var agentPO = "<tr>" +
						orderclass +
						"<td>" + n.num + "</td>" +
						"<td style=\"display:none\">" + n.paymentMethod1 + "</td>" +
						"<td style=\"display:none\">" + n.paymentMethod2 + "</td>" +
						"<td style=\"display:none\">" + n.paymentMethod3 + "</td>" +
						"<td>" + n.amountOfNum + "</td>" +
						"<td class='amountOfMoney'>" + n.amountOfMoney + "</td>" +
						"<td>" + n.name.replace(/^(.).*(.)$/, "$1**") + "/" + n.sum + "</td>" +
						"<td>" + n.tradeLimit + "</td>" +
						"<td>" +
						typeclass +
						"</td></tr>";   
					result = result + agentPO;  
				});
				$("#agentList").append(result);
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});
	//列表
	getAll(4, 1, 2);

})
var time = "";

function getAll(status, page, rows) {
	if(status == 4) {
		$(".centerDiv").hide().eq(0).show();
	}
	if(pcUser == null) {
		return;
	}
	if(pcUser != null) {
		if(pcUser.agentStatus == 1) {
			return;
		}
	}
	
	var data2 = {
		"bau_id": pcUser.id,
		"page": page == null || page == "" ? 1 : page,
		"rows": 10,
		"status": status
	};
	$("#pageToolbar2").attr("style", "display:none");
	$("#pageToolbar3").attr("style", "display:none");
	$("#agentTrList").empty();
	var zhanwudingdan = "<div class='reminderText'>" +
		"<p>暂无完成订单</p>" +
		"<p>温馨提示:超过三笔取消订单，将被冻结当天下单权限</p>" +
		"</div>";
	$("#agentTrList").append(zhanwudingdan);
	$.ajax({
		type: "POST",
		url: PCData.APPAGENT_URL + 'agentV1/PCBIGagentOrderSelectList',
		data: JSON.stringify(data2),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				console.log(data)
				time = "";
				$("#agentTrList").empty();
				var statusType = 0;
				var agentTrList = data.data.objectList;
				if(agentTrList.length > 0) {
					$(agentTrList).each(function(i, n) {
						var agentUserOrderSelectVO = n.agentUserOrderSelectVO;
						if(n.type == 0) {
							if(n.status == 4) {
								var payType4 = " ";
								if(agentUserOrderSelectVO.bankCard != null && agentUserOrderSelectVO.bankCard != "") {
									var payType1s = agentUserOrderSelectVO.bankCard.split("&");
									var payType1 = "<tr><td><div class='radio radios' onclick='changePayType(" + agentUserOrderSelectVO.id + ",1)'></div></td><td><img src='../../img/yinhangka.png'/></td><td style='display:none'>" + agentUserOrderSelectVO.bankCard + "</td>	<td>银行卡</td><td>" + payType1s[0] + "</td><td>" + payType1s[3] + "</td><td>" + payType1s[1] + "</td><td>" + payType1s[2] + "</td></tr>"
									payType4 = payType4 + payType1;
								}
								if(agentUserOrderSelectVO.alipay != null && agentUserOrderSelectVO.alipay != "") {
									var payType2s = agentUserOrderSelectVO.alipay.split("&");
									var payType2 = "<tr><td><div class='radio radios' onclick='changePayType(" + agentUserOrderSelectVO.id + ",2)'></div></td><td><img src='../../img/zhifubao.png'/></td><td style='display:none'>" + agentUserOrderSelectVO.alipay + "</td><td>支付宝</td><td>" + payType2s[0] + "</td><td>" +
										payType2s[1] + '</td><td><img src="../../img/erweima.png" class="zfbImg" onclick="Img(\'' + payType2s[2] + '\')"/ ></td></tr>'
									payType4 = payType4 + payType2;
								}
								if(agentUserOrderSelectVO.weChat != null && agentUserOrderSelectVO.weChat != "") {
									var payType3s = agentUserOrderSelectVO.weChat.split("&");
									var payType3 = "<tr><td><div class='radio radios' onclick='changePayType(" + agentUserOrderSelectVO.id + ",3)'></div></td><td><img src='../../img/weixin.png'/></td><td style='display:none'>" + agentUserOrderSelectVO.weChat + "</td><td>微信</td><td>" +
										payType3s[0] + "</td><td>" + payType3s[1] + '</td><td><img src=\"../../img/erweima.png\" class="wxImg" onclick="Img(\'' + payType3s[2] + '\')"/></td></tr>'
									payType4 = payType4 + payType3;

								}
								var result = "<div class='unfinishedOrder'><div class='unfinishedText'><div class='unfinishedTextTop'><div class='item'><input type='hidden' id='waitTimeInput" + agentUserOrderSelectVO.number + "' value=" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "><label>订单号 :</label><span>" + agentUserOrderSelectVO.number + "</span></div>	<div class='item'><label>卖家 :</label><span>" + agentUserOrderSelectVO.name + "</span></div></div><div class='unfinishedTextCenter'>	<div class='unfinishedTextCenterL fl'><div class='typeText'>		" +
									"<p class='selectType'>买入</p><p class='typeNmae'>" + agentUserOrderSelectVO.sellInputType + "</p></div><div class='typeMessage'>" +
									"<p class='typeNumber'>" + agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellOutType + "</p><div class='item'>	<label>单价：</label><span>" + agentUserOrderSelectVO.num + agentUserOrderSelectVO.sellOutType + "/" + agentUserOrderSelectVO.sellInputType + "</span>" +
									"</div><div class='item'><label>数量：</label><span>" + agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellInputType + "</span></div>	<p class='payType'>选择支付方式</p><table class='table-condensed payTable'><tbody>" +
									payType4 + "	</tbody>	</table>	</div></div>	<div class='unfinishedTextCenterR fr'><div><p>等待付款:<span id=\"waitTime\" class='waitTime" + agentUserOrderSelectVO.number + "'>" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "</span>，付款参考号&nbsp:&nbsp<span class='consult '>" + agentUserOrderSelectVO.id + "</span></p>	<div><div class='signBtn fl' onclick='showConfirmPay(" + agentUserOrderSelectVO.id + ")'>标记为已付款</div><div class='signMessage fl'>" +
									"<img src='../../img/notice.png'/>付款成功后，请点击按钮告知对方</div></div><p class='cancelForm' onclick='showCancel(" + agentUserOrderSelectVO.id + ")'>取消订单</p></div></div></div><div class='unfinishedTextBottom'>" +
									agentUserOrderSelectVO.tradeNotice
									//									"<p>1、您的汇款将直接进入卖方账户，交易过程中卖方出售的数字资产由平台托管保护</p><p>2、请在规定的时间内完成付款，请务必点\"我已付款\"，卖方收款后，系统会将数字资产划分到您的账户</p><p>3、买方当日累积三次取消，将会限制当天的买入功能</p>"
									+
									"</div>	</div></div>";
								$("#agentTrList").append(result);
								time = time + "&" + agentUserOrderSelectVO.number;
								statusType = 1;
							}
							if(n.status == 0) {
								var payType4 = " ";
								if(agentUserOrderSelectVO.bankCard != null && agentUserOrderSelectVO.bankCard != "") {
									var payType1s = agentUserOrderSelectVO.bankCard.split("&");
									var payType1 = "<tr><td><img src='../../img/yinhangka.png'/></td>	<td>银行卡</td><td>" + payType1s[0] + "</td>	<td>" + payType1s[3] + "</td><td>" + payType1s[1] + "</td><td>" + payType1s[2] + "</td></tr>"
									payType4 = payType4 + payType1;
								}
								if(agentUserOrderSelectVO.alipay != null && agentUserOrderSelectVO.alipay != "") {
									var payType2s = agentUserOrderSelectVO.alipay.split("&");
									var payType2 = "<tr><td><img src='../../img/zhifubao.png'/></td><td>支付宝</td><td>" + payType2s[0] + "</td><td>" + payType2s[1] +
										"</td><td><img src=\"../../img/erweima.png\" class='zfbImg' onclick='Img(\"" + payType2s[2] + "\")'/></td></tr>"
									payType4 = payType4 + payType2;
								}
								if(agentUserOrderSelectVO.weChat != null && agentUserOrderSelectVO.weChat != "") {
									var payType3s = agentUserOrderSelectVO.weChat.split("&");
									var payType3 = "<tr><td><img src='../../img/weixin.png'/></td>	<td>微信</td><td>" + payType3s[0] + "</td><td>" + payType3s[1] +
										"</td><td><img src=\"../../img/erweima.png\" class='wxImg' onclick='Img(\"" + payType3s[2] + "\")'/></td></tr>"
									payType4 = payType4 + payType3;
								}
								var result = "<div class='unfinishedWaitOrder'><div class='unfinishedText changTop2'><div class='unfinishedTextTop'>	<div class='item'><input type='hidden' id='waitTimeInput" + agentUserOrderSelectVO.number + "' value=" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "><label>订单号 :</label><span>" + agentUserOrderSelectVO.number + "</span></div>	<div class='item'><label>卖家 :</label><span>" + agentUserOrderSelectVO.name + "</span></div><div class='item floatRight' onclick='floatRight(" + agentUserOrderSelectVO.phone + ")'>	<img src='../../img/call.png'/><span>联系对方</span></div></div>	<div class='unfinishedTextCenter changeTop'><div class='unfinishedTextCenterL fl changeTop'>	<div class='typeText changeTop1'>		" +
									"<p class='selectType'>买入</p><p class='typeNmae'>" + agentUserOrderSelectVO.sellInputType + "</p></div><div class='typeMessage changeTop1'>" +
									"<p class='typeNumber'>" + agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellOutType + "</p><div class='item'>	<label>单价：</label><span>" + agentUserOrderSelectVO.num + agentUserOrderSelectVO.sellOutType + "/" + agentUserOrderSelectVO.sellInputType + "</span>" +
									"</div>	<div class='item'><label>数量：</label><span>" + agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellInputType + "</span></div><table class='table-condensed payTable'><tbody>" +
									payType4 + "	</tbody>	</table>	</div></div> <div class='unfinishedTextCenterR fr changeTop paddTop'><p>等待对方放币，<span id=\"waitTime\" class='waitTime" + agentUserOrderSelectVO.number + "'>" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "</span>，付款参考号&nbsp:&nbsp<span class='consult'>" + agentUserOrderSelectVO.id +
									"</span></p></div></div><div class='unfinishedTextBottom'>" +
									agentUserOrderSelectVO.tradeNotice
									//									"<p>1、您的汇款将直接进入卖方账户，交易过程中卖方出售的数字资产由平台托管保护</p><p>2、请在规定的时间内完成付款，请务必点\"我已付款\"，卖方收款后，系统会将数字资产划分到您的账户</p><p>3、买方当日累积三次取消，将会限制当天的买入功能</p>"
									+
									"</div></div></div>";
								$("#agentTrList").append(result);
								time = time + "&" + agentUserOrderSelectVO.number;
								statusType = 1;
							}

						}
						if(n.type == 1) {
							if(n.status == 0) {
								var payType4 = " ";
								if(agentUserOrderSelectVO.bankCard != null && agentUserOrderSelectVO.bankCard != "") {
									var payType1s = agentUserOrderSelectVO.bankCard.split("&");
									var payType1 = "<tr><td><img src='../../img/yinhangka.png'/></td><td>银行卡</td><td>" + payType1s[0] + "</td><td>" + payType1s[3] + "</td><td>" + payType1s[1] + "</td><td>" + payType1s[2] + "</td></tr>"
									payType4 = payType4 + payType1;
								}
								if(agentUserOrderSelectVO.alipay != null && agentUserOrderSelectVO.alipay != "") {
									var payType2s = agentUserOrderSelectVO.alipay.split("&");
									var payType2 = "<tr><td><img src='../../img/zhifubao.png'/></td><td>支付宝</td><td>" + payType2s[0] + "</td><td>" + payType2s[1] +
										'</td><td><img src="../../img/erweima.png" class="zfbImg" onclick="Img(\'' + payType2s[2] + '\')"/ ></td></tr>'
									payType4 = payType4 + payType2;
								}
								if(agentUserOrderSelectVO.weChat != null && agentUserOrderSelectVO.weChat != "") {
									var payType3s = agentUserOrderSelectVO.weChat.split("&");
									var payType3 = "<tr><td><img src='../../img/weixin.png'/></td>	<td>微信</td><td>" + payType3s[0] + "</td><td>" + payType3s[1] + '</td><td><img src=\"../../img/erweima.png\" class="wxImg" onclick="Img(\'' + payType3s[2] + '\')"/></td></tr>'
									payType4 = payType4 + payType3;
								}
								var result = "<div class='unfinishedDischargeOrder '><div class='unfinishedText changTop2'><div class='unfinishedTextTop'>	<div class='item'><input type='hidden' id='waitTimeInput" + agentUserOrderSelectVO.number + "' value=" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "><label>订单号 :</label><span>" +
									agentUserOrderSelectVO.number + "</span></div>	<div class='item'><label>买家 :</label><span>" + agentUserOrderSelectVO.name +
									"</span>	</div><div class='item floatRight' onclick='floatRight(" + agentUserOrderSelectVO.phone + ")'><img src='../../img/call.png'/><span>联系对方</span></div></div><div class='unfinishedTextCenter changeTop'>	<div class='unfinishedTextCenterL fl changeTop'>	<div class='typeText changeTop1 '><p class='selectType changecolor'>卖出</p><p class='typeNmae changecolor'>" + agentUserOrderSelectVO.sellOutType + "</p></div>	" +
									"<div class='typeMessage changeTop1'><p class='typeNumber'>" + agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellInputType + "</p><div class='item'><label>单价：</label><span>" + agentUserOrderSelectVO.num + agentUserOrderSelectVO.sellInputType + "/" + agentUserOrderSelectVO.sellOutType + "</span></div>	<div class='item'>	<label>数量：</label><span>" + agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellOutType + "</span></div>	<div class='blank5'></div><table class='table-condensed payTable'>	<tbody>	" +
									payType4 +
									"</tbody></table>" +
									"</div></div><div class='unfinishedTextCenterR fr changeTop paddTop1'><p>待放行，<span id=\"waitTime\" class='waitTime" + agentUserOrderSelectVO.number + "'>" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "</span>，付款参考号&nbsp:&nbsp<span class='consult '>" + agentUserOrderSelectVO.id +
									"</span></p>	<div class='signBtn fl' onclick='showDischarged(" + agentUserOrderSelectVO.id + ")'>放行CNDT</div></div>	</div><div class='unfinishedTextBottom'>" +
									agentUserOrderSelectVO.tradeNotice
									//									"	<p>1、普通用户售出的数字资产，已交由平台托管冻结。请在确定收到对方付款后点击“ 确认放行”支付数字资产</p><p>2、请不要相信任何催促放币的理由，确认收到款项再释放数字资产，避免造成损失！</p><p>3、买在收到账短信后，请务必登录网上银行或手机银行确认收款是否入账，避免因收到诈骗短信错误释放数字资产！</p>"
									+
									"</div>	</div></div>"
								$("#agentTrList").append(result);
								time = time + "&" + agentUserOrderSelectVO.number;
								statusType = 1;
							}
							if(n.status == 4) {
								var result = "<div class='unfinishedSaleOrder '>	<div class='unfinishedText changTop2'><div class='unfinishedTextTop'><div class='item'><input type='hidden' id='waitTimeInput" + agentUserOrderSelectVO.number + "' value=" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "><label>订单号 :</label><span>" + agentUserOrderSelectVO.number + "</span></div><div class='item'>" +
									"<label>买家 :</label><span>" + agentUserOrderSelectVO.name + "</span></div><div class='item floatRight' onclick='floatRight(" + agentUserOrderSelectVO.phone + ")'>	<img src='../../img/call.png'/><span>联系对方</span></div></div>	<div class='unfinishedTextCenter changeTop'>		" +
									"<div class='unfinishedTextCenterL fl changeTop'>	<div class='typeText changeTop1 '><p class='selectType changecolor'>卖出</p><p class='typeNmae changecolor'>" + agentUserOrderSelectVO.sellOutType + "</p></div>	<div class='typeMessage changeTop1'>	<p class='typeNumber'>" + agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellInputType + "</p>		" +
									"<div class='item'><label>单价：</label><span>" + agentUserOrderSelectVO.num + agentUserOrderSelectVO.sellInputType + "/" + agentUserOrderSelectVO.sellOutType + "</span></div><div class='item'><label>数量：</label><span>" + agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellOutType + "</span>	</div><p></p></div>	</div><div class='unfinishedTextCenterR fr changeTop paddTop'>" +
									"<p>待买方付款，<span id=\"waitTime\" class='waitTime" + agentUserOrderSelectVO.number + "'>" + (agentUserOrderSelectVO.endDate / 1000).toFixed(0) + "</span>，付款参考号 &nbsp:<span class='consult '>" + agentUserOrderSelectVO.id +
									"</span></p></div>	</div><div class='unfinishedTextBottom'>" +
									agentUserOrderSelectVO.tradeNotice
									//									"<p>1、普通用户售出的数字资产，已交由平台托管冻结。请在确定收到对方付款后点击“ 确认放行”支付数字资产</p><p>2、请不要相信任何催促放币的理由，确认收到款项再释放数字资产，避免造成损失！</p><p>3、在收到账短信后，请务必登录网上银行或手机银行确认收款是否入账，避免因收到诈骗短信错误释放数字资产！</p>"
									+
									"</div>	</div></div>";
								$("#agentTrList").append(result);
								time = time + "&" + agentUserOrderSelectVO.number;
								statusType = 1;
							}
						}
						timesStauts = 0;
					});
					if(statusType == 0) {
						$("#agentTrList").empty();
						var zhanwudingdan = "<div class='reminderText'>" +
							"<p>暂无完成订单</p>" +
							"<p>温馨提示:超过三笔取消订单，将被冻结当天下单权限</p>" +
							"</div>";
						$("#agentTrList").append(zhanwudingdan);
					}
				} else {
					timesStauts = 1;
					$("#agentTrList").empty();
					var zhanwudingdan = "<div class='reminderText'>" +
						"<p>暂无完成订单</p>" +
						"<p>温馨提示:超过三笔取消订单，将被冻结当天下单权限</p>" +
						"</div>";
					$("#agentTrList").append(zhanwudingdan);
				}
			}

		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});
selectuserBalance();
}
var timesStauts = 0;
//获取所有已完成订单
function allUnifished(status, page, rows) {
	time = "";
	if(status == 2) {
		$(".centerDiv").hide().eq(1).show();
		$("#pageToolbar").hide();
		$("#pageToolbar2").show();
		$("#pageToolbar3").hide();
	}
	if(status == 1 || status == 3) {
		$(".centerDiv").hide().eq(1).show();
		$("#pageToolbar").hide();
		$("#pageToolbar2").hide();
		$("#pageToolbar3").show();
	}
	if(pcUser == null) {
		return;
	}
	if(pcUser != null) {
		if(pcUser.agentStatus == 1) {
			return;
		}
	}
	selectuserBalance();
	$("#yesTrSelectListTable").empty();
	var data2 = {
		"bau_id": pcUser.id,
		"page": page == null || page == "" ? 1 : page,
		"rows": 10,
		"status": status
	};

	$.ajax({
		type: "POST",
		url: PCData.APPAGENT_URL + 'agentV1/PCBIGagentOrderSelectList',
		data: JSON.stringify(data2),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				statusTest = 0;
				console.log(data)
				var agentTrList = data.data.objectList;
				var result = "";
				if(agentTrList.length > 0) {
					$("#yesTrSelectListTable").empty();
					$(agentTrList).each(function(i, n) {
						var agentUserOrderSelectVO = n.agentUserOrderSelectVO;
						var type = "";
						if(agentUserOrderSelectVO.type == 0) {
							type = "买入";

						}
						if(agentUserOrderSelectVO.type == 1) {
							type = "卖出";

						}
						var tokentype = "";
						if(agentUserOrderSelectVO.type == 0) {
							tokentype = agentUserOrderSelectVO.sellInputType + "/" + agentUserOrderSelectVO.sellOutType;
						}
						if(agentUserOrderSelectVO.type == 1) {
							tokentype = agentUserOrderSelectVO.sellOutType + "/" + agentUserOrderSelectVO.sellInputType;
						}
						var trNumType = "";
						if(agentUserOrderSelectVO.type == 0) {
							trNumType = agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellInputType;
						}
						if(agentUserOrderSelectVO.type == 1) {
							trNumType = agentUserOrderSelectVO.volumeOfTransactions + agentUserOrderSelectVO.sellOutType;
						}
						var trNumMyType = "";
						if(agentUserOrderSelectVO.type == 0) {
							trNumMyType = agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellOutType;
						}
						if(agentUserOrderSelectVO.type == 1) {
							trNumMyType = agentUserOrderSelectVO.amountOfMoney + agentUserOrderSelectVO.sellInputType;
						}
						var trPayType = "";
						if(agentUserOrderSelectVO.bankCard != null && agentUserOrderSelectVO.bankCard != "") {
							var payType = agentUserOrderSelectVO.bankCard.split("&");
							trPayType = "<td><ul><li class=\"trStyle\">转账方式</li><li><label>转账方式:</label><span>银行卡</span></li><li><label>姓名:</label><span>" + payType[0] +
								"</span></li><li><label>银行:</label><span>" + payType[1] + "</span></li><li><label>支行:</label><span>" + payType[2] + "</span></li></ul></td>"
						}
						if(agentUserOrderSelectVO.alipay != null && agentUserOrderSelectVO.alipay != "") {
							var payType = agentUserOrderSelectVO.alipay.split("&");
							trPayType = "<td><ul><li class=\"trStyle\">转账方式</li><li><label>转账方式:</label><span>支付宝</span><img src=\"../../img/erweima.png\" class='zfbImg' onclick='Img(\"" + payType[2] + "\")'/></li><li><label>姓名:</label><span>" + payType[0] +
								"</span></li></ul></td>"
						}
						if(agentUserOrderSelectVO.weChat != null && agentUserOrderSelectVO.weChat != "") {
							var payType = agentUserOrderSelectVO.weChat.split("&");
							trPayType = "<td><ul><li class=\"trStyle\">转账方式</li><li><label>转账方式:</label><span>微信</span><img src=\"../../img/erweima.png\" class='wxImg' onclick='Img(\"" + payType[2] + "\")'/></li><li><label>姓名:</label><span>" + payType[0] +
								"</span></li></ul></td>"
						}
						if(agentUserOrderSelectVO.bankCard == null && agentUserOrderSelectVO.alipay == null && agentUserOrderSelectVO.weChat == null) {
							trPayType = "<td></td>"

						}
						var statusName = "";
						if(agentUserOrderSelectVO.status == 2) {
							statusName = "交易完成";
						}
						if(agentUserOrderSelectVO.status == 1) {
							statusName = "商家取消";
						}
						if(agentUserOrderSelectVO.status == 3) {
							statusName = "用户取消";
						}
						var data = "";
						var timestamp3 = agentUserOrderSelectVO.createTime;
						var newDate = new Date();
						newDate.setTime(timestamp3);
						if(agentUserOrderSelectVO.status == 2) {
							data = "<td class=\"tdStyle\"><ul><li class=\"trStyle\">确认时间</li><li><label>完成时间:</label><span>" + newDate.format('yyyy-MM-dd hh:mm:ss') + "</span></li></ul></td>";
							var table = "<tr class='trList' ><td>" + agentUserOrderSelectVO.number + "</td><td class='typecolor'>" + type + "</td><td>" + statusName + "</td><td>" + tokentype + "</td><td>" + agentUserOrderSelectVO.num + "</td><td>" + trNumType + "</td><td>" + trNumMyType + "</td><td>" + newDate.format('yyyy-MM-dd hh:mm:ss') +
								"</td></tr><tr style=\"display: none;\">" + trPayType + "<td class=\"tdStyle\"><ul><li class=\"trStyle\">卖家信息</li><li><label>姓名:</label><span>" + agentUserOrderSelectVO.name + "</span></li></ul></td>" + data + "<td></td><td></td><td></td><td></td><td></td></tr>";

						} else {
							data = "<td class=\"tdStyle\"><ul><li class=\"trStyle\">取消时间</li><li><span>" + newDate.format('yyyy-MM-dd hh:mm:ss') + "</span></li></ul></td>";
							var table = "<tr class='trList'><td>" + agentUserOrderSelectVO.number + "</td><td class='typecolor'>" + type + "</td><td>" + statusName + "</td><td>" + tokentype + "</td><td>" + agentUserOrderSelectVO.num + "</td><td>" + trNumType + "</td><td>" + trNumMyType + "</td><td>" + newDate.format('yyyy-MM-dd hh:mm:ss') +
								"</td></tr><tr style=\"display: none;\" class='trListShow'><td class=\"tdStyle\"><ul><li class=\"trStyle\">卖家信息</li><li><label>姓名:</label><span>" + agentUserOrderSelectVO.name + "</span></li></ul></td>" + data + "<td></td><td></td><td></td><td></td><td></td><td></td></tr>";

						}
						result = result + table;
					})
					$("#yesTrSelectListTable").append(result);

					var type1 = $(".typecolor");
					for(var i = 0; i < type1.length; i++) {
						var type2 = type1.eq(i).text();
						if(type2 == "买入") {
							type1.eq(i).css("color", "#07BE89")
						}
						if(type2 == "卖出") {
							type1.eq(i).css("color", "#DF6B3A")
						}
					}
					$("#finishedOrderTable tbody tr:even").click(function() {
						$(this).next("tr").toggle();
						$(this).next("tr").css("background-color", "#F3F8FC");
						$(this).siblings(".trList").next("tr").hide();
					});
				}
				if(status == 1 || status == 3) {
					//重新渲染分页使用render
					$('#pageC').val(page == null || page == "" ? 1 : page);
					$('#totalC').val(data.data.total);
					$('#rowsC').val(rows == null || rows == "" ? 10 : rows);
					pc.render({
						count: $('#totalC').val(),
						pagesize: rows,
						current: page
					});

				} else if(status == 2) {
					//重新渲染分页使用render
					$('#pageY').val(page == null || page == "" ? 1 : page);
					$('#totalY').val(data.data.total);
					$('#rowsY').val(rows == null || rows == "" ? 10 : rows);
					py.render({
						count: $('#totalY').val(),
						pagesize: rows,
						current: page
					});
				}
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});

}

//拨打电话
function floatRight(phone) {
	$(".callMessage").empty();
	$(".callMessage").append(phone);
	$("#call").show();
	$("body").css("overflow", "hidden");
}
//买入
function buyBtn(id) {
	if(pcUser == null) {

		Message("用户未登录", "error");
		return;
	}
	if(pcUser != null) {
		if(pcUser.realNameStatus != 1) {
			Message("请实名认证", "error");
			return;
		}
	}
	if(pcUser != null) {
		if(pcUser.fundsStatus == 0) {
			Message("请先到个人中心-安全设置绑定资金密码", "error");
			return;
		}
	}
	selectuserBalance()
	var data = {
		"id": id,
		"tokenType": "CNDT"
	};
	$.ajax({
		type: 'POST',
		url: PCData.PCAGENT_URL + 'pcagent/selectListAdminAgent',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				var agentPO = data.data[0];
				var IMG = "";
				if(agentPO.paymentMethod1 == 0) {
					IMG = IMG + "<img src='../../img/zhifubao.png'/>";
				}
				if(agentPO.paymentMethod2 == 0) {
					IMG = IMG + "<img src='../../img/weixin.png'/>";
				}
				if(agentPO.paymentMethod3 == 0) {
					IMG = IMG + "<img src='../../img/yinhangka.png'/>";
				}
				$("#buyBtn_nameNum").empty();
				$("#buyBtn_imgs").empty();
				$("#buyBtn_tradeLimit").empty();
				$("#buyBtn_num").empty();
				$("input[id='buyBtn_tokenNum']").val("");
				$("#buyBtn_Money").empty();
				var agentPO = data.data[0];
				$("#buyBtn_nameNum").append(agentPO.name.replace(/^(.).*(.)$/, "$1**") + "/(" + agentPO.sum + ")");

				$("#buyBtn_imgs").append(IMG);
				$("#buyBtn_tradeLimit").append(agentPO.tradeLimit);
				$("#buyBtn_num").append(agentPO.num);
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e);
		}
	});
	$("#buying").show();
	$(".buyTitle .titleText").html("确认买入")
	$("body").css("overflow", "hidden");
	$('#buyBtn_tokenNum').bind('input propertychange', function() {
		if(decimal($(this).val())) {
			Message("买卖数量不能小于小数点2位", "win");
			$("#buyingBar").attr("onclick", "");
		} else {
			$("#buyingBar").attr("onclick", "buying(" + id + "," + 0 + ")");
		}
		$('#buyBtn_Money').html(($(this).val() * $("#buyBtn_num").text()).toFixed(2));
	});

}
var userInformationService;
var statusPayment = 0;

function saleBtn(id) {
	if(pcUser == null) {
		Message("用户未登录", "error");
		return;
	}
	if(pcUser != null) {
		if(pcUser.realNameStatus != 1) {
			Message("请实名认证", "error");
			return;
		}
	}
	if(pcUser != null) {
		if(pcUser.fundsStatus == 0) {
			Message("请先到个人中心-安全设置绑定资金密码", "error");
			return;
		}
	}
	if(statusPayment == 0) {
		Message("请设置支付方式", "error");
		return;
	}
	selectuserBalance()
	var data = {
		"id": id,
		"tokenType": "CNDT"
	};
	$.ajax({
		type: 'POST',
		url: PCData.PCAGENT_URL + 'pcagent/selectListAdminAgent',
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				var agentPO = data.data[0];
				var IMG = "";
				if(userInformationService.paymentMethod1 == 0) {
					IMG = IMG + "<img src='../../img/zhifubao.png'/>";
				}
				if(userInformationService.paymentMethod2 == 0) {
					IMG = IMG + "<img src='../../img/weixin.png'/>";
				}
				if(userInformationService.paymentMethod3 == 0) {
					IMG = IMG + "<img src='../../img/yinhangka.png'/>";
				}
				$("#buyBtn_nameNum").empty();
				$("#buyBtn_imgs").empty();
				$("#buyBtn_tradeLimit").empty();
				$("#buyBtn_num").empty();
				$("input[id='buyBtn_tokenNum']").val("");
				$("#buyBtn_Money").empty();
				$("#buyBtn_nameNum").append(agentPO.name.replace(/^(.).*(.)$/, "$1**") + "/(" + agentPO.sum + ")");
				$("#buyBtn_imgs").append(IMG);
				$("#buyBtn_tradeLimit").append(agentPO.tradeLimit);
				$("#buyBtn_num").append(agentPO.num);
			}
		},
		error: function(e) {
			Message("请求错误", "error");
		}
	});
	$("#buying").show();
	$(".buyTitle .titleText").html("确认卖出")
	$("body").css("overflow", "hidden");
	$('#buyBtn_tokenNum').bind('input propertychange', function() {
		if(decimal($(this).val())) {
			Message("买卖数量不能小于小数点2位", "win");
			$("#buyingBar").attr("onclick", "");
		} else {
			$("#buyingBar").attr("onclick", "buying(" + id + "," + 1 + ")");
		}
		$('#buyBtn_Money').html(($(this).val() * $("#buyBtn_num").text()).toFixed(2));

	});
}
//标记付款
function payForm(id) {
	var inputhiddenId = $("#inputhidden" + id).val();
	if(inputhiddenId == null) {
		Message("请选择付款方式", "win");
		return;
	}
	var data = {};
	if(inputhiddenId == 1) {
		data = {
			"id": id,
			"bau_id": pcUser.id,
			"bankCard": agentUserOrderSelectVOPayURL
		}
	}
	if(inputhiddenId == 2) {
		data = {
			"id": id,
			"bau_id": pcUser.id,
			"alipay": agentUserOrderSelectVOPayURL
		}
	}
	if(inputhiddenId == 3) {
		data = {
			"id": id,
			"bau_id": pcUser.id,
			"weChat": agentUserOrderSelectVOPayURL
		}
	}
	$.ajax({
		type: 'POST',
		url: PCData.AGENT_URL + "agentV1/userAgentPlaceAnOrderUpdate",
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				$("#confirmPay").hide();
				$("body").css("overflow", "visible");
				Refresh();
				Message("付款成功", "win");
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e)
		}
	});
}
//取消订单
function cancelForm(id) {
	selectuserBalance()
	var data = {
		"id": id,
		"bau_id": pcUser.id,
		"status": 3
	}
	$.ajax({
		type: 'POST',
		url: PCData.AGENT_URL + "agentV1/agentOrderAudit",
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				$("#cancel").hide();
				$("body").css("overflow", "visible");
				Refresh();
				Message("取消成功", "win");
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e)
		}
	});
}
//放币
function dischargedForm(id) {
	var dischargedImg = $('.dischargedImg').attr("src");
	if(dischargedImg == "../../img/selecrbox.png") {
		Message("请勾选", "error");
		return;
	}
	if($(".dischargedPasInput").val() == null && $(".dischargedPasInput").val() == "") {
		Message("请输入资金密码", "error");
		return;
	}
	$("#discharged").hide();
	$("body").css("overflow", "visible");
	selectuserBalance()
	var data = {
		"id": id,
		"bau_id": pcUser.id,
		"status": 2,
		"fundsPassword": hex_md5(PCData.PREX + $(".dischargedPasInput").val())
	}
	$.ajax({
		type: 'POST',
		url: PCData.AGENT_URL + "agentV1/agentOrderAudit",
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				Message("放币成功", "win");
				Refresh();
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e)
		}
	});
}

function buying(id, type) {
	if(pcUser == null) {
		Message("请登录", "error");
	}
	var buyBtn_Money = $("#buyBtn_Money").text();
	var buyBtn_tokenNum = $("#buyBtn_tokenNum").val();
	if(pcUser != null) {
		if(buyBtn_tokenNum <= 0) {
			Message("买卖数量不能为0", "warm");
			return;
		}
	}
	$("#buyingBar").attr("onclick", "");
	if(type == 0) {
		var data = {
			"bau_id": pcUser.id,
			"baa_id": id,
			"sellInputNum": buyBtn_tokenNum,
			"amountOfMoney": buyBtn_Money,
			"sellOutNum": buyBtn_Money
		}
	}
	if(type == 1) {
		var data = {
			"bau_id": pcUser.id,
			"baa_id": id,
			"sellOutNum": buyBtn_tokenNum,
			"amountOfMoney": buyBtn_Money,
			"sellInputNum": buyBtn_Money
		}
	}
	$.ajax({
		type: 'POST',
		url: PCData.AGENT_URL + "agentV1/userAgentPlaceAnOrder",
		data: JSON.stringify(data),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				selectuserBalance()
				$("#buying").hide();
				$("body").css("overflow", "visible");
				Refresh();
				console.log(data)
				Message("下单成功", "win");
			}
		},
		error: function(e) {
			Message("请求错误", "error");
			console.log(e)
		}
	});
}
//金额
function judgeMoney(num) {
	$('#agentList tr').show();
	$('#agentList tr').each(function(i) {
		var price = $(this).children('td').eq(6).text();
		if(price < num) {
			$(this).hide();
		}
	})
}
//支付方式
function pay(num) {
	$('#agentList tr').show();
	if(num == 1) {
		$('#agentList tr').each(function(i) {
			var payZFB = $(this).children('td').eq(2).text();
			if(payZFB != 0) {
				$(this).hide();
			}
		});
	} else if(num == 2) {
		$('#agentList tr').each(function(i) {
			var payWX = $(this).children('td').eq(3).text();
			if(payWX != 0) {
				$(this).hide();
			}
		});
	} else if(num == 3) {
		$('#agentList tr').each(function(i) {
			var payYHK = $(this).children('td').eq(4).text();
			if(payYHK != 0) {
				$(this).hide();
			}
		});
	} else {
		$('#agentList tr').show();
	}

}
//二维码
function Img(img) {
	$("#zhiFuBao").show();
	$("#zhiFuBao .img1").attr("src", img);
	$("body").css("overflow", "hidden");
}
var agentUserOrderSelectVOPayURL = "";
//标记付款
function showConfirmPay(id) {
	var inputhiddenId = $("#inputhidden" + id).val();
	if(inputhiddenId == null) {
		Message("请选择付款方式", "win");
		return;
	}
	var data2 = {
		"bau_id": pcUser.id,
		"page": 1,
		"rows": 2,
		"id": id
	};
	$.ajax({
		type: "POST",
		url: PCData.APPAGENT_URL + 'agentV1/PCBIGagentOrderSelectList',
		data: JSON.stringify(data2),
		contentType: "application/json",
		dataType: 'json',
		success: function(data) {
			if(data.code != "200") {
				Message(data.message, "error");
			} else {
				var agentUserOrderSelectVO = data.data.objectList[0].agentUserOrderSelectVO;
				$(".payTypeLeftNmae").empty();
				$(".payTypeRight").empty();
				$(".totalMoney").empty();
				$(".totalNumer").empty();
				$(".payTypeLeftNmae").html(agentUserOrderSelectVO.sellInputType);
				$(".payTypeRight").html(agentUserOrderSelectVO.number);
				$(".totalMoney").html(agentUserOrderSelectVO.amountOfMoney);
				$(".totalNumer").html(agentUserOrderSelectVO.amountOfMoney / agentUserOrderSelectVO.num);
				if(inputhiddenId == 1) {
					$(".payImg").html("<img src='../../img/yinhangka.png'/>");
					agentUserOrderSelectVOPayURL = agentUserOrderSelectVO.bankCard;
				}
				if(inputhiddenId == 2) {
					$(".payImg").html("<img src='../../img/zhifubao.png'/>");
					agentUserOrderSelectVOPayURL = agentUserOrderSelectVO.alipay;
				}
				if(inputhiddenId == 3) {
					$(".payImg").html("<img src='../../img/weixin.png'/>");
					agentUserOrderSelectVOPayURL = agentUserOrderSelectVO.weChat;
				}
				$("#payForm").attr("onclick", "payForm(" + agentUserOrderSelectVO.id + ")")
				$("#confirmPay").show();
				$("body").css("overflow", "hidden");
			}
		}
	})

}
//取消订单
function showCancel(id) {
	$("#cancelForm").attr("onclick", "cancelForm(" + id + ")");
	$("#cancel").show();
	$("body").css("overflow", "hidden");
}
//放币
function showDischarged(id) {
	$("#dischargedForm").attr("onclick", "dischargedForm(" + id + ")");
	$("#discharged").show();
	$("body").css("overflow", "hidden");
}
//付款切换背景
function changePayType(id, type) {
	var inputhidden = "<input type='hidden' id='inputhidden" + id + "' value='" + type + "' />";
	$("#inputhidden").empty()
	$("#inputhidden").append(inputhidden);
	//	$(".payImg").empty();
	//	$(".payAderess").empty();
	if($(event.target).hasClass("radios")) {
		$(event.target).toggleClass("radioBack");
		$(event.target).parents(":eq(1)").siblings().find(".radios").removeClass("radioBack");
		$(event.target).parents(":eq(8)").siblings().find(".radios").removeClass("radioBack");
	}
	if($(event.target).hasClass("radioBack")) {
		$(event.target).parent().next().html();
		$(event.target).parents().eq(1).children().eq(2).html();
	}
}

//支付方式跳转
function goPayment() {
	location.href = "../../view/person_cen/person_cen.html?type=3";
}

function Refresh() {
	window.location.reload();
}
var interval = setInterval(demo1, 1000)

//function demo1() {
//	var timeappent = "";
//	var strings = time.split("&");
//	if(strings.length > 0) {
//		$(strings).each(function(i, n) {
//			if(n != "") {
//				var times = $(".waitTime" + n).text();
//				times = times - 1;
//				if(times != -1) {
//					if(times <= 0) {
//						if(timesStauts == 0) {
//demo(timesStauts);
//							//						getAll(4, 1, 2);
//						}
//					} else {
//						timeappent = time + "&";
//						console.log(times);
//						$(".waitTime" + n).empty();
//						$(".waitTime" + n).append(times);
//					}
//				}
//			}
//
//		})
//		time = timeappent;
//	}
//}
function demo1() {
	var timeappent = "";
	var strings = time.split("&");
	if(strings.length > 0) {
		$(strings).each(function(i, n) {
			if(n != "") {
				//获取时间
				//var times = $(".waitTime" + n).text();
				var times = $("#waitTimeInput" + n).val();
				//当前时间减去1秒
				times = times - 1;
				if(times != -1) {
					if(times <= 0) {
						if(timesStauts == 0) {
							demo(timesStauts);
						}
					} else {
						timeappent = time + "&";
						console.log(times);
						var day = Math.floor(times / (60 * 60 * 24));
						var hour = Math.floor(times / (60 * 60)) - (day * 24);
						var minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
						var second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
						if(hour <= 9) hour = '0' + hour;
						if(second <= 9) second = '0' + second;
						$(".waitTime" + n).empty();
						if(day == '0' && hour == '00' && minute == '00' && second == '00') {
						} else {
							if(hour != '00') {
								$(".waitTime" + n).append(hour + "时" + minute + "分" + second + "秒");
							} else {
								if(minute == '00') {
									$(".waitTime" + n).append(second + "秒");
								} else {
									$(".waitTime" + n).append(minute + "分" + second + "秒");
								}
							}
							$("#waitTimeInput" + n).val(times)
						}
					}
				}
			}
		})
		time = timeappent;
	}
}

function demo(timesStauts) {
	if(timesStauts == 0) {
		timesStauts = 1;
		getAll(4, 1, 2);
	}
}

function decimal(decimalNum) {
	var num = decimalNum.split(".");
	if(num.length > 1) {
		if(num[1].length > 2) {
			return true;
		}
	}
	return false;
}