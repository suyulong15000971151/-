var tradeListWebsocket = getWebsocketTR();
var realtimeWebsocket = getWebsocketRT();
var deepWebsocket = getWebsocketDP();
var klineWebsocket = getWebsocketKL();

function shezhiPrice(price){
	    $("#IninputMy").val(Number(price).toFixed(6))
		$("#OutinputMy").val(Number(price).toFixed(6))
}
if(tradeListWebsocket == null) {
	console.log("你的浏览器不支持websocket服务");
}

if(realtimeWebsocket == null) {
	console.log("你的浏览器不支持websocket服务");
}

if(deepWebsocket == null) {
	console.log("你的浏览器不支持websocket服务");
}

if(klineWebsocket == null) {
	console.log("你的浏览器不支持websocket服务");
}

//创建交易列表websocket对象
function getWebsocketTR() {
	var tradeListWebsocket = null;
	if('WebSocket' in window) {
		tradeListWebsocket = new WebSocket(PCData.TRADELIST_WEBSOCKET_URL);
		return tradeListWebsocket;
	} else {
		return null;
	}
}

//创建实时成交websocket对象
function getWebsocketRT() {
	var realtimeWebsocket = null;
	if('WebSocket' in window) {
		realtimeWebsocket = new WebSocket(PCData.REALTIME_WEBSOCKET_URL);
		return realtimeWebsocket;
	} else {
		return null;
	}
}

//创建深度websocket对象
function getWebsocketDP() {
	var deepWebsocket = null;
	if('WebSocket' in window) {
		deepWebsocket = new WebSocket(PCData.DEEP_WEBSOCKET_URL);
		return deepWebsocket;
	} else {
		return null;
	}
}

//创建k线websocket对象
function getWebsocketKL() {
	var klineWebsocket = null;
	if('WebSocket' in window) {
		klineWebsocket = new WebSocket(PCData.KLINE_WEBSOCKET_URL);
		return klineWebsocket;
	} else {
		return null;
	}
}

//  var tokenk =$("#token").val();
//  var tradingAreak =$("#tokenarea").val();
//  var tokenIdk =$("#tokenIds").val();

//交易列表
var ref;

//实时成交
var refRT;

//深度
var refDP;

//k线
var refKL;

var x = 0;

//这里是获取页面的传值

function GetRequest() {
	var url = location.search; //获取url中"?"符后的字串  
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	//				var flat=theRequest.Trading
	if(theRequest.Trading == undefined) {

		$.ajax({
			type: "get",
			url: PCData.TOKEN_URL + 'bigToken/selectListBigAdminTokenAreaList',
			async: false,
			success: function(res) {
				console.log(res.data)
				$(res.data).each(function(i, n) {
					if(n != null) {
						if(n.length > 0) {
							if(x == 0) {
								if(i == 0) {
									$("#tokenarea").val("BIGT")
								}
								if(i == 1) {
									$("#tokenarea").val("BTC")
								}
								if(i == 2) {
									$("#tokenarea").val("ETH")
								}
								if(i == 3) {
									$("#tokenarea").val("CNDT")
								}
								$("#token").val(n[0].englishAbbreviations)
								$("#tokenIds").val(n[0].id)
								$(".shares .shares_title .currency").text(n[0].englishAbbreviations + "/" + $("#tokenarea").val())
								x = 1;
								return;
							}
						}
					}
				})
			}
		});
	} else {

		$("#tokenarea").val(theRequest.Trading)
		$("#token").val(theRequest.Token)
		$("#tokenIds").val(theRequest.TokenId)
		$(".shares .shares_title .currency").text(theRequest.Token + "/" + theRequest.Trading);
	}
	return theRequest.Token + theRequest.Trading;
}
GetRequest();
var tokenk = $("#token").val();
var tradingAreak = $("#tokenarea").val();
var tokenIdk = $("#tokenIds").val();
$("#RealTimeTransactionTradingAreak").empty();
$("#RealTimeTransactionTradingAreak").append("价格(" + tradingAreak + ")")
$("#RealTimeTransactionToken").empty();
$("#RealTimeTransactionToken").append("数量(" + tokenk + ")")
$(document).ready(function() {

	$("#showPrice").html("价格( " + tradingAreak + " )");
	$("#showNum").html("数量( " + tokenk + " )");
	$(".showPrices").html("价格( " + tradingAreak + " )");
	$(".showNums").html("数量( " + tokenk + " )");
	
	$("#showTradeArea").html(tradingAreak);

	tradeListWebsocket.onopen = function() {
		var message = tradingAreak + "," + tokenk + ",6,7";
		tradeListWebsocket.send(message);
	};
	tradeListWebsocket.onmessage = function(event) {
		//返回参数
		strJoinFn(event,7);
		var rest = JSON.parse(event.data);

      if(rest.data==null||rest.data==""||rest.data[3]==null){
      	$("#IninputMy").val(0.000000);
		$("#OutinputMy").val(0.000000);
      }else{
      	$("#IninputMy").val(Number(rest.data[3]).toFixed(6));
		$("#OutinputMy").val(Number(rest.data[3]).toFixed(6));
      }
	};
	if(!!ref) {
		clearInterval(ref);
	}
	ref = setInterval(function() {
		var message = tradingAreak + "," + tokenk + ",6,7";
		tradeListWebsocket.send(message);
		tradeListWebsocket.onmessage = function(event) {
			//返回参数

			strJoinFn(event, 7);
		};

	}, 5000);

	realtimeWebsocket.onopen = function() {
		var message = tradingAreak + "," + tokenk;
		realtimeWebsocket.send(message);
	};
	realtimeWebsocket.onmessage = function(event) {
		//返回参数
		strJoinRT(event);
	};
	if(!!refRT) {
		clearInterval(refRT);
	}
	refRT = setInterval(function() {
		var message = tradingAreak + "," + tokenk;
		realtimeWebsocket.send(message);
		realtimeWebsocket.onmessage = function(event) {
			//返回参数
			strJoinRT(event);
		};

	}, 5000);

	var endDate = PCUtils.getTimeFull(new Date(), "-");
	var startDate = PCUtils.getBeforeMonthFull(new Date(), 1, "-");

	//深度
	deepWebsocket.onopen = function() {
		var message = tradingAreak + "," + tokenk + "," + startDate + "," + endDate;
		deepWebsocket.send(message);
	};
	deepWebsocket.onmessage = function(event) {
		//返回参数
		console.log("深度返回参数" + event);
		strJoinDP(event);
	};
	if(!!refDP) {
		clearInterval(refDP);
	}
	refDP = setInterval(function() {
		var endDateNew = PCUtils.getTimeFull(new Date(), "-");
		var startDateNew = PCUtils.getBeforeMonthFull(new Date(), 1, "-");
		
		var message = tradingAreak + "," + tokenk + "," + startDateNew + "," + endDateNew;
		deepWebsocket.send(message);
		deepWebsocket.onmessage = function(event) {
			//返回参数 
			console.log("深度返回参数" + event);
			strJoinDP(event);
		};

	}, 5000);

	//k线
	klineWebsocket.onopen = function() {
		var message = tradingAreak + "," + tokenk + ",120";
		klineWebsocket.send(message);
	};
	klineWebsocket.onmessage = function(event) {
		//返回参数
		var res = JSON.parse(event.data);
		console.log(res.data)
		console.log("这里是头部--------》》》》》")
		var Increase=Number(res.data.rate).toFixed(2);
		if(Increase<0){
			$(".shares .shares_title .Increase span").html(" <em>"+Number(res.data.rate).toFixed(2)+"%</em>")
		}else{
			$(".shares .shares_title .Increase span").text("  +"+Number(res.data.rate).toFixed(2)+"%")
		}
		
		$(".shares .shares_title .gao").text("高 "+" " + res.data.high.toFixed(6))
		$(".shares .shares_title .di").text("低"+" " + res.data.low.toFixed(6))
		$(".shares .shares_title .amount").text("24H量"+" " + res.data.vol.toFixed(6)+" "+token)
	};
	if(!!refKL) {
		clearInterval(refKL);
	}
	refKL = setInterval(function() {
			var message = tradingAreak + "," + tokenk + ",120";
			klineWebsocket.send(message);
			klineWebsocket.onmessage = function(event) {
				var res = JSON.parse(event.data);
				var Increases=Number(res.data.rate).toFixed(2);
				if(Increases<0){
			$(".shares .shares_title .Increase span").html(" <em>"+Number(res.data.rate).toFixed(2)+"%</em>")
		}else{
			$(".shares .shares_title .Increase span").text("  +"+Number(res.data.rate).toFixed(2)+"%")
		}
				console.log("这里是头部--------》》》》》")
				$(".shares .shares_title .gao").text("高 "+" "+ res.data.high.toFixed(6))
				$(".shares .shares_title .di").text("低"+" "+ res.data.low.toFixed(6))
				$(".shares .shares_title .amount").text("24H量"+" "+ res.data.vol.toFixed(6)+" "+token)

				//返回参数
				console.log("k线返回参数" + event);
			};
		},
		5000);

});

function strJoinDP(r) {

	var res = JSON.parse(r.data);
	var resCode = res.code;
	if(resCode != "200" || res.data == null) {
		return;
	};
	var deepInList = res.data['0'];
	var deepOutList = res.data['1'];

	var deepIns = [];
	var deepOuts = [];

	if(deepInList != null && deepInList.length > 0) {
		for(var i = deepInList.length - 1; i >= 0; i--) {
			var price = deepInList[i].unitPrice;
			var amount = deepInList[i].sumNoDealNumber;
			var deepIn = {
				"price": price,
				"amount": amount
			};
			deepIns.push(deepIn);
		}
	}

	if(deepOutList != null && deepOutList.length > 0) {
		for(var i = deepOutList.length - 1; i >= 0; i--) {
			var price = deepOutList[i].unitPrice;
			var amount = deepOutList[i].sumNoDealNumber;
			var deepOut = {
				"price": price,
				"amount": amount
			};
			deepOuts.push(deepOut);
		}
	}
	if(deepIns==null||deepIns.length<1||deepOuts==null||deepOuts.length<1){
		
	}else{
		var data = {
			"sell": deepOuts,
			"buy": deepIns
		};
		drawDepthChart(data);
	}
}


function strJoinFn(r, num) {

	var res = JSON.parse(r.data);
	var resCode = res.code;
	if(resCode != "200" || res.data == null) {
		return;
	};
	// console.log(res.data[3])
	var letstprice = 0.000000;

	if(res.data != null && res.data[3] != null) {
		letstprice = res.data[3];
	}
	//  letstprice==0?letstprice="0.000000":letstprice=letstprice;
	// letstprice=Number(letstprice).toFixed(4)
	$(".latestprice").text(Number(letstprice).toFixed(6));
	//买入列表
	$('#outResultBox').empty();
	$('#inResultBox').empty();
	var inList = res.data['1'];
	if(inList == null || inList.length < 1) {
		for(var i = 0; i < num; i++) {
			var create_tr = $('<tr></tr>');
			var _html = '<td>买' + (i + 1) + '</td><td></td><td></td>';
			create_tr.html(_html);
			$('#inResultBox').append(create_tr);
		};
	} else {
		if(inList.length < num) {
			for(var i = 0; i < inList.length; i++) {
				var create_tr = $('<tr onclick="shezhiPrice(' + inList[i].unitPrice.toFixed(6) + ')"></tr>');
				var _html = '<td>买' + (i + 1) + '</td><td>' + inList[i].unitPrice.toFixed(6) + '</td><td>' + inList[i].unfinishedcount.toFixed(6) + '</td>';
				create_tr.html(_html);
				$('#inResultBox').append(create_tr);

			};
			for(var i = inList.length; i < num; i++) {
				var create_tr = $('<tr></tr>');
				var _html = '<td>买' + (i + 1) + '</td><td></td><td></td>';
				create_tr.html(_html);
				$('#inResultBox').append(create_tr);
			};
		} else {
			for(var i = 0; i < num; i++) {
				var create_tr = $('<tr onclick="shezhiPrice(' + inList[i].unitPrice.toFixed(6) + ')"></tr>');
				var _html = '<td>买' + (i + 1) + '</td><td>' + inList[i].unitPrice.toFixed(6) + '</td><td>' + inList[i].unfinishedcount.toFixed(6) + '</td>';
				create_tr.html(_html);
				$('#inResultBox').append(create_tr);
			};
		}
	}
	//卖出列表
	var outList = res.data['2'];
	if(outList == null || outList.length < 1) {
		for(var i = num - 1; i >= 0; i--) {
			var create_tr = $('<tr></tr>');
			var _html = '<td>卖' + (i + 1) + '</td><td></td><td></td>';
			create_tr.html(_html);
			$('#outResultBox').append(create_tr);
		};
	} else {
		if(outList.length < num) {
			for(var i = (num - 1); i >= outList.length; i--) {
				var create_tr = $('<tr></tr>');
				var _html = '<td>卖' + (i + 1) + '</td><td></td><td></td>';
				create_tr.html(_html);
				$('#outResultBox').append(create_tr);
			};
			for(var i = outList.length - 1; i >= 0; i--) {
				var create_tr = $('<tr onclick="shezhiPrice(' + outList[i].unitPrice + ')"></tr>');
				var _html = '<td>卖' + (i + 1) + '</td><td >' + outList[i].unitPrice.toFixed(6) + '</td><td>' + outList[i].unfinishedcount.toFixed(6) + '</td>';
				create_tr.html(_html);
				$('#outResultBox').append(create_tr);
			};
		} else {
			for(var i = num - 1; i >= 0; i--) {
				var create_tr = $('<tr onclick="shezhiPrice(' + outList[i].unitPrice + ')"></tr>');
				var _html = '<td>卖' + (i + 1) + '</td><td>' + outList[i].unitPrice.toFixed(6) + '</td><td>' + outList[i].unfinishedcount.toFixed(6) + '</td>';
				create_tr.html(_html);
				$('#outResultBox').append(create_tr);
			};
		}
	}

}

function strJoinRT(r) {
	var res = JSON.parse(r.data);
	var resCode = res.code;
	if(resCode != "200" || res.data == null) {
		return;
	};

	//获取实时更新列表
	$('#realTimeBox').empty();
	var realTimeList = res.data;

	for(var i = 0; i < realTimeList.length; i++) {
		var create_tr = $('<tr></tr>');
		var _html = '<td>' + PCUtils.getTimeFull(realTimeList[i].updateTime, "-") + '</td><td>' + (realTimeList[i].type != null && realTimeList[i].type == 0 ? "<div class='win'>买入</div>" : realTimeList[i].type != null && realTimeList[i].type == 1 ? "<div class='fault'>卖出</div>" : "") + '</td>' +
			'<td>' + realTimeList[i].unitPrice.toFixed(6) + '</td><td>' + realTimeList[i].yesDealNumber.toFixed(6) + '</td>';
		create_tr.html(_html);
		$('#realTimeBox').append(create_tr);
	};
}

function drawDepthChart(data) {
	
	var canvas = $('#depth');  //选择要擦除的canvas元素
	var context = canvas.get(0).getContext('2d');  //获取canvas上下文
 
	//第一种方法擦除（clearRect方法）
	context.clearRect(0, 0, canvas.width(), canvas.height());
	
	
	var canvasX = $('#x');  //选择要擦除的canvas元素
	var contextX = canvasX.get(0).getContext('2d');  //获取canvas上下文
 
	//第一种方法擦除（clearRect方法）
	contextX.clearRect(0, 0, canvasX.width(), canvasX.height());
	
	
	var canvasY = $('#y');  //选择要擦除的canvas元素
	var contextY = canvasY.get(0).getContext('2d');  //获取canvas上下文
 
	//第一种方法擦除（clearRect方法）
	contextY.clearRect(0, 0, canvasY.width(), canvasY.height());
	
	
	
	
	
	
	var data = data;

	// var data = {
	// "sell":
	// [
	// {"price":9000,"amount":8176},
	// {"price":8999.84,"amount":10245},
	// {"price":8999.68,"amount":19147},
	// {"price":8999.52,"amount":4150},
	// {"price":8999.36,"amount":10420},
	// {"price":8999.2,"amount":16053},
	// {"price":8999.04,"amount":8480},
	// {"price":8998.88,"amount":12751},
	// {"price":8998.72,"amount":14187},
	// {"price":8998.56,"amount":7916}
	// ],
	// "buy":[
	// {"price":8749,"amount":8379},
	// {"price":8748.74,"amount":18582},
	// {"price":8748.48,"amount":9173},
	// {"price":8748.22,"amount":13327},
	// {"price":8747.96,"amount":1990},
	// {"price":8747.7,"amount":3414},
	// {"price":8747.44,"amount":12062},
	// {"price":8747.18,"amount":19389},
	// {"price":8746.92,"amount":8999},
	// {"price":8746.66,"amount":8675}
	// ]
	// };

	for(i in data['buy']) {
		var total = 0;
		for(n = 0; n <= i; n++) {
			total += data['buy'][n]['amount'];
		}

		data['buy'][i]['total'] = total;
	}

	for(i in data['sell']) {
		var total = 0;
		for(n = i; n < data['sell'].length; n++) {
			total += data['sell'][n]['amount'];
		}

		data['sell'][i]['total'] = total;
	}

	var gap = 10; //X轴偏移量 防止左右两部分连接以利于美观
	var canvas = document.getElementById('depth');
	var width = canvas.getAttribute('width');
	var height = canvas.getAttribute('height');

	//计算交易量的最大值，作为纵坐标的最大刻度值	
	var maxAmount = Math.max(data['sell'][0]['total'], data['buy'][data['buy'].length - 1]['total']);

	var scaleH = maxAmount / height;

	//买卖各占一半宽度
	var scaleW = width / 2 / data['sell'].length;

	var context = canvas.getContext('2d');

	//开始一个连续绘制路径
	context.beginPath();
	context.fillStyle = '#E8F9F3'; //设置买入区域填充颜色
	var x = y = 0;
	context.moveTo(width / 2 - gap, height);

	//从中间向上、向左绘制买单图
	for(i in data['buy']) {
		x = width / 2 - i * scaleW - gap;
		y = height - data['buy'][i]['total'] / maxAmount * height;
		context.lineTo(x, y);
	}

	context.lineTo(0, y); //延伸到最左侧边缘
	context.lineTo(0, height);
	context.lineTo(width / 2 - gap, height);
	context.fill(); //形成一个封装区域 并按fillStyle指定的颜色填充		
	context.closePath();

	//同上 开始绘制卖单深度图
	context.beginPath();
	context.fillStyle = '#FDF0EC';
	context.moveTo(width / 2 + gap, height);
	for(i in data['sell']) {
		var index = data['sell'].length - i - 1;
		x = width / 2 + i * scaleW + gap;
		y = height - data['sell'][index]['total'] / maxAmount * height;
		context.lineTo(x, y);
	}

	context.lineTo(width + gap, y);
	context.lineTo(width + gap, height);
	context.lineTo(width / 2 + gap, height);
	context.fill();
	context.closePath();

	//X轴刻度
	var contextX = document.getElementById('x').getContext('2d');
	var contextY = document.getElementById('y').getContext('2d');
	contextX.fillStyle = '#999';
	contextY.fillStyle = '#999';

	for(i in data['buy']) {
		if(i % 3) continue;
		x = width / 2 - i * scaleW - 30;
		y = 12;
		contextX.fillText(data['buy'][i]['price'], x, y);
	}

	for(i in data['sell']) {
		if(i % 3) continue;
		x = width / 2 + i * scaleW;
		y = 12;
		var index = data['sell'].length - i - 1;
		contextX.fillText(data['sell'][index]['price'], x, y);
	}

	//Y轴5等份
	var seg = maxAmount / 5;
	for(i = 1; i < 6; i++) {
		x = 12;
		y = height - seg * i / maxAmount * height;
		contextY.fillText(seg * i > 1000 ? (seg * i / 1000 + 'K') : seg * i, x, y);
	}

	//这是作者加的版权标识 你可以去掉
	//	context.fillText('Powered By: 月影无痕 zhangxugg@163.com', 180, 100);
};